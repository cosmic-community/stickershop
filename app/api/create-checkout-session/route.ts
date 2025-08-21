import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getSticker } from '@/lib/cosmic'
import { Sticker } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20'
})

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    // Fetch product details from Cosmic for each item
    const lineItems = await Promise.all(
      items.map(async (item: { id: string; quantity: number }) => {
        // Get sticker by slug (assuming id is the slug for now)
        const sticker = await getSticker(item.id) as Sticker | null
        
        if (!sticker || !sticker.metadata.price) {
          throw new Error(`Product not found: ${item.id}`)
        }

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: sticker.metadata.name || sticker.title,
              description: sticker.metadata.description || '',
              images: sticker.metadata.product_images?.length 
                ? [`${sticker.metadata.product_images[0].imgix_url}?w=800&h=600&fit=crop&auto=format,compress`]
                : [],
              metadata: {
                product_id: sticker.id,
                product_slug: sticker.slug,
                size: sticker.metadata.size || '',
                material: sticker.metadata.material?.value || ''
              }
            },
            unit_amount: Math.round(sticker.metadata.price * 100) // Convert to cents
          },
          quantity: item.quantity
        }
      })
    )

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/checkout/cancel`,
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL']
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 399, // $3.99 standard shipping
              currency: 'usd'
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5
              },
              maximum: {
                unit: 'business_day',
                value: 7
              }
            }
          }
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 799, // $7.99 express shipping
              currency: 'usd'
            },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2
              },
              maximum: {
                unit: 'business_day',
                value: 3
              }
            }
          }
        }
      ]
    })

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
'use client'

import Link from 'next/link'
import { Sticker } from '@/types'
import { useCart } from '@/lib/cart'

interface ProductCardProps {
  sticker: Sticker;
}

export default function ProductCard({ sticker }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      id: sticker.id,
      slug: sticker.slug,
      name: sticker.metadata?.name || sticker.title,
      price: sticker.metadata?.price || 0,
      quantity: 1, // Add the missing quantity property
      image: sticker.metadata?.product_images?.[0]?.imgix_url,
      size: sticker.metadata?.size,
      material: sticker.metadata?.material?.value,
    })
  }

  const primaryImage = sticker.metadata?.product_images?.[0]
  const imageUrl = primaryImage?.imgix_url 
    ? `${primaryImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`
    : '/placeholder-sticker.jpg'

  return (
    <Link href={`/stickers/${sticker.slug}`} className="group">
      <div className="bg-white rounded-lg border hover:shadow-lg transition-shadow duration-200">
        <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={sticker.metadata?.name || sticker.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            {sticker.metadata?.name || sticker.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {sticker.metadata?.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-primary">
              ${sticker.metadata?.price?.toFixed(2)}
            </span>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {sticker.metadata?.size && (
                <span>{sticker.metadata.size}</span>
              )}
              
              {sticker.metadata?.material?.value && (
                <>
                  {sticker.metadata?.size && <span>•</span>}
                  <span>{sticker.metadata.material.value}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {sticker.metadata?.waterproof && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Waterproof
                </span>
              )}
              
              {sticker.metadata?.in_stock && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  In Stock
                </span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
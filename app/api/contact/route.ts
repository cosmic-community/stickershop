import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message }: ContactFormData = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Send notification email to tony@cosmicjs.com
    const notificationEmail = await resend.emails.send({
      from: 'StickerShop <tony@cosmicjs.com>',
      to: ['tony@cosmicjs.com'],
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #374151; }
              .value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; border-left: 4px solid #3b82f6; }
              .message-value { min-height: 100px; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
                <p>You've received a new message from your StickerShop contact form.</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value message-value">${message}</div>
                </div>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 14px; color: #6b7280;">
                  This message was sent from your StickerShop contact form.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    // Send confirmation email to the sender
    const confirmationEmail = await resend.emails.send({
      from: 'StickerShop <tony@cosmicjs.com>',
      to: [email],
      subject: 'Thank you for contacting StickerShop!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Thank you for your message</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #3b82f6; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
              .summary { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
              .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .footer { font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">StickerShop</div>
                <h1>Thank You for Your Message!</h1>
                <p>We've received your contact form submission and will get back to you soon.</p>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                
                <p>Thank you for reaching out to us! We've received your message about "<strong>${subject}</strong>" and appreciate you taking the time to contact us.</p>
                
                <div class="summary">
                  <h3>Your Message Summary:</h3>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap; background-color: #f3f4f6; padding: 15px; border-radius: 4px;">${message}</p>
                </div>
                
                <p>Our team typically responds to inquiries within 24-48 hours during business days. If your message is urgent, please don't hesitate to call us at <strong>+1 (555) 123-4567</strong>.</p>
                
                <a href="https://stickershop.com" class="button">Visit Our Store</a>
                
                <p>In the meantime, feel free to browse our latest sticker collections and find your perfect design!</p>
                
                <p>Best regards,<br>
                The StickerShop Team</p>
                
                <div class="footer">
                  <p><strong>StickerShop</strong><br>
                  123 Sticker Street, Design City, DC 12345<br>
                  Email: tony@cosmicjs.com | Phone: +1 (555) 123-4567</p>
                  
                  <p>This is an automated confirmation email. Please do not reply to this message.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    console.log('Notification email sent:', notificationEmail.data?.id)
    console.log('Confirmation email sent:', confirmationEmail.data?.id)

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    })

  } catch (error) {
    console.error('Error sending contact email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
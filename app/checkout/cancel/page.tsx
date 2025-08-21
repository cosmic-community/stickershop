'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'

export default function CheckoutCancel() {
  const { toggleCart } = useCart()

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Cancel Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Checkout Cancelled
        </h1>
        
        <p className="text-gray-600 mb-8">
          No worries! Your items are still in your cart. You can complete your purchase anytime.
        </p>

        <div className="space-y-3">
          <button
            onClick={toggleCart}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            View Cart
          </button>
          
          <Link 
            href="/stickers"
            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-block"
          >
            Continue Shopping
          </Link>
          
          <Link 
            href="/"
            className="w-full text-gray-500 py-2 px-6 hover:text-gray-700 transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help with checkout?</p>
          <a href="mailto:support@stickershop.com" className="text-primary hover:underline">
            Contact us at support@stickershop.com
          </a>
        </div>
      </div>
    </div>
  )
}
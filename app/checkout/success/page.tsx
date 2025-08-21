'use client'

import { useEffect, Suspense } from 'react'
import { useCart } from '@/lib/cart'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function CheckoutSuccessContent() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get('session_id')

  useEffect(() => {
    // Clear the cart after successful payment
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been confirmed and we'll send you a tracking number once your stickers ship.
        </p>

        {sessionId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              <strong>Order ID:</strong> {sessionId}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link 
            href="/stickers"
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block"
          >
            Continue Shopping
          </Link>
          
          <Link 
            href="/"
            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Questions about your order?</p>
          <a href="mailto:support@stickershop.com" className="text-primary hover:underline">
            Contact us at support@stickershop.com
          </a>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Loading...
        </h1>
      </div>
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
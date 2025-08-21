'use client'

import Link from 'next/link'
import { Sticker } from '@/types'
import { useCart } from '@/lib/cart'
import { useState } from 'react'

interface ProductCardProps {
  sticker: Sticker
}

export default function ProductCard({ sticker }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    e.stopPropagation()
    
    if (!sticker.metadata.price || !sticker.metadata.in_stock) return

    setIsAdding(true)

    const cartItem = {
      id: sticker.id,
      slug: sticker.slug,
      name: sticker.metadata.name || sticker.title,
      price: sticker.metadata.price,
      image: sticker.metadata.product_images?.[0]?.imgix_url,
      size: sticker.metadata.size,
      material: sticker.metadata.material?.value
    }

    addItem(cartItem)

    // Brief loading state for better UX
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  const primaryImage = sticker.metadata.product_images?.[0]

  return (
    <Link href={`/stickers/${sticker.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          {primaryImage ? (
            <img
              src={`${primaryImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={sticker.metadata.name || sticker.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
            {sticker.metadata.name || sticker.title}
          </h3>
          
          {sticker.metadata.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {sticker.metadata.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-3">
            {sticker.metadata.price && (
              <span className="text-lg font-bold text-gray-900">
                ${sticker.metadata.price.toFixed(2)}
              </span>
            )}

            {sticker.metadata.material && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {sticker.metadata.material.value}
              </span>
            )}
          </div>

          {/* Product Features */}
          <div className="flex items-center space-x-2 mb-3">
            {sticker.metadata.size && (
              <span className="text-xs text-gray-500">
                {sticker.metadata.size}
              </span>
            )}
            
            {sticker.metadata.waterproof && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                Waterproof
              </span>
            )}
          </div>

          {/* Stock Status & Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {sticker.metadata.in_stock ? (
                <span className="text-green-600 text-xs font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  In Stock
                </span>
              ) : (
                <span className="text-red-600 text-xs font-medium flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                  Out of Stock
                </span>
              )}
            </div>

            {sticker.metadata.in_stock && sticker.metadata.price && (
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="bg-primary text-white px-3 py-1.5 text-xs font-medium rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
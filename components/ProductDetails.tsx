'use client'

import { Sticker } from '@/types'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import ProductImageGallery from './ProductImageGallery'

interface ProductDetailsProps {
  sticker: Sticker
}

export default function ProductDetails({ sticker }: ProductDetailsProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = async () => {
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

    // Add the specified quantity to cart
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem)
    }

    // Brief loading state for better UX
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div>
        <ProductImageGallery 
          images={sticker.metadata.product_images || []}
          alt={sticker.metadata.name || sticker.title}
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {sticker.metadata.name || sticker.title}
        </h1>

        {sticker.metadata.price && (
          <div className="text-3xl font-bold text-primary mb-6">
            ${sticker.metadata.price.toFixed(2)}
          </div>
        )}

        {sticker.metadata.description && (
          <div className="prose prose-gray max-w-none mb-6">
            <p className="text-gray-600 leading-relaxed">
              {sticker.metadata.description}
            </p>
          </div>
        )}

        {/* Product Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {sticker.metadata.size && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">Size</h4>
              <p className="text-gray-600">{sticker.metadata.size}</p>
            </div>
          )}

          {sticker.metadata.material && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">Material</h4>
              <p className="text-gray-600">{sticker.metadata.material.value}</p>
            </div>
          )}

          {typeof sticker.metadata.waterproof === 'boolean' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">Waterproof</h4>
              <p className="text-gray-600">
                {sticker.metadata.waterproof ? 'Yes' : 'No'}
              </p>
            </div>
          )}

          {sticker.metadata.category && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">Category</h4>
              <p className="text-gray-600">{sticker.metadata.category.metadata?.name}</p>
            </div>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center mb-6">
          {sticker.metadata.in_stock ? (
            <span className="text-green-600 font-medium flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              In Stock
            </span>
          ) : (
            <span className="text-red-600 font-medium flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              Out of Stock
            </span>
          )}
        </div>

        {/* Add to Cart Section */}
        {sticker.metadata.in_stock && sticker.metadata.price && (
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="font-medium text-gray-900">
                Quantity:
              </label>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 border-r hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-3 py-2 text-center border-0 focus:ring-0"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 border-l hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-primary text-white py-4 px-8 rounded-lg font-medium text-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isAdding ? 'Adding to Cart...' : `Add ${quantity} to Cart`}
            </button>

            <p className="text-sm text-gray-500 text-center">
              Free shipping on orders over $25
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { Sticker } from '@/types'
import ProductImageGallery from './ProductImageGallery'

interface ProductDetailsProps {
  sticker: Sticker;
}

export default function ProductDetails({ sticker }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem, setOpen } = useCart()

  const handleAddToCart = () => {
    const cartItem = {
      id: sticker.id,
      slug: sticker.slug,
      name: sticker.metadata?.name || sticker.title,
      price: sticker.metadata?.price || 0,
      quantity,
      image: sticker.metadata?.product_images?.[0]?.imgix_url,
      size: sticker.metadata?.size,
      material: sticker.metadata?.material?.value,
    }

    addItem(cartItem)
    setOpen(true)
  }

  const isInStock = sticker.metadata?.in_stock ?? true
  const price = sticker.metadata?.price || 0

  return (
    <div className="py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <ProductImageGallery 
              images={sticker.metadata?.product_images || []}
              alt={sticker.metadata?.name || sticker.title}
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {sticker.metadata?.name || sticker.title}
            </h1>
            
            <p className="text-2xl font-semibold text-primary mb-6">
              ${price.toFixed(2)}
            </p>
            
            {sticker.metadata?.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{sticker.metadata.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              {sticker.metadata?.size && (
                <div>
                  <span className="font-semibold text-gray-900">Size:</span>
                  <span className="text-gray-600 ml-1">{sticker.metadata.size}</span>
                </div>
              )}
              
              {sticker.metadata?.material && (
                <div>
                  <span className="font-semibold text-gray-900">Material:</span>
                  <span className="text-gray-600 ml-1">{sticker.metadata.material.value}</span>
                </div>
              )}
              
              {typeof sticker.metadata?.waterproof === 'boolean' && (
                <div>
                  <span className="font-semibold text-gray-900">Waterproof:</span>
                  <span className="text-gray-600 ml-1">
                    {sticker.metadata.waterproof ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
              
              <div>
                <span className="font-semibold text-gray-900">Stock:</span>
                <span className={`ml-1 ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                  {isInStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={!isInStock}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isInStock
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isInStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
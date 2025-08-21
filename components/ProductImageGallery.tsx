'use client'

import { useState } from 'react'
import { Sticker } from '@/types'

export interface ProductImageGalleryProps {
  sticker: Sticker;
}

export default function ProductImageGallery({ sticker }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  
  const images = sticker.metadata?.product_images || []

  if (!images.length) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main image display */}
      <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${images[selectedImage]?.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={sticker.metadata?.name || sticker.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index 
                  ? 'border-primary' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={`${sticker.metadata?.name || sticker.title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
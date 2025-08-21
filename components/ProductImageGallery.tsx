'use client'

import { useState } from 'react'
import { Sticker } from '@/types'

interface ProductImageGalleryProps {
  sticker: Sticker;
}

export default function ProductImageGallery({ sticker }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  const images = sticker.metadata?.product_images || []
  
  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg"></div>
          <p>No images available</p>
        </div>
      </div>
    )
  }
  
  const selectedImage = images[selectedImageIndex]
  
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${selectedImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
          alt={sticker.metadata?.name || sticker.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImageIndex === index
                  ? 'border-primary'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${sticker.metadata?.name || sticker.title} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
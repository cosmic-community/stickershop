'use client'

import { useState } from 'react'
import { ProductImageGalleryProps } from '@/types'

export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    )
  }

  const currentImage = images[currentImageIndex]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={`${currentImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Navigation (only show if more than one image) */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImageIndex 
                  ? 'border-primary' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={`${alt} - View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
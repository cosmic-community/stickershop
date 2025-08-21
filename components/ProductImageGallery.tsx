'use client'

import { useState } from 'react'
import { ProductImageGalleryProps } from '@/types'

export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Handle empty images array
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    )
  }

  const currentImage = images[currentImageIndex]

  // Add safety check for currentImage - this fixes the TypeScript error
  if (!currentImage) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Image not available</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main image display */}
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={`${currentImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Image thumbnails - only show if there are multiple images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? 'border-primary shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={`${alt} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
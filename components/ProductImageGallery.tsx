'use client'

import { useState } from 'react'
import { ProductImageGalleryProps } from '@/types'

export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${images[currentImage]?.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImage ? 'border-primary' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=150&h=150&fit=crop&auto=format,compress`}
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
'use client'

import { useState } from 'react'

interface ProductImage {
  url: string;
  imgix_url: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Handle case where images array is empty or undefined
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  const selectedImage = images[selectedIndex]

  // Add safety check for selectedImage
  if (!selectedImage) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Image not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={`${selectedImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail navigation - only show if more than one image */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                index === selectedIndex
                  ? 'border-primary'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
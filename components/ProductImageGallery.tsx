'use client'

import { Sticker } from '@/types'
import { useState } from 'react'

interface ProductImageGalleryProps {
  sticker: Sticker;
}

export default function ProductImageGallery({ sticker }: ProductImageGalleryProps) {
  const images = sticker.metadata?.product_images || [];
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={`${images[selectedImage].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
          alt={sticker.metadata?.name || sticker.title}
          className="w-full h-full object-cover"
          width="400"
          height="400"
        />
      </div>
      
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                index === selectedImage ? 'border-primary' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${sticker.metadata?.name || sticker.title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
                width="100"
                height="100"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
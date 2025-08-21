import { Sticker } from '@/types'
import Link from 'next/link'

interface ProductDetailsProps {
  sticker: Sticker;
}

export default function ProductDetails({ sticker }: ProductDetailsProps) {
  const price = sticker.metadata?.price;
  const material = sticker.metadata?.material;
  const size = sticker.metadata?.size;
  const isWaterproof = sticker.metadata?.waterproof;
  const isInStock = sticker.metadata?.in_stock;
  const category = sticker.metadata?.category;

  return (
    <div>
      <div className="mb-6">
        {category && (
          <Link 
            href={`/categories/${category.slug}`}
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            {category.metadata?.name || category.title}
          </Link>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
          {sticker.metadata?.name || sticker.title}
        </h1>
        
        {price && (
          <div className="text-3xl font-bold text-primary mb-6">
            ${price.toFixed(2)}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Description</h3>
        <p className="text-gray-600 leading-relaxed">
          {sticker.metadata?.description || 'High-quality premium sticker perfect for personalizing your belongings.'}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Product Details</h3>
        <div className="space-y-3">
          {size && (
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <span className="font-medium">{size}</span>
            </div>
          )}
          
          {material && (
            <div className="flex justify-between">
              <span className="text-gray-600">Material:</span>
              <span className="font-medium">{material.value}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Waterproof:</span>
            <span className="font-medium">
              {isWaterproof ? 'Yes' : 'No'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Stock Status:</span>
            <span className={`font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
              {isInStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {isWaterproof && (
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              Waterproof
            </span>
          )}
          {material?.key === 'vinyl' && (
            <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
              Durable Vinyl
            </span>
          )}
          {material?.key === 'holographic' && (
            <span className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full">
              Holographic Effect
            </span>
          )}
        </div>
        
        <button
          className={`w-full py-4 px-8 rounded-lg font-semibold transition-colors ${
            isInStock 
              ? 'bg-primary text-white hover:bg-primary-dark' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isInStock}
        >
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold mb-3">Why Choose Our Stickers?</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Premium materials that last</li>
          <li>• Easy application and removal</li>
          <li>• Fade-resistant printing</li>
          <li>• Perfect for indoor and outdoor use</li>
          <li>• 30-day satisfaction guarantee</li>
        </ul>
      </div>
    </div>
  )
}
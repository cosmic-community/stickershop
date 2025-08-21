import { Sticker } from '@/types'
import Link from 'next/link'

interface ProductCardProps {
  sticker: Sticker;
}

export default function ProductCard({ sticker }: ProductCardProps) {
  const firstImage = sticker.metadata?.product_images?.[0];
  const price = sticker.metadata?.price;
  const isInStock = sticker.metadata?.in_stock;
  const material = sticker.metadata?.material;

  return (
    <Link href={`/stickers/${sticker.slug}`} className="card hover:shadow-lg transition-shadow group">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {firstImage && (
          <img
            src={`${firstImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={sticker.metadata?.name || sticker.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width="300"
            height="300"
          />
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {sticker.metadata?.name || sticker.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {sticker.metadata?.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            {price && (
              <span className="text-xl font-bold text-primary">
                ${price.toFixed(2)}
              </span>
            )}
            {material && (
              <span className="text-sm text-gray-500 block">
                {material.value}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {sticker.metadata?.waterproof && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Waterproof
              </span>
            )}
            {isInStock ? (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
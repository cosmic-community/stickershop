import { getStickers } from '@/lib/cosmic'
import { Sticker } from '@/types'
import ProductGrid from '@/components/ProductGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Stickers - StickerShop',
  description: 'Browse our complete collection of premium stickers. Find the perfect design for your laptop, water bottle, notebook, and more.',
}

export default async function StickersPage() {
  const stickers = await getStickers() as Sticker[];

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Stickers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of premium stickers. From cute animals to cosmic designs, 
            find the perfect sticker to express your personality.
          </p>
        </div>
        
        <ProductGrid stickers={stickers} />
      </div>
    </div>
  )
}
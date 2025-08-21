import { Sticker } from '@/types'
import ProductCard from '@/components/ProductCard'

interface ProductGridProps {
  stickers: Sticker[];
}

export default function ProductGrid({ stickers }: ProductGridProps) {
  if (stickers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {stickers.map((sticker) => (
        <ProductCard key={sticker.id} sticker={sticker} />
      ))}
    </div>
  )
}
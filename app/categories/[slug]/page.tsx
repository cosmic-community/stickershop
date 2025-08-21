// app/categories/[slug]/page.tsx
import { getCategory, getStickersByCategory } from '@/lib/cosmic'
import { Category, Sticker } from '@/types'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug) as Category | null;
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata?.name || category.title} Stickers - StickerShop`,
    description: category.metadata?.description || `Browse our ${category.title} sticker collection at StickerShop`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, stickers] = await Promise.all([
    getCategory(slug),
    getStickersByCategory(slug)
  ]);

  if (!category) {
    notFound();
  }

  const categoryStickers = stickers as Sticker[];

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          {category.metadata?.category_image && (
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
              <img
                src={`${category.metadata.category_image.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
                alt={category.metadata.name || category.title}
                className="w-full h-full object-cover"
                width="128"
                height="128"
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.metadata?.name || category.title}
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {category.metadata?.description || `Explore our ${category.title} sticker collection`}
          </p>
          
          <div className="text-sm text-gray-500">
            {categoryStickers.length} sticker{categoryStickers.length !== 1 ? 's' : ''} available
          </div>
        </div>
        
        <ProductGrid stickers={categoryStickers} />
      </div>
    </div>
  )
}
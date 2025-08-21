import { getCategories } from '@/lib/cosmic'
import { Category } from '@/types'
import CategoryShowcase from '@/components/CategoryShowcase'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories - StickerShop',
  description: 'Browse sticker categories including Animals, Space, Nature, and more. Find the perfect theme for your style.',
}

export default async function CategoriesPage() {
  const categories = await getCategories() as Category[];

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated sticker categories. Each theme offers unique designs 
            perfect for expressing your personality and interests.
          </p>
        </div>
        
        <CategoryShowcase categories={categories} />
      </div>
    </div>
  )
}
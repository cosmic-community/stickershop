import { Category } from '@/types'
import Link from 'next/link'

interface CategoryShowcaseProps {
  categories: Category[];
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={`/categories/${category.slug}`}
          className="card hover:shadow-lg transition-shadow group"
        >
          <div className="aspect-video bg-gray-200 overflow-hidden">
            {category.metadata?.category_image && (
              <img
                src={`${category.metadata.category_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                alt={category.metadata.name || category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                width="300"
                height="200"
              />
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {category.metadata?.name || category.title}
            </h3>
            <p className="text-gray-600">
              {category.metadata?.description || 'Explore this category'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
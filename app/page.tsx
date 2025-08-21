import { getStickers, getCategories, getHeroContent } from '@/lib/cosmic'
import { Sticker, Category, Hero as HeroType } from '@/types'
import ProductGrid from '@/components/ProductGrid'
import CategoryShowcase from '@/components/CategoryShowcase'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [stickers, categories, heroContent] = await Promise.all([
    getStickers(),
    getCategories(),
    getHeroContent()
  ]);

  const featuredStickers = stickers.slice(0, 6) as Sticker[];
  const allCategories = categories as Category[];
  const heroData = heroContent as HeroType | null;

  return (
    <div>
      <Hero heroData={heroData} />
      
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of premium stickers organized by themes
            </p>
          </div>
          <CategoryShowcase categories={allCategories} />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular stickers, loved by customers worldwide
            </p>
          </div>
          <ProductGrid stickers={featuredStickers} />
          
          <div className="text-center mt-12">
            <a 
              href="/stickers"
              className="btn-primary inline-block"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-blue-600 text-white">
      <div className="container py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Express Yourself with Premium Stickers
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Discover unique, high-quality stickers perfect for laptops, water bottles, notebooks, and more. 
            Durable materials, creative designs, and fast shipping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/stickers"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Shop All Stickers
            </Link>
            <Link 
              href="/categories"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors text-center"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
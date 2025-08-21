import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            StickerShop
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/stickers" className="text-gray-700 hover:text-primary transition-colors">
              All Stickers
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/about-us" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/shipping-info" className="text-gray-700 hover:text-primary transition-colors">
              Shipping
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
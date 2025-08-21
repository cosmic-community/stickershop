'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'
import CartDrawer from './CartDrawer'

export default function Header() {
  const { itemCount, toggleCart } = useCart()

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
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

            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5-6M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M17 17v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8.001" />
                </svg>
                
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <div className="md:hidden">
                <button className="text-gray-700 hover:text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      
      <CartDrawer />
    </>
  )
}
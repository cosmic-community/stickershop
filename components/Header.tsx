'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import CartDrawer from './CartDrawer'

export default function Header() {
  const { itemCount, toggleCart } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <nav className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary" onClick={closeMobileMenu}>
              Peel Good
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
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Contact
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
                <ShoppingCart className="w-6 h-6" />
                
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button 
                  onClick={toggleMobileMenu}
                  className="text-gray-700 hover:text-primary"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 border-t pt-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  href="/stickers" 
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  All Stickers
                </Link>
                <Link 
                  href="/categories" 
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Categories
                </Link>
                <Link 
                  href="/about-us" 
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
                <Link 
                  href="/shipping-info" 
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Shipping
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
      
      <CartDrawer />
    </>
  )
}
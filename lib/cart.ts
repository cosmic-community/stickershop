'use client'

import { CartItem, CartState } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartStore extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === newItem.id)
          
          let updatedItems: CartItem[]
          if (existingItem) {
            updatedItems = state.items.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          } else {
            updatedItems = [...state.items, { ...newItem, quantity: 1 }]
          }

          const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)

          return {
            ...state,
            items: updatedItems,
            total,
            itemCount
          }
        })
      },

      removeItem: (id) => {
        set((state) => {
          const updatedItems = state.items.filter(item => item.id !== id)
          const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)

          return {
            ...state,
            items: updatedItems,
            total,
            itemCount
          }
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set((state) => {
          const updatedItems = state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
          const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)

          return {
            ...state,
            items: updatedItems,
            total,
            itemCount
          }
        })
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
          isOpen: false
        })
      },

      toggleCart: () => {
        set((state) => ({ ...state, isOpen: !state.isOpen }))
      },

      setCartOpen: (open) => {
        set((state) => ({ ...state, isOpen: open }))
      }
    }),
    {
      name: 'stickershop-cart',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount
      })
    }
  )
)
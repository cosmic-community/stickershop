'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartState, CartItem } from '@/types'

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      isOpen: false,
      
      addItem: (newItem: CartItem) => {
        const items = get().items
        const existingItem = items.find(item => item.id === newItem.id)
        
        if (existingItem) {
          const updatedItems = items.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
          
          set({
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          })
        } else {
          const updatedItems = [...items, newItem]
          
          set({
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          })
        }
      },
      
      removeItem: (id: string) => {
        const updatedItems = get().items.filter(item => item.id !== id)
        
        set({
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        })
      },
      
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        const updatedItems = get().items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
        
        set({
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        })
      },
      
      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
        })
      },
      
      setOpen: (isOpen: boolean) => {
        set({ isOpen })
      },
      
      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
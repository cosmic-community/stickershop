import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartState, CartItem } from '@/types'

// Helper function to calculate total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
}

// Helper function to calculate item count
const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      isOpen: false,

      addItem: (newItem: CartItem) => {
        const state = get()
        const existingItem = state.items.find((item: CartItem) => item.id === newItem.id)
        
        let updatedItems: CartItem[]
        if (existingItem) {
          updatedItems = state.items.map((item: CartItem) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        } else {
          updatedItems = [...state.items, newItem]
        }

        const total = calculateTotal(updatedItems)
        const itemCount = calculateItemCount(updatedItems)

        set({
          items: updatedItems,
          total,
          itemCount
        })
      },

      removeItem: (id: string) => {
        const state = get()
        const updatedItems = state.items.filter((item: CartItem) => item.id !== id)
        const total = updatedItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
        const itemCount = updatedItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

        set({
          items: updatedItems,
          total,
          itemCount
        })
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        const state = get()
        const updatedItems = state.items.map((item: CartItem) =>
          item.id === id ? { ...item, quantity } : item
        )
        const total = updatedItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
        const itemCount = updatedItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

        set({
          items: updatedItems,
          total,
          itemCount
        })
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0
        })
      },

      setOpen: (open: boolean) => {
        const state = get()
        set({ ...state, isOpen: open })
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
      }),
    }
  )
)
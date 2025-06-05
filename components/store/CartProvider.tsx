"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  items: CartItem[]
  total: number
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      console.log("CartReducer: 添加商品", action.payload)
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        // 商品已存在，增加數量
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) } : item,
        )
        const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        console.log("CartReducer: 更新現有商品數量", updatedItems)
        return {
          items: updatedItems,
          total: newTotal,
        }
      } else {
        // 新商品，直接添加
        const newItem = { ...action.payload, quantity: action.payload.quantity || 1 }
        const newItems = [...state.items, newItem]
        const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        console.log("CartReducer: 添加新商品", newItems)
        return {
          items: newItems,
          total: newTotal,
        }
      }
    }

    case "REMOVE_ITEM": {
      console.log("CartReducer: 移除商品", action.payload)
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return {
        items: newItems,
        total: newTotal,
      }
    }

    case "UPDATE_QUANTITY": {
      console.log("CartReducer: 更新數量", action.payload)
      const updatedItems = state.items
        .map((item) => {
          if (item.id === action.payload.id) {
            const newQuantity = Math.max(0, Math.min(99, action.payload.quantity))
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter((item) => item.quantity > 0) // 移除數量為 0 的商品

      const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return {
        items: updatedItems,
        total: newTotal,
      }
    }

    case "CLEAR_CART":
      console.log("CartReducer: 清空購物車")
      return { items: [], total: 0 }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    console.log("CartProvider: 呼叫 addItem", item)
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: string) => {
    console.log("CartProvider: 呼叫 removeItem", id)
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    console.log("CartProvider: 呼叫 updateQuantity", id, quantity)
    const validQuantity = Math.max(0, Math.min(99, quantity))
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: validQuantity } })
  }

  const clearCart = () => {
    console.log("CartProvider: 呼叫 clearCart")
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

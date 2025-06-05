"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  originalPrice?: number
  category: string
}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] }

const WishlistContext = createContext<{
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
} | null>(null)

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Don't add if already in wishlist
      if (state.items.some((item) => item.id === action.payload.id)) {
        return state
      }

      const newItems = [...state.items, action.payload]
      // Save to localStorage
      localStorage.setItem("wishlist", JSON.stringify(newItems))
      return { items: newItems }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      // Save to localStorage
      localStorage.setItem("wishlist", JSON.stringify(newItems))
      return { items: newItems }
    }

    case "CLEAR_WISHLIST": {
      // Clear localStorage
      localStorage.removeItem("wishlist")
      return { items: [] }
    }

    case "LOAD_WISHLIST": {
      return { items: action.payload }
    }

    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist")
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist)
        dispatch({ type: "LOAD_WISHLIST", payload: parsedWishlist })
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error)
    }
  }, [])

  const addItem = (item: WishlistItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const isInWishlist = (id: string) => {
    return state.items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

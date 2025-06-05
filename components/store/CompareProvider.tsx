"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { useComparisonAnalytics } from "./ComparisonAnalyticsProvider"

export interface CompareItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviewCount: number
  features: string[]
  sizes?: string[]
  colors?: string[]
  inStock: boolean
}

interface CompareState {
  items: CompareItem[]
}

type CompareAction =
  | { type: "ADD_ITEM"; payload: CompareItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_COMPARE" }
  | { type: "LOAD_COMPARE"; payload: CompareItem[] }
  | { type: "LOAD_FROM_HISTORY"; payload: CompareItem[] }

const CompareContext = createContext<{
  items: CompareItem[]
  addItem: (item: CompareItem) => void
  removeItem: (id: string) => void
  clearCompare: () => void
  isInCompare: (id: string) => boolean
  canAddMore: boolean
  loadFromHistory: (items: CompareItem[]) => void
} | null>(null)

const MAX_COMPARE_ITEMS = 4

function compareReducer(state: CompareState, action: CompareAction): CompareState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Don't add if already in compare or if at max limit
      if (state.items.some((item) => item.id === action.payload.id) || state.items.length >= MAX_COMPARE_ITEMS) {
        return state
      }

      const newItems = [...state.items, action.payload]
      // Save to localStorage
      localStorage.setItem("compare", JSON.stringify(newItems))
      return { items: newItems }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      // Save to localStorage
      localStorage.setItem("compare", JSON.stringify(newItems))
      return { items: newItems }
    }

    case "CLEAR_COMPARE": {
      // Clear localStorage
      localStorage.removeItem("compare")
      return { items: [] }
    }

    case "LOAD_COMPARE": {
      return { items: action.payload }
    }

    case "LOAD_FROM_HISTORY": {
      // Load comparison from history
      localStorage.setItem("compare", JSON.stringify(action.payload))
      return { items: action.payload }
    }

    default:
      return state
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(compareReducer, { items: [] })
  const analytics = useComparisonAnalytics()

  // Load compare from localStorage on mount
  useEffect(() => {
    try {
      const savedCompare = localStorage.getItem("compare")
      if (savedCompare) {
        const parsedCompare = JSON.parse(savedCompare)
        dispatch({ type: "LOAD_COMPARE", payload: parsedCompare })
      }
    } catch (error) {
      console.error("Failed to load compare from localStorage:", error)
    }
  }, [])

  const addItem = (item: CompareItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
    // Track analytics
    if (analytics) {
      analytics.trackComparison(item.id, item.name, item.category)
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCompare = () => {
    dispatch({ type: "CLEAR_COMPARE" })
  }

  const isInCompare = (id: string) => {
    return state.items.some((item) => item.id === id)
  }

  const canAddMore = state.items.length < MAX_COMPARE_ITEMS

  const loadFromHistory = (items: CompareItem[]) => {
    dispatch({ type: "LOAD_FROM_HISTORY", payload: items })
  }

  return (
    <CompareContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearCompare,
        isInCompare,
        canAddMore,
        loadFromHistory,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}

"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface ProductAnalytics {
  productId: string
  productName: string
  compareCount: number
  lastCompared: string
}

export interface ComparisonAnalytics {
  totalComparisons: number
  popularProducts: ProductAnalytics[]
  comparisonsByCategory: Record<string, number>
  averageComparisonSize: number
}

interface AnalyticsState {
  analytics: ComparisonAnalytics
}

type AnalyticsAction =
  | { type: "TRACK_COMPARISON"; payload: { productId: string; productName: string; category: string } }
  | { type: "LOAD_ANALYTICS"; payload: ComparisonAnalytics }

const ComparisonAnalyticsContext = createContext<{
  analytics: ComparisonAnalytics
  trackComparison: (productId: string, productName: string, category: string) => void
  getPopularProducts: () => ProductAnalytics[]
  getCategoryStats: () => Array<{ category: string; count: number }>
} | null>(null)

const defaultAnalytics: ComparisonAnalytics = {
  totalComparisons: 0,
  popularProducts: [],
  comparisonsByCategory: {},
  averageComparisonSize: 0,
}

function analyticsReducer(state: AnalyticsState, action: AnalyticsAction): AnalyticsState {
  switch (action.type) {
    case "TRACK_COMPARISON": {
      const { productId, productName, category } = action.payload
      const existingProduct = state.analytics.popularProducts.find((p) => p.productId === productId)

      let updatedProducts: ProductAnalytics[]
      if (existingProduct) {
        updatedProducts = state.analytics.popularProducts.map((p) =>
          p.productId === productId
            ? { ...p, compareCount: p.compareCount + 1, lastCompared: new Date().toISOString() }
            : p,
        )
      } else {
        updatedProducts = [
          ...state.analytics.popularProducts,
          {
            productId,
            productName,
            compareCount: 1,
            lastCompared: new Date().toISOString(),
          },
        ]
      }

      const updatedAnalytics: ComparisonAnalytics = {
        totalComparisons: state.analytics.totalComparisons + 1,
        popularProducts: updatedProducts.sort((a, b) => b.compareCount - a.compareCount).slice(0, 10),
        comparisonsByCategory: {
          ...state.analytics.comparisonsByCategory,
          [category]: (state.analytics.comparisonsByCategory[category] || 0) + 1,
        },
        averageComparisonSize: state.analytics.averageComparisonSize, // This would be calculated differently in a real app
      }

      localStorage.setItem("comparisonAnalytics", JSON.stringify(updatedAnalytics))
      return { analytics: updatedAnalytics }
    }

    case "LOAD_ANALYTICS": {
      return { analytics: action.payload }
    }

    default:
      return state
  }
}

export function ComparisonAnalyticsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(analyticsReducer, { analytics: defaultAnalytics })

  useEffect(() => {
    try {
      const savedAnalytics = localStorage.getItem("comparisonAnalytics")
      if (savedAnalytics) {
        const parsedAnalytics = JSON.parse(savedAnalytics)
        dispatch({ type: "LOAD_ANALYTICS", payload: parsedAnalytics })
      }
    } catch (error) {
      console.error("Failed to load comparison analytics:", error)
    }
  }, [])

  const trackComparison = (productId: string, productName: string, category: string) => {
    dispatch({ type: "TRACK_COMPARISON", payload: { productId, productName, category } })
  }

  const getPopularProducts = () => {
    return state.analytics.popularProducts
  }

  const getCategoryStats = () => {
    return Object.entries(state.analytics.comparisonsByCategory).map(([category, count]) => ({
      category,
      count,
    }))
  }

  return (
    <ComparisonAnalyticsContext.Provider
      value={{
        analytics: state.analytics,
        trackComparison,
        getPopularProducts,
        getCategoryStats,
      }}
    >
      {children}
    </ComparisonAnalyticsContext.Provider>
  )
}

export function useComparisonAnalytics() {
  const context = useContext(ComparisonAnalyticsContext)
  if (!context) {
    throw new Error("useComparisonAnalytics must be used within a ComparisonAnalyticsProvider")
  }
  return context
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useMemo } from "react"
import { mockProducts } from "@/lib/mock-data"

interface AIRecommendation {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  features: string[]
  inStock: boolean
  sizes?: string[]
  colors?: string[]
  confidence: number
  reason: string
}

interface AIRecommendationsContextType {
  recommendations: AIRecommendation[]
  isLoading: boolean
  generateRecommendations: (currentItems: any[]) => void
  refreshRecommendations: () => void
}

const AIRecommendationsContext = createContext<AIRecommendationsContextType | undefined>(undefined)

export function AIRecommendationsProvider({ children }: { children: React.ReactNode }) {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generateRecommendations = useCallback(async (currentItems: any[]) => {
    if (currentItems.length === 0) {
      setRecommendations([])
      return
    }

    setIsLoading(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // AI Algorithm for recommendations
    const currentCategories = currentItems.map((item) => item.category)
    const currentPriceRange = {
      min: Math.min(...currentItems.map((item) => item.price)),
      max: Math.max(...currentItems.map((item) => item.price)),
    }
    const currentFeatures = Array.from(new Set(currentItems.flatMap((item) => item.features || [])))
    const currentIds = currentItems.map((item) => item.id)

    const candidateProducts = mockProducts.filter((product) => !currentIds.includes(product.id))

    const scoredRecommendations = candidateProducts.map((product) => {
      let score = 0
      const reasons = []

      // Category matching (40% weight)
      if (currentCategories.includes(product.category)) {
        score += 40
        reasons.push(`同類別商品 (${product.category})`)
      }

      // Price range similarity (25% weight)
      const priceInRange = product.price >= currentPriceRange.min * 0.7 && product.price <= currentPriceRange.max * 1.3
      if (priceInRange) {
        score += 25
        reasons.push("價格範圍相似")
      }

      // Feature overlap (20% weight)
      const featureOverlap = product.features?.filter((feature) => currentFeatures.includes(feature)).length || 0
      if (featureOverlap > 0) {
        score += (featureOverlap / Math.max(currentFeatures.length, 1)) * 20
        reasons.push(`共同特色 (${featureOverlap} 項)`)
      }

      // Rating similarity (10% weight)
      const avgRating = currentItems.reduce((sum, item) => sum + item.rating, 0) / currentItems.length
      const ratingDiff = Math.abs(product.rating - avgRating)
      if (ratingDiff <= 0.5) {
        score += 10
        reasons.push("評分相近")
      }

      // Quality bonus (5% weight)
      if (product.rating >= 4.0 && product.inStock) {
        score += 5
        reasons.push("高評分且有庫存")
      }

      return {
        ...product,
        confidence: Math.min(Math.round(score), 95),
        reason: reasons.length > 0 ? reasons.join("、") : "AI 推薦的相關商品",
      }
    })

    // Sort by confidence and take top 6
    const topRecommendations = scoredRecommendations
      .filter((item) => item.confidence > 20)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 6)

    setRecommendations(topRecommendations)
    setIsLoading(false)
  }, [])

  const refreshRecommendations = useCallback(() => {
    // Trigger a refresh of recommendations
    setRecommendations((prev) => [...prev].sort(() => Math.random() - 0.5))
  }, [])

  const value = useMemo(
    () => ({
      recommendations,
      isLoading,
      generateRecommendations,
      refreshRecommendations,
    }),
    [recommendations, isLoading, generateRecommendations, refreshRecommendations],
  )

  return <AIRecommendationsContext.Provider value={value}>{children}</AIRecommendationsContext.Provider>
}

export function useAIRecommendations() {
  const context = useContext(AIRecommendationsContext)
  if (context === undefined) {
    throw new Error("useAIRecommendations must be used within an AIRecommendationsProvider")
  }
  return context
}

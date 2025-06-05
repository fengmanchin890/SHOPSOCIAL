"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface FeedbackData {
  recommendationId: string
  productId: string
  userId: string
  rating: number // 1-5 stars
  feedback: "helpful" | "not_helpful" | "irrelevant" | "already_owned"
  comment?: string
  timestamp: number
  context: {
    page: string
    position: number
    algorithm: string
  }
}

interface RecommendationMetrics {
  totalRecommendations: number
  totalFeedback: number
  averageRating: number
  helpfulPercentage: number
  clickThroughRate: number
  conversionRate: number
  algorithmPerformance: Record<
    string,
    {
      accuracy: number
      userSatisfaction: number
      clickRate: number
    }
  >
}

interface RecommendationFeedbackContextType {
  feedbackData: FeedbackData[]
  metrics: RecommendationMetrics
  submitFeedback: (feedback: Omit<FeedbackData, "timestamp">) => void
  getFeedbackForRecommendation: (recommendationId: string) => FeedbackData[]
  getAlgorithmPerformance: () => Record<string, number>
  improveRecommendations: () => void
  exportFeedbackData: () => void
  getPersonalizedInsights: () => Array<{
    type: string
    message: string
    actionable: boolean
  }>
}

const RecommendationFeedbackContext = createContext<RecommendationFeedbackContextType | undefined>(undefined)

export function RecommendationFeedbackProvider({ children }: { children: React.ReactNode }) {
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([])
  const [metrics, setMetrics] = useState<RecommendationMetrics>({
    totalRecommendations: 1247,
    totalFeedback: 389,
    averageRating: 3.8,
    helpfulPercentage: 72.5,
    clickThroughRate: 15.3,
    conversionRate: 4.2,
    algorithmPerformance: {
      collaborative_filtering: {
        accuracy: 0.78,
        userSatisfaction: 3.9,
        clickRate: 16.2,
      },
      content_based: {
        accuracy: 0.71,
        userSatisfaction: 3.6,
        clickRate: 14.1,
      },
      hybrid: {
        accuracy: 0.85,
        userSatisfaction: 4.1,
        clickRate: 18.7,
      },
      ai_neural: {
        accuracy: 0.89,
        userSatisfaction: 4.3,
        clickRate: 21.4,
      },
    },
  })

  const submitFeedback = (feedback: Omit<FeedbackData, "timestamp">) => {
    const newFeedback: FeedbackData = {
      ...feedback,
      timestamp: Date.now(),
    }

    setFeedbackData((prev) => [...prev, newFeedback])

    // 更新指標
    updateMetrics(newFeedback)

    // 觸發推薦算法改進
    improveRecommendations()
  }

  const updateMetrics = (newFeedback: FeedbackData) => {
    setMetrics((prev) => {
      const totalFeedback = prev.totalFeedback + 1
      const newAverageRating = (prev.averageRating * prev.totalFeedback + newFeedback.rating) / totalFeedback

      const helpfulCount =
        feedbackData.filter((f) => f.feedback === "helpful").length + (newFeedback.feedback === "helpful" ? 1 : 0)
      const helpfulPercentage = (helpfulCount / totalFeedback) * 100

      // 更新算法性能
      const algorithmPerformance = { ...prev.algorithmPerformance }
      const algorithm = newFeedback.context.algorithm
      if (algorithmPerformance[algorithm]) {
        const current = algorithmPerformance[algorithm]
        algorithmPerformance[algorithm] = {
          ...current,
          userSatisfaction: (current.userSatisfaction + newFeedback.rating) / 2,
          accuracy:
            newFeedback.feedback === "helpful"
              ? Math.min(current.accuracy + 0.01, 1)
              : Math.max(current.accuracy - 0.005, 0),
        }
      }

      return {
        ...prev,
        totalFeedback,
        averageRating: newAverageRating,
        helpfulPercentage,
        algorithmPerformance,
      }
    })
  }

  const getFeedbackForRecommendation = (recommendationId: string): FeedbackData[] => {
    return feedbackData.filter((f) => f.recommendationId === recommendationId)
  }

  const getAlgorithmPerformance = (): Record<string, number> => {
    return Object.entries(metrics.algorithmPerformance).reduce(
      (acc, [algorithm, performance]) => {
        acc[algorithm] = (performance.accuracy + performance.userSatisfaction / 5 + performance.clickRate / 100) / 3
        return acc
      },
      {} as Record<string, number>,
    )
  }

  const improveRecommendations = () => {
    // 基於反饋數據改進推薦算法
    console.log("正在基於用戶反饋改進推薦算法...")

    // 分析反饋模式
    const recentFeedback = feedbackData.filter(
      (f) => Date.now() - f.timestamp < 7 * 24 * 60 * 60 * 1000, // 最近7天
    )

    // 識別表現不佳的算法
    const poorPerformingAlgorithms = Object.entries(metrics.algorithmPerformance)
      .filter(([_, performance]) => performance.userSatisfaction < 3.5)
      .map(([algorithm]) => algorithm)

    if (poorPerformingAlgorithms.length > 0) {
      console.log(`需要改進的算法: ${poorPerformingAlgorithms.join(", ")}`)
    }

    // 調整算法權重
    setMetrics((prev) => ({
      ...prev,
      algorithmPerformance: Object.entries(prev.algorithmPerformance).reduce(
        (acc, [algorithm, performance]) => {
          if (poorPerformingAlgorithms.includes(algorithm)) {
            acc[algorithm] = {
              ...performance,
              accuracy: Math.min(performance.accuracy + 0.02, 1),
            }
          } else {
            acc[algorithm] = performance
          }
          return acc
        },
        {} as typeof prev.algorithmPerformance,
      ),
    }))
  }

  const exportFeedbackData = () => {
    const exportData = {
      feedbackData,
      metrics,
      exportTime: new Date().toISOString(),
      summary: {
        totalFeedback: feedbackData.length,
        averageRating: feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length,
        feedbackDistribution: feedbackData.reduce(
          (acc, f) => {
            acc[f.feedback] = (acc[f.feedback] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ),
      },
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `recommendation-feedback-${Date.now()}.json`
    a.click()
  }

  const getPersonalizedInsights = () => {
    const insights = []

    // 分析用戶反饋模式
    const userFeedback = feedbackData.filter((f) => f.userId === "current-user")

    if (userFeedback.length > 0) {
      const averageRating = userFeedback.reduce((sum, f) => sum + f.rating, 0) / userFeedback.length

      if (averageRating < 3) {
        insights.push({
          type: "recommendation_quality",
          message: "您的推薦評分較低，我們正在調整算法以提供更符合您喜好的推薦",
          actionable: true,
        })
      }

      const helpfulCount = userFeedback.filter((f) => f.feedback === "helpful").length
      const helpfulRate = helpfulCount / userFeedback.length

      if (helpfulRate > 0.8) {
        insights.push({
          type: "recommendation_success",
          message: "您對我們的推薦很滿意！我們會繼續為您提供個性化推薦",
          actionable: false,
        })
      }
    }

    // 算法性能洞察
    const bestAlgorithm = Object.entries(metrics.algorithmPerformance).sort(
      ([, a], [, b]) => b.userSatisfaction - a.userSatisfaction,
    )[0]

    if (bestAlgorithm) {
      insights.push({
        type: "algorithm_optimization",
        message: `${bestAlgorithm[0]} 算法為您提供了最佳的推薦體驗`,
        actionable: false,
      })
    }

    return insights
  }

  return (
    <RecommendationFeedbackContext.Provider
      value={{
        feedbackData,
        metrics,
        submitFeedback,
        getFeedbackForRecommendation,
        getAlgorithmPerformance,
        improveRecommendations,
        exportFeedbackData,
        getPersonalizedInsights,
      }}
    >
      {children}
    </RecommendationFeedbackContext.Provider>
  )
}

export function useRecommendationFeedback() {
  const context = useContext(RecommendationFeedbackContext)
  if (context === undefined) {
    throw new Error("useRecommendationFeedback must be used within a RecommendationFeedbackProvider")
  }
  return context
}

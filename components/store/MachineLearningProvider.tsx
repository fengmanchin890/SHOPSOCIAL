"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface UserBehaviorData {
  userId: string
  sessionId: string
  actions: MLAction[]
  preferences: UserPreferences
  demographics: UserDemographics
}

interface MLAction {
  type: "view" | "click" | "purchase" | "search" | "compare" | "wishlist" | "voice_command"
  productId?: string
  category?: string
  searchQuery?: string
  timestamp: number
  context: ActionContext
}

interface ActionContext {
  page: string
  device: string
  timeOfDay: number
  dayOfWeek: number
  sessionDuration: number
  previousActions: string[]
}

interface UserPreferences {
  categories: Record<string, number>
  priceRange: { min: number; max: number }
  brands: Record<string, number>
  features: Record<string, number>
  colors: Record<string, number>
  sizes: Record<string, number>
}

interface UserDemographics {
  ageGroup?: string
  gender?: string
  location?: string
  deviceType: string
  browserLanguage: string
}

interface MLModel {
  name: string
  version: string
  accuracy: number
  lastTrained: number
  trainingData: number
}

interface PredictionResult {
  type: "recommendation" | "price_prediction" | "churn_risk" | "category_preference"
  confidence: number
  value: any
  explanation: string
}

interface MachineLearningContextType {
  models: MLModel[]
  userBehavior: UserBehaviorData
  isTraining: boolean
  trainModel: (modelName: string) => Promise<void>
  recordAction: (action: Omit<MLAction, "timestamp" | "context">) => void
  getPredictions: (type: string) => PredictionResult[]
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void
  getPersonalizedRecommendations: (limit?: number) => any[]
  predictUserChurn: () => { risk: number; factors: string[] }
  optimizeSearchResults: (query: string, results: any[]) => any[]
  getModelPerformance: () => Record<string, number>
}

const MachineLearningContext = createContext<MachineLearningContextType | undefined>(undefined)

export function MachineLearningProvider({ children }: { children: React.ReactNode }) {
  const [models, setModels] = useState<MLModel[]>([
    {
      name: "recommendation_engine",
      version: "2.1.0",
      accuracy: 0.847,
      lastTrained: Date.now() - 86400000,
      trainingData: 15420,
    },
    {
      name: "price_predictor",
      version: "1.3.2",
      accuracy: 0.923,
      lastTrained: Date.now() - 172800000,
      trainingData: 8930,
    },
    {
      name: "churn_predictor",
      version: "1.1.0",
      accuracy: 0.789,
      lastTrained: Date.now() - 259200000,
      trainingData: 12340,
    },
  ])

  const [userBehavior, setUserBehavior] = useState<UserBehaviorData>({
    userId: "user-123",
    sessionId: `session-${Date.now()}`,
    actions: [],
    preferences: {
      categories: { men: 0.3, women: 0.4, accessories: 0.2, shoes: 0.1 },
      priceRange: { min: 500, max: 3000 },
      brands: {},
      features: {},
      colors: {},
      sizes: {},
    },
    demographics: {
      deviceType: typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
      browserLanguage: typeof navigator !== "undefined" ? navigator.language : "zh-TW",
    },
  })

  const [isTraining, setIsTraining] = useState(false)

  // 自動訓練模型
  useEffect(() => {
    const autoTrainInterval = setInterval(() => {
      // 檢查是否需要重新訓練模型
      models.forEach((model) => {
        const daysSinceTraining = (Date.now() - model.lastTrained) / (1000 * 60 * 60 * 24)
        if (daysSinceTraining > 7) {
          trainModel(model.name)
        }
      })
    }, 3600000) // 每小時檢查一次

    return () => clearInterval(autoTrainInterval)
  }, [models])

  const trainModel = async (modelName: string): Promise<void> => {
    setIsTraining(true)

    // 模擬訓練過程
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setModels((prev) =>
      prev.map((model) =>
        model.name === modelName
          ? {
              ...model,
              accuracy: Math.min(0.95, model.accuracy + Math.random() * 0.05),
              lastTrained: Date.now(),
              trainingData: model.trainingData + Math.floor(Math.random() * 100),
            }
          : model,
      ),
    )

    setIsTraining(false)
  }

  const recordAction = (action: Omit<MLAction, "timestamp" | "context">) => {
    const context: ActionContext = {
      page: typeof window !== "undefined" ? window.location.pathname : "",
      device: userBehavior.demographics.deviceType,
      timeOfDay: new Date().getHours(),
      dayOfWeek: new Date().getDay(),
      sessionDuration: Date.now() - Number.parseInt(userBehavior.sessionId.split("-")[1]),
      previousActions: userBehavior.actions.slice(-5).map((a) => a.type),
    }

    const fullAction: MLAction = {
      ...action,
      timestamp: Date.now(),
      context,
    }

    setUserBehavior((prev) => ({
      ...prev,
      actions: [...prev.actions, fullAction],
    }))

    // 更新用戶偏好
    updatePreferencesFromAction(fullAction)
  }

  const updatePreferencesFromAction = (action: MLAction) => {
    setUserBehavior((prev) => {
      const newPreferences = { ...prev.preferences }

      if (action.category) {
        newPreferences.categories[action.category] = (newPreferences.categories[action.category] || 0) + 0.1
      }

      return {
        ...prev,
        preferences: newPreferences,
      }
    })
  }

  const getPredictions = (type: string): PredictionResult[] => {
    const predictions: PredictionResult[] = []

    switch (type) {
      case "recommendation":
        predictions.push({
          type: "recommendation",
          confidence: 0.89,
          value: ["product-1", "product-3", "product-7"],
          explanation: "基於您的瀏覽歷史和相似用戶的行為模式",
        })
        break

      case "price_prediction":
        predictions.push({
          type: "price_prediction",
          confidence: 0.92,
          value: { trend: "下降", percentage: 15, timeframe: "7天內" },
          explanation: "歷史價格數據和市場趨勢分析",
        })
        break

      case "churn_risk":
        const churnRisk = predictUserChurn()
        predictions.push({
          type: "churn_risk",
          confidence: 0.76,
          value: churnRisk,
          explanation: "基於用戶行為模式和參與度分析",
        })
        break
    }

    return predictions
  }

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    setUserBehavior((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...preferences },
    }))
  }

  const getPersonalizedRecommendations = (limit = 6): any[] => {
    // 基於用戶偏好和行為的個性化推薦算法
    const recommendations = []
    const { categories, priceRange } = userBehavior.preferences

    // 模擬推薦算法
    for (let i = 0; i < limit; i++) {
      recommendations.push({
        id: `rec-${i}`,
        score: Math.random() * 0.3 + 0.7, // 0.7-1.0 的分數
        reason: "基於您的購買歷史和偏好",
        category: Object.keys(categories)[Math.floor(Math.random() * Object.keys(categories).length)],
      })
    }

    return recommendations.sort((a, b) => b.score - a.score)
  }

  const predictUserChurn = (): { risk: number; factors: string[] } => {
    const recentActions = userBehavior.actions.filter(
      (action) => Date.now() - action.timestamp < 7 * 24 * 60 * 60 * 1000,
    )

    const factors = []
    let risk = 0.1

    if (recentActions.length < 5) {
      risk += 0.3
      factors.push("最近活動較少")
    }

    if (!recentActions.some((action) => action.type === "purchase")) {
      risk += 0.2
      factors.push("最近沒有購買行為")
    }

    if (recentActions.filter((action) => action.type === "view").length < 10) {
      risk += 0.15
      factors.push("瀏覽頻率下降")
    }

    return { risk: Math.min(risk, 0.95), factors }
  }

  const optimizeSearchResults = (query: string, results: any[]): any[] => {
    // 基於用戶偏好優化搜索結果排序
    return results.sort((a, b) => {
      let scoreA = 0
      let scoreB = 0

      // 基於類別偏好
      if (userBehavior.preferences.categories[a.category]) {
        scoreA += userBehavior.preferences.categories[a.category]
      }
      if (userBehavior.preferences.categories[b.category]) {
        scoreB += userBehavior.preferences.categories[b.category]
      }

      // 基於價格偏好
      const { min, max } = userBehavior.preferences.priceRange
      if (a.price >= min && a.price <= max) scoreA += 0.2
      if (b.price >= min && b.price <= max) scoreB += 0.2

      return scoreB - scoreA
    })
  }

  const getModelPerformance = (): Record<string, number> => {
    return models.reduce(
      (acc, model) => {
        acc[model.name] = model.accuracy
        return acc
      },
      {} as Record<string, number>,
    )
  }

  return (
    <MachineLearningContext.Provider
      value={{
        models,
        userBehavior,
        isTraining,
        trainModel,
        recordAction,
        getPredictions,
        updateUserPreferences,
        getPersonalizedRecommendations,
        predictUserChurn,
        optimizeSearchResults,
        getModelPerformance,
      }}
    >
      {children}
    </MachineLearningContext.Provider>
  )
}

export function useMachineLearning() {
  const context = useContext(MachineLearningContext)
  if (context === undefined) {
    throw new Error("useMachineLearning must be used within a MachineLearningProvider")
  }
  return context
}

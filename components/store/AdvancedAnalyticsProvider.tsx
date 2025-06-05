"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useMemo } from "react"

interface AnalyticsData {
  pageViews: { [key: string]: number }
  userSessions: number
  conversionRate: number
  averageOrderValue: number
  topProducts: Array<{ id: string; name: string; views: number; sales: number }>
  userBehavior: {
    bounceRate: number
    sessionDuration: number
    pagesPerSession: number
  }
  salesMetrics: {
    totalRevenue: number
    totalOrders: number
    newCustomers: number
    returningCustomers: number
  }
}

interface AdvancedAnalyticsContextType {
  analyticsData: AnalyticsData
  trackPageView: (page: string) => void
  trackEvent: (event: string, data?: any) => void
  trackPurchase: (orderId: string, amount: number) => void
  generateReport: (startDate: Date, endDate: Date) => Promise<any>
  trackUserAction: (action: { type: string; target: string; metadata?: any }) => void
  trackSearchQuery: (query: string, results: number) => void
  trackProductView: (productId: string, productName: string) => void
  trackConversion: (productId: string, value: number) => void
  getInsights: () => Array<{ type: string; message: string; impact: "high" | "medium" | "low" }>
  exportAnalytics: (format: "json" | "csv") => void
}

const AdvancedAnalyticsContext = createContext<AdvancedAnalyticsContextType | undefined>(undefined)

export function AdvancedAnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: {
      "/store/home": 1250,
      "/store/products": 890,
      "/store/cart": 340,
      "/store/checkout": 180,
      "/store/analytics": 45,
    },
    userSessions: 2150,
    conversionRate: 3.2,
    averageOrderValue: 85.5,
    topProducts: [
      { id: "1", name: "Wireless Headphones", views: 450, sales: 89 },
      { id: "2", name: "Smart Watch", views: 380, sales: 67 },
      { id: "3", name: "Laptop Stand", views: 290, sales: 45 },
    ],
    userBehavior: {
      bounceRate: 35.2,
      sessionDuration: 4.5,
      pagesPerSession: 2.8,
    },
    salesMetrics: {
      totalRevenue: 15420,
      totalOrders: 180,
      newCustomers: 95,
      returningCustomers: 85,
    },
  })

  const trackPageView = useCallback((page: string) => {
    setAnalyticsData((prev) => ({
      ...prev,
      pageViews: {
        ...prev.pageViews,
        [page]: (prev.pageViews[page] || 0) + 1,
      },
    }))
  }, [])

  const trackEvent = useCallback((event: string, data?: any) => {
    console.log("Event tracked:", event, data)
    // Implementation for event tracking
  }, [])

  const trackPurchase = useCallback((orderId: string, amount: number) => {
    setAnalyticsData((prev) => ({
      ...prev,
      salesMetrics: {
        ...prev.salesMetrics,
        totalRevenue: prev.salesMetrics.totalRevenue + amount,
        totalOrders: prev.salesMetrics.totalOrders + 1,
      },
    }))
  }, [])

  const trackUserAction = useCallback((action: { type: string; target: string; metadata?: any }) => {
    console.log("User action tracked:", action)
    // Implementation for user action tracking
  }, [])

  const trackSearchQuery = useCallback((query: string, results: number) => {
    console.log("Search query tracked:", query, "Results:", results)
    // Implementation for search tracking
  }, [])

  const trackProductView = useCallback((productId: string, productName: string) => {
    console.log("Product view tracked:", productId, productName)
    // Implementation for product view tracking
  }, [])

  const trackConversion = useCallback((productId: string, value: number) => {
    console.log("Conversion tracked:", productId, "Value:", value)
    // Implementation for conversion tracking
  }, [])

  const getInsights = useCallback(() => {
    return [
      {
        type: "conversion",
        message: "Conversion rate is performing well",
        impact: "medium" as const,
      },
      {
        type: "traffic",
        message: "Mobile traffic has increased by 15%",
        impact: "high" as const,
      },
    ]
  }, [])

  const exportAnalytics = useCallback(
    (format: "json" | "csv") => {
      const data = {
        analyticsData,
        exportTime: new Date().toISOString(),
      }

      if (format === "json") {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `analytics-${Date.now()}.json`
        a.click()
        URL.revokeObjectURL(url)
      } else {
        alert("CSV export feature coming soon...")
      }
    },
    [analyticsData],
  )

  const generateReport = useCallback(
    async (startDate: Date, endDate: Date) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        period: `${startDate.toDateString()} - ${endDate.toDateString()}`,
        data: analyticsData,
      }
    },
    [analyticsData],
  )

  const contextValue = useMemo(
    () => ({
      analyticsData,
      trackPageView,
      trackEvent,
      trackPurchase,
      trackUserAction,
      trackSearchQuery,
      trackProductView,
      trackConversion,
      getInsights,
      exportAnalytics,
      generateReport,
    }),
    [
      analyticsData,
      trackPageView,
      trackEvent,
      trackPurchase,
      trackUserAction,
      trackSearchQuery,
      trackProductView,
      trackConversion,
      getInsights,
      exportAnalytics,
      generateReport,
    ],
  )

  return <AdvancedAnalyticsContext.Provider value={contextValue}>{children}</AdvancedAnalyticsContext.Provider>
}

export function useAdvancedAnalytics() {
  const context = useContext(AdvancedAnalyticsContext)
  if (context === undefined) {
    throw new Error("useAdvancedAnalytics must be used within an AdvancedAnalyticsProvider")
  }
  return context
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface PriceAlert {
  id: string
  productId: string
  productName: string
  productImage: string
  currentPrice: number
  targetPrice: number
  isActive: boolean
  createdAt: number
  triggeredAt?: number
}

interface PriceAlertsContextType {
  alerts: PriceAlert[]
  createAlert: (
    productId: string,
    productName: string,
    productImage: string,
    currentPrice: number,
    targetPrice: number,
  ) => void
  removeAlert: (alertId: string) => void
  toggleAlert: (alertId: string) => void
  getActiveAlertsCount: () => number
  getTriggeredAlerts: () => PriceAlert[]
  markAlertAsRead: (alertId: string) => void
}

const PriceAlertsContext = createContext<PriceAlertsContextType | undefined>(undefined)

export function PriceAlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])

  const createAlert = (
    productId: string,
    productName: string,
    productImage: string,
    currentPrice: number,
    targetPrice: number,
  ) => {
    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      productId,
      productName,
      productImage,
      currentPrice,
      targetPrice,
      isActive: true,
      createdAt: Date.now(),
    }

    setAlerts((prev) => [...prev, newAlert])
  }

  const removeAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const toggleAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  const getActiveAlertsCount = () => {
    return alerts.filter((alert) => alert.isActive).length
  }

  const getTriggeredAlerts = () => {
    return alerts.filter((alert) => alert.triggeredAt && !alert.triggeredAt)
  }

  const markAlertAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, triggeredAt: undefined } : alert)))
  }

  // Simulate price changes and trigger alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prev) =>
        prev.map((alert) => {
          if (!alert.isActive || alert.triggeredAt) return alert

          // Simulate price fluctuation
          const priceChange = (Math.random() - 0.5) * 0.1 // ±10%
          const newPrice = Math.max(alert.currentPrice * (1 + priceChange), 1)

          // Check if target price is reached
          if (newPrice <= alert.targetPrice) {
            // Trigger notification
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("價格提醒", {
                body: `${alert.productName} 已降至 $${newPrice.toLocaleString()}！`,
                icon: alert.productImage,
              })
            }

            return {
              ...alert,
              currentPrice: newPrice,
              triggeredAt: Date.now(),
            }
          }

          return {
            ...alert,
            currentPrice: newPrice,
          }
        }),
      )
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  return (
    <PriceAlertsContext.Provider
      value={{
        alerts,
        createAlert,
        removeAlert,
        toggleAlert,
        getActiveAlertsCount,
        getTriggeredAlerts,
        markAlertAsRead,
      }}
    >
      {children}
    </PriceAlertsContext.Provider>
  )
}

export function usePriceAlerts() {
  const context = useContext(PriceAlertsContext)
  if (context === undefined) {
    throw new Error("usePriceAlerts must be used within a PriceAlertsProvider")
  }
  return context
}

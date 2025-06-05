"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface PushNotification {
  id: string
  title: string
  body: string
  icon?: string
  badge?: string
  timestamp: number
  read: boolean
  action?: {
    type: "navigate" | "external"
    url: string
  }
}

interface OfflineData {
  products: any[]
  wishlist: any[]
  cart: any[]
  lastSync: number
}

interface AppState {
  isInstalled: boolean
  isOnline: boolean
  notifications: PushNotification[]
  offlineData: OfflineData
  appVersion: string
  updateAvailable: boolean
}

interface MobileAppContextType {
  appState: AppState
  installApp: () => void
  sendPushNotification: (notification: Omit<PushNotification, "id" | "timestamp" | "read">) => void
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
  syncOfflineData: () => void
  enableOfflineMode: () => void
  checkForUpdates: () => void
  shareContent: (content: { title: string; text: string; url: string }) => void
  addToHomeScreen: () => void
  requestNotificationPermission: () => Promise<boolean>
}

const MobileAppContext = createContext<MobileAppContextType | undefined>(undefined)

export function MobileAppProvider({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<AppState>({
    isInstalled: false,
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    notifications: [],
    offlineData: {
      products: [],
      wishlist: [],
      cart: [],
      lastSync: Date.now(),
    },
    appVersion: "1.0.0",
    updateAvailable: false,
  })

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  // 監聽 PWA 安裝事件
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const handleAppInstalled = () => {
      setAppState((prev) => ({ ...prev, isInstalled: true }))
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  // 監聽網路狀態
  useEffect(() => {
    const handleOnline = () => {
      setAppState((prev) => ({ ...prev, isOnline: true }))
      syncOfflineData()
    }

    const handleOffline = () => {
      setAppState((prev) => ({ ...prev, isOnline: false }))
      enableOfflineMode()
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // 檢查更新
  useEffect(() => {
    const checkUpdates = () => {
      // 模擬檢查更新
      const hasUpdate = Math.random() > 0.8
      setAppState((prev) => ({ ...prev, updateAvailable: hasUpdate }))
    }

    const interval = setInterval(checkUpdates, 300000) // 每5分鐘檢查一次
    return () => clearInterval(interval)
  }, [])

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setAppState((prev) => ({ ...prev, isInstalled: true }))
      }
      setDeferredPrompt(null)
    }
  }

  const sendPushNotification = (notification: Omit<PushNotification, "id" | "timestamp" | "read">) => {
    const newNotification: PushNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: Date.now(),
      read: false,
    }

    setAppState((prev) => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications],
    }))

    // 發送瀏覽器通知
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon || "/icon-192x192.png",
        badge: notification.badge || "/badge-72x72.png",
      })
    }
  }

  const markNotificationAsRead = (id: string) => {
    setAppState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    }))
  }

  const clearAllNotifications = () => {
    setAppState((prev) => ({
      ...prev,
      notifications: [],
    }))
  }

  const syncOfflineData = () => {
    // 模擬同步離線數據
    console.log("正在同步離線數據...")
    setAppState((prev) => ({
      ...prev,
      offlineData: {
        ...prev.offlineData,
        lastSync: Date.now(),
      },
    }))
  }

  const enableOfflineMode = () => {
    // 啟用離線模式，緩存重要數據
    console.log("已啟用離線模式")

    // 模擬緩存數據
    const cachedData = {
      products: [], // 從 localStorage 或 IndexedDB 獲取
      wishlist: [],
      cart: [],
      lastSync: Date.now(),
    }

    setAppState((prev) => ({
      ...prev,
      offlineData: cachedData,
    }))
  }

  const checkForUpdates = () => {
    // 檢查應用更新
    setAppState((prev) => ({
      ...prev,
      updateAvailable: Math.random() > 0.5,
    }))
  }

  const shareContent = async (content: { title: string; text: string; url: string }) => {
    if (navigator.share) {
      try {
        await navigator.share(content)
      } catch (error) {
        console.log("分享失敗:", error)
        // 降級到複製連結
        navigator.clipboard.writeText(content.url)
        alert("連結已複製到剪貼板")
      }
    } else {
      // 降級到複製連結
      navigator.clipboard.writeText(content.url)
      alert("連結已複製到剪貼板")
    }
  }

  const addToHomeScreen = () => {
    if (deferredPrompt) {
      installApp()
    } else {
      // 顯示手動添加指引
      alert("請在瀏覽器選單中選擇「添加到主畫面」")
    }
  }

  const requestNotificationPermission = async (): Promise<boolean> => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      return permission === "granted"
    }
    return false
  }

  return (
    <MobileAppContext.Provider
      value={{
        appState,
        installApp,
        sendPushNotification,
        markNotificationAsRead,
        clearAllNotifications,
        syncOfflineData,
        enableOfflineMode,
        checkForUpdates,
        shareContent,
        addToHomeScreen,
        requestNotificationPermission,
      }}
    >
      {children}
    </MobileAppContext.Provider>
  )
}

export function useMobileApp() {
  const context = useContext(MobileAppContext)
  if (context === undefined) {
    throw new Error("useMobileApp must be used within a MobileAppProvider")
  }
  return context
}

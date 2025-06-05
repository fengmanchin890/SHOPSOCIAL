"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface IoTDevice {
  id: string
  name: string
  type: "smart_fridge" | "smart_speaker" | "smart_mirror" | "smart_scale" | "smart_wardrobe"
  brand: string
  status: "online" | "offline" | "connecting"
  battery?: number
  location: string
  capabilities: string[]
  lastSync: number
}

interface AutoReplenishment {
  id: string
  deviceId: string
  productId: string
  productName: string
  threshold: number
  currentLevel: number
  autoOrderEnabled: boolean
  lastOrderDate?: number
  nextOrderDate?: number
}

interface EnvironmentalData {
  temperature: number
  humidity: number
  lightLevel: number
  airQuality: number
  noiseLevel: number
  location: string
  timestamp: number
}

interface IoTContextType {
  devices: IoTDevice[]
  autoReplenishments: AutoReplenishment[]
  environmentalData: EnvironmentalData[]
  connectDevice: (deviceType: string, deviceInfo: any) => Promise<boolean>
  disconnectDevice: (deviceId: string) => void
  syncDeviceData: (deviceId: string) => Promise<void>
  setupAutoReplenishment: (deviceId: string, productId: string, threshold: number) => void
  getEnvironmentalRecommendations: () => Array<{ type: string; message: string; products: string[] }>
  controlDevice: (deviceId: string, command: string, parameters?: any) => Promise<boolean>
  getDeviceInsights: (deviceId: string) => Array<{ metric: string; value: number; trend: "up" | "down" | "stable" }>
}

const IoTContext = createContext<IoTContextType | undefined>(undefined)

export function IoTProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: "fridge-001",
      name: "智能冰箱",
      type: "smart_fridge",
      brand: "Samsung",
      status: "online",
      location: "廚房",
      capabilities: ["inventory_tracking", "expiry_monitoring", "auto_ordering", "recipe_suggestions"],
      lastSync: Date.now() - 300000,
    },
    {
      id: "speaker-001",
      name: "智能音箱",
      type: "smart_speaker",
      brand: "Amazon Echo",
      status: "online",
      location: "客廳",
      capabilities: ["voice_control", "music_streaming", "smart_home_control", "shopping_assistant"],
      lastSync: Date.now() - 120000,
    },
    {
      id: "mirror-001",
      name: "智能魔鏡",
      type: "smart_mirror",
      brand: "HiMirror",
      status: "online",
      location: "臥室",
      capabilities: ["virtual_try_on", "skin_analysis", "outfit_suggestions", "health_monitoring"],
      lastSync: Date.now() - 600000,
    },
  ])

  const [autoReplenishments, setAutoReplenishments] = useState<AutoReplenishment[]>([
    {
      id: "auto-001",
      deviceId: "fridge-001",
      productId: "5",
      productName: "舒適棉質T恤",
      threshold: 20,
      currentLevel: 15,
      autoOrderEnabled: true,
      lastOrderDate: Date.now() - 2592000000, // 30 days ago
      nextOrderDate: Date.now() + 604800000, // 7 days from now
    },
  ])

  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData[]>([
    {
      temperature: 22.5,
      humidity: 45,
      lightLevel: 300,
      airQuality: 85,
      noiseLevel: 35,
      location: "客廳",
      timestamp: Date.now(),
    },
    {
      temperature: 24.0,
      humidity: 50,
      lightLevel: 150,
      airQuality: 90,
      noiseLevel: 25,
      location: "臥室",
      timestamp: Date.now(),
    },
  ])

  // 模擬環境數據更新
  useEffect(() => {
    const interval = setInterval(() => {
      setEnvironmentalData((prev) =>
        prev.map((data) => ({
          ...data,
          temperature: data.temperature + (Math.random() - 0.5) * 2,
          humidity: Math.max(30, Math.min(70, data.humidity + (Math.random() - 0.5) * 10)),
          lightLevel: Math.max(0, data.lightLevel + (Math.random() - 0.5) * 100),
          airQuality: Math.max(0, Math.min(100, data.airQuality + (Math.random() - 0.5) * 5)),
          noiseLevel: Math.max(0, data.noiseLevel + (Math.random() - 0.5) * 10),
          timestamp: Date.now(),
        })),
      )
    }, 30000) // 每30秒更新

    return () => clearInterval(interval)
  }, [])

  const connectDevice = async (deviceType: string, deviceInfo: any): Promise<boolean> => {
    try {
      // 模擬設備連接
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const newDevice: IoTDevice = {
        id: `${deviceType}-${Date.now()}`,
        name: deviceInfo.name || `新${deviceType}`,
        type: deviceType as any,
        brand: deviceInfo.brand || "Unknown",
        status: "online",
        location: deviceInfo.location || "未知位置",
        capabilities: getDeviceCapabilities(deviceType),
        lastSync: Date.now(),
      }

      setDevices((prev) => [...prev, newDevice])
      return true
    } catch (error) {
      console.error("設備連接失敗:", error)
      return false
    }
  }

  const disconnectDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== deviceId))
    setAutoReplenishments((prev) => prev.filter((auto) => auto.deviceId !== deviceId))
  }

  const syncDeviceData = async (deviceId: string): Promise<void> => {
    setDevices((prev) => prev.map((device) => (device.id === deviceId ? { ...device, status: "connecting" } : device)))

    // 模擬同步
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setDevices((prev) =>
      prev.map((device) => (device.id === deviceId ? { ...device, status: "online", lastSync: Date.now() } : device)),
    )
  }

  const setupAutoReplenishment = (deviceId: string, productId: string, threshold: number) => {
    const device = devices.find((d) => d.id === deviceId)
    if (!device) return

    const newAutoReplenishment: AutoReplenishment = {
      id: `auto-${Date.now()}`,
      deviceId,
      productId,
      productName: `產品 ${productId}`,
      threshold,
      currentLevel: Math.floor(Math.random() * 100),
      autoOrderEnabled: true,
    }

    setAutoReplenishments((prev) => [...prev, newAutoReplenishment])
  }

  const getEnvironmentalRecommendations = () => {
    const recommendations = []
    const latestData = environmentalData[0]

    if (latestData.temperature > 25) {
      recommendations.push({
        type: "cooling",
        message: "溫度較高，推薦透氣涼爽的服裝",
        products: ["1", "5"], // T恤等
      })
    }

    if (latestData.humidity > 60) {
      recommendations.push({
        type: "humidity",
        message: "濕度較高，建議選擇快乾材質",
        products: ["3"], // 運動鞋等
      })
    }

    if (latestData.lightLevel < 200) {
      recommendations.push({
        type: "lighting",
        message: "光線較暗，推薦亮色系商品",
        products: ["2", "4"],
      })
    }

    return recommendations
  }

  const controlDevice = async (deviceId: string, command: string, parameters?: any): Promise<boolean> => {
    const device = devices.find((d) => d.id === deviceId)
    if (!device) return false

    // 模擬設備控制
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(`控制設備 ${device.name}: ${command}`, parameters)
    return true
  }

  const getDeviceInsights = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId)
    if (!device) return []

    // 模擬設備洞察數據
    return [
      { metric: "使用頻率", value: 85, trend: "up" as const },
      { metric: "能耗效率", value: 92, trend: "stable" as const },
      { metric: "連接穩定性", value: 98, trend: "up" as const },
      { metric: "數據準確性", value: 94, trend: "stable" as const },
    ]
  }

  const getDeviceCapabilities = (deviceType: string): string[] => {
    const capabilityMap: Record<string, string[]> = {
      smart_fridge: ["inventory_tracking", "expiry_monitoring", "auto_ordering", "recipe_suggestions"],
      smart_speaker: ["voice_control", "music_streaming", "smart_home_control", "shopping_assistant"],
      smart_mirror: ["virtual_try_on", "skin_analysis", "outfit_suggestions", "health_monitoring"],
      smart_scale: ["weight_tracking", "body_composition", "health_insights", "goal_setting"],
      smart_wardrobe: ["outfit_planning", "weather_integration", "style_suggestions", "inventory_management"],
    }
    return capabilityMap[deviceType] || []
  }

  return (
    <IoTContext.Provider
      value={{
        devices,
        autoReplenishments,
        environmentalData,
        connectDevice,
        disconnectDevice,
        syncDeviceData,
        setupAutoReplenishment,
        getEnvironmentalRecommendations,
        controlDevice,
        getDeviceInsights,
      }}
    >
      {children}
    </IoTContext.Provider>
  )
}

export function useIoT() {
  const context = useContext(IoTContext)
  if (context === undefined) {
    throw new Error("useIoT must be used within an IoTProvider")
  }
  return context
}

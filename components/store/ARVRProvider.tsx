"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface ARSession {
  id: string
  isActive: boolean
  mode: "try-on" | "preview" | "room-placement"
  productId?: string
  tracking: boolean
  lighting: "auto" | "manual"
}

interface VRSession {
  id: string
  isActive: boolean
  environment: "showroom" | "home" | "store"
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}

interface Product3D {
  id: string
  modelUrl: string
  textureUrl?: string
  scale: { x: number; y: number; z: number }
  animations?: string[]
  materials?: string[]
}

interface ARVRContextType {
  isARSupported: boolean
  isVRSupported: boolean
  arSession: ARSession | null
  vrSession: VRSession | null
  products3D: Product3D[]
  startARSession: (mode: "try-on" | "preview" | "room-placement", productId?: string) => Promise<boolean>
  stopARSession: () => void
  startVRSession: (environment: "showroom" | "home" | "store") => Promise<boolean>
  stopVRSession: () => void
  captureARPhoto: () => Promise<string>
  shareARExperience: () => void
  load3DModel: (productId: string) => Promise<Product3D>
  getARFilters: () => string[]
  calibrateARTracking: () => Promise<boolean>
}

const ARVRContext = createContext<ARVRContextType | undefined>(undefined)

export function ARVRProvider({ children }: { children: React.ReactNode }) {
  const [isARSupported, setIsARSupported] = useState(false)
  const [isVRSupported, setIsVRSupported] = useState(false)
  const [arSession, setArSession] = useState<ARSession | null>(null)
  const [vrSession, setVrSession] = useState<VRSession | null>(null)
  const [products3D] = useState<Product3D[]>([
    {
      id: "1",
      modelUrl: "/models/jacket.glb",
      textureUrl: "/textures/jacket_diffuse.jpg",
      scale: { x: 1, y: 1, z: 1 },
      animations: ["idle", "showcase"],
      materials: ["fabric", "metal", "leather"],
    },
    {
      id: "2",
      modelUrl: "/models/dress.glb",
      scale: { x: 1, y: 1, z: 1 },
      animations: ["flow", "spin"],
      materials: ["silk", "cotton"],
    },
  ])

  // 檢測 AR/VR 支援
  useEffect(() => {
    const checkARSupport = async () => {
      if ("xr" in navigator) {
        try {
          const supported = await (navigator as any).xr.isSessionSupported("immersive-ar")
          setIsARSupported(supported)
        } catch (error) {
          console.log("AR 不支援:", error)
          // 模擬支援以便測試
          setIsARSupported(true)
        }
      } else {
        // 模擬支援以便測試
        setIsARSupported(true)
      }
    }

    const checkVRSupport = async () => {
      if ("xr" in navigator) {
        try {
          const supported = await (navigator as any).xr.isSessionSupported("immersive-vr")
          setIsVRSupported(supported)
        } catch (error) {
          console.log("VR 不支援:", error)
          // 模擬支援以便測試
          setIsVRSupported(true)
        }
      } else {
        // 模擬支援以便測試
        setIsVRSupported(true)
      }
    }

    checkARSupport()
    checkVRSupport()
  }, [])

  const startARSession = async (
    mode: "try-on" | "preview" | "room-placement",
    productId?: string,
  ): Promise<boolean> => {
    try {
      // 模擬 AR 會話啟動
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const session: ARSession = {
        id: `ar-${Date.now()}`,
        isActive: true,
        mode,
        productId,
        tracking: true,
        lighting: "auto",
      }

      setArSession(session)
      return true
    } catch (error) {
      console.error("AR 會話啟動失敗:", error)
      return false
    }
  }

  const stopARSession = () => {
    setArSession(null)
  }

  const startVRSession = async (environment: "showroom" | "home" | "store"): Promise<boolean> => {
    try {
      // 模擬 VR 會話啟動
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const session: VRSession = {
        id: `vr-${Date.now()}`,
        isActive: true,
        environment,
        position: { x: 0, y: 1.6, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      }

      setVrSession(session)
      return true
    } catch (error) {
      console.error("VR 會話啟動失敗:", error)
      return false
    }
  }

  const stopVRSession = () => {
    setVrSession(null)
  }

  const captureARPhoto = async (): Promise<string> => {
    if (!arSession) throw new Error("沒有活躍的 AR 會話")

    // 模擬拍照
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 返回模擬的照片 URL
    return "/placeholder.svg?height=600&width=600"
  }

  const shareARExperience = () => {
    if (!arSession) return

    const shareData = {
      title: "我的 AR 試穿體驗",
      text: "快來看看我用 AR 試穿的效果！",
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      // 降級到複製連結
      navigator.clipboard.writeText(shareData.url)
      alert("連結已複製到剪貼板")
    }
  }

  const load3DModel = async (productId: string): Promise<Product3D> => {
    const product = products3D.find((p) => p.id === productId)
    if (!product) {
      throw new Error(`找不到產品 ${productId} 的 3D 模型`)
    }

    // 模擬模型載入
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return product
  }

  const getARFilters = (): string[] => {
    return ["自然光", "室內光", "夕陽光", "霓虹光", "復古濾鏡", "黑白濾鏡"]
  }

  const calibrateARTracking = async (): Promise<boolean> => {
    // 模擬 AR 追蹤校準
    await new Promise((resolve) => setTimeout(resolve, 3000))

    if (arSession) {
      setArSession((prev) => (prev ? { ...prev, tracking: true } : null))
    }

    return true
  }

  return (
    <ARVRContext.Provider
      value={{
        isARSupported,
        isVRSupported,
        arSession,
        vrSession,
        products3D,
        startARSession,
        stopARSession,
        startVRSession,
        stopVRSession,
        captureARPhoto,
        shareARExperience,
        load3DModel,
        getARFilters,
        calibrateARTracking,
      }}
    >
      {children}
    </ARVRContext.Provider>
  )
}

export function useARVR() {
  const context = useContext(ARVRContext)
  if (context === undefined) {
    throw new Error("useARVR must be used within an ARVRProvider")
  }
  return context
}

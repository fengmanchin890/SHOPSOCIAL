"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface MembershipPlan {
  id: string
  name: string
  price: number
  duration: number // days
  features: string[]
  popular?: boolean
}

interface UserMembership {
  plan: string
  startDate: number
  endDate: number
  isActive: boolean
  isTrial: boolean
  trialUsed: boolean
}

interface MembershipContextType {
  currentMembership: UserMembership | null
  availablePlans: MembershipPlan[]
  isTrialAvailable: boolean
  isPremiumMember: boolean
  daysRemaining: number
  upgradeMembership: (planId: string, isTrial?: boolean) => Promise<boolean>
  cancelMembership: () => void
  checkFeatureAccess: (feature: string) => boolean
  getMembershipStatus: () => string
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined)

const membershipPlans: MembershipPlan[] = [
  {
    id: "trial",
    name: "7天免費試用",
    price: 0,
    duration: 7,
    features: ["體驗美食模組", "探索住宿交換", "搭訕共遊", "參加語言交流", "報名專家課程", "新增活動功能"],
  },
  {
    id: "monthly",
    name: "月費會員",
    price: 299,
    duration: 30,
    features: [
      "體驗美食模組",
      "探索住宿交換",
      "搭訕共遊",
      "參加語言交流",
      "報名專家課程",
      "新增活動功能",
      "優先客服支援",
      "專屬會員活動",
    ],
    popular: true,
  },
  {
    id: "yearly",
    name: "年費會員",
    price: 2999,
    duration: 365,
    features: [
      "體驗美食模組",
      "探索住宿交換",
      "搭訕共遊",
      "參加語言交流",
      "報名專家課程",
      "新增活動功能",
      "優先客服支援",
      "專屬會員活動",
      "年度會員禮品",
      "額外折扣優惠",
    ],
  },
]

export function MembershipProvider({ children }: { children: React.ReactNode }) {
  const [currentMembership, setCurrentMembership] = useState<UserMembership | null>(null)
  const [isTrialAvailable, setIsTrialAvailable] = useState(true)

  useEffect(() => {
    // 檢查本地存儲的會員資訊
    const savedMembership = localStorage.getItem("userMembership")
    if (savedMembership) {
      const membership = JSON.parse(savedMembership)
      setCurrentMembership(membership)
      setIsTrialAvailable(!membership.trialUsed)
    }
  }, [])

  const isPremiumMember = currentMembership?.isActive || false

  const daysRemaining = currentMembership
    ? Math.max(0, Math.ceil((currentMembership.endDate - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  const upgradeMembership = async (planId: string, isTrial = false): Promise<boolean> => {
    const plan = membershipPlans.find((p) => p.id === planId)
    if (!plan) return false

    // 模擬付款處理
    if (!isTrial && plan.price > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    const now = Date.now()
    const newMembership: UserMembership = {
      plan: planId,
      startDate: now,
      endDate: now + plan.duration * 24 * 60 * 60 * 1000,
      isActive: true,
      isTrial: isTrial,
      trialUsed: isTrial || currentMembership?.trialUsed || false,
    }

    setCurrentMembership(newMembership)
    setIsTrialAvailable(!newMembership.trialUsed)
    localStorage.setItem("userMembership", JSON.stringify(newMembership))

    return true
  }

  const cancelMembership = () => {
    if (currentMembership) {
      const cancelledMembership = {
        ...currentMembership,
        isActive: false,
      }
      setCurrentMembership(cancelledMembership)
      localStorage.setItem("userMembership", JSON.stringify(cancelledMembership))
    }
  }

  const checkFeatureAccess = (feature: string): boolean => {
    if (!currentMembership || !currentMembership.isActive) return false

    const plan = membershipPlans.find((p) => p.id === currentMembership.plan)
    return plan?.features.includes(feature) || false
  }

  const getMembershipStatus = (): string => {
    if (!currentMembership || !currentMembership.isActive) {
      return "免費用戶"
    }

    if (currentMembership.isTrial) {
      return `試用會員 (剩餘 ${daysRemaining} 天)`
    }

    const plan = membershipPlans.find((p) => p.id === currentMembership.plan)
    return `${plan?.name} (剩餘 ${daysRemaining} 天)`
  }

  return (
    <MembershipContext.Provider
      value={{
        currentMembership,
        availablePlans: membershipPlans,
        isTrialAvailable,
        isPremiumMember,
        daysRemaining,
        upgradeMembership,
        cancelMembership,
        checkFeatureAccess,
        getMembershipStatus,
      }}
    >
      {children}
    </MembershipContext.Provider>
  )
}

export function useMembership() {
  const context = useContext(MembershipContext)
  if (context === undefined) {
    throw new Error("useMembership must be used within a MembershipProvider")
  }
  return context
}

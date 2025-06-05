"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface UserLevel {
  level: number
  title: string
  xp: number
  xpToNext: number
  benefits: string[]
  icon: string
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: "shopping" | "social" | "exploration" | "loyalty"
  rarity: "common" | "rare" | "epic" | "legendary"
  points: number
  unlocked: boolean
  unlockedAt?: number
  progress?: number
  maxProgress?: number
}

interface DailyQuest {
  id: string
  title: string
  description: string
  type: "purchase" | "browse" | "review" | "share" | "login"
  target: number
  current: number
  reward: {
    xp: number
    points: number
    items?: string[]
  }
  expiresAt: number
  completed: boolean
}

interface Leaderboard {
  period: "daily" | "weekly" | "monthly" | "all-time"
  users: Array<{
    rank: number
    userId: string
    username: string
    avatar: string
    score: number
    level: number
    badge?: string
  }>
}

interface GamificationContextType {
  userLevel: UserLevel
  achievements: Achievement[]
  dailyQuests: DailyQuest[]
  leaderboards: Leaderboard[]
  totalPoints: number
  streakDays: number
  earnXP: (amount: number, source: string) => void
  earnPoints: (amount: number, source: string) => void
  completeQuest: (questId: string) => void
  unlockAchievement: (achievementId: string) => void
  getAvailableRewards: () => Array<{ id: string; name: string; cost: number; type: string }>
  redeemReward: (rewardId: string) => Promise<boolean>
  getRankingPosition: (period: "daily" | "weekly" | "monthly") => number
  getProgressToNextLevel: () => number
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [userLevel, setUserLevel] = useState<UserLevel>({
    level: 5,
    title: "時尚探索者",
    xp: 1250,
    xpToNext: 1500,
    benefits: ["5% 購物折扣", "優先客服", "專屬商品預覽", "免費快速配送"],
    icon: "🌟",
  })

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-purchase",
      name: "首次購買",
      description: "完成您的第一次購買",
      icon: "🛍️",
      category: "shopping",
      rarity: "common",
      points: 100,
      unlocked: true,
      unlockedAt: Date.now() - 2592000000,
    },
    {
      id: "fashion-explorer",
      name: "時尚探索家",
      description: "瀏覽超過 100 個商品",
      icon: "🔍",
      category: "exploration",
      rarity: "rare",
      points: 250,
      unlocked: true,
      unlockedAt: Date.now() - 1296000000,
    },
    {
      id: "social-butterfly",
      name: "社交達人",
      description: "分享 10 個商品給朋友",
      icon: "🦋",
      category: "social",
      rarity: "epic",
      points: 500,
      unlocked: false,
      progress: 7,
      maxProgress: 10,
    },
    {
      id: "loyalty-master",
      name: "忠誠大師",
      description: "連續登入 30 天",
      icon: "👑",
      category: "loyalty",
      rarity: "legendary",
      points: 1000,
      unlocked: false,
      progress: 23,
      maxProgress: 30,
    },
  ])

  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([
    {
      id: "daily-login",
      title: "每日登入",
      description: "登入獲得獎勵",
      type: "login",
      target: 1,
      current: 1,
      reward: { xp: 50, points: 25 },
      expiresAt: Date.now() + 86400000,
      completed: true,
    },
    {
      id: "browse-products",
      title: "商品瀏覽",
      description: "瀏覽 5 個不同的商品",
      type: "browse",
      target: 5,
      current: 3,
      reward: { xp: 100, points: 50 },
      expiresAt: Date.now() + 86400000,
      completed: false,
    },
    {
      id: "make-purchase",
      title: "購物任務",
      description: "完成一次購買",
      type: "purchase",
      target: 1,
      current: 0,
      reward: { xp: 200, points: 100, items: ["coupon-10"] },
      expiresAt: Date.now() + 86400000,
      completed: false,
    },
  ])

  const [leaderboards] = useState<Leaderboard[]>([
    {
      period: "weekly",
      users: [
        {
          rank: 1,
          userId: "user-1",
          username: "時尚達人",
          avatar: "/placeholder.svg?height=40&width=40",
          score: 2850,
          level: 8,
          badge: "👑",
        },
        {
          rank: 2,
          userId: "user-2",
          username: "購物專家",
          avatar: "/placeholder.svg?height=40&width=40",
          score: 2340,
          level: 7,
          badge: "🥈",
        },
        {
          rank: 3,
          userId: "user-3",
          username: "潮流先鋒",
          avatar: "/placeholder.svg?height=40&width=40",
          score: 1980,
          level: 6,
          badge: "🥉",
        },
        {
          rank: 4,
          userId: "current-user",
          username: "您",
          avatar: "/placeholder.svg?height=40&width=40",
          score: 1250,
          level: 5,
        },
        {
          rank: 5,
          userId: "user-5",
          username: "風格獵人",
          avatar: "/placeholder.svg?height=40&width=40",
          score: 1100,
          level: 5,
        },
      ],
    },
  ])

  const [totalPoints, setTotalPoints] = useState(3450)
  const [streakDays, setStreakDays] = useState(23)

  // 自動更新每日任務
  useEffect(() => {
    const checkDailyReset = () => {
      const now = Date.now()
      const needsReset = dailyQuests.some((quest) => quest.expiresAt < now)

      if (needsReset) {
        // 重置每日任務
        setDailyQuests((prev) =>
          prev.map((quest) => ({
            ...quest,
            current: 0,
            completed: false,
            expiresAt: now + 86400000,
          })),
        )
      }
    }

    const interval = setInterval(checkDailyReset, 60000) // 每分鐘檢查
    return () => clearInterval(interval)
  }, [dailyQuests])

  const earnXP = (amount: number, source: string) => {
    setUserLevel((prev) => {
      const newXP = prev.xp + amount
      let newLevel = prev.level
      let newXPToNext = prev.xpToNext

      // 檢查是否升級
      while (newXP >= newXPToNext) {
        newLevel++
        newXPToNext = newLevel * 300 // 每級需要更多XP
      }

      if (newLevel > prev.level) {
        // 升級通知
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("恭喜升級！", {
            body: `您已升級到 ${newLevel} 級！`,
            icon: "/icon-192x192.png",
          })
        }
      }

      return {
        ...prev,
        level: newLevel,
        xp: newXP,
        xpToNext: newXPToNext,
        title: getLevelTitle(newLevel),
        benefits: getLevelBenefits(newLevel),
        icon: getLevelIcon(newLevel),
      }
    })

    console.log(`獲得 ${amount} XP 來自: ${source}`)
  }

  const earnPoints = (amount: number, source: string) => {
    setTotalPoints((prev) => prev + amount)
    console.log(`獲得 ${amount} 積分 來自: ${source}`)
  }

  const completeQuest = (questId: string) => {
    setDailyQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === questId && !quest.completed) {
          earnXP(quest.reward.xp, `完成任務: ${quest.title}`)
          earnPoints(quest.reward.points, `完成任務: ${quest.title}`)
          return { ...quest, completed: true, current: quest.target }
        }
        return quest
      }),
    )
  }

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          earnPoints(achievement.points, `解鎖成就: ${achievement.name}`)

          // 成就解鎖通知
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("成就解鎖！", {
              body: `您解鎖了「${achievement.name}」成就！`,
              icon: "/icon-192x192.png",
            })
          }

          return {
            ...achievement,
            unlocked: true,
            unlockedAt: Date.now(),
          }
        }
        return achievement
      }),
    )
  }

  const getAvailableRewards = () => {
    return [
      { id: "coupon-5", name: "5% 折扣券", cost: 500, type: "coupon" },
      { id: "coupon-10", name: "10% 折扣券", cost: 1000, type: "coupon" },
      { id: "free-shipping", name: "免費配送券", cost: 300, type: "shipping" },
      { id: "early-access", name: "新品搶先體驗", cost: 1500, type: "access" },
      { id: "vip-support", name: "VIP 客服支援", cost: 2000, type: "service" },
    ]
  }

  const redeemReward = async (rewardId: string): Promise<boolean> => {
    const rewards = getAvailableRewards()
    const reward = rewards.find((r) => r.id === rewardId)

    if (!reward || totalPoints < reward.cost) {
      return false
    }

    setTotalPoints((prev) => prev - reward.cost)

    // 模擬兌換處理
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(`成功兌換: ${reward.name}`)
    return true
  }

  const getRankingPosition = (period: "daily" | "weekly" | "monthly"): number => {
    const leaderboard = leaderboards.find((lb) => lb.period === period)
    const userEntry = leaderboard?.users.find((user) => user.userId === "current-user")
    return userEntry?.rank || 0
  }

  const getProgressToNextLevel = (): number => {
    return (userLevel.xp / userLevel.xpToNext) * 100
  }

  const getLevelTitle = (level: number): string => {
    const titles = [
      "新手購物者",
      "時尚學徒",
      "風格探索者",
      "潮流追隨者",
      "時尚探索者",
      "風格達人",
      "潮流專家",
      "時尚大師",
      "風格傳奇",
      "時尚之神",
    ]
    return titles[Math.min(level - 1, titles.length - 1)] || "時尚傳說"
  }

  const getLevelBenefits = (level: number): string[] => {
    const baseBenefits = ["基礎會員權益"]
    if (level >= 2) baseBenefits.push("2% 購物折扣")
    if (level >= 3) baseBenefits.push("優先客服")
    if (level >= 5) baseBenefits.push("專屬商品預覽")
    if (level >= 7) baseBenefits.push("免費快速配送")
    if (level >= 10) baseBenefits.push("VIP 專屬活動")
    return baseBenefits
  }

  const getLevelIcon = (level: number): string => {
    if (level >= 10) return "👑"
    if (level >= 7) return "💎"
    if (level >= 5) return "🌟"
    if (level >= 3) return "⭐"
    return "🔰"
  }

  return (
    <GamificationContext.Provider
      value={{
        userLevel,
        achievements,
        dailyQuests,
        leaderboards,
        totalPoints,
        streakDays,
        earnXP,
        earnPoints,
        completeQuest,
        unlockAchievement,
        getAvailableRewards,
        redeemReward,
        getRankingPosition,
        getProgressToNextLevel,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}

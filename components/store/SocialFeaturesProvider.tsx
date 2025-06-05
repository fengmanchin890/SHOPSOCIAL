"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  timestamp: number
  likes: number
  likedByUser: boolean
}

interface SocialData {
  likes: number
  likedByUser: boolean
  comments: Comment[]
  rating: number
  ratedByUser: boolean
  shares: number
}

interface SocialFeaturesContextType {
  getSocialData: (comparisonId: string) => SocialData
  likeComparison: (comparisonId: string) => void
  addComment: (comparisonId: string, content: string) => void
  likeComment: (comparisonId: string, commentId: string) => void
  rateComparison: (comparisonId: string, rating: number) => void
  shareComparison: (comparisonId: string) => void
}

const SocialFeaturesContext = createContext<SocialFeaturesContextType | undefined>(undefined)

export function SocialFeaturesProvider({ children }: { children: React.ReactNode }) {
  const [socialData, setSocialData] = useState<Record<string, SocialData>>({})

  const getSocialData = (comparisonId: string): SocialData => {
    return (
      socialData[comparisonId] || {
        likes: Math.floor(Math.random() * 50) + 5,
        likedByUser: false,
        comments: [],
        rating: 4.2 + Math.random() * 0.8,
        ratedByUser: false,
        shares: Math.floor(Math.random() * 20) + 2,
      }
    )
  }

  const likeComparison = (comparisonId: string) => {
    setSocialData((prev) => {
      const current = getSocialData(comparisonId)
      return {
        ...prev,
        [comparisonId]: {
          ...current,
          likes: current.likedByUser ? current.likes - 1 : current.likes + 1,
          likedByUser: !current.likedByUser,
        },
      }
    })
  }

  const addComment = (comparisonId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "您",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content,
      timestamp: Date.now(),
      likes: 0,
      likedByUser: false,
    }

    setSocialData((prev) => {
      const current = getSocialData(comparisonId)
      return {
        ...prev,
        [comparisonId]: {
          ...current,
          comments: [newComment, ...current.comments],
        },
      }
    })
  }

  const likeComment = (comparisonId: string, commentId: string) => {
    setSocialData((prev) => {
      const current = getSocialData(comparisonId)
      const updatedComments = current.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.likedByUser ? comment.likes - 1 : comment.likes + 1,
              likedByUser: !comment.likedByUser,
            }
          : comment,
      )

      return {
        ...prev,
        [comparisonId]: {
          ...current,
          comments: updatedComments,
        },
      }
    })
  }

  const rateComparison = (comparisonId: string, rating: number) => {
    setSocialData((prev) => {
      const current = getSocialData(comparisonId)
      return {
        ...prev,
        [comparisonId]: {
          ...current,
          rating: current.ratedByUser ? rating : (current.rating + rating) / 2,
          ratedByUser: true,
        },
      }
    })
  }

  const shareComparison = (comparisonId: string) => {
    setSocialData((prev) => {
      const current = getSocialData(comparisonId)
      return {
        ...prev,
        [comparisonId]: {
          ...current,
          shares: current.shares + 1,
        },
      }
    })
  }

  return (
    <SocialFeaturesContext.Provider
      value={{
        getSocialData,
        likeComparison,
        addComment,
        likeComment,
        rateComparison,
        shareComparison,
      }}
    >
      {children}
    </SocialFeaturesContext.Provider>
  )
}

export function useSocialFeatures() {
  const context = useContext(SocialFeaturesContext)
  if (context === undefined) {
    throw new Error("useSocialFeatures must be used within a SocialFeaturesProvider")
  }
  return context
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface CollaborationUser {
  id: string
  name: string
  avatar: string
  color: string
  isOnline: boolean
  lastSeen: number
}

interface CollaborationSession {
  id: string
  name: string
  users: CollaborationUser[]
  items: any[]
  createdAt: number
  lastActivity: number
}

interface CollaborationContextType {
  currentSession: CollaborationSession | null
  activeUsers: CollaborationUser[]
  createSession: (name: string) => string
  joinSession: (sessionId: string) => void
  leaveSession: () => void
  inviteUser: (email: string) => void
  syncItems: (items: any[]) => void
  isCollaborating: boolean
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined)

export function CollaborationProvider({ children }: { children: React.ReactNode }) {
  const [currentSession, setCurrentSession] = useState<CollaborationSession | null>(null)
  const [activeUsers, setActiveUsers] = useState<CollaborationUser[]>([])

  // Mock current user
  const currentUser: CollaborationUser = {
    id: "current-user",
    name: "您",
    avatar: "/placeholder.svg?height=32&width=32",
    color: "#3B82F6",
    isOnline: true,
    lastSeen: Date.now(),
  }

  // Mock other users
  const mockUsers: CollaborationUser[] = [
    {
      id: "user-2",
      name: "小明",
      avatar: "/placeholder.svg?height=32&width=32",
      color: "#EF4444",
      isOnline: true,
      lastSeen: Date.now() - 30000,
    },
    {
      id: "user-3",
      name: "小華",
      avatar: "/placeholder.svg?height=32&width=32",
      color: "#10B981",
      isOnline: false,
      lastSeen: Date.now() - 300000,
    },
  ]

  const createSession = (name: string): string => {
    const sessionId = `session-${Date.now()}`
    const newSession: CollaborationSession = {
      id: sessionId,
      name,
      users: [currentUser],
      items: [],
      createdAt: Date.now(),
      lastActivity: Date.now(),
    }

    setCurrentSession(newSession)
    setActiveUsers([currentUser])
    return sessionId
  }

  const joinSession = (sessionId: string) => {
    // Simulate joining an existing session
    const session: CollaborationSession = {
      id: sessionId,
      name: "共享比較",
      users: [currentUser, ...mockUsers.slice(0, 2)],
      items: [],
      createdAt: Date.now() - 3600000,
      lastActivity: Date.now(),
    }

    setCurrentSession(session)
    setActiveUsers(session.users.filter((user) => user.isOnline))
  }

  const leaveSession = () => {
    setCurrentSession(null)
    setActiveUsers([])
  }

  const inviteUser = (email: string) => {
    // Simulate sending invitation
    console.log(`邀請已發送至: ${email}`)

    // Add a mock user after a delay
    setTimeout(() => {
      const newUser: CollaborationUser = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        avatar: "/placeholder.svg?height=32&width=32",
        color: "#8B5CF6",
        isOnline: true,
        lastSeen: Date.now(),
      }

      if (currentSession) {
        setCurrentSession((prev) =>
          prev
            ? {
                ...prev,
                users: [...prev.users, newUser],
              }
            : null,
        )
        setActiveUsers((prev) => [...prev, newUser])
      }
    }, 2000)
  }

  const syncItems = (items: any[]) => {
    if (currentSession) {
      setCurrentSession((prev) =>
        prev
          ? {
              ...prev,
              items,
              lastActivity: Date.now(),
            }
          : null,
      )
    }
  }

  // Simulate real-time updates
  useEffect(() => {
    if (!currentSession) return

    const interval = setInterval(() => {
      // Simulate user activity
      setActiveUsers((prev) =>
        prev.map((user) => ({
          ...user,
          lastSeen: user.id === currentUser.id ? Date.now() : user.lastSeen,
        })),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [currentSession])

  return (
    <CollaborationContext.Provider
      value={{
        currentSession,
        activeUsers,
        createSession,
        joinSession,
        leaveSession,
        inviteUser,
        syncItems,
        isCollaborating: !!currentSession,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  )
}

export function useCollaboration() {
  const context = useContext(CollaborationContext)
  if (context === undefined) {
    throw new Error("useCollaboration must be used within a CollaborationProvider")
  }
  return context
}

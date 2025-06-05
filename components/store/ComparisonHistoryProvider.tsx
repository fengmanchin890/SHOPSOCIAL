"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { CompareItem } from "./CompareProvider"

export interface ComparisonSession {
  id: string
  name: string
  items: CompareItem[]
  createdAt: string
  lastModified: string
}

interface ComparisonHistoryState {
  sessions: ComparisonSession[]
}

type ComparisonHistoryAction =
  | { type: "SAVE_SESSION"; payload: { name: string; items: CompareItem[] } }
  | { type: "DELETE_SESSION"; payload: string }
  | { type: "LOAD_SESSIONS"; payload: ComparisonSession[] }
  | { type: "CLEAR_HISTORY" }

const ComparisonHistoryContext = createContext<{
  sessions: ComparisonSession[]
  saveSession: (name: string, items: CompareItem[]) => void
  deleteSession: (id: string) => void
  clearHistory: () => void
} | null>(null)

function comparisonHistoryReducer(
  state: ComparisonHistoryState,
  action: ComparisonHistoryAction,
): ComparisonHistoryState {
  switch (action.type) {
    case "SAVE_SESSION": {
      const newSession: ComparisonSession = {
        id: Date.now().toString(),
        name: action.payload.name,
        items: action.payload.items,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      }

      const newSessions = [newSession, ...state.sessions.slice(0, 9)] // Keep only 10 most recent
      localStorage.setItem("comparisonHistory", JSON.stringify(newSessions))
      return { sessions: newSessions }
    }

    case "DELETE_SESSION": {
      const newSessions = state.sessions.filter((session) => session.id !== action.payload)
      localStorage.setItem("comparisonHistory", JSON.stringify(newSessions))
      return { sessions: newSessions }
    }

    case "CLEAR_HISTORY": {
      localStorage.removeItem("comparisonHistory")
      return { sessions: [] }
    }

    case "LOAD_SESSIONS": {
      return { sessions: action.payload }
    }

    default:
      return state
  }
}

export function ComparisonHistoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(comparisonHistoryReducer, { sessions: [] })

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("comparisonHistory")
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        dispatch({ type: "LOAD_SESSIONS", payload: parsedHistory })
      }
    } catch (error) {
      console.error("Failed to load comparison history:", error)
    }
  }, [])

  const saveSession = (name: string, items: CompareItem[]) => {
    dispatch({ type: "SAVE_SESSION", payload: { name, items } })
  }

  const deleteSession = (id: string) => {
    dispatch({ type: "DELETE_SESSION", payload: id })
  }

  const clearHistory = () => {
    dispatch({ type: "CLEAR_HISTORY" })
  }

  return (
    <ComparisonHistoryContext.Provider
      value={{
        sessions: state.sessions,
        saveSession,
        deleteSession,
        clearHistory,
      }}
    >
      {children}
    </ComparisonHistoryContext.Provider>
  )
}

export function useComparisonHistory() {
  const context = useContext(ComparisonHistoryContext)
  if (!context) {
    throw new Error("useComparisonHistory must be used within a ComparisonHistoryProvider")
  }
  return context
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"

interface VoiceSearchContextType {
  isListening: boolean
  transcript: string
  confidence: number
  isSupported: boolean
  startListening: () => void
  stopListening: () => void
  clearTranscript: () => void
  processVoiceCommand: (command: string) => VoiceCommandResult
}

interface VoiceCommandResult {
  action: "search" | "compare" | "filter" | "navigate" | "unknown"
  parameters: Record<string, any>
  confidence: number
  response: string
}

const VoiceSearchContext = createContext<VoiceSearchContextType | undefined>(undefined)

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function VoiceSearchProvider({ children }: { children: React.ReactNode }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = "zh-TW"

        recognition.onstart = () => {
          setIsListening(true)
        }

        recognition.onresult = (event) => {
          const current = event.resultIndex
          const transcriptResult = event.results[current][0].transcript
          const confidenceResult = event.results[current][0].confidence

          setTranscript(transcriptResult)
          setConfidence(confidenceResult)

          if (event.results[current].isFinal) {
            processVoiceCommand(transcriptResult)
          }
        }

        recognition.onerror = (event) => {
          console.error("語音識別錯誤:", event.error)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      setConfidence(0)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const clearTranscript = () => {
    setTranscript("")
    setConfidence(0)
  }

  const processVoiceCommand = (command: string): VoiceCommandResult => {
    const lowerCommand = command.toLowerCase()

    // 搜索命令
    if (lowerCommand.includes("搜索") || lowerCommand.includes("搜尋") || lowerCommand.includes("找")) {
      const searchTerm = lowerCommand.replace(/(搜索|搜尋|找)/g, "").trim()
      return {
        action: "search",
        parameters: { query: searchTerm },
        confidence: 0.9,
        response: `正在搜索 "${searchTerm}"`,
      }
    }

    // 比較命令
    if (lowerCommand.includes("比較") || lowerCommand.includes("對比")) {
      return {
        action: "compare",
        parameters: {},
        confidence: 0.85,
        response: "正在打開商品比較頁面",
      }
    }

    // 篩選命令
    if (lowerCommand.includes("篩選") || lowerCommand.includes("過濾")) {
      let category = ""
      if (lowerCommand.includes("男裝")) category = "men"
      else if (lowerCommand.includes("女裝")) category = "women"
      else if (lowerCommand.includes("鞋子") || lowerCommand.includes("鞋類")) category = "shoes"
      else if (lowerCommand.includes("配件")) category = "accessories"

      return {
        action: "filter",
        parameters: { category },
        confidence: 0.8,
        response: category ? `正在篩選${category}商品` : "正在打開篩選選項",
      }
    }

    // 導航命令
    if (lowerCommand.includes("首頁") || lowerCommand.includes("主頁")) {
      return {
        action: "navigate",
        parameters: { page: "home" },
        confidence: 0.95,
        response: "正在前往首頁",
      }
    }

    if (lowerCommand.includes("購物車")) {
      return {
        action: "navigate",
        parameters: { page: "cart" },
        confidence: 0.95,
        response: "正在打開購物車",
      }
    }

    if (lowerCommand.includes("收藏") || lowerCommand.includes("願望清單")) {
      return {
        action: "navigate",
        parameters: { page: "wishlist" },
        confidence: 0.9,
        response: "正在打開收藏清單",
      }
    }

    return {
      action: "unknown",
      parameters: {},
      confidence: 0.1,
      response: "抱歉，我不理解這個指令。請嘗試說「搜索商品」、「比較商品」或「打開購物車」",
    }
  }

  return (
    <VoiceSearchContext.Provider
      value={{
        isListening,
        transcript,
        confidence,
        isSupported,
        startListening,
        stopListening,
        clearTranscript,
        processVoiceCommand,
      }}
    >
      {children}
    </VoiceSearchContext.Provider>
  )
}

export function useVoiceSearch() {
  const context = useContext(VoiceSearchContext)
  if (context === undefined) {
    throw new Error("useVoiceSearch must be used within a VoiceSearchProvider")
  }
  return context
}

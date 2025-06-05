"use client"

import { useState } from "react"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useVoiceSearch } from "./VoiceSearchProvider"
import { useRouter } from "next/navigation"

interface VoiceSearchButtonProps {
  onSearchResult?: (query: string) => void
  className?: string
}

export function VoiceSearchButton({ onSearchResult, className }: VoiceSearchButtonProps) {
  const { isListening, transcript, confidence, isSupported, startListening, stopListening, processVoiceCommand } =
    useVoiceSearch()
  const [showTranscript, setShowTranscript] = useState(false)
  const router = useRouter()

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening()
      if (transcript) {
        const result = processVoiceCommand(transcript)
        handleVoiceCommand(result)
      }
    } else {
      startListening()
      setShowTranscript(true)
    }
  }

  const handleVoiceCommand = (result: any) => {
    switch (result.action) {
      case "search":
        if (onSearchResult) {
          onSearchResult(result.parameters.query)
        } else {
          router.push(`/store/products?search=${encodeURIComponent(result.parameters.query)}`)
        }
        break
      case "compare":
        router.push("/store/compare")
        break
      case "navigate":
        switch (result.parameters.page) {
          case "home":
            router.push("/store/home")
            break
          case "cart":
            router.push("/store/cart")
            break
          case "wishlist":
            router.push("/store/wishlist")
            break
        }
        break
      case "filter":
        if (result.parameters.category) {
          router.push(`/store/products?category=${result.parameters.category}`)
        }
        break
    }

    // 語音回應
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(result.response)
      utterance.lang = "zh-TW"
      speechSynthesis.speak(utterance)
    }

    setShowTranscript(false)
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant={isListening ? "default" : "outline"}
        size="sm"
        onClick={handleVoiceSearch}
        className={`${isListening ? "animate-pulse bg-red-500 hover:bg-red-600" : ""}`}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>

      {showTranscript && (isListening || transcript) && (
        <Card className="absolute top-full mt-2 w-80 z-50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">語音識別</span>
              </div>
              {confidence > 0 && (
                <Badge variant={confidence > 0.8 ? "default" : confidence > 0.5 ? "secondary" : "destructive"}>
                  {Math.round(confidence * 100)}%
                </Badge>
              )}
            </div>

            {isListening ? (
              <div className="text-center py-4">
                <div className="animate-pulse text-blue-600 mb-2">🎤 正在聆聽...</div>
                <p className="text-sm text-gray-600">請說出您的指令</p>
              </div>
            ) : transcript ? (
              <div>
                <p className="text-sm text-gray-800 mb-2">您說："{transcript}"</p>
                <p className="text-xs text-gray-500">正在處理指令...</p>
              </div>
            ) : null}

            <div className="mt-3 text-xs text-gray-500">
              <p>💡 試試說：</p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>"搜索牛仔外套"</li>
                <li>"比較商品"</li>
                <li>"打開購物車"</li>
                <li>"篩選男裝"</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

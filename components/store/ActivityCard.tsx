"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ActivityRegistrationDialog } from "./ActivityRegistrationDialog"
import { useI18n } from "@/contexts/i18n-context"

interface ActivityCardProps {
  title: string
  description: string
  image: string
  time?: string
  location?: string
  type: "food" | "accommodation" | "travel" | "language" | "culture"
  buttonText?: string
}

export function ActivityCard({ title, description, image, time, location, type, buttonText }: ActivityCardProps) {
  const [showRegistration, setShowRegistration] = useState(false)
  const { t, language } = useI18n()

  const getButtonText = () => {
    if (buttonText) return buttonText
    
    switch (type) {
      case "food":
        return language === "vi" ? "Đăng ký" : language === "zh-TW" ? "報名" : "Register"
      case "accommodation":
        return language === "vi" ? "Liên hệ" : language === "zh-TW" ? "聯繫" : "Contact"
      case "travel":
        return language === "vi" ? "Tham gia" : language === "zh-TW" ? "參加" : "Join"
      case "language":
        return language === "vi" ? "Đăng ký" : language === "zh-TW" ? "報名" : "Register"
      case "culture":
        return language === "vi" ? "Đăng ký" : language === "zh-TW" ? "報名" : "Register"
      default:
        return language === "vi" ? "Đăng ký" : language === "zh-TW" ? "報名" : "Register"
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video bg-gray-100 relative">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {time && <p>{time}</p>}
            {location && <p>{location}</p>}
          </div>
          <Button size="sm" onClick={() => setShowRegistration(true)}>
            {getButtonText()}
          </Button>
        </div>
      </div>

      <ActivityRegistrationDialog
        open={showRegistration}
        onOpenChange={setShowRegistration}
        activityTitle={title}
        activityType={type}
      />
    </div>
  )
}
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ActivityRegistrationDialog } from "./ActivityRegistrationDialog"
import { useI18n } from "@/contexts/i18n-context"
import { EventRegistrationButton } from "./EventRegistrationButton"
import { CommentReplyButton } from "./CommentReplyButton"
import { Clock, MapPin } from "lucide-react"

interface ActivityCardProps {
  title: string
  description: string
  image: string
  time?: string
  location?: string
  type: "food" | "accommodation" | "travel" | "language" | "culture"
  buttonText?: string
}

export function ActivityCard({ 
  title, 
  description, 
  image, 
  time, 
  location, 
  type, 
  buttonText 
}: ActivityCardProps) {
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
        <div className="flex flex-col space-y-2 mb-4">
          {time && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{location}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <EventRegistrationButton eventTitle={title} />
          <CommentReplyButton postTitle={title} authorName="Admin" />
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
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ActivityCard } from "./ActivityCard"
import { useI18n } from "@/contexts/i18n-context"

interface ViewMoreActivitiesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  activities: any[]
  type: "food" | "accommodation" | "travel" | "language" | "culture" | "legal" | "healthcare" | "financial" | "transportation" | "daily"
}

export function ViewMoreActivitiesDialog({
  open,
  onOpenChange,
  title,
  activities,
  type,
}: ViewMoreActivitiesDialogProps) {
  const { t, language } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredActivities = activities.filter(activity => 
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTranslatedLabels = () => {
    switch (language) {
      case "zh-TW":
        return {
          search: "搜索活動...",
          noResults: "沒有找到符合條件的活動",
          close: "關閉"
        }
      case "vi":
        return {
          search: "Tìm kiếm hoạt động...",
          noResults: "Không tìm thấy hoạt động phù hợp",
          close: "Đóng"
        }
      case "th":
        return {
          search: "ค้นหากิจกรรม...",
          noResults: "ไม่พบกิจกรรมที่ตรงกับเงื่อนไข",
          close: "ปิด"
        }
      case "hi":
        return {
          search: "गतिविधियाँ खोजें...",
          noResults: "कोई मेल खाने वाली गतिविधि नहीं मिली",
          close: "बंद करें"
        }
      default:
        return {
          search: "Search activities...",
          noResults: "No matching activities found",
          close: "Close"
        }
    }
  }

  const labels = getTranslatedLabels()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {language === "vi"
              ? "Xem tất cả các hoạt động có sẵn"
              : language === "zh-TW"
                ? "查看所有可用活動"
                : "View all available activities"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={labels.search}
              className="pl-10"
            />
          </div>
          
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  title={activity.title}
                  description={activity.description}
                  image={activity.image}
                  time={activity.time}
                  location={activity.location}
                  type={type}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{labels.noResults}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {labels.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
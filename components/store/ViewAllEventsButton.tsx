"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar, MapPin, Clock } from "lucide-react"
import { EventRegistrationButton } from "./EventRegistrationButton"
import { useI18n } from "@/contexts/i18n-context"

interface Event {
  id: string
  title: string
  description: string
  image: string
  time: string
  location: string
  type: "food" | "accommodation" | "travel" | "language" | "culture"
}

interface ViewAllEventsButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ViewAllEventsButton({ 
  className,
  variant = "outline",
  size = "default"
}: ViewAllEventsButtonProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "food" | "accommodation" | "travel" | "language" | "culture">("all")
  const { language } = useI18n()

  const getLocalizedText = () => {
    switch (language) {
      case "zh-TW":
        return {
          viewAll: "查看所有活動",
          title: "所有即將舉行的活動",
          search: "搜尋活動...",
          all: "全部",
          food: "美食",
          accommodation: "住宿",
          travel: "旅行",
          language: "語言",
          culture: "文化",
          noEvents: "沒有找到符合條件的活動",
          filter: "篩選"
        }
      case "vi":
        return {
          viewAll: "Xem tất cả sự kiện",
          title: "Tất cả sự kiện sắp diễn ra",
          search: "Tìm kiếm sự kiện...",
          all: "Tất cả",
          food: "Ẩm thực",
          accommodation: "Chỗ ở",
          travel: "Du lịch",
          language: "Ngôn ngữ",
          culture: "Văn hóa",
          noEvents: "Không tìm thấy sự kiện phù hợp với tiêu chí",
          filter: "Lọc"
        }
      default:
        return {
          viewAll: "View all events",
          title: "All Upcoming Events",
          search: "Search events...",
          all: "All",
          food: "Food",
          accommodation: "Accommodation",
          travel: "Travel",
          language: "Language",
          culture: "Culture",
          noEvents: "No events found matching your criteria",
          filter: "Filter"
        }
    }
  }

  const texts = getLocalizedText()

  // Sample events data
  const events: Event[] = [
    {
      id: "event-1",
      title: language === "zh-TW" ? "台灣料理烹飪課" : 
             language === "vi" ? "Lớp học nấu ăn món Việt" : 
             "Taiwanese Cooking Class",
      description: language === "zh-TW" ? "學習製作牛肉麵和傳統菜餚" : 
                   language === "vi" ? "Học cách nấu các món ăn truyền thống Việt Nam với đầu bếp chuyên nghiệp" : 
                   "Learn to make traditional Taiwanese dishes with a professional chef",
      image: "/placeholder.svg?height=400&width=400&text=Cooking+Class",
      time: "Thứ Bảy, 14:00",
      location: "Quận 1, TP.HCM",
      type: "food"
    },
    {
      id: "event-2",
      title: language === "zh-TW" ? "語言交換咖啡聚會" : 
             language === "vi" ? "Gặp gỡ trao đổi ngôn ngữ tại quán cà phê" : 
             "Language Exchange Coffee Meetup",
      description: language === "zh-TW" ? "練習中文和英文的輕鬆聚會" : 
                   language === "vi" ? "Gặp gỡ thân mật để thực hành tiếng Việt và tiếng Anh" : 
                   "Casual meetup to practice Chinese and English",
      image: "/placeholder.svg?height=400&width=400&text=Language+Exchange",
      time: "Chủ Nhật, 15:00",
      location: "Quận 3, TP.HCM",
      type: "language"
    },
    {
      id: "event-3",
      title: language === "zh-TW" ? "夜市探索之旅" : 
             language === "vi" ? "Tour khám phá chợ đêm" : 
             "Night Market Exploration Tour",
      description: language === "zh-TW" ? "探索台北最受歡迎的夜市" : 
                   language === "vi" ? "Khám phá các khu chợ đêm nổi tiếng nhất ở Hà Nội" : 
                   "Explore the most popular night markets in Taipei",
      image: "/placeholder.svg?height=400&width=400&text=Night+Market",
      time: "Thứ Sáu, 19:00",
      location: "Quận 5, TP.HCM",
      type: "travel"
    },
    {
      id: "event-4",
      title: language === "zh-TW" ? "外國人租房講座" : 
             language === "vi" ? "Hội thảo về thuê nhà cho người nước ngoài" : 
             "Housing Workshop for Foreigners",
      description: language === "zh-TW" ? "了解在台灣租房的法律和實用提示" : 
                   language === "vi" ? "Tìm hiểu về luật pháp và mẹo hữu ích khi thuê nhà ở Việt Nam" : 
                   "Learn about laws and practical tips for renting in Taiwan",
      image: "/placeholder.svg?height=400&width=400&text=Housing+Workshop",
      time: "Thứ Bảy, 10:00",
      location: "Quận 7, TP.HCM",
      type: "accommodation"
    },
    {
      id: "event-5",
      title: language === "zh-TW" ? "文化適應工作坊" : 
             language === "vi" ? "Hội thảo thích nghi văn hóa" : 
             "Cultural Adaptation Workshop",
      description: language === "zh-TW" ? "幫助外國人了解和適應台灣文化" : 
                   language === "vi" ? "Giúp người nước ngoài hiểu và thích nghi với văn hóa Việt Nam" : 
                   "Helping foreigners understand and adapt to Taiwanese culture",
      image: "/placeholder.svg?height=400&width=400&text=Cultural+Workshop",
      time: "Chủ Nhật, 13:00",
      location: "Quận 2, TP.HCM",
      type: "culture"
    },
    {
      id: "event-6",
      title: language === "zh-TW" ? "中文初學者課程" : 
             language === "vi" ? "Khóa học tiếng Việt cho người mới bắt đầu" : 
             "Chinese for Beginners Course",
      description: language === "zh-TW" ? "為外國人設計的基礎中文課程" : 
                   language === "vi" ? "Khóa học tiếng Việt cơ bản được thiết kế cho người nước ngoài" : 
                   "Basic Chinese course designed for foreigners",
      image: "/placeholder.svg?height=400&width=400&text=Language+Course",
      time: "Thứ Ba & Thứ Năm, 18:00",
      location: "Quận 1, TP.HCM",
      type: "language"
    },
    {
      id: "event-7",
      title: language === "zh-TW" ? "台灣美食之旅" : 
             language === "vi" ? "Tour ẩm thực đường phố" : 
             "Taiwanese Food Tour",
      description: language === "zh-TW" ? "品嚐台北最好的街頭美食" : 
                   language === "vi" ? "Nếm thử những món ăn đường phố ngon nhất ở Hà Nội" : 
                   "Taste the best street food in Taipei",
      image: "/placeholder.svg?height=400&width=400&text=Food+Tour",
      time: "Thứ Bảy, 17:00",
      location: "Quận 4, TP.HCM",
      type: "food"
    },
    {
      id: "event-8",
      title: language === "zh-TW" ? "週末登山團" : 
             language === "vi" ? "Nhóm leo núi cuối tuần" : 
             "Weekend Hiking Group",
      description: language === "zh-TW" ? "探索台灣美麗的山脈和自然風光" : 
                   language === "vi" ? "Khám phá những ngọn núi và cảnh quan thiên nhiên tuyệt đẹp của Việt Nam" : 
                   "Explore Taiwan's beautiful mountains and natural scenery",
      image: "/placeholder.svg?height=400&width=400&text=Hiking",
      time: "Thứ Bảy, 07:00",
      location: "Vũng Tàu",
      type: "travel"
    }
  ]

  const filteredEvents = events.filter(event => {
    // Filter by tab
    if (activeTab !== "all" && event.type !== activeTab) {
      return false
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className={className}
        variant={variant}
        size={size}
      >
        {texts.viewAll}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{texts.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={texts.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Category Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="w-full">
                <TabsTrigger value="all">{texts.all}</TabsTrigger>
                <TabsTrigger value="food">{texts.food}</TabsTrigger>
                <TabsTrigger value="accommodation">{texts.accommodation}</TabsTrigger>
                <TabsTrigger value="travel">{texts.travel}</TabsTrigger>
                <TabsTrigger value="language">{texts.language}</TabsTrigger>
                <TabsTrigger value="culture">{texts.culture}</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map(event => (
                  <div key={event.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className="absolute top-2 right-2"
                        variant={
                          event.type === "food" ? "default" :
                          event.type === "language" ? "secondary" :
                          "outline"
                        }
                      >
                        {event.type === "food" ? texts.food :
                         event.type === "accommodation" ? texts.accommodation :
                         event.type === "travel" ? texts.travel :
                         event.type === "language" ? texts.language :
                         texts.culture}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                      <div className="flex flex-col space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      <EventRegistrationButton eventTitle={event.title} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">{texts.noEvents}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
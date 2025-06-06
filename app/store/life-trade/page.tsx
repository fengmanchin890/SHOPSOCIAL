"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MembershipStatus } from "@/components/store/MembershipStatus"
import { AddActivityForm } from "@/components/store/AddActivityForm"
import { useMembership } from "@/components/store/MembershipProvider"
import { ChefHat, Home, Users2, GraduationCap, School, Plus, ArrowRight, MapPin, Book, Star, FileText, Video, Download, Shield, Clock, Target } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"
import { ActivityCard } from "@/components/store/ActivityCard"
import { AddNewActivityDialog } from "@/components/store/AddNewActivityDialog"
import { ViewMoreActivitiesDialog } from "@/components/store/ViewMoreActivitiesDialog"
import { HelpDeskChat } from "@/components/store/HelpDeskChat"
import { CommunityForum } from "@/components/store/CommunityForum"

export default function LifeTradePage() {
  const router = useRouter()
  const { isPremiumMember } = useMembership()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [addActivityType, setAddActivityType] = useState<"food" | "accommodation" | "travel" | "language" | "culture">("food")
  const { t, language } = useI18n()
  const [viewMoreType, setViewMoreType] = useState<"food" | "accommodation" | "travel" | "language" | "culture" | null>(null)

  // State for storing activities
  const [activities, setActivities] = useState({
    food: [
      {
        id: "food-1",
        title: "Lớp học nấu ăn món Việt",
        description: "Học cách nấu các món ăn truyền thống Việt Nam với đầu bếp chuyên nghiệp",
        image: "/placeholder.svg?height=400&width=400&text=Ẩm+thực+Việt+Nam",
        time: "Thứ Bảy, 14:00",
        location: "Quận 1, TP.HCM",
        type: "food" as const
      },
      {
        id: "food-2",
        title: "Tour ẩm thực đường phố",
        description: "Khám phá các món ăn đường phố nổi tiếng với hướng dẫn viên địa phương",
        image: "/placeholder.svg?height=400&width=400&text=Ẩm+thực+đường+phố",
        time: "Chủ Nhật, 18:00",
        location: "Quận 4, TP.HCM",
        type: "food" as const
      },
      {
        id: "food-3",
        title: "Bữa tối gia đình Việt Nam",
        description: "Trải nghiệm bữa tối ấm cúng cùng gia đình Việt Nam và tìm hiểu văn hóa địa phương",
        image: "/placeholder.svg?height=400&width=400&text=Bữa+tối+gia+đình",
        time: "Thứ Sáu, 19:00",
        location: "Quận 7, TP.HCM",
        type: "food" as const
      }
    ],
    accommodation: [
      {
        id: "accom-1",
        title: "Phòng trọ trao đổi",
        description: "Trao đổi chỗ ở miễn phí với việc dạy tiếng Anh 2 buổi/tuần",
        image: "/placeholder.svg?height=400&width=400&text=Phòng+trọ",
        location: "Quận 2, TP.HCM",
        time: "Có sẵn: Ngay bây giờ",
        type: "accommodation" as const
      },
      {
        id: "accom-2",
        title: "Căn hộ giảm giá cho sinh viên",
        description: "Giảm 30% tiền thuê cho sinh viên quốc tế có thể hỗ trợ việc nhà",
        image: "/placeholder.svg?height=400&width=400&text=Căn+hộ",
        location: "Quận 7, TP.HCM",
        time: "Có sẵn: Tháng sau",
        type: "accommodation" as const
      },
      {
        id: "accom-3",
        title: "Homestay với gia đình Việt",
        description: "Ở cùng gia đình Việt Nam, trải nghiệm văn hóa và học tiếng Việt",
        image: "/placeholder.svg?height=400&width=400&text=Homestay",
        location: "Quận 3, TP.HCM",
        time: "Có sẵn: Ngay bây giờ",
        type: "accommodation" as const
      }
    ],
    travel: [
      {
        id: "travel-1",
        title: "Tour khám phá thành phố",
        description: "Cùng khám phá những địa điểm nổi tiếng và ít người biết đến ở TP.HCM",
        image: "/placeholder.svg?height=400&width=400&text=Tour+thành+phố",
        time: "Thứ Bảy, 09:00",
        location: "Quận 1, TP.HCM",
        type: "travel" as const
      },
      {
        id: "travel-2",
        title: "Dã ngoại cuối tuần",
        description: "Cùng nhau đi dã ngoại, giao lưu và kết bạn mới",
        image: "/placeholder.svg?height=400&width=400&text=Dã+ngoại",
        time: "Chủ Nhật, 07:00",
        location: "Vũng Tàu",
        type: "travel" as const
      },
      {
        id: "travel-3",
        title: "Khám phá chợ đêm",
        description: "Cùng nhau khám phá chợ đêm sôi động và ẩm thực đường phố",
        image: "/placeholder.svg?height=400&width=400&text=Chợ+đêm",
        time: "Thứ Sáu, 19:00",
        location: "Quận 5, TP.HCM",
        type: "travel" as const
      }
    ],
    language: [
      {
        id: "lang-1",
        title: "Lớp học tiếng Việt cơ bản",
        description: "Học tiếng Việt giao tiếp cơ bản cho người nước ngoài",
        image: "/placeholder.svg?height=400&width=400&text=Tiếng+Việt",
        time: "Thứ Ba & Thứ Năm, 18:00",
        location: "Quận 1, TP.HCM",
        type: "language" as const
      },
      {
        id: "lang-2",
        title: "Cafe trao đổi ngôn ngữ",
        description: "Gặp gỡ và trao đổi tiếng Việt - tiếng Anh tại quán cafe",
        image: "/placeholder.svg?height=400&width=400&text=Trao+đổi+ngôn+ngữ",
        time: "Thứ Bảy, 15:00",
        location: "Quận 3, TP.HCM",
        type: "language" as const
      },
      {
        id: "lang-3",
        title: "Lớp học tiếng Hàn",
        description: "Học tiếng Hàn giao tiếp với giáo viên người Hàn Quốc",
        image: "/placeholder.svg?height=400&width=400&text=Tiếng+Hàn",
        time: "Thứ Tư & Thứ Sáu, 19:00",
        location: "Quận 7, TP.HCM",
        type: "language" as const
      }
    ],
    culture: [
      {
        id: "culture-1",
        title: "Hướng dẫn văn hóa Việt Nam",
        description: "Tìm hiểu về phong tục, tập quán và nghi thức xã hội của Việt Nam",
        image: "/placeholder.svg?height=400&width=400&text=Hướng+dẫn+văn+hóa",
        time: "Khóa học trực tuyến",
        location: "5 mô-đun, tự học",
        type: "culture" as const
      },
      {
        id: "culture-2",
        title: "Hội thảo hỗ trợ pháp lý",
        description: "Tư vấn về thị thực, giấy phép lao động và quyền hợp pháp",
        image: "/placeholder.svg?height=400&width=400&text=Hỗ+trợ+pháp+lý",
        time: "Thứ Bảy, 10:00",
        location: "Trực tuyến qua Zoom",
        type: "culture" as const
      },
      {
        id: "culture-3",
        title: "Lễ hội giao lưu văn hóa",
        description: "Tham gia lễ hội với âm nhạc, ẩm thực và nghệ thuật từ nhiều nền văn hóa",
        image: "/placeholder.svg?height=400&width=400&text=Lễ+hội+văn+hóa",
        time: "Chủ Nhật, 12:00-20:00",
        location: "Công viên Lê Văn Tám",
        type: "culture" as const
      }
    ]
  })

  // Check login status when page loads
  useEffect(() => {
    const authStatus = localStorage.getItem("lifeTradeAuth")
    if (authStatus === "authenticated") {
      setIsLoggedIn(true)
    } else {
      // Redirect to login page if not logged in
      router.push("/store/life-trade/auth")
    }
  }, [router])

  const handleAddActivity = (type: "food" | "accommodation" | "travel" | "language" | "culture") => {
    if (!isPremiumMember) {
      return
    }
    setAddActivityType(type)
    setShowAddActivity(true)
  }

  const handleAddActivitySuccess = (newActivity: any) => {
    // Add the new activity to the appropriate section
    setActivities(prev => ({
      ...prev,
      [addActivityType]: [...prev[addActivityType], newActivity]
    }))
    setShowAddActivity(false)
  }

  const handleViewMore = (type: "food" | "accommodation" | "travel" | "language" | "culture") => {
    setViewMoreType(type)
  }

  const getViewMoreTitle = (type: "food" | "accommodation" | "travel" | "language" | "culture") => {
    switch (type) {
      case "food":
        return language === "vi" 
          ? "Tất cả trải nghiệm ẩm thực" 
          : language === "zh-TW" 
            ? "所有美食體驗" 
            : "All Food Experiences"
      case "accommodation":
        return language === "vi" 
          ? "Tất cả chỗ ở" 
          : language === "zh-TW" 
            ? "所有住宿" 
            : "All Accommodations"
      case "travel":
        return language === "vi" 
          ? "Tất cả hoạt động cùng đi" 
          : language === "zh-TW" 
            ? "所有一起探索活動" 
            : "All Travel Activities"
      case "language":
        return language === "vi" 
          ? "Tất cả lớp học ngôn ngữ" 
          : language === "zh-TW" 
            ? "所有語言課程" 
            : "All Language Classes"
      case "culture":
        return language === "vi" 
          ? "Tất cả tài nguyên văn hóa" 
          : language === "zh-TW" 
            ? "所有文化資源" 
            : "All Cultural Resources"
      default:
        return language === "vi" 
          ? "Tất cả hoạt động" 
          : language === "zh-TW" 
            ? "所有活動" 
            : "All Activities"
    }
  }

  if (!isLoggedIn) {
    return null // Will redirect to login page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("lifeTrade.title")}</h1>
          <p className="text-gray-600 mt-2">
            {t("lifeTrade.description")}
          </p>
        </div>
        <MembershipStatus />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <TabsTrigger value="overview">{t("lifeTrade.overview")}</TabsTrigger>
          <TabsTrigger value="food">{t("lifeTrade.food")}</TabsTrigger>
          <TabsTrigger value="accommodation">{t("lifeTrade.accommodation")}</TabsTrigger>
          <TabsTrigger value="travel">{t("lifeTrade.travel")}</TabsTrigger>
          <TabsTrigger value="language">{t("lifeTrade.language")}</TabsTrigger>
          <TabsTrigger value="culture">{t("lifeTrade.culture")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center p-6">
                    <h2 className="text-2xl font-bold mb-2">{t("platform.name")}</h2>
                    <p>{t("platform.slogan")}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">🎯 {t("targetUsers.title")}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">👩‍🎓 {t("targetUsers.students")}:</h4>
                    <ul className="ml-6 list-disc text-gray-600 space-y-1">
                      <li>{t("targetUsers.students.desc")}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">👰 {t("targetUsers.married")}:</h4>
                    <ul className="ml-6 list-disc text-gray-600 space-y-1">
                      <li>{t("targetUsers.married.desc")}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">👷 {t("targetUsers.workers")}:</h4>
                    <ul className="ml-6 list-disc text-gray-600 space-y-1">
                      <li>{t("targetUsers.workers.desc")}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("features.title")}</CardTitle>
                  <CardDescription>{t("platform.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                      <Link href="/store/life-trade?tab=food">
                        <ChefHat className="h-5 w-5 mr-2 text-orange-500" />
                        <div className="text-left">
                          <div className="font-medium">{t("features.food")}</div>
                          <div className="text-xs text-gray-500">{t("features.food.desc")}</div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                      <Link href="/store/life-trade?tab=accommodation">
                        <Home className="h-5 w-5 mr-2 text-blue-500" />
                        <div className="text-left">
                          <div className="font-medium">{t("features.accommodation")}</div>
                          <div className="text-xs text-gray-500">{t("features.accommodation.desc")}</div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                      <Link href="/store/life-trade?tab=travel">
                        <Users2 className="h-5 w-5 mr-2 text-purple-500" />
                        <div className="text-left">
                          <div className="font-medium">{t("features.travel")}</div>
                          <div className="text-xs text-gray-500">{t("features.travel.desc")}</div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                      <Link href="/store/life-trade?tab=language">
                        <School className="h-5 w-5 mr-2 text-green-500" />
                        <div className="text-left">
                          <div className="font-medium">{t("features.language")}</div>
                          <div className="text-xs text-gray-500">{t("features.language.desc")}</div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                      <Link href="/store/life-trade?tab=culture">
                        <Book className="h-5 w-5 mr-2 text-red-500" />
                        <div className="text-left">
                          <div className="font-medium">{t("features.culture")}</div>
                          <div className="text-xs text-gray-500">{t("features.culture.desc")}</div>
                        </div>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("recentActivities.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <ChefHat className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{t("recentActivities.cookingClass")}</h4>
                        <p className="text-sm text-gray-600">{t("recentActivities.cookingClass.desc")}</p>
                        <p className="text-xs text-gray-500 mt-1">Hôm nay, 14:00 - Quận 1, TP.HCM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <School className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{t("recentActivities.languageExchange")}</h4>
                        <p className="text-sm text-gray-600">{t("recentActivities.languageExchange.desc")}</p>
                        <p className="text-xs text-gray-500 mt-1">Thứ Bảy, 15:00 - Quận 3, TP.HCM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{t("recentActivities.marketTour")}</h4>
                        <p className="text-sm text-gray-600">{t("recentActivities.marketTour.desc")}</p>
                        <p className="text-xs text-gray-500 mt-1">Chủ Nhật, 09:00 - Quận 1, TP.HCM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CommunityForum />
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "zh-TW" ? "即將舉行的活動" : 
                   language === "vi" ? "Sự kiện sắp diễn ra" : 
                   "Upcoming Events"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {activities.food.slice(0, 1).concat(
                    activities.language.slice(0, 1),
                    activities.culture.slice(0, 1)
                  ).map(activity => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image 
                          src={activity.image} 
                          alt={activity.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{activity.description}</p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="mr-3">{activity.time}</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="flex-shrink-0">
                        {language === "zh-TW" ? "報名" : 
                         language === "vi" ? "Đăng ký" : 
                         "Register"}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full">
                  {language === "zh-TW" ? "查看所有活動" : 
                   language === "vi" ? "Xem tất cả sự kiện" : 
                   "View all events"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="food" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("food.title")}</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("food")}>
                <Plus className="h-4 w-4 mr-2" />
                {t("food.addExperience")}
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-orange-800">{t("food.smartDiscovery")}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium">{t("food.locationBased")}</p>
                        <p className="text-sm text-gray-600">{t("food.locationBased.desc")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium">{t("food.tasteProfile")}</p>
                        <p className="text-sm text-gray-600">{t("food.tasteProfile.desc")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Home className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium">{t("food.homesickMode")}</p>
                        <p className="text-sm text-gray-600">{t("food.homesickMode.desc")}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Bản+đồ+ẩm+thực" 
                        alt="Bản đồ ẩm thực"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Bản đồ ẩm thực tương tác</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Trạng thái nhà hàng thời gian thực</li>
                        <li>• Huy hiệu xác minh cộng đồng</li>
                        <li>• Đánh giá với hình ảnh phong phú</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Trao+đổi+công+thức" 
                        alt="Trao đổi công thức"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Trao đổi công thức & nấu ăn</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Hướng dẫn nấu ăn bằng video</li>
                        <li>• Hướng dẫn thay thế nguyên liệu</li>
                        <li>• Sách nấu ăn cộng đồng</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.food.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="food"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("food")}>
              {t("button.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="accommodation" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("accommodation.title")}</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("accommodation")}>
                <Plus className="h-4 w-4 mr-2" />
                {t("accommodation.addListing")}
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-blue-50 to-sky-50 border-blue-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Mạng lưới nhà ở được xác minh</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Hệ thống điểm tin cậy</p>
                        <p className="text-sm text-gray-600">Dựa trên đánh giá cộng đồng, thời gian phản hồi và trạng thái xác minh</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Home className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Tour phòng ảo</p>
                        <p className="text-sm text-gray-600">Hình ảnh/video 360° với bình luận bằng tiếng Việt</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Mẫu hợp đồng</p>
                        <p className="text-sm text-gray-600">Hợp đồng thuê nhà được dịch sẵn sang tiếng Việt với giải thích thuật ngữ pháp lý</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Tìm+bạn+cùng+phòng" 
                        alt="Tìm bạn cùng phòng"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Thuật toán ghép bạn cùng phòng</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Tương thích lối sống</li>
                        <li>• Sở thích ngôn ngữ</li>
                        <li>• Xác minh an toàn</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Quan+hệ+chủ+nhà" 
                        alt="Quan hệ chủ nhà"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Quan hệ chủ nhà</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Hướng dẫn định hướng văn hóa</li>
                        <li>• Dịch vụ phiên dịch</li>
                        <li>• Giải quyết xung đột</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.accommodation.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="accommodation"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("accommodation")}>
              {t("button.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="travel" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("travel.title")}</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("travel")}>
                <Plus className="h-4 w-4 mr-2" />
                {t("travel.addActivity")}
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-purple-800">Ghép cặp bạn đồng hành thông minh</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Ghép cặp theo sở thích</p>
                        <p className="text-sm text-gray-600">Ghép theo sở thích, phong cách du lịch, phạm vi ngân sách</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Xếp hạng an toàn</p>
                        <p className="text-sm text-gray-600">Mức xác minh người dùng, lịch sử chuyến đi, xác nhận cộng đồng</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users2 className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Tùy chọn kích thước nhóm</p>
                        <p className="text-sm text-gray-600">Bạn đồng hành cá nhân, nhóm nhỏ (3-5), chuyến đi cộng đồng lớn hơn (10+)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Sự+kiện+cộng+đồng" 
                        alt="Sự kiện cộng đồng"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Nền tảng sự kiện cộng đồng</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Lịch gặp mặt thường xuyên</li>
                        <li>• Sự kiện do người dùng tạo</li>
                        <li>• Đặt chỗ với đặt cọc</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Trải+nghiệm+văn+hóa" 
                        alt="Trải nghiệm văn hóa"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Gói trải nghiệm văn hóa</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Tham gia lễ hội địa phương</li>
                        <li>• Hội thảo chia sẻ kỹ năng</li>
                        <li>• Danh mục phiêu lưu</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.travel.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="travel"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("travel")}>
              {t("button.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("language.title")}</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("language")}>
                <Plus className="h-4 w-4 mr-2" />
                {t("language.addClass")}
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-green-800">Hệ thống ghép cặp học ngôn ngữ AI</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Đánh giá trình độ ngôn ngữ</p>
                        <p className="text-sm text-gray-600">Bài kiểm tra xếp lớp ban đầu để ghép đối tác phù hợp</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Phù hợp mục tiêu học tập</p>
                        <p className="text-sm text-gray-600">Ghép người có mục tiêu tương tự (kinh doanh, giao tiếp, học thuật)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Đồng bộ hóa lịch trình</p>
                        <p className="text-sm text-gray-600">Tìm đối tác có thời gian rảnh tương thích</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Lộ+trình+học+tập" 
                        alt="Lộ trình học tập"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Lộ trình học tập có cấu trúc</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Mô-đun dựa trên tình huống</li>
                        <li>• Bài học ngữ cảnh văn hóa</li>
                        <li>• Công cụ phát âm</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Không+gian+học+tập" 
                        alt="Không gian học tập"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Không gian học tập cộng đồng</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Phòng trò chuyện ảo</li>
                        <li>• Địa điểm gặp mặt trực tiếp</li>
                        <li>• Thị trường gia sư đồng đẳng</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.language.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="language"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("language")}>
              {t("button.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="culture" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("culture.title")}</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("culture")}>
                <Plus className="h-4 w-4 mr-2" />
                {t("culture.addResource")}
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-red-800">Trung tâm tài nguyên số</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Book className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Thư viện nội dung tuyển chọn</p>
                        <p className="text-sm text-gray-600">Hướng dẫn chính phủ, nghi thức văn hóa, liên hệ khẩn cấp</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Video className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Học tập đa định dạng</p>
                        <p className="text-sm text-gray-600">Video với phụ đề kép, đồ họa tương tác, podcast</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Download className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Khả năng truy cập ngoại tuyến</p>
                        <p className="text-sm text-gray-600">Nội dung có thể tải xuống cho khu vực có kết nối internet kém</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Hỗ+trợ+hòa+nhập" 
                        alt="Hỗ trợ hòa nhập"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Dịch vụ hỗ trợ hòa nhập</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Hỗ trợ giấy tờ</li>
                        <li>• Kết nối chuyên nghiệp</li>
                        <li>• Tài nguyên sức khỏe tâm thần</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Chương+trình+liên+văn+hóa" 
                        alt="Chương trình liên văn hóa"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Chương trình liên văn hóa</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Chương trình đại sứ</li>
                        <li>• Lễ hội giao lưu văn hóa</li>
                        <li>• Chương trình thanh thiếu niên</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.culture.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="culture"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("culture")}>
              {t("button.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add New Activity Dialog */}
      <AddNewActivityDialog
        open={showAddActivity}
        onOpenChange={setShowAddActivity}
        activityType={addActivityType}
        onSuccess={handleAddActivitySuccess}
      />

      {/* View More Activities Dialog */}
      {viewMoreType && (
        <ViewMoreActivitiesDialog
          open={!!viewMoreType}
          onOpenChange={(open) => !open && setViewMoreType(null)}
          title={getViewMoreTitle(viewMoreType)}
          activities={activities[viewMoreType]}
          type={viewMoreType}
        />
      )}
      
      {/* Help Desk Chat */}
      <HelpDeskChat />
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MembershipStatus } from "@/components/store/MembershipStatus"
import { useMembership } from "@/components/store/MembershipProvider"
import { 
  ChefHat, Home, Users2, GraduationCap, School, Plus, ArrowRight, 
  MapPin, Book, Star, FileText, Video, Download, Shield, Clock, 
  Target, Briefcase, Heart, Globe, Building, FileCheck, Stethoscope, 
  CreditCard, Car, ShoppingBag, Calendar, MessageCircle, HelpCircle 
} from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"
import { ActivityCard } from "@/components/store/ActivityCard"
import { AddNewActivityDialog } from "@/components/store/AddNewActivityDialog"
import { ViewMoreActivitiesDialog } from "@/components/store/ViewMoreActivitiesDialog"

export default function LifeTradePage() {
  const router = useRouter()
  const { isPremiumMember } = useMembership()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [addActivityType, setAddActivityType] = useState<"food" | "accommodation" | "travel" | "language" | "culture" | "legal" | "healthcare" | "financial" | "transportation" | "daily">("food")
  const { t, language } = useI18n()
  const [viewMoreType, setViewMoreType] = useState<"food" | "accommodation" | "travel" | "language" | "culture" | "legal" | "healthcare" | "financial" | "transportation" | "daily" | null>(null)
  const [userType, setUserType] = useState<"student" | "married" | "worker" | null>(null)

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
    ],
    legal: [
      {
        id: "legal-1",
        title: "Hướng dẫn gia hạn ARC",
        description: "Hướng dẫn chi tiết quy trình gia hạn thẻ cư trú nước ngoài",
        image: "/placeholder.svg?height=400&width=400&text=Gia+hạn+ARC",
        time: "Thứ Tư, 14:00",
        location: "Trực tuyến qua Zoom",
        type: "legal" as const
      },
      {
        id: "legal-2",
        title: "Dịch vụ dịch thuật công chứng",
        description: "Dịch và công chứng các loại giấy tờ quan trọng",
        image: "/placeholder.svg?height=400&width=400&text=Dịch+thuật",
        time: "Thứ Hai - Thứ Sáu, 9:00-17:00",
        location: "Quận 1, TP.HCM",
        type: "legal" as const
      },
      {
        id: "legal-3",
        title: "Tư vấn visa du học",
        description: "Tư vấn quy trình xin visa du học và các giấy tờ cần thiết",
        image: "/placeholder.svg?height=400&width=400&text=Visa+du+học",
        time: "Thứ Bảy, 10:00-12:00",
        location: "Quận 3, TP.HCM",
        type: "legal" as const
      }
    ],
    healthcare: [
      {
        id: "health-1",
        title: "Đăng ký bảo hiểm y tế",
        description: "Hướng dẫn đăng ký bảo hiểm y tế quốc gia cho người nước ngoài",
        image: "/placeholder.svg?height=400&width=400&text=Bảo+hiểm+y+tế",
        time: "Thứ Năm, 15:00",
        location: "Trực tuyến qua Zoom",
        type: "healthcare" as const
      },
      {
        id: "health-2",
        title: "Danh sách bệnh viện có nhân viên nói tiếng Anh",
        description: "Tổng hợp các bệnh viện và phòng khám có nhân viên nói tiếng Anh",
        image: "/placeholder.svg?height=400&width=400&text=Bệnh+viện",
        time: "Cập nhật hàng tháng",
        location: "Toàn quốc",
        type: "healthcare" as const
      },
      {
        id: "health-3",
        title: "Hỗ trợ sức khỏe tâm thần",
        description: "Dịch vụ tư vấn tâm lý cho người nước ngoài bằng nhiều ngôn ngữ",
        image: "/placeholder.svg?height=400&width=400&text=Sức+khỏe+tâm+thần",
        time: "Theo lịch hẹn",
        location: "Trực tuyến hoặc tại Quận 1, TP.HCM",
        type: "healthcare" as const
      }
    ],
    financial: [
      {
        id: "finance-1",
        title: "Hướng dẫn mở tài khoản ngân hàng",
        description: "Quy trình và giấy tờ cần thiết để mở tài khoản ngân hàng tại Đài Loan",
        image: "/placeholder.svg?height=400&width=400&text=Tài+khoản+ngân+hàng",
        time: "Thứ Ba, 14:00",
        location: "Trực tuyến qua Zoom",
        type: "financial" as const
      },
      {
        id: "finance-2",
        title: "So sánh dịch vụ chuyển tiền quốc tế",
        description: "Phân tích chi phí và tốc độ của các dịch vụ chuyển tiền quốc tế",
        image: "/placeholder.svg?height=400&width=400&text=Chuyển+tiền",
        time: "Cập nhật hàng tháng",
        location: "Trực tuyến",
        type: "financial" as const
      },
      {
        id: "finance-3",
        title: "Hỗ trợ khai thuế",
        description: "Hướng dẫn khai thuế thu nhập cá nhân cho người nước ngoài",
        image: "/placeholder.svg?height=400&width=400&text=Khai+thuế",
        time: "Tháng 3-5 hàng năm",
        location: "Trực tuyến hoặc tại Quận 1, TP.HCM",
        type: "financial" as const
      }
    ],
    transportation: [
      {
        id: "transport-1",
        title: "Hướng dẫn đổi bằng lái xe",
        description: "Quy trình đổi bằng lái xe quốc tế sang bằng lái xe Đài Loan",
        image: "/placeholder.svg?height=400&width=400&text=Bằng+lái+xe",
        time: "Thứ Tư, 10:00",
        location: "Trực tuyến qua Zoom",
        type: "transportation" as const
      },
      {
        id: "transport-2",
        title: "Hướng dẫn sử dụng phương tiện công cộng",
        description: "Cách sử dụng xe buýt, tàu điện ngầm và các phương tiện công cộng khác",
        image: "/placeholder.svg?height=400&width=400&text=Phương+tiện+công+cộng",
        time: "Thứ Bảy, 09:00",
        location: "Quận 1, TP.HCM",
        type: "transportation" as const
      },
      {
        id: "transport-3",
        title: "Dịch vụ cho thuê xe máy",
        description: "Dịch vụ cho thuê xe máy với giá ưu đãi cho người nước ngoài",
        image: "/placeholder.svg?height=400&width=400&text=Thuê+xe+máy",
        time: "Hàng ngày, 08:00-18:00",
        location: "Quận 1, TP.HCM",
        type: "transportation" as const
      }
    ],
    daily: [
      {
        id: "daily-1",
        title: "Cửa hàng thực phẩm quốc tế",
        description: "Danh sách các cửa hàng bán thực phẩm và gia vị quốc tế",
        image: "/placeholder.svg?height=400&width=400&text=Thực+phẩm+quốc+tế",
        time: "Cập nhật hàng tháng",
        location: "Toàn thành phố",
        type: "daily" as const
      },
      {
        id: "daily-2",
        title: "Dịch vụ cắt tóc đa ngôn ngữ",
        description: "Salon tóc với nhân viên nói được tiếng Anh và các ngôn ngữ khác",
        image: "/placeholder.svg?height=400&width=400&text=Salon+tóc",
        time: "Hàng ngày, 10:00-20:00",
        location: "Quận 1, TP.HCM",
        type: "daily" as const
      },
      {
        id: "daily-3",
        title: "Dịch vụ sửa chữa nhà cửa",
        description: "Dịch vụ sửa chữa nhà cửa với nhân viên nói tiếng Anh",
        image: "/placeholder.svg?height=400&width=400&text=Sửa+chữa+nhà",
        time: "Theo lịch hẹn",
        location: "Toàn thành phố",
        type: "daily" as const
      }
    ]
  })

  // Kiểm tra trạng thái đăng nhập khi trang được tải
  useEffect(() => {
    const authStatus = localStorage.getItem("lifeTradeAuth")
    if (authStatus === "authenticated") {
      setIsLoggedIn(true)
      const storedUserType = localStorage.getItem("lifeTradeUserType") as "student" | "married" | "worker" | null
      setUserType(storedUserType)
    } else {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      router.push("/store/life-trade/auth")
    }
  }, [router])

  const handleAddActivity = (type: "food" | "accommodation" | "travel" | "language" | "culture" | "legal" | "healthcare" | "financial" | "transportation" | "daily") => {
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

  const handleViewMore = (type: "food" | "accommodation" | "travel" | "language" | "culture" | "legal" | "healthcare" | "financial" | "transportation" | "daily") => {
    setViewMoreType(type)
  }

  const getViewMoreTitle = (type: "food" | "accommodation" | "travel" | "language" | "culture" | "legal" | "healthcare" | "financial" | "transportation" | "daily") => {
    switch (type) {
      case "food":
        return language === "vi" ? "Tất cả trải nghiệm ẩm thực" : language === "zh-TW" ? "所有美食體驗" : "All Food Experiences"
      case "accommodation":
        return language === "vi" ? "Tất cả chỗ ở" : language === "zh-TW" ? "所有住宿" : "All Accommodations"
      case "travel":
        return language === "vi" ? "Tất cả hoạt động cùng đi" : language === "zh-TW" ? "所有一起探索活動" : "All Travel Activities"
      case "language":
        return language === "vi" ? "Tất cả lớp học ngôn ngữ" : language === "zh-TW" ? "所有語言課程" : "All Language Classes"
      case "culture":
        return language === "vi" ? "Tất cả tài nguyên văn hóa" : language === "zh-TW" ? "所有文化資源" : "All Cultural Resources"
      case "legal":
        return language === "vi" ? "Tất cả dịch vụ pháp lý" : language === "zh-TW" ? "所有法律服務" : "All Legal Services"
      case "healthcare":
        return language === "vi" ? "Tất cả dịch vụ y tế" : language === "zh-TW" ? "所有醫療服務" : "All Healthcare Services"
      case "financial":
        return language === "vi" ? "Tất cả dịch vụ tài chính" : language === "zh-TW" ? "所有金融服務" : "All Financial Services"
      case "transportation":
        return language === "vi" ? "Tất cả dịch vụ giao thông" : language === "zh-TW" ? "所有交通服務" : "All Transportation Services"
      case "daily":
        return language === "vi" ? "Tất cả dịch vụ đời sống" : language === "zh-TW" ? "所有日常生活服務" : "All Daily Life Services"
      default:
        return language === "vi" ? "Tất cả hoạt động" : language === "zh-TW" ? "所有活動" : "All Activities"
    }
  }

  // Get user type display name
  const getUserTypeDisplay = () => {
    switch (userType) {
      case "student":
        return language === "vi" ? "Sinh viên quốc tế" : language === "zh-TW" ? "國際學生" : "International Student"
      case "married":
        return language === "vi" ? "Người nước ngoài kết hôn" : language === "zh-TW" ? "外籍配偶" : "Foreign Spouse"
      case "worker":
        return language === "vi" ? "Người lao động nước ngoài" : language === "zh-TW" ? "外籍工作者" : "Foreign Worker"
      default:
        return language === "vi" ? "Khách" : language === "zh-TW" ? "訪客" : "Guest"
    }
  }

  // Get recommended services based on user type
  const getRecommendedServices = () => {
    switch (userType) {
      case "student":
        return [
          { type: "language", title: language === "vi" ? "Lớp học tiếng Việt" : language === "zh-TW" ? "中文課程" : "Chinese Classes" },
          { type: "accommodation", title: language === "vi" ? "Nhà ở sinh viên" : language === "zh-TW" ? "學生住宿" : "Student Housing" },
          { type: "culture", title: language === "vi" ? "Hội nhóm sinh viên" : language === "zh-TW" ? "學生社團" : "Student Clubs" }
        ]
      case "married":
        return [
          { type: "legal", title: language === "vi" ? "Thủ tục cư trú" : language === "zh-TW" ? "居留手續" : "Residency Procedures" },
          { type: "culture", title: language === "vi" ? "Hòa nhập văn hóa" : language === "zh-TW" ? "文化融合" : "Cultural Integration" },
          { type: "healthcare", title: language === "vi" ? "Bảo hiểm gia đình" : language === "zh-TW" ? "家庭保險" : "Family Insurance" }
        ]
      case "worker":
        return [
          { type: "legal", title: language === "vi" ? "Giấy phép lao động" : language === "zh-TW" ? "工作許可" : "Work Permits" },
          { type: "financial", title: language === "vi" ? "Chuyển tiền quốc tế" : language === "zh-TW" ? "國際匯款" : "Money Transfers" },
          { type: "transportation", title: language === "vi" ? "Đi lại hàng ngày" : language === "zh-TW" ? "日常交通" : "Daily Commute" }
        ]
      default:
        return [
          { type: "food", title: language === "vi" ? "Ẩm thực địa phương" : language === "zh-TW" ? "當地美食" : "Local Cuisine" },
          { type: "travel", title: language === "vi" ? "Khám phá thành phố" : language === "zh-TW" ? "城市探索" : "City Exploration" },
          { type: "language", title: language === "vi" ? "Học ngôn ngữ" : language === "zh-TW" ? "語言學習" : "Language Learning" }
        ]
    }
  }

  if (!isLoggedIn) {
    return null // Sẽ chuyển hướng đến trang đăng nhập
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("lifeTrade.title")}</h1>
          <p className="text-gray-600 mt-2">
            {t("lifeTrade.description")}
          </p>
          {userType && (
            <div className="mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {getUserTypeDisplay()}
              </Badge>
            </div>
          )}
        </div>
        <MembershipStatus />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-12 gap-2 overflow-x-auto">
          <TabsTrigger value="overview" className="md:col-span-2">{t("lifeTrade.overview")}</TabsTrigger>
          <TabsTrigger value="food">{t("lifeTrade.food")}</TabsTrigger>
          <TabsTrigger value="accommodation">{t("lifeTrade.accommodation")}</TabsTrigger>
          <TabsTrigger value="travel">{t("lifeTrade.travel")}</TabsTrigger>
          <TabsTrigger value="language">{t("lifeTrade.language")}</TabsTrigger>
          <TabsTrigger value="culture">{t("lifeTrade.culture")}</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="transportation">Transport</TabsTrigger>
          <TabsTrigger value="daily">Daily Life</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* User Type Specific Recommendations */}
          {userType && (
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {language === "vi" 
                    ? `Chào mừng, ${getUserTypeDisplay()}!` 
                    : language === "zh-TW" 
                      ? `歡迎，${getUserTypeDisplay()}！` 
                      : `Welcome, ${getUserTypeDisplay()}!`}
                </h2>
                <p className="text-gray-700 mb-4">
                  {language === "vi"
                    ? "Dựa trên hồ sơ của bạn, đây là một số dịch vụ được đề xuất:"
                    : language === "zh-TW"
                      ? "根據您的資料，以下是一些推薦的服務："
                      : "Based on your profile, here are some recommended services:"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getRecommendedServices().map((service, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="h-auto py-4 justify-start bg-white hover:bg-blue-50" 
                      onClick={() => setActiveTab(service.type)}
                    >
                      {service.type === "food" && <ChefHat className="h-5 w-5 mr-2 text-orange-500" />}
                      {service.type === "accommodation" && <Home className="h-5 w-5 mr-2 text-blue-500" />}
                      {service.type === "travel" && <Users2 className="h-5 w-5 mr-2 text-purple-500" />}
                      {service.type === "language" && <School className="h-5 w-5 mr-2 text-green-500" />}
                      {service.type === "culture" && <Book className="h-5 w-5 mr-2 text-red-500" />}
                      {service.type === "legal" && <FileCheck className="h-5 w-5 mr-2 text-indigo-500" />}
                      {service.type === "healthcare" && <Stethoscope className="h-5 w-5 mr-2 text-pink-500" />}
                      {service.type === "financial" && <CreditCard className="h-5 w-5 mr-2 text-emerald-500" />}
                      {service.type === "transportation" && <Car className="h-5 w-5 mr-2 text-amber-500" />}
                      {service.type === "daily" && <ShoppingBag className="h-5 w-5 mr-2 text-cyan-500" />}
                      <div className="text-left">
                        <div className="font-medium">{service.title}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

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
                      <li>University/college students from abroad</li>
                      <li>Language school students</li>
                      <li>Exchange students</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">👰 {t("targetUsers.married")}:</h4>
                    <ul className="ml-6 list-disc text-gray-600 space-y-1">
                      <li>{t("targetUsers.married.desc")}</li>
                      <li>Married to Taiwanese citizens</li>
                      <li>Need integration support</li>
                      <li>Language and cultural adaptation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">👷 Foreign Workers:</h4>
                    <ul className="ml-6 list-disc text-gray-600 space-y-1">
                      <li>Professional workers</li>
                      <li>Blue-collar workers</li>
                      <li>Digital nomads</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("features.title")}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Multi-language support with 7 languages</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("food")}>
                      <ChefHat className="h-5 w-5 mr-2 text-orange-500" />
                      <div className="text-left">
                        <div className="font-medium">{t("features.food")}</div>
                        <div className="text-xs text-gray-500">{t("features.food.desc")}</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("accommodation")}>
                      <Home className="h-5 w-5 mr-2 text-blue-500" />
                      <div className="text-left">
                        <div className="font-medium">{t("features.accommodation")}</div>
                        <div className="text-xs text-gray-500">{t("features.accommodation.desc")}</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("travel")}>
                      <Users2 className="h-5 w-5 mr-2 text-purple-500" />
                      <div className="text-left">
                        <div className="font-medium">{t("features.travel")}</div>
                        <div className="text-xs text-gray-500">{t("features.travel.desc")}</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("language")}>
                      <School className="h-5 w-5 mr-2 text-green-500" />
                      <div className="text-left">
                        <div className="font-medium">{t("features.language")}</div>
                        <div className="text-xs text-gray-500">{t("features.language.desc")}</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("culture")}>
                      <Book className="h-5 w-5 mr-2 text-red-500" />
                      <div className="text-left">
                        <div className="font-medium">{t("features.culture")}</div>
                        <div className="text-xs text-gray-500">{t("features.culture.desc")}</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("legal")}>
                      <FileCheck className="h-5 w-5 mr-2 text-indigo-500" />
                      <div className="text-left">
                        <div className="font-medium">Legal Services</div>
                        <div className="text-xs text-gray-500">Visa & documentation help</div>
                      </div>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("healthcare")}>
                      <Stethoscope className="h-5 w-5 mr-2 text-pink-500" />
                      <div className="text-left">
                        <div className="font-medium">Healthcare</div>
                        <div className="text-xs text-gray-500">Medical services</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("financial")}>
                      <CreditCard className="h-5 w-5 mr-2 text-emerald-500" />
                      <div className="text-left">
                        <div className="font-medium">Financial</div>
                        <div className="text-xs text-gray-500">Banking & money</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("transportation")}>
                      <Car className="h-5 w-5 mr-2 text-amber-500" />
                      <div className="text-left">
                        <div className="font-medium">Transport</div>
                        <div className="text-xs text-gray-500">Getting around</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => setActiveTab("daily")}>
                      <ShoppingBag className="h-5 w-5 mr-2 text-cyan-500" />
                      <div className="text-left">
                        <div className="font-medium">Daily Life</div>
                        <div className="text-xs text-gray-500">Everyday services</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Interactive Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Help Desk Chat</div>
                        <div className="text-xs text-gray-500">AI-powered assistance</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
                      <div className="text-left">
                        <div className="font-medium">Community Forum</div>
                        <div className="text-xs text-gray-500">Connect with others</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <Building className="h-5 w-5 mr-2 text-purple-600" />
                      <div className="text-left">
                        <div className="font-medium">Service Directory</div>
                        <div className="text-xs text-gray-500">Find verified providers</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <Calendar className="h-5 w-5 mr-2 text-red-600" />
                      <div className="text-left">
                        <div className="font-medium">Event Calendar</div>
                        <div className="text-xs text-gray-500">Community activities</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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

        {/* Legal & Documentation Tab */}
        <TabsContent value="legal" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Legal & Documentation</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("legal")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Legal Service
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-indigo-800">Documentation Assistance</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <FileCheck className="h-5 w-5 text-indigo-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Visa & ARC Services</p>
                        <p className="text-sm text-gray-600">Application assistance, renewal reminders, and status tracking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-indigo-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Translation Services</p>
                        <p className="text-sm text-gray-600">Official document translation with certification for government use</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-indigo-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Legal Consultations</p>
                        <p className="text-sm text-gray-600">Connect with lawyers specializing in immigration and foreigner rights</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Document+Templates" 
                        alt="Document Templates"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Multilingual Document Templates</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Rental agreements</li>
                        <li>• Employment contracts</li>
                        <li>• Power of attorney forms</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Government+Offices" 
                        alt="Government Offices"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Government Office Guide</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Office locations and hours</li>
                        <li>• Required documents checklist</li>
                        <li>• Appointment booking assistance</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.legal.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="legal"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("legal")}>
              View More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Healthcare Tab */}
        <TabsContent value="healthcare" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Healthcare Services</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("healthcare")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Healthcare Service
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-pink-800">Healthcare Support</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Stethoscope className="h-5 w-5 text-pink-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Multilingual Medical Directory</p>
                        <p className="text-sm text-gray-600">Find doctors and hospitals with staff speaking your language</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-pink-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Insurance Guidance</p>
                        <p className="text-sm text-gray-600">Step-by-step guide to Taiwan's National Health Insurance system</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-pink-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Mental Health Resources</p>
                        <p className="text-sm text-gray-600">Counseling services in multiple languages for expats and international students</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Medical+Translation" 
                        alt="Medical Translation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Medical Translation Services</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• On-demand translation</li>
                        <li>• Medical terminology glossary</li>
                        <li>• Prescription translation</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Emergency+Guide" 
                        alt="Emergency Guide"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Emergency Response Guide</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Emergency contact numbers</li>
                        <li>• Multilingual emergency phrases</li>
                        <li>• Hospital emergency room locations</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.healthcare.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="healthcare"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("healthcare")}>
              View More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Financial Services Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Financial Services</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("financial")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Financial Service
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-800">Financial Assistance</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CreditCard className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Banking for Foreigners</p>
                        <p className="text-sm text-gray-600">Guide to opening accounts with foreigner-friendly banks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">International Money Transfers</p>
                        <p className="text-sm text-gray-600">Compare fees and exchange rates across different services</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Tax Guidance</p>
                        <p className="text-sm text-gray-600">Tax filing assistance for foreigners with different residency statuses</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Banking+Guide" 
                        alt="Banking Guide"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Banking Guide</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Required documents</li>
                        <li>• English-speaking branches</li>
                        <li>• Online banking in English</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Financial+Planning" 
                        alt="Financial Planning"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Financial Planning</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Cost of living calculator</li>
                        <li>• Savings strategies</li>
                        <li>• Investment options for foreigners</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.financial.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="financial"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("financial")}>
              View More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Transportation Tab */}
        <TabsContent value="transportation" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Transportation Services</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("transportation")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Transportation Service
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-amber-800">Getting Around Taiwan</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Car className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Driver's License Conversion</p>
                        <p className="text-sm text-gray-600">Step-by-step guide to converting your foreign license</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Public Transportation Guide</p>
                        <p className="text-sm text-gray-600">Comprehensive guide to buses, MRT, trains and payment methods</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Transportation Apps</p>
                        <p className="text-sm text-gray-600">Recommended apps for navigation, ride-hailing, and public transit</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Scooter+Rental" 
                        alt="Scooter Rental"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Vehicle Rental Services</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Scooter rental with English support</li>
                        <li>• Car rental with international license</li>
                        <li>• Long-term rental options</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Moving+Services" 
                        alt="Moving Services"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Moving & Relocation</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Apartment moving services</li>
                        <li>• International shipping</li>
                        <li>• Furniture assembly</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.transportation.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="transportation"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("transportation")}>
              View More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Daily Life Services Tab */}
        <TabsContent value="daily" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Daily Life Services</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("daily")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Daily Life Service
              </Button>
            )}
          </div>
          
          <Card className="bg-gradient-to-r from-cyan-50 to-sky-50 border-cyan-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-800">Everyday Essentials</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <ShoppingBag className="h-5 w-5 text-cyan-600 mt-0.5" />
                      <div>
                        <p className="font-medium">International Groceries</p>
                        <p className="text-sm text-gray-600">Find stores with products from your home country</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Home className="h-5 w-5 text-cyan-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Home Services</p>
                        <p className="text-sm text-gray-600">Repair, cleaning, and maintenance with English-speaking staff</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-cyan-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Personal Services</p>
                        <p className="text-sm text-gray-600">Haircuts, beauty services, and more with language support</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=International+Stores" 
                        alt="International Stores"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">International Store Directory</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Specialty food stores</li>
                        <li>• International bookstores</li>
                        <li>• Imported goods shops</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image 
                        src="/placeholder.svg?height=200&width=400&text=Service+Providers" 
                        alt="Service Providers"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Multilingual Service Providers</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Verified service quality</li>
                        <li>• Language capabilities listed</li>
                        <li>• Online booking available</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.daily.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                type="daily"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => handleViewMore("daily")}>
              View More
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
    </div>
  )
}
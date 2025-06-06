"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MembershipStatus } from "@/components/store/MembershipStatus"
import { AddActivityForm } from "@/components/store/AddActivityForm"
import { useMembership } from "@/components/store/MembershipProvider"
import { ChefHat, Home, Users2, GraduationCap, School, Plus, ArrowRight, MapPin, Book, Star, FileText, Video, Download, Shield, Clock, Target } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function LifeTradePage() {
  const router = useRouter()
  const { isPremiumMember } = useMembership()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [addActivityType, setAddActivityType] = useState<"food" | "accommodation" | "travel" | "language" | "courses" | "cultural">("food")
  const { t, language } = useI18n()

  // Registration dialog state
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [registrationTitle, setRegistrationTitle] = useState("")
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Kiểm tra trạng thái đăng nhập khi trang được tải
  useEffect(() => {
    const authStatus = localStorage.getItem("lifeTradeAuth")
    if (authStatus === "authenticated") {
      setIsLoggedIn(true)
    } else {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      router.push("/store/life-trade/auth")
    }
  }, [router])

  const handleAddActivity = (type: "food" | "accommodation" | "travel" | "language" | "courses" | "cultural") => {
    if (!isPremiumMember) {
      return
    }
    setAddActivityType(type)
    setShowAddActivity(true)
  }

  const handleAddActivitySuccess = () => {
    setShowAddActivity(false)
    // Hiển thị thông báo thành công hoặc làm mới dữ liệu
  }

  const openRegistrationDialog = (title: string) => {
    setRegistrationTitle(title)
    setRegistrationOpen(true)
    setRegistrationForm({
      name: "",
      email: "",
      phone: "",
      notes: ""
    })
  }

  const handleRegistrationSubmit = () => {
    // Validate form
    if (!registrationForm.name || !registrationForm.email || !registrationForm.phone) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Họ tên, email và số điện thoại là bắt buộc",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setRegistrationOpen(false)
      
      toast({
        title: "Đăng ký thành công!",
        description: `Bạn đã đăng ký thành công cho "${registrationTitle}". Chúng tôi sẽ liên hệ với bạn sớm.`,
      })
    }, 1500)
  }

  if (!isLoggedIn) {
    return null // Sẽ chuyển hướng đến trang đăng nhập
  }

  if (showAddActivity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => setShowAddActivity(false)} className="mb-6">
          ← {t("button.back")}
        </Button>
        <AddActivityForm 
          moduleType={addActivityType} 
          onSuccess={handleAddActivitySuccess} 
          onCancel={() => setShowAddActivity(false)} 
        />
      </div>
    )
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
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Ẩm+thực+Việt+Nam" 
                  alt="Ẩm thực Việt Nam"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Lớp học nấu ăn món Việt</h3>
                <p className="text-gray-600 mb-4">Học cách nấu các món ăn truyền thống Việt Nam với đầu bếp chuyên nghiệp</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Thứ Bảy, 14:00</p>
                    <p>Quận 1, TP.HCM</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Lớp học nấu ăn món Việt")}>
                    {t("button.register")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Ẩm+thực+đường+phố" 
                  alt="Ẩm thực đường phố"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tour ẩm thực đường phố</h3>
                <p className="text-gray-600 mb-4">Khám phá các món ăn đường phố nổi tiếng với hướng dẫn viên địa phương</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Chủ Nhật, 18:00</p>
                    <p>Quận 4, TP.HCM</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Tour ẩm thực đường phố")}>
                    {t("button.register")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Bữa+tối+gia+đình" 
                  alt="Bữa tối gia đình"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Bữa tối gia đình Việt Nam</h3>
                <p className="text-gray-600 mb-4">Trải nghiệm bữa tối ấm cúng cùng gia đình Việt Nam và tìm hiểu văn hóa địa phương</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Thứ Sáu, 19:00</p>
                    <p>Quận 7, TP.HCM</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Bữa tối gia đình Việt Nam")}>
                    {t("button.register")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">
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
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Phòng+trọ" 
                  alt="Phòng trọ"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Phòng trọ trao đổi</h3>
                <p className="text-gray-600 mb-4">Trao đổi chỗ ở miễn phí với việc dạy tiếng Anh 2 buổi/tuần</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Quận 2, TP.HCM</p>
                    <p>Có sẵn: Ngay bây giờ</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Phòng trọ trao đổi")}>
                    {t("button.contact")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Căn+hộ" 
                  alt="Căn hộ"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Căn hộ giảm giá cho sinh viên</h3>
                <p className="text-gray-600 mb-4">Giảm 30% tiền thuê cho sinh viên quốc tế có thể hỗ trợ việc nhà</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Quận 7, TP.HCM</p>
                    <p>Có sẵn: Tháng sau</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Căn hộ giảm giá cho sinh viên")}>
                    {t("button.contact")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Homestay" 
                  alt="Homestay"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Homestay với gia đình Việt</h3>
                <p className="text-gray-600 mb-4">Ở cùng gia đình Việt Nam, trải nghiệm văn hóa và học tiếng Việt</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Quận 3, TP.HCM</p>
                    <p>Có sẵn: Ngay bây giờ</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Homestay với gia đình Việt")}>
                    {t("button.contact")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">
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
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Tour+thành+phố" 
                  alt="Tour thành phố"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tour khám phá thành phố</h3>
                <p className="text-gray-600 mb-4">Cùng khám phá những địa điểm nổi tiếng và ít người biết đến ở TP.HCM</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Thứ Bảy, 09:00</p>
                    <p>Quận 1, TP.HCM</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Tour khám phá thành phố")}>
                    {t("button.join")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Dã+ngoại" 
                  alt="Dã ngoại"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Dã ngoại cuối tuần</h3>
                <p className="text-gray-600 mb-4">Cùng nhau đi dã ngoại, giao lưu và kết bạn mới</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Chủ Nhật, 07:00</p>
                    <p>Vũng Tàu</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Dã ngoại cuối tuần")}>
                    {t("button.join")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Chợ+đêm" 
                  alt="Chợ đêm"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Khám phá chợ đêm</h3>
                <p className="text-gray-600 mb-4">Cùng nhau khám phá chợ đêm sôi động và ẩm thực đường phố</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Thứ Sáu, 19:00</p>
                    <p>Quận 5, TP.HCM</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Khám phá chợ đêm")}>
                    {t("button.join")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">
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
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Tiếng+Việt" 
                  alt="Tiếng Việt"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Lớp học tiếng Việt cơ bản</h3>
                <p className="text-gray-600 mb-4">Học tiếng Việt giao tiếp cơ bản cho người nước ngoài</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Thứ Ba & Thứ Năm, 18:00</p>
                    <p>Quận 1, TP.HCM</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Lớp học tiếng Việt cơ bản")}>
                    {t("button.register")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Trao+đổi+ngôn+ngữ" 
                  alt="Trao đổi ngôn ngữ"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Cafe trao đổi ngôn ngữ</h3>
                <p className="text-gray-600 mb-4">Gặp gỡ và trao đổi tiếng Việt - tiếng Anh tại quán cafe</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Thứ Bảy, 15:00</p>
                    <p>Quận 3, TP.HCM</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Cafe trao đổi ngôn ngữ")}>
                    {t("button.join")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Tiếng+Hàn" 
                  alt="Tiếng Hàn"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Lớp học tiếng Hàn</h3>
                <p className="text-gray-600 mb-4">Học tiếng Hàn giao tiếp với giáo viên người Hàn Quốc</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Thứ Tư & Thứ Sáu, 19:00</p>
                    <p>Quận 7, TP.HCM</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Lớp học tiếng Hàn")}>
                    {t("button.register")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">
              {t("button.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="culture" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("culture.title")}</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("cultural")}>
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
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Hướng+dẫn+văn+hóa" 
                  alt="Hướng dẫn văn hóa"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Hướng dẫn văn hóa Việt Nam</h3>
                <p className="text-gray-600 mb-4">Tìm hiểu về phong tục, tập quán và nghi thức xã hội của Việt Nam</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Khóa học trực tuyến</p>
                    <p>5 mô-đun, tự học</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Hướng dẫn văn hóa Việt Nam")}>
                    {t("button.viewMore")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Hỗ+trợ+pháp+lý" 
                  alt="Hỗ trợ pháp lý"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Hội thảo hỗ trợ pháp lý</h3>
                <p className="text-gray-600 mb-4">Tư vấn về thị thực, giấy phép lao động và quyền hợp pháp</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Thứ Bảy, 10:00</p>
                    <p>Trực tuyến qua Zoom</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Hội thảo hỗ trợ pháp lý")}>
                    {t("button.register")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <Image 
                  src="/placeholder.svg?height=200&width=400&text=Lễ+hội+văn+hóa" 
                  alt="Lễ hội văn hóa"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Lễ hội giao lưu văn hóa</h3>
                <p className="text-gray-600 mb-4">Tham gia lễ hội với âm nhạc, ẩm thực và nghệ thuật từ nhiều nền văn hóa</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Chủ Nhật, 12:00-20:00</p>
                    <p>Công viên Lê Văn Tám</p>
                  </div>
                  <Button size="sm" onClick={() => openRegistrationDialog("Lễ hội giao lưu văn hóa")}>
                    {t("button.join")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">
              {t("button.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Registration Dialog */}
      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "vi" ? "Đăng ký tham gia: " : language === "zh-TW" ? "報名參加: " : "Register for: "}
              {registrationTitle}
            </DialogTitle>
            <DialogDescription>
              {language === "vi" 
                ? "Vui lòng điền thông tin để đăng ký tham gia hoạt động này." 
                : language === "zh-TW" 
                  ? "請填寫您的資料以報名參加此活動。" 
                  : "Please fill in your information to register for this activity."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                {language === "vi" ? "Họ và tên" : language === "zh-TW" ? "姓名" : "Full Name"} *
              </Label>
              <Input 
                id="name" 
                placeholder={language === "vi" ? "Nhập họ và tên của bạn" : language === "zh-TW" ? "輸入您的姓名" : "Enter your full name"}
                value={registrationForm.name}
                onChange={(e) => setRegistrationForm({...registrationForm, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email" 
                type="email"
                placeholder={language === "vi" ? "Nhập địa chỉ email của bạn" : language === "zh-TW" ? "輸入您的電子郵件" : "Enter your email address"}
                value={registrationForm.email}
                onChange={(e) => setRegistrationForm({...registrationForm, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === "vi" ? "Số điện thoại" : language === "zh-TW" ? "電話號碼" : "Phone Number"} *
              </Label>
              <Input 
                id="phone" 
                placeholder={language === "vi" ? "Nhập số điện thoại của bạn" : language === "zh-TW" ? "輸入您的電話號碼" : "Enter your phone number"}
                value={registrationForm.phone}
                onChange={(e) => setRegistrationForm({...registrationForm, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">
                {language === "vi" ? "Ghi chú (tùy chọn)" : language === "zh-TW" ? "備註（選填）" : "Notes (optional)"}
              </Label>
              <Textarea 
                id="notes" 
                placeholder={language === "vi" ? "Nhập thông tin bổ sung hoặc yêu cầu đặc biệt" : language === "zh-TW" ? "輸入補充資訊或特殊要求" : "Enter additional information or special requests"}
                value={registrationForm.notes}
                onChange={(e) => setRegistrationForm({...registrationForm, notes: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setRegistrationOpen(false)}>
              {language === "vi" ? "Hủy" : language === "zh-TW" ? "取消" : "Cancel"}
            </Button>
            <Button onClick={handleRegistrationSubmit} disabled={isSubmitting}>
              {isSubmitting 
                ? (language === "vi" ? "Đang xử lý..." : language === "zh-TW" ? "處理中..." : "Processing...") 
                : (language === "vi" ? "Đăng ký" : language === "zh-TW" ? "報名" : "Register")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
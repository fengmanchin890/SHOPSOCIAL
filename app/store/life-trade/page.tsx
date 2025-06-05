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
import { ChefHat, Home, Users2, GraduationCap, School, Plus, ArrowRight } from "lucide-react"

export default function LifeTradePage() {
  const router = useRouter()
  const { isPremiumMember } = useMembership()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [addActivityType, setAddActivityType] = useState<"food" | "accommodation" | "travel" | "language" | "courses">("food")

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

  const handleAddActivity = (type: "food" | "accommodation" | "travel" | "language" | "courses") => {
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

  if (!isLoggedIn) {
    return null // Sẽ chuyển hướng đến trang đăng nhập
  }

  if (showAddActivity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline\" onClick={() => setShowAddActivity(false)} className="mb-6">
          ← Quay lại
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
          <h1 className="text-3xl font-bold text-gray-900">Nền tảng thương mại đời sống</h1>
          <p className="text-gray-600 mt-2">
            Kết nối cộng đồng người Việt tại nước ngoài và người nước ngoài tại Việt Nam
          </p>
        </div>
        <MembershipStatus />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="food">Ẩm thực</TabsTrigger>
          <TabsTrigger value="accommodation">Nhà ở</TabsTrigger>
          <TabsTrigger value="travel">Cùng đi</TabsTrigger>
          <TabsTrigger value="language">Ngôn ngữ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center p-6">
                    <h2 className="text-2xl font-bold mb-2">Chào mừng đến với Nền tảng thương mại đời sống</h2>
                    <p>Kết nối, chia sẻ và trải nghiệm cuộc sống mới</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">🎯 Nhóm người dùng mục tiêu</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">👩‍🎓 Sinh viên quốc tế:</h4>
                    <ul className="ml-6 list-disc text-gray-600 space-y-1">
                      <li>Chưa quen ngôn ngữ, muốn kết bạn, muốn trải nghiệm văn hóa và ẩm thực địa phương</li>
                      <li>Tìm việc làm thêm, trao đổi nhà ở, tiết kiệm chi phí</li>
                      <li>Luyện ngôn ngữ, tham gia các khóa học thực tế</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">👰 Người nước ngoài kết hôn và định cư:</h4>
                    <ul className="ml-6 list-disc text-gray-600 space-y-1">
                      <li>Muốn hòa nhập cuộc sống địa phương, tham gia hoạt động cộng đồng</li>
                      <li>Học ngôn ngữ địa phương, kết bạn mới</li>
                      <li>Tìm cơ hội học tập và việc làm thêm</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Các tính năng chính</CardTitle>
                  <CardDescription>Khám phá các dịch vụ độc đáo của nền tảng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                      <Link href="/store/life-trade?tab=food">
                        <ChefHat className="h-5 w-5 mr-2 text-orange-500" />
                        <div className="text-left">
                          <div className="font-medium">Trải nghiệm ẩm thực</div>
                          <div className="text-xs text-gray-500">Khám phá ẩm thực địa phương</div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                      <Link href="/store/life-trade?tab=accommodation">
                        <Home className="h-5 w-5 mr-2 text-blue-500" />
                        <div className="text-left">
                          <div className="font-medium">Trao đổi nhà ở</div>
                          <div className="text-xs text-gray-500">Tìm chỗ ở hoặc trao đổi</div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                      <Link href="/store/life-trade?tab=travel">
                        <Users2 className="h-5 w-5 mr-2 text-purple-500" />
                        <div className="text-left">
                          <div className="font-medium">Cùng đi khám phá</div>
                          <div className="text-xs text-gray-500">Tìm bạn đồng hành</div>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 justify-start" asChild>
                      <Link href="/store/life-trade?tab=language">
                        <School className="h-5 w-5 mr-2 text-green-500" />
                        <div className="text-left">
                          <div className="font-medium">Trao đổi ngôn ngữ</div>
                          <div className="text-xs text-gray-500">Học và dạy ngôn ngữ</div>
                        </div>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hoạt động gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <ChefHat className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Lớp nấu ăn món Việt</h4>
                        <p className="text-sm text-gray-600">Hướng dẫn nấu phở và các món truyền thống</p>
                        <p className="text-xs text-gray-500 mt-1">Hôm nay, 14:00 - Quận 1, TP.HCM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <School className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Trao đổi tiếng Việt - tiếng Anh</h4>
                        <p className="text-sm text-gray-600">Gặp gỡ hàng tuần tại quán cà phê</p>
                        <p className="text-xs text-gray-500 mt-1">Thứ Bảy, 15:00 - Quận 3, TP.HCM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Tour khám phá chợ Bến Thành</h4>
                        <p className="text-sm text-gray-600">Khám phá ẩm thực và văn hóa chợ truyền thống</p>
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
            <h2 className="text-2xl font-bold">🍱 Trải nghiệm ẩm thực (Eat & Meet)</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("food")}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm trải nghiệm
              </Button>
            )}
          </div>
          
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
                  <Button size="sm">Đăng ký</Button>
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
                  <Button size="sm">Đăng ký</Button>
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
                  <Button size="sm">Đăng ký</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">
              Xem thêm trải nghiệm ẩm thực
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="accommodation" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🏡 Trao đổi nhà ở (Live & Help)</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("accommodation")}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm chỗ ở
              </Button>
            )}
          </div>
          
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
                  <Button size="sm">Liên hệ</Button>
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
                  <Button size="sm">Liên hệ</Button>
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
                  <Button size="sm">Liên hệ</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">
              Xem thêm chỗ ở
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="travel" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🧑‍🤝‍🧑 Cùng đi khám phá (Explore Together)</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("travel")}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm hoạt động
              </Button>
            )}
          </div>
          
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
                  <Button size="sm">Tham gia</Button>
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
                  <Button size="sm">Tham gia</Button>
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
                  <Button size="sm">Tham gia</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">
              Xem thêm hoạt động
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🗣️ Trao đổi ngôn ngữ (Language Swap)</h2>
            {isPremiumMember && (
              <Button onClick={() => handleAddActivity("language")}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm lớp học
              </Button>
            )}
          </div>
          
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
                  <Button size="sm">Đăng ký</Button>
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
                  <Button size="sm">Tham gia</Button>
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
                  <Button size="sm">Đăng ký</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">
              Xem thêm lớp học
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
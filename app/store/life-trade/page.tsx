import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Home, Users, GraduationCap, BookOpen, Plus, Search, Filter, MapPin, Star, Clock, Calendar } from "lucide-react"
import { AddActivityForm } from "@/components/store/AddActivityForm"
import { MembershipStatus } from "@/components/store/MembershipStatus"
import Link from "next/link"

export default function LifeTradePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [addActivityType, setAddActivityType] = useState<"food" | "accommodation" | "travel" | "language" | "courses">("food")

  const handleAddActivity = (type: "food" | "accommodation" | "travel" | "language" | "courses") => {
    setAddActivityType(type)
    setShowAddActivity(true)
    setActiveTab("add")
  }

  const handleActivitySuccess = () => {
    setShowAddActivity(false)
    setActiveTab("overview")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nền tảng thương mại đời sống</h1>
              <p className="text-gray-600 mt-2">Kết nối trải nghiệm, giao lưu văn hóa và học tập</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="food">
                <ChefHat className="h-4 w-4 mr-2" />
                Ẩm thực
              </TabsTrigger>
              <TabsTrigger value="accommodation">
                <Home className="h-4 w-4 mr-2" />
                Nhà ở
              </TabsTrigger>
              <TabsTrigger value="travel">
                <Users className="h-4 w-4 mr-2" />
                Cùng đi
              </TabsTrigger>
              <TabsTrigger value="language">
                <BookOpen className="h-4 w-4 mr-2" />
                Ngôn ngữ
              </TabsTrigger>
              <TabsTrigger value="courses">
                <GraduationCap className="h-4 w-4 mr-2" />
                Khóa học
              </TabsTrigger>
              {showAddActivity && <TabsTrigger value="add">Thêm mới</TabsTrigger>}
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Đối tượng mục tiêu
                    </CardTitle>
                    <CardDescription>Phục vụ nhu cầu đặc biệt của các nhóm người dùng</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-blue-700">👩‍🎓 Sinh viên quốc tế</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Chưa quen ngôn ngữ, muốn kết bạn, trải nghiệm văn hóa và ẩm thực địa phương</li>
                          <li>• Tìm việc làm thêm, trao đổi nhà ở, tiết kiệm chi phí</li>
                          <li>• Luyện ngôn ngữ, tham gia các khóa học thực tế</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-blue-700">👰 Người nhập cư mới</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Muốn hòa nhập cuộc sống địa phương, tham gia hoạt động cộng đồng</li>
                          <li>• Học tiếng Việt/tiếng địa phương, kết bạn mới</li>
                          <li>• Tìm cơ hội học tập và công việc phụ</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hoạt động nổi bật</CardTitle>
                    <CardDescription>Các hoạt động được yêu thích nhất</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                        <ChefHat className="h-8 w-8 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Khám phá ẩm thực đường phố</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" /> Quận 1, TP.HCM
                          <span className="mx-2">•</span>
                          <Star className="h-3 w-3 mr-1" /> 4.8
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" /> 3 giờ
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Trao đổi ngôn ngữ Việt-Anh</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" /> Quận 3, TP.HCM
                          <span className="mx-2">•</span>
                          <Calendar className="h-3 w-3 mr-1" /> Hàng tuần
                          <span className="mx-2">•</span>
                          <Users className="h-3 w-3 mr-1" /> 8 người
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <ChefHat className="h-5 w-5 text-orange-500" />
                      Ẩm thực & Gặp gỡ
                    </CardTitle>
                    <CardDescription>Trải nghiệm ẩm thực địa phương</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">
                      Khám phá ẩm thực địa phương thông qua các tour ẩm thực, lớp nấu ăn và bữa ăn chung với người dân địa phương.
                    </p>
                    <Button onClick={() => handleAddActivity("food")} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm hoạt động ẩm thực
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-500" />
                      Nhà ở & Hỗ trợ
                    </CardTitle>
                    <CardDescription>Tìm chỗ ở trao đổi và giúp đỡ</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">
                      Tìm cơ hội trao đổi nhà ở ngắn hạn, làm việc đổi chỗ ở, giúp đỡ người cao tuổi hoặc dọn dẹp để tiết kiệm chi phí.
                    </p>
                    <Button onClick={() => handleAddActivity("accommodation")} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm chỗ ở trao đổi
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      Cùng đi khám phá
                    </CardTitle>
                    <CardDescription>Kết nối dựa trên sở thích</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">
                      Tìm bạn đồng hành dựa trên sở thích và ngôn ngữ để cùng khám phá thành phố, tham quan chợ, tắm suối nước nóng, xem triển lãm.
                    </p>
                    <Button onClick={() => handleAddActivity("travel")} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Tạo hoạt động cùng đi
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-500" />
                      Trao đổi ngôn ngữ
                    </CardTitle>
                    <CardDescription>Học ngôn ngữ qua trao đổi</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">
                      Tìm đối tác trao đổi ngôn ngữ để nâng cao khả năng tiếng Việt, tiếng địa phương, đồng thời chia sẻ ngôn ngữ của bạn.
                    </p>
                    <Button onClick={() => handleAddActivity("language")} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Tạo lớp trao đổi ngôn ngữ
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-red-500" />
                      Khóa học chuyên môn
                    </CardTitle>
                    <CardDescription>Phát triển kỹ năng mới</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">
                      Tham gia các khóa học giúp phát triển kỹ năng, tăng cường sự tự tin và hòa nhập xã hội tốt hơn.
                    </p>
                    <Button onClick={() => handleAddActivity("courses")} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm khóa học mới
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow border-dashed border-2 flex flex-col justify-center items-center p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-700 mb-2">Thêm hoạt động mới</h3>
                    <p className="text-sm text-gray-500 mb-4">Chia sẻ kỹ năng, kiến thức hoặc tạo trải nghiệm của riêng bạn</p>
                    <Button variant="outline" onClick={() => handleAddActivity("food")}>
                      Bắt đầu
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="food">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Ẩm thực & Gặp gỡ</h2>
                  <Button onClick={() => handleAddActivity("food")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm hoạt động ẩm thực
                  </Button>
                </div>
                <p className="text-gray-600">
                  Khám phá ẩm thực địa phương thông qua các tour ẩm thực, lớp nấu ăn và bữa ăn chung với người dân địa phương.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Tìm kiếm hoạt động ẩm thực..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Loại hoạt động" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả hoạt động</SelectItem>
                    <SelectItem value="tour">Tour ẩm thực</SelectItem>
                    <SelectItem value="cooking">Lớp nấu ăn</SelectItem>
                    <SelectItem value="dining">Ăn cùng người địa phương</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Bộ lọc
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample Food Activities */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Tour+Ẩm+Thực"
                      alt="Tour ẩm thực đường phố"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-orange-500">Tour ẩm thực</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Tour ẩm thực đường phố Sài Gòn</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận 1, TP.HCM
                      <span className="mx-2">•</span>
                      <Star className="h-3 w-3 mr-1" /> 4.8 (24 đánh giá)
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Khám phá các món ăn đường phố nổi tiếng của Sài Gòn với hướng dẫn viên địa phương thông thạo tiếng Anh.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">350.000₫</span>
                        <span className="text-sm text-gray-500">/người</span>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Lớp+Nấu+Ăn"
                      alt="Lớp nấu ăn Việt Nam"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">Lớp nấu ăn</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Lớp học nấu ăn món Việt truyền thống</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận 3, TP.HCM
                      <span className="mx-2">•</span>
                      <Star className="h-3 w-3 mr-1" /> 4.9 (18 đánh giá)
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Học cách nấu các món ăn Việt Nam truyền thống như phở, bánh xèo và gỏi cuốn với đầu bếp chuyên nghiệp.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">450.000₫</span>
                        <span className="text-sm text-gray-500">/người</span>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Ăn+Tối+Cùng+Gia+Đình"
                      alt="Ăn tối cùng gia đình Việt"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-purple-500">Ăn cùng người địa phương</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Bữa tối gia đình Việt Nam</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận 7, TP.HCM
                      <span className="mx-2">•</span>
                      <Star className="h-3 w-3 mr-1" /> 5.0 (12 đánh giá)
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Trải nghiệm bữa tối ấm cúng cùng gia đình Việt Nam, thưởng thức món ăn gia truyền và tìm hiểu văn hóa địa phương.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">300.000₫</span>
                        <span className="text-sm text-gray-500">/người</span>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="accommodation">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Nhà ở & Hỗ trợ</h2>
                  <Button onClick={() => handleAddActivity("accommodation")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm chỗ ở trao đổi
                  </Button>
                </div>
                <p className="text-gray-600">
                  Tìm cơ hội trao đổi nhà ở ngắn hạn, làm việc đổi chỗ ở, giúp đỡ người cao tuổi hoặc dọn dẹp để tiết kiệm chi phí.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Tìm kiếm chỗ ở..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Loại chỗ ở" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại chỗ ở</SelectItem>
                    <SelectItem value="exchange">Trao đổi nhà</SelectItem>
                    <SelectItem value="workstay">Làm việc đổi chỗ ở</SelectItem>
                    <SelectItem value="eldercare">Chăm sóc người cao tuổi</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Bộ lọc
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample Accommodation Listings */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Trao+Đổi+Nhà"
                      alt="Trao đổi nhà ở Quận 2"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-500">Trao đổi nhà</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Căn hộ 2 phòng ngủ tại Quận 2</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận 2, TP.HCM
                      <span className="mx-2">•</span>
                      <Users className="h-3 w-3 mr-1" /> Phù hợp cho 2-3 người
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Căn hộ hiện đại với đầy đủ tiện nghi, gần trung tâm thương mại và phương tiện giao thông công cộng.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="text-blue-600 bg-blue-50">Cần giúp dịch thuật</Badge>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Làm+Việc+Đổi+Chỗ+Ở"
                      alt="Làm việc đổi chỗ ở tại Đà Lạt"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">Làm việc đổi chỗ ở</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Homestay tại Đà Lạt cần người giúp việc</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Đà Lạt, Lâm Đồng
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 20 giờ/tuần
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Cần người giúp đón tiếp khách và dọn dẹp phòng, đổi lại được ở miễn phí và bữa ăn hàng ngày.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="text-green-600 bg-green-50">Ở miễn phí + bữa ăn</Badge>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Chăm+Sóc+Người+Cao+Tuổi"
                      alt="Chăm sóc người cao tuổi"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-purple-500">Chăm sóc người cao tuổi</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Gia đình cần người đồng hành với cụ bà</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận Tân Bình, TP.HCM
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 15 giờ/tuần
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Cần người trò chuyện và đồng hành cùng cụ bà 75 tuổi, đổi lại được ở miễn phí trong phòng riêng.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="text-purple-600 bg-purple-50">Phòng riêng miễn phí</Badge>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="travel">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Cùng đi khám phá</h2>
                  <Button onClick={() => handleAddActivity("travel")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo hoạt động cùng đi
                  </Button>
                </div>
                <p className="text-gray-600">
                  Tìm bạn đồng hành dựa trên sở thích và ngôn ngữ để cùng khám phá thành phố, tham quan chợ, tắm suối nước nóng, xem triển lãm.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Tìm kiếm hoạt động cùng đi..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Loại hoạt động" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả hoạt động</SelectItem>
                    <SelectItem value="city">Khám phá thành phố</SelectItem>
                    <SelectItem value="nature">Khám phá thiên nhiên</SelectItem>
                    <SelectItem value="culture">Hoạt động văn hóa</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Bộ lọc
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample Travel Activities */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Khám+Phá+Chợ+Bến+Thành"
                      alt="Khám phá chợ Bến Thành"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-yellow-500">Khám phá thành phố</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Khám phá chợ Bến Thành cùng người địa phương</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-3 w-3 mr-1" /> 25/05/2024
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 09:00 - 12:00
                      <span className="mx-2">•</span>
                      <Users className="h-3 w-3 mr-1" /> 3/5 người
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Cùng khám phá khu chợ nổi tiếng nhất Sài Gòn, tìm hiểu về văn hóa mua bán và thưởng thức đồ ăn vặt.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                        <span className="text-sm">Minh Anh</span>
                      </div>
                      <Button size="sm">Tham gia</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Tham+Quan+Bảo+Tàng"
                      alt="Tham quan bảo tàng"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-indigo-500">Hoạt động văn hóa</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Tham quan Bảo tàng Lịch sử Việt Nam</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-3 w-3 mr-1" /> 27/05/2024
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 14:00 - 16:30
                      <span className="mx-2">•</span>
                      <Users className="h-3 w-3 mr-1" /> 2/6 người
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Cùng tham quan và tìm hiểu về lịch sử Việt Nam qua các hiện vật và tài liệu quý giá tại bảo tàng.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                        <span className="text-sm">Thanh Hà</span>
                      </div>
                      <Button size="sm">Tham gia</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Cà+Phê+Trò+Chuyện"
                      alt="Cà phê trò chuyện"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-pink-500">Gặp gỡ giao lưu</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Cà phê trò chuyện về văn hóa</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-3 w-3 mr-1" /> Hàng tuần
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 17:00 - 19:00
                      <span className="mx-2">•</span>
                      <Users className="h-3 w-3 mr-1" /> 4/8 người
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Gặp gỡ và trò chuyện về văn hóa, chia sẻ trải nghiệm sống tại Việt Nam và kết bạn mới.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                        <span className="text-sm">Thu Trang</span>
                      </div>
                      <Button size="sm">Tham gia</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="language">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Trao đổi ngôn ngữ</h2>
                  <Button onClick={() => handleAddActivity("language")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo lớp trao đổi ngôn ngữ
                  </Button>
                </div>
                <p className="text-gray-600">
                  Tìm đối tác trao đổi ngôn ngữ để nâng cao khả năng tiếng Việt, tiếng địa phương, đồng thời chia sẻ ngôn ngữ của bạn.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Tìm kiếm đối tác ngôn ngữ..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả ngôn ngữ</SelectItem>
                    <SelectItem value="vietnamese">Tiếng Việt</SelectItem>
                    <SelectItem value="english">Tiếng Anh</SelectItem>
                    <SelectItem value="chinese">Tiếng Trung</SelectItem>
                    <SelectItem value="korean">Tiếng Hàn</SelectItem>
                    <SelectItem value="japanese">Tiếng Nhật</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Bộ lọc
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample Language Exchange Activities */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Trao+Đổi+Việt-Anh"
                      alt="Trao đổi Việt-Anh"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-500">Tiếng Việt - Tiếng Anh</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Cà phê trao đổi Việt-Anh hàng tuần</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận 1, TP.HCM
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" /> Thứ Bảy hàng tuần
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 15:00 - 17:00
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Gặp gỡ và trò chuyện bằng tiếng Việt và tiếng Anh, phù hợp cho người mới bắt đầu đến trung cấp.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                        <span className="text-sm">Hồng Nhung</span>
                      </div>
                      <Button size="sm">Tham gia</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Tiếng+Việt+Cho+Người+Nước+Ngoài"
                      alt="Tiếng Việt cho người nước ngoài"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">Tiếng Việt</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Lớp tiếng Việt cơ bản cho người nước ngoài</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận 3, TP.HCM
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" /> Thứ 3 & Thứ 5
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 18:30 - 20:30
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Khóa học tiếng Việt cơ bản dành cho người nước ngoài, tập trung vào giao tiếp hàng ngày và ngữ pháp cơ bản.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">1.200.000₫</span>
                        <span className="text-sm text-gray-500">/8 buổi</span>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Trao+Đổi+Việt-Hàn"
                      alt="Trao đổi Việt-Hàn"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-purple-500">Tiếng Việt - Tiếng Hàn</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Nhóm trao đổi ngôn ngữ Việt-Hàn</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận 7, TP.HCM
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" /> Chủ Nhật hàng tuần
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 14:00 - 16:00
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Gặp gỡ và trò chuyện bằng tiếng Việt và tiếng Hàn, chia sẻ văn hóa và kết bạn mới.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                        <span className="text-sm">Min-ji Kim</span>
                      </div>
                      <Button size="sm">Tham gia</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Khóa học chuyên môn</h2>
                  <Button onClick={() => handleAddActivity("courses")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm khóa học mới
                  </Button>
                </div>
                <p className="text-gray-600">
                  Tham gia các khóa học giúp phát triển kỹ năng, tăng cường sự tự tin và hòa nhập xã hội tốt hơn.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Tìm kiếm khóa học..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Loại khóa học" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả khóa học</SelectItem>
                    <SelectItem value="language">Ngôn ngữ</SelectItem>
                    <SelectItem value="business">Kinh doanh</SelectItem>
                    <SelectItem value="technology">Công nghệ</SelectItem>
                    <SelectItem value="culture">Văn hóa</SelectItem>
                    <SelectItem value="skills">Kỹ năng sống</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Bộ lọc
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample Courses */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Kỹ+Năng+Giao+Tiếp"
                      alt="Kỹ năng giao tiếp"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500">Kỹ năng mềm</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Kỹ năng giao tiếp hiệu quả trong môi trường đa văn hóa</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận 1, TP.HCM
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" /> Khai giảng: 01/06/2024
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 8 buổi
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Khóa học giúp phát triển kỹ năng giao tiếp hiệu quả trong môi trường đa văn hóa, đặc biệt hữu ích cho người nước ngoài.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">1.500.000₫</span>
                        <span className="text-sm text-gray-500">/khóa</span>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Khởi+Nghiệp+Tại+Việt+Nam"
                      alt="Khởi nghiệp tại Việt Nam"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-orange-500">Kinh doanh</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Khởi nghiệp tại Việt Nam cho người nước ngoài</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Online + Offline
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" /> Khai giảng: 15/06/2024
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 12 buổi
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Khóa học cung cấp kiến thức và kỹ năng cần thiết để khởi nghiệp tại Việt Nam, bao gồm pháp lý, thuế và văn hóa kinh doanh.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">2.800.000₫</span>
                        <span className="text-sm text-gray-500">/khóa</span>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Thủ+Công+Truyền+Thống"
                      alt="Thủ công truyền thống"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-teal-500">Văn hóa</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Nghề thủ công truyền thống Việt Nam</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> Quận 5, TP.HCM
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" /> Khai giảng: 10/06/2024
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" /> 6 buổi
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Khám phá và học các kỹ năng thủ công truyền thống của Việt Nam như đan lát, làm đèn lồng và tranh dân gian.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">1.200.000₫</span>
                        <span className="text-sm text-gray-500">/khóa</span>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {showAddActivity && (
              <TabsContent value="add">
                <AddActivityForm
                  moduleType={addActivityType}
                  onSuccess={handleActivitySuccess}
                  onCancel={() => {
                    setShowAddActivity(false)
                    setActiveTab("overview")
                  }}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <MembershipStatus />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hoạt động sắp tới</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Lớp nấu ăn món Việt</h4>
                  <p className="text-xs text-gray-600">Hôm nay, 18:30</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Trao đổi tiếng Việt-Anh</h4>
                  <p className="text-xs text-gray-600">Thứ Bảy, 15:00</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Khám phá chợ Bến Thành</h4>
                  <p className="text-xs text-gray-600">Chủ Nhật, 09:00</p>
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/store/user/profile?tab=activities">Xem tất cả hoạt động</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ngôn ngữ của bạn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Tiếng Việt</span>
                  <Badge>Đang học</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                </div>
                <p className="text-xs text-gray-500">Cơ bản - Có thể giao tiếp đơn giản</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Tiếng Anh</span>
                  <Badge variant="outline">Thông thạo</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <p className="text-xs text-gray-500">Nâng cao - Giao tiếp trôi chảy</p>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/store/language">Cải thiện kỹ năng ngôn ngữ</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cộng đồng gần đây</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Cộng đồng người nước ngoài tại TP.HCM</h4>
                  <p className="text-xs text-gray-600">1.2k thành viên</p>
                </div>
                <Button size="sm" variant="outline">Tham gia</Button>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Học tiếng Việt cùng nhau</h4>
                  <p className="text-xs text-gray-600">850 thành viên</p>
                </div>
                <Button size="sm" variant="outline">Tham gia</Button>
              </div>

              <Button variant="outline" className="w-full">Xem thêm cộng đồng</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
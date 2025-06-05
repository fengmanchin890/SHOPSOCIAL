"use client"

import { useState } from "react"
import {
  Users,
  Package,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Building,
  Globe,
  ArrowRight,
  Star,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useB2B } from "@/components/store/B2BProvider"

export default function B2BDashboard() {
  const { currentUser, quotes, orders, products, users, getProfitAnalysis, getNotifications } = useB2B()

  const [selectedRole, setSelectedRole] = useState<"supplier" | "middleman" | "customer" | "sellerEntrepreneur" | "studentBuyer" | "workerBuyer">("middleman")

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h1>
          <p className="text-gray-600">Bạn cần đăng nhập để truy cập nền tảng B2B</p>
        </div>
      </div>
    )
  }

  const profitAnalysis = getProfitAnalysis(currentUser.id)
  const notifications = getNotifications(currentUser.id)
  const pendingQuotes = quotes.filter((q) => q.status === "sent" && q.middlemanId === currentUser.id)
  const activeOrders = orders.filter((o) => o.middlemanId === currentUser.id && o.status !== "completed")

  const suppliers = users.filter((u) => u.role === "supplier")
  const customers = users.filter((u) => u.role === "customer")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nền tảng giao dịch B2B</h1>
            <p className="text-gray-600 mt-2">
              Chào mừng trở lại, {currentUser.company} (
              {currentUser.role === "middleman" ? "Nhà môi giới" : 
               currentUser.role === "supplier" ? "Nhà cung cấp" : 
               currentUser.role === "customer" ? "Khách hàng" :
               currentUser.role === "sellerEntrepreneur" ? "Doanh nghiệp mới" :
               currentUser.role === "studentBuyer" ? "Sinh viên" :
               "Người lao động"})
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={currentUser.verified ? "default" : "secondary"}>
              {currentUser.verified ? "Đã xác minh" : "Chưa xác minh"}
            </Badge>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{currentUser.country}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selector */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedRole === "supplier" ? "default" : "outline"}
            onClick={() => setSelectedRole("supplier")}
          >
            <Building className="h-4 w-4 mr-2" />
            Nhà cung cấp
          </Button>
          <Button
            variant={selectedRole === "middleman" ? "default" : "outline"}
            onClick={() => setSelectedRole("middleman")}
          >
            <Users className="h-4 w-4 mr-2" />
            Nhà môi giới
          </Button>
          <Button
            variant={selectedRole === "customer" ? "default" : "outline"}
            onClick={() => setSelectedRole("customer")}
          >
            <Package className="h-4 w-4 mr-2" />
            Khách hàng
          </Button>
          <Button
            variant={selectedRole === "sellerEntrepreneur" ? "default" : "outline"}
            onClick={() => setSelectedRole("sellerEntrepreneur")}
          >
            <Building className="h-4 w-4 mr-2" />
            Doanh nghiệp mới
          </Button>
          <Button
            variant={selectedRole === "studentBuyer" ? "default" : "outline"}
            onClick={() => setSelectedRole("studentBuyer")}
          >
            <Users className="h-4 w-4 mr-2" />
            Sinh viên
          </Button>
          <Button
            variant={selectedRole === "workerBuyer" ? "default" : "outline"}
            onClick={() => setSelectedRole("workerBuyer")}
          >
            <Users className="h-4 w-4 mr-2" />
            Người lao động
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <AlertCircle className="h-5 w-5 mr-2" />
              Thông báo quan trọng ({notifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm">{notification.message}</span>
                  <Badge variant="outline">{notification.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dashboard Content based on Role */}
      {selectedRole === "middleman" && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${profitAnalysis.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Tỷ suất lợi nhuận {profitAnalysis.margin.toFixed(1)}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lợi nhuận ròng</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${profitAnalysis.profit.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Chi phí ${profitAnalysis.totalCost.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Báo giá chờ xử lý</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingQuotes.length}</div>
                <p className="text-xs text-muted-foreground">Cần theo dõi</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đơn hàng đang hoạt động</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeOrders.length}</div>
                <p className="text-xs text-muted-foreground">Giao dịch đang xử lý</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="quotes" className="space-y-6">
            <TabsList>
              <TabsTrigger value="quotes">Quản lý báo giá</TabsTrigger>
              <TabsTrigger value="orders">Quản lý đơn hàng</TabsTrigger>
              <TabsTrigger value="suppliers">Nhà cung cấp</TabsTrigger>
              <TabsTrigger value="customers">Khách hàng</TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách báo giá</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quotes.map((quote) => {
                      const product = products.find((p) => p.id === quote.productId)
                      const supplier = users.find((u) => u.id === quote.supplierId)
                      const customer = users.find((u) => u.id === quote.customerId)

                      return (
                        <div key={quote.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{product?.name}</h4>
                              <p className="text-sm text-gray-600">
                                Nhà cung cấp: {supplier?.company} → Khách hàng: {customer?.company || "Chưa phân bổ"}
                              </p>
                            </div>
                            <Badge
                              variant={
                                quote.status === "sent"
                                  ? "default"
                                  : quote.status === "accepted"
                                    ? "default"
                                    : quote.status === "draft"
                                      ? "secondary"
                                      : "destructive"
                              }
                            >
                              {quote.status === "sent"
                                ? "Đã gửi"
                                : quote.status === "accepted"
                                  ? "Đã chấp nhận"
                                  : quote.status === "draft"
                                    ? "Bản nháp"
                                    : "Đã từ chối"}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Số lượng:</span>
                              <p className="font-medium">{quote.quantity.toLocaleString()} sản phẩm</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Giá nhập:</span>
                              <p className="font-medium">${quote.costPrice}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Giá bán:</span>
                              <p className="font-medium">${quote.sellingPrice || "Chưa thiết lập"}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Tỷ suất lợi nhuận:</span>
                              <p className="font-medium text-green-600">{quote.margin || 0}%</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-gray-500">
                              Có hiệu lực đến: {new Date(quote.validUntil).toLocaleDateString()}
                            </div>
                            <div className="space-x-2">
                              <Button size="sm" variant="outline">
                                Chỉnh sửa
                              </Button>
                              <Button size="sm">Gửi</Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quản lý đơn hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const quote = quotes.find((q) => q.id === order.quoteId)
                      const product = products.find((p) => p.id === quote?.productId)
                      const customer = users.find((u) => u.id === order.customerId)
                      const supplier = users.find((u) => u.id === order.supplierId)

                      return (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">Đơn hàng #{order.id.slice(-6)}</h4>
                              <p className="text-sm text-gray-600">
                                {product?.name} - {customer?.company}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Badge
                                variant={
                                  order.status === "completed"
                                    ? "default"
                                    : order.status === "shipped"
                                      ? "default"
                                      : order.status === "confirmed"
                                        ? "secondary"
                                        : "outline"
                                }
                              >
                                {order.status === "completed"
                                  ? "Hoàn thành"
                                  : order.status === "shipped"
                                    ? "Đã gửi hàng"
                                    : order.status === "confirmed"
                                      ? "Đã xác nhận"
                                      : order.status === "paid"
                                        ? "Đã thanh toán"
                                        : "Chờ xử lý"}
                              </Badge>
                              <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                                {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-gray-500">Tổng tiền:</span>
                              <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Nhà cung cấp:</span>
                              <p className="font-medium">{supplier?.company}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Ngày tạo:</span>
                              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Tài liệu:</span>
                              <p className="font-medium">{order.documents.length} tài liệu</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              Giao đến: {order.shippingAddress.city}, {order.shippingAddress.country}
                            </div>
                            <div className="space-x-2">
                              <Button size="sm" variant="outline">
                                Xem chi tiết
                              </Button>
                              <Button size="sm">Tạo tài liệu</Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suppliers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mạng lưới nhà cung cấp</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suppliers.map((supplier) => {
                      const supplierProducts = products.filter((p) => p.supplierId === supplier.id)
                      const supplierQuotes = quotes.filter((q) => q.supplierId === supplier.id)

                      return (
                        <Card key={supplier.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{supplier.company}</h4>
                              <Badge variant={supplier.verified ? "default" : "secondary"}>
                                {supplier.verified ? "Đã xác minh" : "Chưa xác minh"}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Quốc gia:</span>
                                <span>{supplier.country}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Số sản phẩm:</span>
                                <span>{supplierProducts.length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Số báo giá:</span>
                                <span>{supplierQuotes.length}</span>
                              </div>
                            </div>

                            <div className="mt-4 space-x-2">
                              <Button size="sm" variant="outline">
                                Xem sản phẩm
                              </Button>
                              <Button size="sm">Yêu cầu báo giá</Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quản lý khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {customers.map((customer) => {
                      const customerOrders = orders.filter((o) => o.customerId === customer.id)
                      const customerQuotes = quotes.filter((q) => q.customerId === customer.id)
                      const totalValue = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0)

                      return (
                        <Card key={customer.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{customer.company}</h4>
                              <Badge variant={customer.verified ? "default" : "secondary"}>
                                {customer.verified ? "Đã xác minh" : "Chưa xác minh"}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Quốc gia:</span>
                                <span>{customer.country}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Số đơn hàng:</span>
                                <span>{customerOrders.length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Tổng giá trị:</span>
                                <span className="font-medium">${totalValue.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="mt-4 space-x-2">
                              <Button size="sm" variant="outline">
                                Xem lịch sử
                              </Button>
                              <Button size="sm">Gửi báo giá</Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* SellerEntrepreneur Role Dashboard */}
      {selectedRole === "sellerEntrepreneur" && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">+15% so với tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sản phẩm đang bán</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 sản phẩm mới</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đơn hàng mới</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Cần xử lý</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lợi nhuận ròng</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$3,850</div>
                <p className="text-xs text-muted-foreground">Tỷ suất lợi nhuận 31%</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="store" className="space-y-6">
            <TabsList>
              <TabsTrigger value="store">Cửa hàng của tôi</TabsTrigger>
              <TabsTrigger value="pricing">Báo giá thông minh</TabsTrigger>
              <TabsTrigger value="export">Tài liệu xuất khẩu</TabsTrigger>
              <TabsTrigger value="analytics">Phân tích bán hàng</TabsTrigger>
            </TabsList>

            <TabsContent value="store" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Sản phẩm của tôi</span>
                    <Button size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      Thêm sản phẩm mới
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                            <div>
                              <h4 className="font-semibold">Sản phẩm thủ công truyền thống #{item}</h4>
                              <p className="text-sm text-gray-600">
                                SKU: SP-00{item} • Danh mục: Thủ công mỹ nghệ
                              </p>
                            </div>
                          </div>
                          <Badge variant="default">Đang bán</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Giá bán:</span>
                            <p className="font-medium">${(item * 25).toFixed(2)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Tồn kho:</span>
                            <p className="font-medium">{item * 10} sản phẩm</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Đã bán:</span>
                            <p className="font-medium">{item * 5} sản phẩm</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Đánh giá:</span>
                            <p className="font-medium">4.{item} ★</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end mt-4 space-x-2">
                          <Button size="sm" variant="outline">
                            Chỉnh sửa
                          </Button>
                          <Button size="sm">Quản lý</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Công cụ tạo báo giá thông minh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-blue-50 rounded-lg mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">Tính toán giá bán tối ưu</h3>
                    <p className="text-sm text-blue-700 mb-4">
                      Công cụ này giúp bạn tính toán giá bán tối ưu dựa trên chi phí sản xuất, chi phí vận chuyển và tỷ suất lợi nhuận mong muốn.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white p-3 rounded border">
                        <h4 className="text-sm font-medium mb-2">Chi phí sản xuất</h4>
                        <div className="text-2xl font-bold">$15.00</div>
                        <p className="text-xs text-gray-500">Trên mỗi đơn vị</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded border">
                        <h4 className="text-sm font-medium mb-2">Chi phí vận chuyển</h4>
                        <div className="text-2xl font-bold">$3.50</div>
                        <p className="text-xs text-gray-500">Trên mỗi đơn vị</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded border">
                        <h4 className="text-sm font-medium mb-2">Tỷ suất lợi nhuận</h4>
                        <div className="text-2xl font-bold text-green-600">35%</div>
                        <p className="text-xs text-gray-500">Mục tiêu</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounde
d-lg border-2 border-blue-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Giá bán đề xuất:</h4>
                          <p className="text-xs text-gray-500">Bao gồm tất cả chi phí và lợi nhuận</p>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">$28.46</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Lịch sử báo giá</h3>
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">Báo giá #{item}</h4>
                            <p className="text-sm text-gray-600">
                              Khách hàng: Công ty ABC • Ngày: {new Date().toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={item === 1 ? "default" : "secondary"}>
                            {item === 1 ? "Đã gửi" : "Bản nháp"}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Sản phẩm:</span>
                            <p className="font-medium">Sản phẩm thủ công #{item}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Số lượng:</span>
                            <p className="font-medium">{item * 50} sản phẩm</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Đơn giá:</span>
                            <p className="font-medium">${(25 + item).toFixed(2)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Tổng giá trị:</span>
                            <p className="font-medium">${((25 + item) * item * 50).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end mt-4 space-x-2">
                          <Button size="sm" variant="outline">
                            Chỉnh sửa
                          </Button>
                          <Button size="sm">
                            {item === 1 ? "Xem chi tiết" : "Gửi báo giá"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tạo tài liệu xuất khẩu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 hover:border-blue-200 transition-colors">
                      <CardContent className="p-6">
                        <FileText className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Hóa đơn thương mại</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Tạo hóa đơn thương mại chuyên nghiệp với đầy đủ thông tin sản phẩm, giá cả và điều khoản thanh toán.
                        </p>
                        <Button className="w-full">Tạo hóa đơn</Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 hover:border-blue-200 transition-colors">
                      <CardContent className="p-6">
                        <FileText className="h-10 w-10 text-green-500 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Phiếu đóng gói</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Tạo phiếu đóng gói chi tiết với thông tin về kích thước, trọng lượng và số lượng sản phẩm.
                        </p>
                        <Button className="w-full">Tạo phiếu đóng gói</Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 hover:border-blue-200 transition-colors">
                      <CardContent className="p-6">
                        <FileText className="h-10 w-10 text-purple-500 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Chứng nhận xuất xứ</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Tạo chứng nhận xuất xứ cho sản phẩm của bạn, xác nhận nguồn gốc và tuân thủ quy định thương mại.
                        </p>
                        <Button className="w-full">Tạo chứng nhận</Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 hover:border-blue-200 transition-colors">
                      <CardContent className="p-6">
                        <FileText className="h-10 w-10 text-orange-500 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Vận đơn</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Tạo vận đơn cho việc vận chuyển hàng hóa quốc tế với đầy đủ thông tin cần thiết.
                        </p>
                        <Button className="w-full">Tạo vận đơn</Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Tài liệu gần đây</h3>
                    <div className="space-y-2">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 bg-white rounded border">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium">Hóa đơn thương mại #{item}</p>
                              <p className="text-xs text-gray-500">Tạo ngày: {new Date().toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Tải xuống</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Phân tích bán hàng & Lợi nhuận</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="h-60 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Biểu đồ doanh thu theo thời gian</p>
                    </div>
                    
                    <div className="h-60 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Biểu đồ lợi nhuận theo sản phẩm</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-2">Sản phẩm bán chạy nhất</h3>
                        <ol className="space-y-2">
                          {[1, 2, 3].map((item) => (
                            <li key={item} className="flex justify-between items-center">
                              <span className="text-sm">Sản phẩm #{item}</span>
                              <span className="text-sm font-medium">{item * 15} đã bán</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-2">Thị trường hàng đầu</h3>
                        <ol className="space-y-2">
                          {["Hoa Kỳ", "Nhật Bản", "Hàn Quốc"].map((country, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span className="text-sm">{country}</span>
                              <span className="text-sm font-medium">${(5 - index) * 1000}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-2">Tỷ suất lợi nhuận theo danh mục</h3>
                        <ol className="space-y-2">
                          {["Thủ công mỹ nghệ", "Đồ gỗ", "Dệt may"].map((category, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span className="text-sm">{category}</span>
                              <span className="text-sm font-medium">{40 - index * 5}%</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Đề xuất tối ưu hóa</h3>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Tăng giá sản phẩm #1 thêm 5% để tối ưu lợi nhuận dựa trên nhu cầu thị trường.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Tập trung tiếp thị vào thị trường Hoa Kỳ, nơi có tỷ suất lợi nhuận cao nhất.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Tăng sản xuất sản phẩm thủ công mỹ nghệ để đáp ứng nhu cầu tăng cao.</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* StudentBuyer Role Dashboard */}
      {selectedRole === "studentBuyer" && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sản phẩm đã xem</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">Trong 30 ngày qua</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Yêu cầu báo giá</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">3 đã nhận phản hồi</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tiết kiệm</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$120</div>
                <p className="text-xs text-muted-foreground">Với ưu đãi sinh viên</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">1 đang vận chuyển</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="explore" className="space-y-6">
            <TabsList>
              <TabsTrigger value="explore">Khám phá sản phẩm</TabsTrigger>
              <TabsTrigger value="inquiries">Yêu cầu báo giá</TabsTrigger>
              <TabsTrigger value="orders">Đơn hàng của tôi</TabsTrigger>
              <TabsTrigger value="shipping">Vận chuyển quốc tế</TabsTrigger>
            </TabsList>

            <TabsContent value="explore" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm dành cho sinh viên</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((item) => (
                      <Card key={item} className="overflow-hidden">
                        <div className="aspect-video bg-gray-100"></div>
                        <CardContent className="p-4">
                          <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100">Ưu đãi sinh viên</Badge>
                          <h3 className="font-semibold mb-1">Sản phẩm dành cho sinh viên #{item}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              4.{item}
                            </span>
                            <span className="mx-2">•</span>
                            <span>Đã bán {item * 25}</span>
                          </div>
                          <div className="flex items-center mb-3">
                            <span className="text-lg font-bold">${(20 * item).toFixed(2)}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">${(25 * item).toFixed(2)}</span>
                            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">-20%</Badge>
                          </div>
                          <Button className="w-full">Xem chi tiết</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">Khu vực ưu đãi sinh viên</h3>
                    <p className="text-sm text-blue-700 mb-4">
                      Tận hưởng các ưu đãi đặc biệt dành riêng cho sinh viên với giá giảm đến 25% và nhiều đặc quyền khác.
                    </p>
                    <Button variant="outline" className="bg-white">
                      Khám phá thêm ưu đãi
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Sản phẩm phổ biến từ quê nhà</h3>
                    {[1, 2].map((item) => (
                      <div key={item} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="w-16 h-16 bg-gray-100 rounded"></div>
                        <div className="flex-1">
                          <h4 className="font-medium">Sản phẩm đặc sản #{item}</h4>
                          <p className="text-sm text-gray-600">Nhập khẩu trực tiếp từ Việt Nam</p>
                          <div className="flex items-center mt-1">
                            <span className="text-sm font-bold">${(15 * item).toFixed(2)}</span>
                            <Badge className="ml-2 bg-orange-100 text-orange-800 hover:bg-orange-100">Đặc sản</Badge>
                          </div>
                        </div>
                        <Button size="sm">Thêm vào giỏ</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inquiries" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Yêu cầu báo giá của tôi</span>
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Tạo yêu cầu mới
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">Yêu cầu báo giá #{item}</h4>
                            <p className="text-sm text-gray-600">
                              Ngày tạo: {new Date().toLocaleDateString()} • Sản phẩm: Sản phẩm #{item}
                            </p>
                          </div>
                          <Badge variant={item === 1 ? "default" : item === 2 ? "secondary" : "outline"}>
                            {item === 1 ? "Đã nhận báo giá" : item === 2 ? "Đang chờ" : "Bản nháp"}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Số lượng:</span>
                            <p className="font-medium">{item * 50} sản phẩm</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Ngày cần hàng:</span>
                            <p className="font-medium">15/06/2024</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Giao hàng đến:</span>
                            <p className="font-medium">Việt Nam</p>
                          </div>
                        </div>
                        
                        {item === 1 && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium text-green-800">Đã nhận báo giá</h5>
                                <p className="text-sm text-green-700">Từ: Nhà cung cấp ABC</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-800">${(item * 20).toFixed(2)}/sản phẩm</p>
                                <p className="text-sm text-green-700">Tổng: ${(item * 20 * 50).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-end mt-4 space-x-2">
                          <Button size="sm" variant="outline">
                            {item === 1 ? "Xem báo giá" : "Chỉnh sửa"}
                          </Button>
                          <Button size="sm">
                            {item === 1 ? "Chấp nhận báo giá" : item === 2 ? "Nhắc nhở" : "Gửi yêu cầu"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Đơn hàng của tôi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2].map((item) => (
                      <div key={item} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">Đơn hàng #{item}</h4>
                            <p className="text-sm text-gray-600">
                              Ngày đặt: {new Date().toLocaleDateString()} • {item * 2} sản phẩm
                            </p>
                          </div>
                          <Badge variant={item === 1 ? "default" : "secondary"}>
                            {item === 1 ? "Đang vận chuyển" : "Đã xác nhận"}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg mb-3">
                          <div className="w-12 h-12 bg-gray-200 rounded"></div>
                          <div className="flex-1">
                            <h5 className="font-medium">Sản phẩm #{item}</h5>
                            <p className="text-sm text-gray-600">Số lượng: {item * 2}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${(item * 25).toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Đơn giá</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Tổng tiền:</span>
                            <p className="font-medium">${(item * 25 * item * 2).toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Phương thức thanh toán:</span>
                            <p className="font-medium">Chuyển khoản</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Giao hàng đến:</span>
                            <p className="font-medium">Việt Nam</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Dự kiến nhận:</span>
                            <p className="font-medium">15/06/2024</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end mt-4 space-x-2">
                          <Button size="sm" variant="outline">
                            Chi tiết đơn hàng
                          </Button>
                          <Button size="sm">
                            {item === 1 ? "Theo dõi đơn hàng" : "Liên hệ người bán"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Công cụ ước tính vận chuyển quốc tế</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-purple-50 rounded-lg mb-6">
                    <h3 className="font-semibold text-purple-800 mb-2">Tính phí vận chuyển về quê hương</h3>
                    <p className="text-sm text-purple-700 mb-4">
                      Ước tính chi phí vận chuyển hàng hóa từ Việt Nam về quê hương của bạn với nhiều lựa chọn dịch vụ.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Thông tin gói hàng</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Trọng lượng:</span>
                            <span className="text-sm font-medium">5 kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Kích thước:</span>
                            <span className="text-sm font-medium">40 x 30 x 20 cm</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Giá trị khai báo:</span>
                            <span className="text-sm font-medium">$150</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Chi tiết vận chuyển</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Từ:</span>
                            <span className="text-sm font-medium">Việt Nam</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Đến:</span>
                            <span className="text-sm font-medium">Hàn Quốc</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Dịch vụ:</span>
                            <span className="text-sm font-medium">Chuyển phát nhanh</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-purple-200 flex justify-between items-center">
                        <div>
                          <h5 className="font-medium">Chuyển phát nhanh (3-5 ngày)</h5>
                          <p className="text-xs text-gray-500">DHL Express</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-800">$45.00</p>
                          <Button size="sm" className="mt-1">Chọn</Button>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-purple-200 flex justify-between items-center">
                        <div>
                          <h5 className="font-medium">Tiêu chuẩn (7-10 ngày)</h5>
                          <p className="text-xs text-gray-500">EMS</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-800">$28.50</p>
                          <Button size="sm" className="mt-1">Chọn</Button>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-purple-200 flex justify-between items-center">
                        <div>
                          <h5 className="font-medium">Tiết kiệm (15-20 ngày)</h5>
                          <p className="text-xs text-gray-500">Bưu điện</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-800">$18.75</p>
                          <Button size="sm" className="mt-1">Chọn</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Lô hàng của tôi</h3>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Lô hàng #SH12345</h4>
                          <p className="text-sm text-gray-600">
                            Ngày gửi: {new Date().toLocaleDateString()} • Dịch vụ: Gói Nhanh
                          </p>
                        </div>
                        <Badge variant="default">Đang vận chuyển</Badge>
                      </div>
                      
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Đã nhận</span>
                          <span>Đang xử lý</span>
                          <span>Đang vận chuyển</span>
                          <span>Đã giao</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Mã vận đơn:</span>
                          <p className="font-medium">SH123456789VN</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Trọng lượng:</span>
                          <p className="font-medium">12.5 kg</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Địa chỉ nhận:</span>
                          <p className="font-medium">Hà Nội, Việt Nam</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Dự kiến giao:</span>
                          <p className="font-medium">15/06/2024</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <h5 className="text-sm font-medium text-blue-800 mb-2">Nội dung lô hàng</h5>
                        <ul className="text-sm space-y-1 text-blue-700">
                          <li>• Quần áo (5kg)</li>
                          <li>• Đồ điện tử (2kg)</li>
                          <li>• Thực phẩm đóng gói (3kg)</li>
                          <li>• Quà tặng (2.5kg)</li>
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-end mt-4">
                        <Button size="sm">Theo dõi chi tiết</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* WorkerBuyer Role Dashboard */}
      {selectedRole === "workerBuyer" && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tiết kiệm</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$85</div>
                <p className="text-xs text-muted-foreground">Với mua hàng theo nhóm</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">1 đang vận chuyển về quê</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mua hàng nhóm</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Nhóm đang tham gia</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">Sản phẩm</TabsTrigger>
              <TabsTrigger value="group-buy">Mua hàng nhóm</TabsTrigger>
              <TabsTrigger value="shipping">Gửi hàng về quê</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Sản phẩm phổ biến</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Globe className="h-4 w-4" />
                        <span>Tiếng Việt</span>
                      </Button>
                      <Button size="sm">
                        <Package className="h-4 w-4 mr-1" />
                        Tìm sản phẩm
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex gap-3 p-3 border rounded-lg">
                        <div className="w-20 h-20 bg-gray-100 rounded"></div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">Sản phẩm thiết yếu #{item}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <span className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              4.{item}
                            </span>
                            <span className="mx-2">•</span>
                            <span>Đã bán {item * 100}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold">${(10 * item).toFixed(2)}</span>
                              <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">Giảm 15%</Badge>
                            </div>
                            <Button size="sm">Mua ngay</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 mb-6">
                    <h3 className="font-semibold text-orange-800 mb-2">Gói hàng thiết yếu</h3>
                    <p className="text-sm text-orange-700 mb-4">
                      Tiết kiệm hơn khi mua theo gói các sản phẩm thiết yếu hàng ngày. Giảm giá đến 25% so với mua lẻ.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-orange-100">
                        <h4 className="font-medium mb-2">Gói hàng thiết yếu cơ bản</h4>
                        <ul className="text-sm space-y-1 mb-3">
                          <li>• 5kg gạo</li>
                          <li>• 1L dầu ăn</li>
                          <li>• 500g gia vị</li>
                          <li>• 10 gói mì tôm</li>
                        </ul>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold">$35.00</span>
                            <span className="text-sm text-gray-500 line-through ml-2">$45.00</span>
                          </div>
                          <Button size="sm">Mua gói</Button>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-orange-100">
                        <h4 className="font-medium mb-2">Gói hàng thiết yếu đầy đủ</h4>
                        <ul className="text-sm space-y-1 mb-3">
                          <li>• 10kg gạo</li>
                          <li>• 2L dầu ăn</li>
                          <li>• 1kg gia vị</li>
                          <li>• 20 gói mì tôm</li>
                          <li>• 10 trứng</li>
                        </ul>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold">$65.00</span>
                            <span className="text-sm text-gray-500 line-through ml-2">$85.00</span>
                          </div>
                          <Button size="sm">Mua gói</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline">Xem thêm sản phẩm</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="group-buy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Mua hàng theo nhóm</span>
                    <Button size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Tạo nhóm mới
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">Lợi ích mua hàng theo nhóm</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 text-blue-600 shrink-0" />
                        <span>Tiết kiệm 15-30% chi phí nhờ mua số lượng lớn</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Truck className="h-5 w-5 text-blue-600 shrink-0" />
                        <span>Giảm chi phí vận chuyển khi gộp đơn hàng</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-blue-600 shrink-0" />
                        <span>Kết nối với cộng đồng người Việt tại nước ngoài</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Nhóm mua hàng đang hoạt động</h3>
                    {[1, 2].map((item) => (
                      <div key={item} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">Nhóm mua hàng #{item}</h4>
                            <p className="text-sm text-gray-600">
                              Người tổ chức: Nguyễn Văn A • Thành viên: {item * 5}/10
                            </p>
                          </div>
                          <Badge variant={item === 1 ? "default" : "secondary"}>
                            {item === 1 ? "Đang mở" : "Sắp đóng"}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="text-sm font-medium mb-2">Sản phẩm trong nhóm</h5>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Gạo Việt Nam 10kg</p>
                                  <p className="text-xs text-gray-500">$25.00 x {item * 3} = ${(25 * item * 3).toFixed(2)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">Gia vị Việt 500g</p>
                                  <p className="text-xs text-gray-500">$12.50 x {item * 2} = ${(12.5 * item * 2).toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium mb-2">Thông tin nhóm</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Tổng giá trị:</span>
                                <span className="font-medium">${((25 * item * 3) + (12.5 * item * 2)).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Tiết kiệm:</span>
                                <span className="font-medium text-green-600">$25.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Đóng nhóm:</span>
                                <span className="font-medium">{item === 1 ? "Còn 2 ngày" : "Hôm nay"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Giao hàng:</span>
                                <span className="font-medium">15/06/2024</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end space-x-2">
                          <Button size="sm" variant="outline">
                            Chi tiết nhóm
                          </Button>
                          <Button size="sm">
                            {item === 1 ? "Tham gia nhóm" : "Nhắc nhở thành viên"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gửi hàng về quê</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-green-50 rounded-lg border border-green-200 mb-6">
                    <h3 className="font-semibold text-green-800 mb-2">Dịch vụ gửi hàng về quê</h3>
                    <p className="text-sm text-green-700 mb-4">
                      Gửi hàng hóa, quà tặng và đồ dùng cá nhân về quê với chi phí hợp lý và đảm bảo an toàn.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-green-200">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Gói Tiêu chuẩn</h4>
                          <ul className="text-sm space-y-1 mb-3 text-green-800">
                            <li>• Thời gian: 15-20 ngày</li>
                            <li>• Trọng lượng: Đến 20kg</li>
                            <li>• Bảo hiểm cơ bản</li>
                            <li>• Theo dõi trực tuyến</li>
                          </ul>
                          <div className="text-center">
                            <span className="text-lg font-bold">$45.00</span>
                            <Button size="sm" className="w-full mt-2">Chọn</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-green-200 border-2">
                        <CardContent className="p-4">
                          <Badge className="mb-2 w-full justify-center">Phổ biến nhất</Badge>
                          <h4 className="font-medium mb-2">Gói Nhanh</h4>
                          <ul className="text-sm space-y-1 mb-3 text-green-800">
                            <li>• Thời gian: 7-10 ngày</li>
                            <li>• Trọng lượng: Đến 20kg</li>
                            <li>• Bảo hiểm đầy đủ</li>
                            <li>• Theo dõi chi tiết</li>
                            <li>• Ưu tiên xử lý</li>
                          </ul>
                          <div className="text-center">
                            <span className="text-lg font-bold">$75.00</span>
                            <Button size="sm" className="w-full mt-2">Chọn</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-green-200">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Gói Siêu tốc</h4>
                          <ul className="text-sm space-y-1 mb-3 text-green-800">
                            <li>• Thời gian: 3-5 ngày</li>
                            <li>• Trọng lượng: Đến 20kg</li>
                            <li>• Bảo hiểm cao cấp</li>
                            <li>• Theo dõi theo thời gian thực</li>
                            <li>• Ưu tiên cao nhất</li>
                          </ul>
                          <div className="text-center">
                            <span className="text-lg font-bold">$120.00</span>
                            <Button size="sm" className="w-full mt-2">Chọn</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Lô hàng của tôi</h3>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Lô hàng #SH12345</h4>
                          <p className="text-sm text-gray-600">
                            Ngày gửi: {new Date().toLocaleDateString()} • Dịch vụ: Gói Nhanh
                          </p>
                        </div>
                        <Badge variant="default">Đang vận chuyển</Badge>
                      </div>
                      
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Đã nhận</span>
                          <span>Đang xử lý</span>
                          <span>Đang vận chuyển</span>
                          <span>Đã giao</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Mã vận đơn:</span>
                          <p className="font-medium">SH123456789VN</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Trọng lượng:</span>
                          <p className="font-medium">12.5 kg</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Địa chỉ nhận:</span>
                          <p className="font-medium">Hà Nội, Việt Nam</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Dự kiến giao:</span>
                          <p className="font-medium">15/06/2024</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <h5 className="text-sm font-medium text-blue-800 mb-2">Nội dung lô hàng</h5>
                        <ul className="text-sm space-y-1 text-blue-700">
                          <li>• Quần áo (5kg)</li>
                          <li>• Đồ điện tử (2kg)</li>
                          <li>• Thực phẩm đóng gói (3kg)</li>
                          <li>• Quà tặng (2.5kg)</li>
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-end mt-4">
                        <Button size="sm">Theo dõi chi tiết</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Workflow Diagram */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quy trình giao dịch B2B</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Khách hàng yêu cầu</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-medium">Nhà môi giới báo giá</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium">Xác nhận đơn hàng</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm font-medium">Nhà cung cấp gửi hàng</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-sm font-medium">Thanh toán</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
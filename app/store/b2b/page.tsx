"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Package, FileText, ShoppingCart, Users, Plus, ArrowRight, Clock, CheckCircle, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useB2B } from "@/components/store/B2BProvider"

export default function B2BDashboardPage() {
  const { currentUser, orders, quotes, products, users, getProfitAnalysis } = useB2B()
  const [activeTab, setActiveTab] = useState("overview")

  // Lấy phân tích lợi nhuận cho người môi giới hiện tại
  const profitAnalysis = getProfitAnalysis(currentUser?.id || "")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nền tảng giao dịch B2B</h1>
          <p className="text-gray-600 mt-2">Chào mừng trở lại, {currentUser?.company} (Nhà môi giới)</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <span className="mr-2">Taiwan</span>
            <span className="text-lg">🇹🇼</span>
          </Button>
          <Badge variant="default" className="bg-black text-white">Đã xác minh</Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-8">
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          onClick={() => setActiveTab("overview")}
          className="flex items-center"
        >
          <Building2 className="h-4 w-4 mr-2" />
          Nhà môi giới
        </Button>
        <Button
          variant={activeTab === "supplier" ? "default" : "outline"}
          onClick={() => setActiveTab("supplier")}
          className="flex items-center"
        >
          <Package className="h-4 w-4 mr-2" />
          Nhà cung cấp
        </Button>
        <Button
          variant={activeTab === "customer" ? "default" : "outline"}
          onClick={() => setActiveTab("customer")}
          className="flex items-center"
        >
          <Users className="h-4 w-4 mr-2" />
          Khách hàng
        </Button>
        <Button
          variant={activeTab === "business" ? "default" : "outline"}
          onClick={() => setActiveTab("business")}
          className="flex items-center"
        >
          <Building2 className="h-4 w-4 mr-2" />
          Doanh nghiệp mới
        </Button>
        <Button
          variant={activeTab === "worker" ? "default" : "outline"}
          onClick={() => setActiveTab("worker")}
          className="flex items-center"
        >
          <Users className="h-4 w-4 mr-2" />
          Người lao động
        </Button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Tổng doanh thu</h3>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold">$17,500</p>
            <p className="text-sm text-gray-600 mt-1">Tỷ suất lợi nhuận 28.6%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Lợi nhuận ròng</h3>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-green-600">$5,000</p>
            <p className="text-sm text-gray-600 mt-1">Chi phí $12,500</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Báo giá chờ xử lý</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold">1</p>
            <p className="text-sm text-gray-600 mt-1">Cần theo dõi</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Đơn hàng đang hoạt động</h3>
              <ShoppingCart className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold">1</p>
            <p className="text-sm text-gray-600 mt-1">Giao dịch đang xử lý</p>
          </CardContent>
        </Card>
      </div>

      {/* Danh sách báo giá */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Danh sách báo giá</h2>
          <Link href="/store/b2b/quotes">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo báo giá mới
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {quotes.map((quote) => {
            const product = products.find((p) => p.id === quote.productId)
            const supplier = users.find((u) => u.id === quote.supplierId)
            const customer = users.find((u) => u.id === quote.customerId)
            const isExpiringSoon = quote.validUntil < Date.now() + 24 * 60 * 60 * 1000

            return (
              <Card key={quote.id} className={`${isExpiringSoon && quote.status === "sent" ? "border-orange-300 bg-orange-50" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{product?.name}</h3>
                      <p className="text-sm text-gray-600">
                        Báo giá #{quote.id.slice(-6)} • Ngày tạo: {new Date(quote.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isExpiringSoon && quote.status === "sent" && <Badge variant="destructive">Sắp hết hạn</Badge>}
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
                              : quote.status === "rejected"
                                ? "Đã từ chối"
                                : "Đã hết hạn"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Nhà cung cấp</span>
                      <p className="font-medium">{supplier?.company}</p>
                      <p className="text-xs text-gray-500">{supplier?.country}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Khách hàng</span>
                      <p className="font-medium">{customer?.company || "Chưa phân bổ"}</p>
                      <p className="text-xs text-gray-500">{customer?.country}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Số lượng</span>
                      <p className="font-medium">{quote.quantity.toLocaleString()} sản phẩm</p>
                      <p className="text-xs text-gray-500">Điều khoản: {quote.terms}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Hiệu lực đến</span>
                      <p className="font-medium">{new Date(quote.validUntil).toLocaleDateString()}</p>
                      <p className={`text-xs ${isExpiringSoon ? "text-red-500" : "text-gray-500"}`}>
                        {isExpiringSoon ? "Sắp hết hạn" : "Còn hiệu lực"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm text-gray-500">Giá nhập</span>
                      <p className="font-medium">${quote.costPrice}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Giá bán</span>
                      <p className="font-medium">${quote.sellingPrice || "Chưa thiết lập"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Tỷ suất lợi nhuận</span>
                      <p className="font-medium text-green-600">{quote.margin?.toFixed(1) || 0}%</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Tổng lợi nhuận</span>
                      <p className="font-medium text-green-600">
                        $
                        {quote.sellingPrice
                          ? ((quote.sellingPrice - quote.costPrice) * quote.quantity).toLocaleString()
                          : "0"}
                      </p>
                    </div>
                  </div>

                  {quote.notes && (
                    <div className="mb-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                      <p className="text-sm text-blue-800">{quote.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Tổng giá trị:{" "}
                      <span className="font-medium text-gray-900">
                        $
                        {quote.sellingPrice
                          ? (quote.sellingPrice * quote.quantity).toLocaleString()
                          : (quote.costPrice * quote.quantity).toLocaleString()}{" "}
                        {quote.currency}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Chỉnh sửa
                      </Button>
                      {quote.status === "draft" && (
                        <Button size="sm">
                          Gửi
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Sản phẩm mới nhất</h2>
          <Link href="/store/b2b/products">
            <Button variant="outline">
              Thêm sản phẩm mới
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 3).map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">MOQ: {product.moq} đơn vị</p>
                      <p className="text-sm text-gray-500">Thời gian giao hàng: {product.leadTime} ngày</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Đơn hàng gần đây */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Đơn hàng gần đây</h2>
          <Link href="/store/b2b/orders">
            <Button variant="outline">
              Quản lý đơn hàng
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const customer = users.find((u) => u.id === order.customerId)
            const supplier = users.find((u) => u.id === order.supplierId)

            return (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Đơn hàng #{order.id.slice(-8)}</h3>
                      <p className="text-sm text-gray-600">Ngày tạo: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge
                      variant={
                        order.status === "pending"
                          ? "secondary"
                          : order.status === "confirmed"
                            ? "default"
                            : order.status === "shipped"
                              ? "default"
                              : "default"
                      }
                    >
                      {order.status === "pending"
                        ? "Chờ xử lý"
                        : order.status === "confirmed"
                          ? "Đã xác nhận"
                          : order.status === "shipped"
                            ? "Đang giao hàng"
                            : order.status === "delivered"
                              ? "Đã giao hàng"
                              : "Hoàn thành"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Khách hàng</span>
                      <p className="font-medium">{customer?.company}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Nhà cung cấp</span>
                      <p className="font-medium">{supplier?.company}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Tổng giá trị</span>
                      <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Trạng thái thanh toán</span>
                      <p className="font-medium">
                        <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                          {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chờ thanh toán"}
                        </Badge>
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                    {order.status !== "completed" && (
                      <Button size="sm">
                        {order.status === "pending"
                          ? "Xác nhận"
                          : order.status === "confirmed"
                            ? "Giao hàng"
                            : order.status === "shipped"
                              ? "Đánh dấu đã giao"
                              : "Hoàn thành"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
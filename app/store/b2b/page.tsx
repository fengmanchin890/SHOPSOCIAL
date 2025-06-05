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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useB2B } from "@/components/store/B2BProvider"

export default function B2BDashboard() {
  const { currentUser, quotes, orders, products, users, getProfitAnalysis, getNotifications } = useB2B()

  const [selectedRole, setSelectedRole] = useState<"supplier" | "middleman" | "customer">("middleman")

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">請先登入</h1>
          <p className="text-gray-600">您需要登入才能訪問 B2B 平台</p>
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
            <h1 className="text-3xl font-bold text-gray-900">B2B 交易平台</h1>
            <p className="text-gray-600 mt-2">
              歡迎回來，{currentUser.company} (
              {currentUser.role === "middleman" ? "貿易商" : currentUser.role === "supplier" ? "供應商" : "客戶"})
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={currentUser.verified ? "default" : "secondary"}>
              {currentUser.verified ? "已驗證" : "未驗證"}
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
        <div className="flex space-x-4">
          <Button
            variant={selectedRole === "supplier" ? "default" : "outline"}
            onClick={() => setSelectedRole("supplier")}
          >
            <Building className="h-4 w-4 mr-2" />
            供應商視角
          </Button>
          <Button
            variant={selectedRole === "middleman" ? "default" : "outline"}
            onClick={() => setSelectedRole("middleman")}
          >
            <Users className="h-4 w-4 mr-2" />
            貿易商視角
          </Button>
          <Button
            variant={selectedRole === "customer" ? "default" : "outline"}
            onClick={() => setSelectedRole("customer")}
          >
            <Package className="h-4 w-4 mr-2" />
            客戶視角
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <AlertCircle className="h-5 w-5 mr-2" />
              重要通知 ({notifications.length})
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
                <CardTitle className="text-sm font-medium">總營收</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${profitAnalysis.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">利潤率 {profitAnalysis.margin.toFixed(1)}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">淨利潤</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${profitAnalysis.profit.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">成本 ${profitAnalysis.totalCost.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">待處理報價</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingQuotes.length}</div>
                <p className="text-xs text-muted-foreground">需要跟進</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">活躍訂單</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeOrders.length}</div>
                <p className="text-xs text-muted-foreground">進行中的交易</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="quotes" className="space-y-6">
            <TabsList>
              <TabsTrigger value="quotes">報價管理</TabsTrigger>
              <TabsTrigger value="orders">訂單管理</TabsTrigger>
              <TabsTrigger value="suppliers">供應商</TabsTrigger>
              <TabsTrigger value="customers">客戶</TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>報價列表</CardTitle>
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
                                供應商: {supplier?.company} → 客戶: {customer?.company || "待分配"}
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
                                ? "已發送"
                                : quote.status === "accepted"
                                  ? "已接受"
                                  : quote.status === "draft"
                                    ? "草稿"
                                    : "已拒絕"}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">數量:</span>
                              <p className="font-medium">{quote.quantity.toLocaleString()} 件</p>
                            </div>
                            <div>
                              <span className="text-gray-500">成本價:</span>
                              <p className="font-medium">${quote.costPrice}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">售價:</span>
                              <p className="font-medium">${quote.sellingPrice || "待設定"}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">利潤率:</span>
                              <p className="font-medium text-green-600">{quote.margin || 0}%</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-gray-500">
                              有效期至: {new Date(quote.validUntil).toLocaleDateString()}
                            </div>
                            <div className="space-x-2">
                              <Button size="sm" variant="outline">
                                編輯
                              </Button>
                              <Button size="sm">發送</Button>
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
                  <CardTitle>訂單管理</CardTitle>
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
                              <h4 className="font-semibold">訂單 #{order.id.slice(-6)}</h4>
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
                                  ? "已完成"
                                  : order.status === "shipped"
                                    ? "已發貨"
                                    : order.status === "confirmed"
                                      ? "已確認"
                                      : order.status === "paid"
                                        ? "已付款"
                                        : "待處理"}
                              </Badge>
                              <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                                {order.paymentStatus === "paid" ? "已付款" : "待付款"}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-gray-500">總金額:</span>
                              <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">供應商:</span>
                              <p className="font-medium">{supplier?.company}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">創建日期:</span>
                              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">文件:</span>
                              <p className="font-medium">{order.documents.length} 份</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              配送至: {order.shippingAddress.city}, {order.shippingAddress.country}
                            </div>
                            <div className="space-x-2">
                              <Button size="sm" variant="outline">
                                查看詳情
                              </Button>
                              <Button size="sm">生成文件</Button>
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
                  <CardTitle>供應商網絡</CardTitle>
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
                                {supplier.verified ? "已驗證" : "未驗證"}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">國家:</span>
                                <span>{supplier.country}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">產品數:</span>
                                <span>{supplierProducts.length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">報價數:</span>
                                <span>{supplierQuotes.length}</span>
                              </div>
                            </div>

                            <div className="mt-4 space-x-2">
                              <Button size="sm" variant="outline">
                                查看產品
                              </Button>
                              <Button size="sm">請求報價</Button>
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
                  <CardTitle>客戶管理</CardTitle>
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
                                {customer.verified ? "已驗證" : "未驗證"}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">國家:</span>
                                <span>{customer.country}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">訂單數:</span>
                                <span>{customerOrders.length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">總交易額:</span>
                                <span className="font-medium">${totalValue.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="mt-4 space-x-2">
                              <Button size="sm" variant="outline">
                                查看歷史
                              </Button>
                              <Button size="sm">發送報價</Button>
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

      {/* Workflow Diagram */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>B2B 交易流程</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">客戶詢價</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-medium">貿易商報價</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium">訂單確認</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm font-medium">供應商發貨</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-sm font-medium">付款結算</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Package, Truck, FileText, DollarSign, Clock, CheckCircle, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useB2B } from "@/components/store/B2BProvider"

export default function OrdersPage() {
  const { orders, quotes, products, users, updateOrderStatus, generateDocument, addOrderEvent } = useB2B()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)

  const getOrderProgress = (status: string) => {
    const statusMap = {
      pending: 20,
      confirmed: 40,
      paid: 60,
      shipped: 80,
      delivered: 90,
      completed: 100,
    }
    return statusMap[status as keyof typeof statusMap] || 0
  }

  const getStatusColor = (status: string) => {
    const colorMap = {
      pending: "bg-yellow-500",
      confirmed: "bg-blue-500",
      paid: "bg-green-500",
      shipped: "bg-purple-500",
      delivered: "bg-indigo-500",
      completed: "bg-gray-500",
    }
    return colorMap[status as keyof typeof colorMap] || "bg-gray-500"
  }

  const handleGenerateDocument = async (orderId: string, type: any) => {
    try {
      const url = await generateDocument(orderId, type)
      addOrderEvent(orderId, {
        type: "shipped",
        description: `Generated ${type} document`,
        timestamp: Date.now(),
        userId: "current-user",
      })
      alert(`文件已生成: ${url}`)
    } catch (error) {
      alert("文件生成失敗")
    }
  }

  const selectedOrderData = selectedOrder ? orders.find((o) => o.id === selectedOrder) : null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">訂單管理</h1>
          <p className="text-gray-600 mt-2">追蹤和管理所有交易訂單</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            匯出報告
          </Button>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">待處理</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">已確認</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "confirmed").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">運送中</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "shipped").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">總金額</p>
                <p className="text-2xl font-bold">
                  ${orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => {
          const quote = quotes.find((q) => q.id === order.quoteId)
          const product = products.find((p) => p.id === quote?.productId)
          const customer = users.find((u) => u.id === order.customerId)
          const supplier = users.find((u) => u.id === order.supplierId)
          const progress = getOrderProgress(order.status)

          return (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">訂單 #{order.id.slice(-8)}</h3>
                      <p className="text-sm text-gray-600">
                        {product?.name} • 創建於 {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                        {order.paymentStatus === "paid" ? "已付款" : "待付款"}
                      </Badge>
                      <Badge variant="outline">
                        {order.status === "pending"
                          ? "待處理"
                          : order.status === "confirmed"
                            ? "已確認"
                            : order.status === "paid"
                              ? "已付款"
                              : order.status === "shipped"
                                ? "已發貨"
                                : order.status === "delivered"
                                  ? "已送達"
                                  : "已完成"}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>訂單進度</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between mt-2">
                      <div
                        className={`w-3 h-3 rounded-full ${progress >= 20 ? getStatusColor(order.status) : "bg-gray-300"}`}
                      ></div>
                      <div
                        className={`w-3 h-3 rounded-full ${progress >= 40 ? getStatusColor(order.status) : "bg-gray-300"}`}
                      ></div>
                      <div
                        className={`w-3 h-3 rounded-full ${progress >= 60 ? getStatusColor(order.status) : "bg-gray-300"}`}
                      ></div>
                      <div
                        className={`w-3 h-3 rounded-full ${progress >= 80 ? getStatusColor(order.status) : "bg-gray-300"}`}
                      ></div>
                      <div
                        className={`w-3 h-3 rounded-full ${progress >= 100 ? getStatusColor(order.status) : "bg-gray-300"}`}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">客戶</span>
                      <p className="font-medium">{customer?.company}</p>
                      <p className="text-xs text-gray-500">{customer?.country}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">供應商</span>
                      <p className="font-medium">{supplier?.company}</p>
                      <p className="text-xs text-gray-500">{supplier?.country}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">總金額</span>
                      <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{order.currency}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">文件</span>
                      <p className="font-medium">{order.documents.length} 份</p>
                      <p className="text-xs text-gray-500">已生成</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      配送至: {order.shippingAddress.city}, {order.shippingAddress.country}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        查看詳情
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedOrder(order.id)
                          setShowDocumentDialog(true)
                        }}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        生成文件
                      </Button>
                      {order.status !== "completed" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            const nextStatus =
                              order.status === "pending"
                                ? "confirmed"
                                : order.status === "confirmed"
                                  ? "shipped"
                                  : order.status === "shipped"
                                    ? "delivered"
                                    : "completed"
                            updateOrderStatus(order.id, nextStatus as any)
                          }}
                        >
                          推進狀態
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder && !showDocumentDialog} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>訂單詳情 #{selectedOrderData?.id.slice(-8)}</DialogTitle>
          </DialogHeader>
          {selectedOrderData && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">概覽</TabsTrigger>
                <TabsTrigger value="timeline">時間軸</TabsTrigger>
                <TabsTrigger value="documents">文件</TabsTrigger>
                <TabsTrigger value="shipping">配送</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">訂單信息</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">訂單號:</span>
                        <span className="font-medium">#{selectedOrderData.id.slice(-8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">狀態:</span>
                        <Badge>{selectedOrderData.status}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">總金額:</span>
                        <span className="font-medium">${selectedOrderData.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">付款狀態:</span>
                        <Badge variant={selectedOrderData.paymentStatus === "paid" ? "default" : "secondary"}>
                          {selectedOrderData.paymentStatus}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">參與方</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <span className="text-gray-600">客戶:</span>
                        <p className="font-medium">
                          {users.find((u) => u.id === selectedOrderData.customerId)?.company}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">供應商:</span>
                        <p className="font-medium">
                          {users.find((u) => u.id === selectedOrderData.supplierId)?.company}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">貿易商:</span>
                        <p className="font-medium">
                          {users.find((u) => u.id === selectedOrderData.middlemanId)?.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <div className="space-y-4">
                  {selectedOrderData.timeline.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.description}</p>
                        <p className="text-sm text-gray-600">{new Date(event.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedOrderData.documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{doc.type.replace(/_/g, " ").toUpperCase()}</h4>
                            <p className="text-sm text-gray-600">{new Date(doc.createdAt).toLocaleDateString()}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            下載
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">配送地址</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-medium">{selectedOrderData.shippingAddress.company}</p>
                      <p>{selectedOrderData.shippingAddress.street}</p>
                      <p>
                        {selectedOrderData.shippingAddress.city}, {selectedOrderData.shippingAddress.state}
                      </p>
                      <p>
                        {selectedOrderData.shippingAddress.country} {selectedOrderData.shippingAddress.postalCode}
                      </p>
                      <p>聯絡人: {selectedOrderData.shippingAddress.contact}</p>
                      <p>電話: {selectedOrderData.shippingAddress.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Document Generation Dialog */}
      <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>生成文件</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">選擇要生成的文件類型:</p>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => selectedOrder && handleGenerateDocument(selectedOrder, "commercial_invoice")}
              >
                <FileText className="h-4 w-4 mr-2" />
                商業發票 (Commercial Invoice)
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => selectedOrder && handleGenerateDocument(selectedOrder, "packing_list")}
              >
                <Package className="h-4 w-4 mr-2" />
                裝箱單 (Packing List)
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => selectedOrder && handleGenerateDocument(selectedOrder, "bill_of_lading")}
              >
                <Truck className="h-4 w-4 mr-2" />
                提單 (Bill of Lading)
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => selectedOrder && handleGenerateDocument(selectedOrder, "certificate_origin")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                原產地證明 (Certificate of Origin)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

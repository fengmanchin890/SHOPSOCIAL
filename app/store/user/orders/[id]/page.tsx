"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Download,
  RotateCcw,
  MessageCircle,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/components/store/CartProvider"

// Mock order details data
const mockOrderDetails = {
  "ORD-001": {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 3680,
    subtotal: 3680,
    shipping: 0,
    tax: 0,
    items: [
      {
        id: "1",
        name: "經典牛仔外套",
        quantity: 1,
        price: 2980,
        image: "/placeholder.svg?height=80&width=80",
        sku: "DJ-001",
      },
      {
        id: "2",
        name: "舒適棉質T恤",
        quantity: 1,
        price: 680,
        image: "/placeholder.svg?height=80&width=80",
        sku: "CT-001",
      },
    ],
    shippingAddress: {
      name: "王小明",
      phone: "0912-345-678",
      address: "台北市信義區信義路五段7號",
      city: "台北市",
      postalCode: "110",
    },
    timeline: [
      { status: "ordered", date: "2024-01-15 10:30", description: "訂單已確認" },
      { status: "processing", date: "2024-01-15 14:20", description: "商品準備中" },
      { status: "shipped", date: "2024-01-16 09:15", description: "商品已出貨" },
      { status: "delivered", date: "2024-01-17 16:45", description: "商品已送達" },
    ],
    trackingNumber: "TW1234567890",
    paymentMethod: "信用卡",
    paymentStatus: "已付款",
  },
  "ORD-002": {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipping",
    total: 1680,
    subtotal: 1680,
    shipping: 0,
    tax: 0,
    items: [
      {
        id: "3",
        name: "優雅連身洋裝",
        quantity: 1,
        price: 1680,
        image: "/placeholder.svg?height=80&width=80",
        sku: "ED-001",
      },
    ],
    shippingAddress: {
      name: "王小明",
      phone: "0912-345-678",
      address: "台北市信義區信義路五段7號",
      city: "台北市",
      postalCode: "110",
    },
    timeline: [
      { status: "ordered", date: "2024-01-10 11:20", description: "訂單已確認" },
      { status: "processing", date: "2024-01-10 15:30", description: "商品準備中" },
      { status: "shipped", date: "2024-01-11 10:00", description: "商品已出貨" },
    ],
    trackingNumber: "TW0987654321",
    paymentMethod: "信用卡",
    paymentStatus: "已付款",
  },
  "ORD-003": {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 4500,
    subtotal: 4500,
    shipping: 0,
    tax: 0,
    items: [
      {
        id: "4",
        name: "真皮手提包",
        quantity: 1,
        price: 4500,
        image: "/placeholder.svg?height=80&width=80",
        sku: "LH-001",
      },
    ],
    shippingAddress: {
      name: "王小明",
      phone: "0912-345-678",
      address: "台北市信義區信義路五段7號",
      city: "台北市",
      postalCode: "110",
    },
    timeline: [
      { status: "ordered", date: "2024-01-05 14:15", description: "訂單已確認" },
      { status: "processing", date: "2024-01-05 16:30", description: "商品準備中" },
    ],
    trackingNumber: "TW1122334455",
    paymentMethod: "信用卡",
    paymentStatus: "已付款",
  },
}

const statusMap = {
  processing: {
    label: "處理中",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  shipping: {
    label: "配送中",
    color: "bg-blue-100 text-blue-800",
    icon: Truck,
  },
  delivered: {
    label: "已送達",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "已取消",
    color: "bg-red-100 text-red-800",
    icon: Clock,
  },
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  const order = mockOrderDetails[orderId as keyof typeof mockOrderDetails]
  const { addItem } = useCart()

  const [returnReason, setReturnReason] = useState("")
  const [returnType, setReturnType] = useState("")
  const [customerMessage, setCustomerMessage] = useState("")
  const [showReturnDialog, setShowReturnDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">訂單不存在</h1>
          <Button onClick={() => router.back()}>返回</Button>
        </div>
      </div>
    )
  }

  const StatusIcon = statusMap[order.status as keyof typeof statusMap].icon

  const handleReturnRequest = () => {
    if (returnReason && returnType) {
      alert(`退換貨申請已提交！\n類型: ${returnType}\n原因: ${returnReason}\n我們將在1-2個工作天內聯繫您。`)
      setShowReturnDialog(false)
      setReturnReason("")
      setReturnType("")
    }
  }

  const handleContactSupport = () => {
    if (customerMessage.trim()) {
      alert(`客服訊息已發送！\n訊息: ${customerMessage}\n客服將在24小時內回覆您。`)
      setShowContactDialog(false)
      setCustomerMessage("")
    }
  }

  const handleDownloadInvoice = () => {
    // 模擬下載發票
    const invoiceData = {
      orderId: order.id,
      date: order.date,
      items: order.items,
      total: order.total,
      customer: order.shippingAddress,
    }

    const dataStr = JSON.stringify(invoiceData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `invoice-${order.id}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    alert("發票已下載到您的裝置！")
  }

  const handleReorder = () => {
    // 將訂單中的所有商品重新加入購物車
    order.items.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })
    })
    alert(`已將 ${order.items.length} 個商品重新加入購物車！`)
    router.push("/store/cart")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">訂單詳情</h1>
          <p className="text-gray-600">訂單編號: {order.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <StatusIcon className="h-5 w-5 mr-2" />
                訂單狀態
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Badge className={statusMap[order.status as keyof typeof statusMap].color}>
                  {statusMap[order.status as keyof typeof statusMap].label}
                </Badge>
                <span className="text-sm text-gray-600">下單時間: {order.date}</span>
              </div>

              {order.trackingNumber && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">追蹤編號</p>
                  <p className="text-lg font-mono">{order.trackingNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>訂單進度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.description}</p>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>訂單商品</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-600">數量: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>小計</span>
                  <span>${order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>運費</span>
                  <span>{order.shipping === 0 ? "免費" : `$${order.shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>稅費</span>
                  <span>${order.tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>總計</span>
                  <span>${order.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                配送地址
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p className="text-sm text-gray-600 flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {order.shippingAddress.phone}
              </p>
              <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.city} {order.shippingAddress.postalCode}
              </p>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle>付款資訊</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">付款方式</span>
                <span className="text-sm font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">付款狀態</span>
                <Badge className="bg-green-100 text-green-800">{order.paymentStatus}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>訂單操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Return/Exchange Request */}
              {order.status === "delivered" && (
                <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      申請退換貨
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>申請退換貨</DialogTitle>
                      <DialogDescription>請選擇退換貨類型並說明原因</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="returnType">退換貨類型</Label>
                        <Select value={returnType} onValueChange={setReturnType}>
                          <SelectTrigger>
                            <SelectValue placeholder="請選擇類型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="return">退貨</SelectItem>
                            <SelectItem value="exchange">換貨</SelectItem>
                            <SelectItem value="refund">退款</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="returnReason">退換貨原因</Label>
                        <Textarea
                          id="returnReason"
                          placeholder="請詳細說明退換貨原因..."
                          value={returnReason}
                          onChange={(e) => setReturnReason(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowReturnDialog(false)}>
                        取消
                      </Button>
                      <Button onClick={handleReturnRequest} disabled={!returnReason || !returnType}>
                        提交申請
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {/* Track Package */}
              {order.status === "shipping" && (
                <Button variant="outline" className="w-full">
                  <Truck className="h-4 w-4 mr-2" />
                  追蹤包裹
                </Button>
              )}

              {/* Contact Support */}
              <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    聯繫客服
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>聯繫客服</DialogTitle>
                    <DialogDescription>有任何問題嗎？請告訴我們，我們會盡快回覆您。</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customerMessage">您的訊息</Label>
                      <Textarea
                        id="customerMessage"
                        placeholder="請描述您的問題或需求..."
                        value={customerMessage}
                        onChange={(e) => setCustomerMessage(e.target.value)}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>• 客服時間：週一至週五 9:00-18:00</p>
                      <p>• 預計回覆時間：24小時內</p>
                      <p>• 緊急問題請撥打：02-1234-5678</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowContactDialog(false)}>
                      取消
                    </Button>
                    <Button onClick={handleContactSupport} disabled={!customerMessage.trim()}>
                      發送訊息
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Download Invoice */}
              <Button variant="outline" className="w-full" onClick={handleDownloadInvoice}>
                <Download className="h-4 w-4 mr-2" />
                下載發票
              </Button>

              {/* Reorder */}
              <Button variant="outline" className="w-full" onClick={handleReorder}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                再次購買
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

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
        name: "Áo khoác jean cổ điển",
        quantity: 1,
        price: 2980,
        image: "/placeholder.svg?height=80&width=80",
        sku: "DJ-001",
      },
      {
        id: "2",
        name: "Áo thun cotton thoáng mát",
        quantity: 1,
        price: 680,
        image: "/placeholder.svg?height=80&width=80",
        sku: "CT-001",
      },
    ],
    shippingAddress: {
      name: "Nguyễn Văn A",
      phone: "0912-345-678",
      address: "123 Đường Nguyễn Huệ, Quận 1",
      city: "TP.HCM",
      postalCode: "700000",
    },
    timeline: [
      { status: "ordered", date: "2024-01-15 10:30", description: "Đơn hàng đã xác nhận" },
      { status: "processing", date: "2024-01-15 14:20", description: "Đang chuẩn bị hàng" },
      { status: "shipped", date: "2024-01-16 09:15", description: "Đơn hàng đã được giao cho đơn vị vận chuyển" },
      { status: "delivered", date: "2024-01-17 16:45", description: "Đơn hàng đã giao thành công" },
    ],
    trackingNumber: "TW1234567890",
    paymentMethod: "Thẻ tín dụng",
    paymentStatus: "Đã thanh toán",
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
        name: "Đầm dài thanh lịch",
        quantity: 1,
        price: 1680,
        image: "/placeholder.svg?height=80&width=80",
        sku: "ED-001",
      },
    ],
    shippingAddress: {
      name: "Nguyễn Văn A",
      phone: "0912-345-678",
      address: "123 Đường Nguyễn Huệ, Quận 1",
      city: "TP.HCM",
      postalCode: "700000",
    },
    timeline: [
      { status: "ordered", date: "2024-01-10 11:20", description: "Đơn hàng đã xác nhận" },
      { status: "processing", date: "2024-01-10 15:30", description: "Đang chuẩn bị hàng" },
      { status: "shipped", date: "2024-01-11 10:00", description: "Đơn hàng đã được giao cho đơn vị vận chuyển" },
    ],
    trackingNumber: "TW0987654321",
    paymentMethod: "Thẻ tín dụng",
    paymentStatus: "Đã thanh toán",
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
        name: "Túi xách da thật",
        quantity: 1,
        price: 4500,
        image: "/placeholder.svg?height=80&width=80",
        sku: "LH-001",
      },
    ],
    shippingAddress: {
      name: "Nguyễn Văn A",
      phone: "0912-345-678",
      address: "123 Đường Nguyễn Huệ, Quận 1",
      city: "TP.HCM",
      postalCode: "700000",
    },
    timeline: [
      { status: "ordered", date: "2024-01-05 14:15", description: "Đơn hàng đã xác nhận" },
      { status: "processing", date: "2024-01-05 16:30", description: "Đang chuẩn bị hàng" },
    ],
    trackingNumber: "TW1122334455",
    paymentMethod: "Thẻ tín dụng",
    paymentStatus: "Đã thanh toán",
  },
}

const statusMap = {
  processing: {
    label: "Đang xử lý",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  shipping: {
    label: "Đang giao hàng",
    color: "bg-blue-100 text-blue-800",
    icon: Truck,
  },
  delivered: {
    label: "Đã giao hàng",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Đã hủy",
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Đơn hàng không tồn tại</h1>
          <Button onClick={() => router.back()}>Quay lại</Button>
        </div>
      </div>
    )
  }

  const StatusIcon = statusMap[order.status as keyof typeof statusMap].icon

  const handleReturnRequest = () => {
    if (returnReason && returnType) {
      alert(`Yêu cầu đổi trả đã được gửi!\nLoại: ${returnType}\nLý do: ${returnReason}\nChúng tôi sẽ liên hệ với bạn trong 1-2 ngày làm việc.`)
      setShowReturnDialog(false)
      setReturnReason("")
      setReturnType("")
    }
  }

  const handleContactSupport = () => {
    if (customerMessage.trim()) {
      alert(`Tin nhắn hỗ trợ đã được gửi!\nNội dung: ${customerMessage}\nBộ phận hỗ trợ sẽ phản hồi trong vòng 24 giờ.`)
      setShowContactDialog(false)
      setCustomerMessage("")
    }
  }

  const handleDownloadInvoice = () => {
    // Mô phỏng tải hóa đơn
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

    alert("Hóa đơn đã được tải về thiết bị của bạn!")
  }

  const handleReorder = () => {
    // Thêm lại tất cả sản phẩm trong đơn hàng vào giỏ hàng
    order.items.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })
    })
    alert(`Đã thêm ${order.items.length} sản phẩm vào giỏ hàng!`)
    router.push("/store/cart")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
          <p className="text-gray-600">Mã đơn hàng: {order.id}</p>
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
                Trạng thái đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Badge className={statusMap[order.status as keyof typeof statusMap].color}>
                  {statusMap[order.status as keyof typeof statusMap].label}
                </Badge>
                <span className="text-sm text-gray-600">Thời gian đặt hàng: {order.date}</span>
              </div>

              {order.trackingNumber && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Mã vận đơn</p>
                  <p className="text-lg font-mono">{order.trackingNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tiến trình đơn hàng</CardTitle>
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
              <CardTitle>Sản phẩm đã đặt</CardTitle>
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
                      <p className="text-sm text-gray-600">Mã SP: {item.sku}</p>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
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
                  <span>Tổng tiền sản phẩm</span>
                  <span>${order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phí vận chuyển</span>
                  <span>{order.shipping === 0 ? "Miễn phí" : `$${order.shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Thuế</span>
                  <span>${order.tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
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
                Địa chỉ giao hàng
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
              <CardTitle>Thông tin thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Phương thức thanh toán</span>
                <span className="text-sm font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Trạng thái thanh toán</span>
                <Badge className="bg-green-100 text-green-800">{order.paymentStatus}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Thao tác đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Return/Exchange Request */}
              {order.status === "delivered" && (
                <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Yêu cầu đổi trả
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yêu cầu đổi trả</DialogTitle>
                      <DialogDescription>Vui lòng chọn loại đổi trả và nêu rõ lý do</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="returnType">Loại đổi trả</Label>
                        <Select value={returnType} onValueChange={setReturnType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Vui lòng chọn loại" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="return">Trả hàng</SelectItem>
                            <SelectItem value="exchange">Đổi hàng</SelectItem>
                            <SelectItem value="refund">Hoàn tiền</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="returnReason">Lý do đổi trả</Label>
                        <Textarea
                          id="returnReason"
                          placeholder="Vui lòng mô tả chi tiết lý do đổi trả..."
                          value={returnReason}
                          onChange={(e) => setReturnReason(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowReturnDialog(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleReturnRequest} disabled={!returnReason || !returnType}>
                        Gửi yêu cầu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {/* Track Package */}
              {order.status === "shipping" && (
                <Button variant="outline" className="w-full">
                  <Truck className="h-4 w-4 mr-2" />
                  Theo dõi đơn hàng
                </Button>
              )}

              {/* Contact Support */}
              <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Liên hệ hỗ trợ
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Liên hệ hỗ trợ</DialogTitle>
                    <DialogDescription>Bạn có vấn đề gì? Hãy cho chúng tôi biết, chúng tôi sẽ phản hồi sớm nhất có thể.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customerMessage">Tin nhắn của bạn</Label>
                      <Textarea
                        id="customerMessage"
                        placeholder="Vui lòng mô tả vấn đề hoặc yêu cầu của bạn..."
                        value={customerMessage}
                        onChange={(e) => setCustomerMessage(e.target.value)}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>• Giờ hỗ trợ: Thứ Hai đến Thứ Sáu 9:00-18:00</p>
                      <p>• Thời gian phản hồi dự kiến: trong vòng 24 giờ</p>
                      <p>• Đối với vấn đề khẩn cấp, vui lòng gọi: 028-1234-5678</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowContactDialog(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleContactSupport} disabled={!customerMessage.trim()}>
                      Gửi tin nhắn
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Download Invoice */}
              <Button variant="outline" className="w-full" onClick={handleDownloadInvoice}>
                <Download className="h-4 w-4 mr-2" />
                Tải hóa đơn
              </Button>

              {/* Reorder */}
              <Button variant="outline" className="w-full" onClick={handleReorder}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Mua lại
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
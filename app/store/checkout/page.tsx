"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CreditCard, Truck, MapPin, Phone, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/store/CartProvider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Shipping Address
    address: "",
    city: "",
    postalCode: "",

    // Payment
    paymentMethod: "cod",
    convenienceStore: "",
    
    // Credit Card Info
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",

    // Notes
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form based on payment method
    if (formData.paymentMethod === "cod" && !formData.convenienceStore) {
      alert("Vui lòng chọn cửa hàng tiện lợi")
      setIsSubmitting(false)
      return
    }

    if (formData.paymentMethod === "credit") {
      if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvc) {
        alert("Vui lòng điền đầy đủ thông tin thẻ tín dụng")
        setIsSubmitting(false)
        return
      }
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect
    clearCart()
    router.push("/store/user/profile?tab=orders")
    setIsSubmitting(false)
  }

  const shippingCost = total >= 1000 ? 0 : 100
  const finalTotal = total + shippingCost

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-8">Vui lòng thêm sản phẩm vào giỏ hàng trước</p>
          <Button asChild>
            <Link href="/store/products">Bắt đầu mua sắm</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Thông tin cá nhân
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Họ *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Tên *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Địa chỉ giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Địa chỉ *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Vui lòng nhập địa chỉ đầy đủ"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Thành phố *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Mã bưu điện *</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Phương thức thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Thanh toán khi nhận hàng</p>
                          <p className="text-sm text-gray-600">Thanh toán khi nhận được hàng</p>
                        </div>
                        <Truck className="h-5 w-5 text-gray-400" />
                      </div>
                    </Label>
                  </div>

                  {formData.paymentMethod === "cod" && (
                    <div className="mt-4 ml-6 p-4 bg-gray-50 rounded-lg">
                      <Label htmlFor="convenienceStore" className="mb-2 block">Chọn cửa hàng tiện lợi *</Label>
                      <Select 
                        value={formData.convenienceStore} 
                        onValueChange={(value) => handleInputChange("convenienceStore", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Vui lòng chọn cửa hàng tiện lợi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7-11">7-11</SelectItem>
                          <SelectItem value="family-mart">FamilyMart</SelectItem>
                          <SelectItem value="hi-life">Hi-Life</SelectItem>
                          <SelectItem value="ok-mart">OK Mart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 p-4 border rounded-lg mt-4">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Thanh toán bằng thẻ tín dụng</p>
                          <p className="text-sm text-gray-600">Thanh toán trực tuyến an toàn</p>
                        </div>
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                    </Label>
                  </div>

                  {formData.paymentMethod === "credit" && (
                    <div className="mt-4 ml-6 p-4 bg-gray-50 rounded-lg space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="mb-1 block">Số thẻ *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName" className="mb-1 block">Tên chủ thẻ *</Label>
                        <Input
                          id="cardName"
                          placeholder="Vui lòng nhập tên trên thẻ"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange("cardName", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry" className="mb-1 block">Ngày hết hạn (MM/YY) *</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvc" className="mb-1 block">Mã bảo mật (CVC) *</Label>
                          <Input
                            id="cardCvc"
                            placeholder="123"
                            value={formData.cardCvc}
                            onChange={(e) => handleInputChange("cardCvc", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Ghi chú đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Bạn có yêu cầu đặc biệt hoặc ghi chú nào không? (Tùy chọn)"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3">
                      <div className="w-12 h-12 overflow-hidden rounded border">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <div className="text-xs text-gray-600">
                          {item.size && <span>Kích thước: {item.size} </span>}
                          {item.color && <span>Màu sắc: {item.color}</span>}
                        </div>
                        <p className="text-xs text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tổng tiền sản phẩm</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Phí vận chuyển</span>
                    <span>{shippingCost === 0 ? "Miễn phí" : `$${shippingCost}`}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span>${finalTotal.toLocaleString()}</span>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận đơn hàng"}
                </Button>

                {/* Security Info */}
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Thông tin cá nhân của bạn sẽ được bảo mật an toàn</p>
                  <p>• Hỗ trợ đổi trả trong vòng 7 ngày không cần lý do</p>
                  <p>• Nếu có vấn đề, vui lòng liên hệ bộ phận hỗ trợ khách hàng</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
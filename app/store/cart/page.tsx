"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/store/CartProvider"
import { toast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({})
  const [highlightedPrices, setHighlightedPrices] = useState<Record<string, boolean>>({})
  const [previousTotal, setPreviousTotal] = useState(total)
  const [highlightTotal, setHighlightTotal] = useState(false)
  const [shippingFee, setShippingFee] = useState(total >= 1000 ? 0 : 100)
  const [highlightShipping, setHighlightShipping] = useState(false)

  // Theo dõi thay đổi tổng tiền
  useEffect(() => {
    if (previousTotal !== total) {
      setHighlightTotal(true)

      // Kiểm tra xem phí vận chuyển có cần thay đổi không
      const newShippingFee = total >= 1000 ? 0 : 100
      if (shippingFee !== newShippingFee) {
        setShippingFee(newShippingFee)
        setHighlightShipping(true)
        setTimeout(() => setHighlightShipping(false), 1500)
      }

      setTimeout(() => {
        setHighlightTotal(false)
        setPreviousTotal(total)
      }, 1500)
    }
  }, [total, previousTotal, shippingFee])

  const highlightPrice = (itemKey: string) => {
    setHighlightedPrices((prev) => ({ ...prev, [itemKey]: true }))
    setTimeout(() => {
      setHighlightedPrices((prev) => ({ ...prev, [itemKey]: false }))
    }, 1500)
  }

  const handleIncreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (isUpdating[itemId]) return // Ngăn chặn nhấp chuột nhiều lần

    setIsUpdating((prev) => ({ ...prev, [itemId]: true }))
    console.log("Tăng số lượng:", itemId, "Số lượng hiện tại:", currentQuantity)

    const newQuantity = Math.min(99, currentQuantity + 1)
    updateQuantity(itemId, newQuantity)
    highlightPrice(itemId)

    toast({
      title: "Đã cập nhật số lượng",
      description: `Số lượng đã tăng lên ${newQuantity}`,
    })

    // Trì hoãn ngắn để ngăn nhấp chuột liên tục
    setTimeout(() => {
      setIsUpdating((prev) => ({ ...prev, [itemId]: false }))
    }, 300)
  }

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (isUpdating[itemId]) return // Ngăn chặn nhấp chuột nhiều lần

    setIsUpdating((prev) => ({ ...prev, [itemId]: true }))
    console.log("Giảm số lượng:", itemId, "Số lượng hiện tại:", currentQuantity)

    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1
      updateQuantity(itemId, newQuantity)
      highlightPrice(itemId)

      toast({
        title: "Đã cập nhật số lượng",
        description: `Số lượng đã giảm xuống ${newQuantity}`,
      })
    }

    // Trì hoãn ngắn để ngăn nhấp chuột liên tục
    setTimeout(() => {
      setIsUpdating((prev) => ({ ...prev, [itemId]: false }))
    }, 300)
  }

  const handleRemoveItem = (itemId: string, itemName: string) => {
    console.log("Xóa sản phẩm:", itemId, itemName)
    removeItem(itemId)

    toast({
      title: "Đã xóa sản phẩm",
      description: `${itemName} đã được xóa khỏi giỏ hàng`,
      variant: "destructive",
    })
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-8">Chưa có sản phẩm nào trong giỏ hàng</p>
          <Button asChild>
            <Link href="/store/products">Bắt đầu mua sắm</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemKey = `${item.id}-${item.size || ""}-${item.color || ""}`
            const subtotal = item.price * item.quantity

            return (
              <Card key={itemKey} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 overflow-hidden rounded-lg border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        {item.size && <p>Kích thước: {item.size}</p>}
                        {item.color && <p>Màu sắc: {item.color}</p>}
                      </div>
                      <p className="font-semibold text-gray-900 mt-2">${item.price.toLocaleString()}</p>
                    </div>

                    {/* Quantity Display */}
                    <div className="flex items-center space-x-2">
                      <div className="w-16 text-center bg-gray-50 rounded border py-2 px-2">
                        <span className="text-sm font-medium">{item.quantity}</span>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          highlightedPrices[itemKey]
                            ? "text-green-600 bg-green-50 px-2 py-1 rounded transition-all duration-500"
                            : "text-gray-900"
                        }`}
                      >
                        ${subtotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Clear Cart */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                clearCart()
                toast({
                  title: "Đã xóa giỏ hàng",
                  description: "Tất cả sản phẩm đã được xóa khỏi giỏ hàng",
                  variant: "destructive",
                })
              }}
              className="hover:bg-red-50 hover:border-red-300 hover:text-red-700"
            >
              Xóa giỏ hàng
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4 border-gray-200">
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tổng tiền sản phẩm</span>
                  <span
                    className={`font-medium ${
                      highlightTotal ? "text-green-600 bg-green-50 px-2 py-1 rounded transition-all duration-500" : ""
                    }`}
                  >
                    ${total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span
                    className={`${
                      highlightShipping
                        ? "text-green-600 bg-green-50 px-2 py-1 rounded transition-all duration-500"
                        : ""
                    }`}
                  >
                    {shippingFee === 0 ? <span className="text-green-600">Miễn phí</span> : `$${shippingFee}`}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng cộng</span>
                <span
                  className={`${
                    highlightTotal || highlightShipping
                      ? "text-green-600 bg-green-50 px-2 py-1 rounded transition-all duration-500"
                      : ""
                  }`}
                >
                  ${(total + shippingFee).toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/store/checkout">Tiến hành thanh toán</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/store/products">Tiếp tục mua sắm</Link>
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Miễn phí vận chuyển cho đơn hàng từ $1,000</p>
                <p>• Dự kiến giao hàng trong 2-3 ngày làm việc</p>
                <p>• Hỗ trợ đổi trả trong 7 ngày không cần lý do</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
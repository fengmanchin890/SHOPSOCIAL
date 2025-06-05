"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
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

  // 監控總金額變化
  useEffect(() => {
    if (previousTotal !== total) {
      setHighlightTotal(true)

      // 檢查運費是否需要變化
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
    if (isUpdating[itemId]) return // 防止重複點擊

    setIsUpdating((prev) => ({ ...prev, [itemId]: true }))
    console.log("增加數量：", itemId, "目前數量：", currentQuantity)

    const newQuantity = Math.min(99, currentQuantity + 1)
    updateQuantity(itemId, newQuantity)
    highlightPrice(itemId)

    toast({
      title: "數量已更新",
      description: `數量已增加至 ${newQuantity}`,
    })

    // 短暫延遲以防止連續點擊
    setTimeout(() => {
      setIsUpdating((prev) => ({ ...prev, [itemId]: false }))
    }, 300)
  }

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (isUpdating[itemId]) return // 防止重複點擊

    setIsUpdating((prev) => ({ ...prev, [itemId]: true }))
    console.log("減少數量：", itemId, "目前數量：", currentQuantity)

    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1
      updateQuantity(itemId, newQuantity)
      highlightPrice(itemId)

      toast({
        title: "數量已更新",
        description: `數量已減少至 ${newQuantity}`,
      })
    }

    // 短暫延遲以防止連續點擊
    setTimeout(() => {
      setIsUpdating((prev) => ({ ...prev, [itemId]: false }))
    }, 300)
  }

  const handleRemoveItem = (itemId: string, itemName: string) => {
    console.log("刪除商品：", itemId, itemName)
    removeItem(itemId)

    toast({
      title: "商品已移除",
      description: `${itemName} 已從購物車中移除`,
      variant: "destructive",
    })
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">購物車是空的</h1>
          <p className="text-gray-600 mb-8">還沒有添加任何商品到購物車</p>
          <Button asChild>
            <Link href="/store/products">開始購物</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">購物車</h1>

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
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        {item.size && <p>尺寸: {item.size}</p>}
                        {item.color && <p>顏色: {item.color}</p>}
                      </div>
                      <p className="font-semibold text-gray-900 mt-2">${item.price.toLocaleString()}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecreaseQuantity(itemKey, item.quantity)}
                        disabled={item.quantity <= 1 || isUpdating[itemKey]}
                        className="h-10 w-10 p-0 rounded-md hover:bg-red-50 hover:border-red-300 active:bg-red-100 transition-colors"
                        aria-label="減少數量"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-16 text-center bg-gray-50 rounded border py-2 px-2">
                        <span className="text-sm font-medium">{item.quantity}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIncreaseQuantity(itemKey, item.quantity)}
                        disabled={item.quantity >= 99 || isUpdating[itemKey]}
                        className="h-10 w-10 p-0 rounded-md hover:bg-green-50 hover:border-green-300 active:bg-green-100 transition-colors"
                        aria-label="增加數量"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
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

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(itemKey, item.name)}
                      className="text-red-600 hover:text-white hover:bg-red-600 active:bg-red-700 transition-colors rounded-full h-8 w-8 p-0"
                      aria-label="刪除商品"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                  title: "購物車已清空",
                  description: "所有商品已從購物車中移除",
                  variant: "destructive",
                })
              }}
              className="hover:bg-red-50 hover:border-red-300 hover:text-red-700"
            >
              清空購物車
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4 border-gray-200">
            <CardHeader>
              <CardTitle>訂單摘要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>商品小計</span>
                  <span
                    className={`font-medium ${
                      highlightTotal ? "text-green-600 bg-green-50 px-2 py-1 rounded transition-all duration-500" : ""
                    }`}
                  >
                    ${total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>運費</span>
                  <span
                    className={`${
                      highlightShipping
                        ? "text-green-600 bg-green-50 px-2 py-1 rounded transition-all duration-500"
                        : ""
                    }`}
                  >
                    {shippingFee === 0 ? <span className="text-green-600">免費</span> : `$${shippingFee}`}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>總計</span>
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
                  <Link href="/store/checkout">前往結帳</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/store/products">繼續購物</Link>
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>• 滿 $1,000 免運費</p>
                <p>• 預計 2-3 個工作天送達</p>
                <p>• 支援 7 天無條件退換貨</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

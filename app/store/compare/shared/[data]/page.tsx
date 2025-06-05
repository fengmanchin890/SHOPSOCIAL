"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockProducts } from "@/lib/mock-data"
import type { CompareItem } from "@/components/store/CompareProvider"

export default function SharedComparePage() {
  const params = useParams()
  const [items, setItems] = useState<CompareItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      const encodedData = params.data as string
      const decodedData = JSON.parse(atob(encodedData))
      const productIds = decodedData.items

      // Find products by IDs
      const sharedItems = productIds
        .map((id: string) => mockProducts.find((p) => p.id === id))
        .filter(Boolean)
        .map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          rating: product.rating,
          reviewCount: product.reviewCount,
          features: product.features,
          sizes: product.sizes,
          colors: product.colors,
          inStock: product.inStock,
        }))

      setItems(sharedItems)
    } catch (err) {
      setError("無效的分享連結")
    } finally {
      setLoading(false)
    }
  }, [params.data])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p>載入中...</p>
        </div>
      </div>
    )
  }

  if (error || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">無法載入比較</h1>
          <p className="text-gray-600 mb-8">{error || "找不到要比較的商品"}</p>
          <Button asChild>
            <Link href="/store/products">瀏覽商品</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">分享的商品比較</h1>
        <p className="text-gray-600 mt-2">查看朋友分享的 {items.length} 個商品比較</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="text-center">
                <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-xl font-bold text-gray-900 mb-4">${item.price.toLocaleString()}</p>
                <Button asChild className="w-full">
                  <Link href={`/store/products/${item.id}`}>查看詳情</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button asChild>
          <Link href="/store/compare">開始我的比較</Link>
        </Button>
      </div>
    </div>
  )
}

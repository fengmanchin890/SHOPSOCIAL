"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, ArrowRight, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/components/store/WishlistProvider"
import { useCart } from "@/components/store/CartProvider"
import { useCompare } from "@/components/store/CompareProvider"
import { mockProducts } from "@/lib/mock-data"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const { addItem: addToCompare, isInCompare, canAddMore } = useCompare()

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  const handleAddToCompare = (item: any) => {
    const product = mockProducts.find((p) => p.id === item.id)
    if (product) {
      addToCompare({
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
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">收藏清單是空的</h1>
          <p className="text-gray-600 mb-8">還沒有添加任何商品到收藏清單</p>
          <Button asChild>
            <Link href="/store/products">開始購物</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">我的收藏清單</h1>
        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link href="/store/compare">
              <Scale className="h-4 w-4 mr-2" />
              查看比較
            </Link>
          </Button>
          <Button variant="outline" onClick={clearWishlist}>
            清空收藏清單
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Link href={`/store/products/${item.id}`}>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
              {isInCompare(item.id) && (
                <Badge className="absolute top-2 left-2 bg-blue-600">
                  <Scale className="h-3 w-3 mr-1" />
                  已比較
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <Link href={`/store/products/${item.id}`} className="block">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-gray-900">${item.price.toLocaleString()}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${item.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <span className="text-sm text-gray-600 capitalize">{item.category}</span>
              </div>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Button onClick={() => handleAddToCart(item)} className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    加入購物車
                  </Button>
                  <Button variant="outline" asChild className="flex-none">
                    <Link href={`/store/products/${item.id}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToCompare(item)}
                  disabled={isInCompare(item.id) || !canAddMore}
                  className="w-full"
                >
                  <Scale className="h-4 w-4 mr-2" />
                  {isInCompare(item.id) ? "已加入比較" : canAddMore ? "加入比較" : "比較已滿"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

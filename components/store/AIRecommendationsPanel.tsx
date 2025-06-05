"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Brain, Star, ShoppingCart, Scale, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useAIRecommendations } from "./AIRecommendationsProvider"
import { useCompare } from "./CompareProvider"
import { useCart } from "./CartProvider"

interface AIRecommendationsPanelProps {
  className?: string
}

export function AIRecommendationsPanel({ className }: AIRecommendationsPanelProps) {
  const { recommendations, isLoading, generateRecommendations, refreshRecommendations } = useAIRecommendations()
  const { items: compareItems, addItem: addToCompare } = useCompare()
  const { addItem: addToCart } = useCart()

  useEffect(() => {
    generateRecommendations(compareItems)
  }, [compareItems, generateRecommendations])

  const handleAddToCompare = (item: any) => {
    addToCompare({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      rating: item.rating,
      reviewCount: item.reviewCount,
      category: item.category,
      features: item.features || [],
      inStock: item.inStock,
      sizes: item.sizes,
      colors: item.colors,
    })
  }

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  if (compareItems.length === 0) {
    return null
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <CardTitle className="flex items-center space-x-2">
              <span>AI 智能推薦</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Sparkles className="h-3 w-3 mr-1" />
                Beta
              </Badge>
            </CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={refreshRecommendations} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            重新推薦
          </Button>
        </div>
        <p className="text-sm text-gray-600">基於您的比較清單，AI 為您推薦以下相關商品</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">暫無推薦商品</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-100 text-green-800">{item.confidence}% 匹配</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">${item.price.toLocaleString()}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {item.rating} ({item.reviewCount})
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mb-3 bg-blue-50 p-2 rounded">💡 {item.reason}</p>
                  <div className="space-y-2">
                    <Button onClick={() => handleAddToCompare(item)} variant="outline" className="w-full" size="sm">
                      <Scale className="h-4 w-4 mr-2" />
                      加入比較
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={() => handleAddToCart(item)} size="sm" disabled={!item.inStock}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {item.inStock ? "購買" : "缺貨"}
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/store/products/${item.id}`}>查看</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

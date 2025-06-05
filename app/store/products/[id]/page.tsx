"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockProducts } from "@/lib/mock-data"
import { useCart } from "@/components/store/CartProvider"
import { useWishlist } from "@/components/store/WishlistProvider"
import { useCompare } from "@/components/store/CompareProvider"
import { ProductCard } from "@/components/store/ProductCard"

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { addItem: addToCompare, removeItem: removeFromCompare, isInCompare, canAddMore } = useCompare()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">商品不存在</h1>
          <p className="text-gray-600">找不到您要查看的商品</p>
        </div>
      </div>
    )
  }

  const relatedProducts = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    })
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        category: product.category,
      })
    }
  }

  const handleToggleCompare = () => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id)
    } else if (canAddMore) {
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

  const inWishlist = isInWishlist(product.id)
  const inCompare = isInCompare(product.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              {inCompare && (
                <Badge className="bg-blue-600">
                  <Scale className="h-3 w-3 mr-1" />
                  已加入比較
                </Badge>
              )}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviewCount} 評價)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {/* Size Selection */}
            {product.sizes && (
              <div>
                <Label className="text-sm font-medium mb-2 block">尺寸</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇尺寸" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div>
                <Label className="text-sm font-medium mb-2 block">顏色</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇顏色" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <Label className="text-sm font-medium mb-2 block">數量</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? "加入購物車" : "缺貨中"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleWishlist}
                className={inWishlist ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100" : ""}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleCompare}
                disabled={!inCompare && !canAddMore}
                className={inCompare ? "bg-blue-50 text-blue-500 border-blue-200 hover:bg-blue-100" : ""}
              >
                <Scale className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Action Status */}
            <div className="text-sm space-y-1">
              {product.inStock ? (
                <span className="text-green-600">✓ 現貨供應</span>
              ) : (
                <span className="text-red-600">✗ 暫時缺貨</span>
              )}
              {!canAddMore && !inCompare && <div className="text-amber-600">⚠ 比較清單已滿 (最多4個商品)</div>}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xs text-gray-600">免費配送</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-xs text-gray-600">品質保證</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <p className="text-xs text-gray-600">7天退換</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">商品描述</TabsTrigger>
            <TabsTrigger value="features">產品特色</TabsTrigger>
            <TabsTrigger value="reviews">顧客評價</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  <p>評價功能開發中...</p>
                  <p className="text-sm mt-2">
                    目前評分：{product.rating} 星 ({product.reviewCount} 則評價)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">相關商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

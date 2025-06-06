"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/mock-data"
import { useCart } from "./CartProvider"
import { useWishlist } from "./WishlistProvider"
import { useCompare } from "./CompareProvider"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { addItem: addToCompare, isInCompare, canAddMore } = useCompare()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `Sản phẩm "${product.name}" đã được thêm vào giỏ hàng`,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Đã xóa khỏi danh sách yêu thích",
        description: `Sản phẩm "${product.name}" đã được xóa khỏi danh sách yêu thích`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        category: product.category,
      })
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: `Sản phẩm "${product.name}" đã được thêm vào danh sách yêu thích`,
      })
    }
  }

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInCompare(product.id)) {
      toast({
        title: "Sản phẩm đã có trong danh sách so sánh",
        description: "Sản phẩm này đã được thêm vào danh sách so sánh trước đó",
      })
      return
    }
    
    if (!canAddMore) {
      toast({
        title: "Danh sách so sánh đã đầy",
        description: "Bạn chỉ có thể so sánh tối đa 4 sản phẩm cùng lúc",
        variant: "destructive",
      })
      return
    }
    
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
    
    toast({
      title: "Đã thêm vào danh sách so sánh",
      description: `Sản phẩm "${product.name}" đã được thêm vào danh sách so sánh`,
    })
  }

  const inWishlist = isInWishlist(product.id)
  const inCompare = isInCompare(product.id)

  return (
    <div className="group relative bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <Link href={`/store/products/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Compare Badge */}
        {inCompare && (
          <Badge className="absolute top-2 right-2 bg-blue-600">
            <Scale className="h-3 w-3 mr-1" />
            Đang so sánh
          </Badge>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
            <Badge variant="destructive">Hết hàng</Badge>
          </div>
        )}

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-900">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddToCompare}
          disabled={inCompare || !canAddMore}
          className={`h-8 w-8 p-0 ${inCompare ? "bg-blue-50 text-blue-500 border-blue-200" : ""}`}
        >
          <Scale className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleToggleWishlist}
          className={`h-8 w-8 p-0 ${inWishlist ? "bg-red-50 text-red-500 border-red-200" : ""}`}
        >
          <Heart className={`h-4 w-4 ${inWishlist ? "fill-red-500" : ""}`} />
        </Button>
        <Button size="sm" onClick={handleAddToCart} disabled={!product.inStock} className="h-8 w-8 p-0">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
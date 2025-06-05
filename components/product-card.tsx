"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, Edit, Trash2 } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    supplier: string
    stock: number
    rating: number
    category: string
    status: string
    sku: string
  }
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export function ProductCard({ product, onView, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
          <Badge variant={product.status === "active" ? "default" : "secondary"} className="absolute top-2 right-2">
            {product.status}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
          <p className="text-sm text-muted-foreground">Supplier: {product.supplier}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm">{product.rating}</span>
            </div>
            <Badge variant={product.stock < 50 ? "destructive" : "outline"}>{product.stock} in stock</Badge>
          </div>

          <div className="text-lg font-bold">${product.price}</div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onView}>
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        <div className="flex space-x-1">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

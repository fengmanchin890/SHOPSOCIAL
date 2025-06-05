"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search, Star } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"

export default function SuppliersPage() {
  // Sample supplier data
  const suppliers = [
    {
      id: 1,
      name: "TechGadgets Co.",
      country: "China",
      category: "Electronics",
      products: 1245,
      rating: 4.8,
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "FashionTrends Inc.",
      country: "Vietnam",
      category: "Clothing",
      products: 876,
      rating: 4.5,
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "HomeDecor Supplies",
      country: "Thailand",
      category: "Home & Kitchen",
      products: 543,
      rating: 4.2,
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "BeautyEssentials Ltd.",
      country: "South Korea",
      category: "Beauty & Personal Care",
      products: 321,
      rating: 4.7,
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "SportsGear Pro",
      country: "United States",
      category: "Sports & Outdoors",
      products: 432,
      rating: 4.6,
      verified: false,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "KidsToys World",
      country: "Germany",
      category: "Toys & Games",
      products: 765,
      rating: 4.3,
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 7,
      name: "PetSupplies Direct",
      country: "Canada",
      category: "Pet Supplies",
      products: 289,
      rating: 4.4,
      verified: false,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 8,
      name: "OfficeWorks Pro",
      country: "Japan",
      category: "Office Products",
      products: 512,
      rating: 4.5,
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const handleViewProfile = (supplier: any) => {
    alert(`Viewing profile for ${supplier.name}`)
    // Navigate to supplier profile page
  }

  const handleConnect = (supplier: any) => {
    if (supplier.verified) {
      alert(`Already connected to ${supplier.name}`)
    } else {
      alert(`Connecting to ${supplier.name}...`)
      // Implement connection logic
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Suppliers</h1>
            <Link href="/suppliers/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Supplier
              </Button>
            </Link>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search suppliers..." className="pl-8" />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="home">Home & Kitchen</SelectItem>
                    <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="cn">China</SelectItem>
                    <SelectItem value="vn">Vietnam</SelectItem>
                    <SelectItem value="th">Thailand</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    Verified Only
                  </Button>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    Rating 4+
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="rating">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                      <SelectItem value="products">Most Products</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center space-x-4">
                    <img
                      src={supplier.image || "/placeholder.svg"}
                      alt={supplier.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <CardDescription>{supplier.country}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{supplier.rating}</span>
                    </div>
                    {supplier.verified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium">{supplier.products}</span> products
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Category: <span className="font-medium">{supplier.category}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleViewProfile(supplier)}>
                    View Profile
                  </Button>
                  <Button size="sm" onClick={() => handleConnect(supplier)}>
                    {supplier.verified ? "Connected" : "Connect"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

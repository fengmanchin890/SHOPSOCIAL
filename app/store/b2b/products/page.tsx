"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Grid, List, Plus, Search, Edit, Trash2, Eye, X } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

export default function ProductsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [supplierFilter, setSupplierFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")

  // Dialog states
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    supplier: "",
    status: "",
  })

  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds",
      price: 59.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Earbuds",
      supplier: "TechGadgets Co.",
      stock: 120,
      rating: 4.5,
      category: "Electronics",
      status: "active",
      sku: "WBE-001",
      description: "High-quality wireless earbuds with noise cancellation and long battery life.",
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 199.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Smart+Watch",
      supplier: "WearableTech Inc.",
      stock: 45,
      rating: 4.8,
      category: "Electronics",
      status: "active",
      sku: "SW-005",
      description: "Advanced smartwatch with health monitoring and GPS features.",
    },
    {
      id: 3,
      name: "Laptop Stand Adjustable",
      price: 29.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Laptop+Stand",
      supplier: "HomeOffice Supplies",
      stock: 230,
      rating: 4.3,
      category: "Office",
      status: "active",
      sku: "LS-003",
      description: "Ergonomic laptop stand with adjustable height and angle.",
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: 24.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Charging+Pad",
      supplier: "PowerUp Electronics",
      stock: 180,
      rating: 4.2,
      category: "Electronics",
      status: "active",
      sku: "WCP-002",
      description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    },
    {
      id: 5,
      name: "Bluetooth Speaker Waterproof",
      price: 79.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Speaker",
      supplier: "AudioMax Ltd.",
      stock: 65,
      rating: 4.6,
      category: "Electronics",
      status: "active",
      sku: "BS-004",
      description: "Portable waterproof Bluetooth speaker with 20-hour battery life.",
    },
    {
      id: 6,
      name: "Ergonomic Office Chair",
      price: 249.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Office+Chair",
      supplier: "ComfortSeating Co.",
      stock: 28,
      rating: 4.7,
      category: "Office",
      status: "low_stock",
      sku: "EOC-006",
      description: "Premium ergonomic office chair with lumbar support and adjustable features.",
    },
    {
      id: 7,
      name: "4K Webcam with Microphone",
      price: 89.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Webcam",
      supplier: "VideoTech Solutions",
      stock: 92,
      rating: 4.4,
      category: "Electronics",
      status: "active",
      sku: "WC-007",
      description: "High-definition 4K webcam with noise-cancelling microphone.",
    },
    {
      id: 8,
      name: "Mechanical Keyboard RGB",
      price: 129.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Keyboard",
      supplier: "GamerGear Inc.",
      stock: 54,
      rating: 4.9,
      category: "Electronics",
      status: "active",
      sku: "MK-008",
      description: "Mechanical gaming keyboard with customizable RGB lighting and programmable keys.",
    },
  ])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter
    const matchesSupplier =
      supplierFilter === "all" || product.supplier.toLowerCase().includes(supplierFilter.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesSupplier && matchesStatus
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "stock":
        return b.stock - a.stock
      case "rating":
        return b.rating - a.rating
      default:
        return b.id - a.id // newest first
    }
  })

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product)
    setShowViewDialog(true)
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setEditFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      category: product.category,
      supplier: product.supplier,
      status: product.status,
    })
    setShowEditDialog(true)
  }

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id))
      setShowDeleteDialog(false)
      setSelectedProduct(null)
    }
  }

  const saveEdit = () => {
    if (selectedProduct) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                name: editFormData.name,
                price: Number.parseFloat(editFormData.price),
                stock: Number.parseInt(editFormData.stock),
                description: editFormData.description,
                category: editFormData.category,
                supplier: editFormData.supplier,
                status: editFormData.status,
              }
            : p,
        ),
      )
      setShowEditDialog(false)
      setSelectedProduct(null)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{t("products")}</h1>
            <Link href="/store/b2b/products/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> {t("add")} {t("products")}
              </Button>
            </Link>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={`${t("search")} ${t("products")}...`}
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="home">Home & Kitchen</SelectItem>
                    <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suppliers</SelectItem>
                    <SelectItem value="techgadgets">TechGadgets Co.</SelectItem>
                    <SelectItem value="wearabletech">WearableTech Inc.</SelectItem>
                    <SelectItem value="homeoffice">HomeOffice Supplies</SelectItem>
                    <SelectItem value="powerup">PowerUp Electronics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder={t("status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">{t("active")}</SelectItem>
                      <SelectItem value="low_stock">Low Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="stock">Stock Level</SelectItem>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={() => handleViewProduct(product)}
                  onEdit={() => handleEditProduct(product)}
                  onDelete={() => handleDeleteProduct(product)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Product</th>
                        <th className="text-left py-3 px-4 font-medium">SKU</th>
                        <th className="text-left py-3 px-4 font-medium">Price</th>
                        <th className="text-left py-3 px-4 font-medium">Stock</th>
                        <th className="text-left py-3 px-4 font-medium">Supplier</th>
                        <th className="text-left py-3 px-4 font-medium">{t("status")}</th>
                        <th className="text-left py-3 px-4 font-medium">{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-muted-foreground">{product.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-sm">{product.sku}</td>
                          <td className="py-3 px-4 font-medium">${product.price}</td>
                          <td className="py-3 px-4">
                            <Badge variant={product.stock < 50 ? "destructive" : "default"}>{product.stock}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{product.supplier}</td>
                          <td className="py-3 px-4">
                            <Badge variant={product.status === "active" ? "default" : "secondary"}>
                              {product.status.replace("_", " ")}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProduct(product)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {sortedProducts.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-muted-foreground">No products found matching your criteria.</div>
              </CardContent>
            </Card>
          )}

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

      {/* View Product Dialog */}
      {showViewDialog && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{t("view")} Product</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowViewDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <p className="text-lg font-semibold">{selectedProduct.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SKU</label>
                  <p className="font-mono">{selectedProduct.sku}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <p className="text-xl font-bold">${selectedProduct.price}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <p>{selectedProduct.stock} units</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <p>{selectedProduct.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Supplier</label>
                  <p>{selectedProduct.supplier}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Badge variant={selectedProduct.status === "active" ? "default" : "secondary"}>
                    {selectedProduct.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Dialog */}
      {showEditDialog && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{t("edit")} Product</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowEditDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <Input
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <Input
                    type="number"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <Input
                    type="number"
                    value={editFormData.stock}
                    onChange={(e) => setEditFormData({ ...editFormData, stock: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select
                  value={editFormData.category}
                  onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Home">Home & Kitchen</SelectItem>
                    <SelectItem value="Beauty">Beauty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Supplier</label>
                <Input
                  value={editFormData.supplier}
                  onChange={(e) => setEditFormData({ ...editFormData, supplier: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select
                  value={editFormData.status}
                  onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="low_stock">Low Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded-md h-24"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  {t("cancel")}
                </Button>
                <Button onClick={saveEdit}>{t("save")} Changes</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{t("delete")} Product</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete "{selectedProduct.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                {t("cancel")}
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                {t("delete")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

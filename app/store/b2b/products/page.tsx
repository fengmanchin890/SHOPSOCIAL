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
import { toast } from "@/hooks/use-toast"

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
      name: "Tai nghe Bluetooth không dây",
      price: 59.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Tai+nghe",
      supplier: "TechGadgets Co.",
      stock: 120,
      rating: 4.5,
      category: "Điện tử",
      status: "active",
      sku: "WBE-001",
      description: "Tai nghe không dây chất lượng cao với khả năng khử tiếng ồn và thời lượng pin dài.",
    },
    {
      id: 2,
      name: "Đồng hồ thông minh Series 5",
      price: 199.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Đồng+hồ",
      supplier: "WearableTech Inc.",
      stock: 45,
      rating: 4.8,
      category: "Điện tử",
      status: "active",
      sku: "SW-005",
      description: "Đồng hồ thông minh cao cấp với tính năng theo dõi sức khỏe và GPS.",
    },
    {
      id: 3,
      name: "Giá đỡ laptop có thể điều chỉnh",
      price: 29.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Giá+đỡ",
      supplier: "HomeOffice Supplies",
      stock: 230,
      rating: 4.3,
      category: "Văn phòng",
      status: "active",
      sku: "LS-003",
      description: "Giá đỡ laptop tiện dụng với khả năng điều chỉnh chiều cao và góc nghiêng.",
    },
    {
      id: 4,
      name: "Đế sạc không dây",
      price: 24.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Đế+sạc",
      supplier: "PowerUp Electronics",
      stock: 180,
      rating: 4.2,
      category: "Điện tử",
      status: "active",
      sku: "WCP-002",
      description: "Đế sạc không dây nhanh tương thích với tất cả thiết bị hỗ trợ Qi.",
    },
    {
      id: 5,
      name: "Loa Bluetooth chống nước",
      price: 79.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Loa",
      supplier: "AudioMax Ltd.",
      stock: 65,
      rating: 4.6,
      category: "Điện tử",
      status: "active",
      sku: "BS-004",
      description: "Loa Bluetooth di động chống nước với thời lượng pin 20 giờ.",
    },
    {
      id: 6,
      name: "Ghế văn phòng công thái học",
      price: 249.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Ghế",
      supplier: "ComfortSeating Co.",
      stock: 28,
      rating: 4.7,
      category: "Văn phòng",
      status: "low_stock",
      sku: "EOC-006",
      description: "Ghế văn phòng cao cấp với hỗ trợ lưng và các tính năng điều chỉnh.",
    },
    {
      id: 7,
      name: "Webcam 4K kèm microphone",
      price: 89.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Webcam",
      supplier: "VideoTech Solutions",
      stock: 92,
      rating: 4.4,
      category: "Điện tử",
      status: "active",
      sku: "WC-007",
      description: "Webcam độ phân giải cao 4K với microphone khử tiếng ồn.",
    },
    {
      id: 8,
      name: "Bàn phím cơ RGB",
      price: 129.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Bàn+phím",
      supplier: "GamerGear Inc.",
      stock: 54,
      rating: 4.9,
      category: "Điện tử",
      status: "active",
      sku: "MK-008",
      description: "Bàn phím cơ gaming với đèn RGB tùy chỉnh và các phím có thể lập trình.",
    },
    {
      id: 9,
      name: "Khóa học tiếng Việt cơ bản",
      price: 99.99,
      currency: "USD",
      image: "/placeholder.svg?height=200&width=200&text=Khóa+học",
      supplier: "VietLanguage Center",
      stock: 999,
      rating: 4.8,
      category: "Giáo dục",
      status: "active",
      sku: "VL-001",
      description: "Khóa học tiếng Việt cơ bản dành cho người nước ngoài, bao gồm 40 giờ học trực tuyến.",
    },
  ])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter.toLowerCase()
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
      toast({
        title: "Đã xóa sản phẩm",
        description: `Sản phẩm "${selectedProduct.name}" đã được xóa thành công`,
      })
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
      toast({
        title: "Đã cập nhật sản phẩm",
        description: `Sản phẩm "${editFormData.name}" đã được cập nhật thành công`,
      })
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
                <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm mới
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
                      placeholder="Tìm sản phẩm..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    <SelectItem value="điện tử">Điện tử</SelectItem>
                    <SelectItem value="văn phòng">Văn phòng</SelectItem>
                    <SelectItem value="giáo dục">Giáo dục</SelectItem>
                    <SelectItem value="dịch vụ">Dịch vụ</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nhà cung cấp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả nhà cung cấp</SelectItem>
                    <SelectItem value="techgadgets">TechGadgets Co.</SelectItem>
                    <SelectItem value="wearabletech">WearableTech Inc.</SelectItem>
                    <SelectItem value="homeoffice">HomeOffice Supplies</SelectItem>
                    <SelectItem value="vietlanguage">VietLanguage Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Lọc thêm
                  </Button>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="active">Đang bán</SelectItem>
                      <SelectItem value="low_stock">Sắp hết hàng</SelectItem>
                      <SelectItem value="out_of_stock">Hết hàng</SelectItem>
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
                      <SelectValue placeholder="Sắp xếp theo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="price-low">Giá: Thấp đến cao</SelectItem>
                      <SelectItem value="price-high">Giá: Cao đến thấp</SelectItem>
                      <SelectItem value="name">Tên A-Z</SelectItem>
                      <SelectItem value="stock">Tồn kho</SelectItem>
                      <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
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
                        <th className="text-left py-3 px-4 font-medium">Sản phẩm</th>
                        <th className="text-left py-3 px-4 font-medium">Mã SKU</th>
                        <th className="text-left py-3 px-4 font-medium">Giá</th>
                        <th className="text-left py-3 px-4 font-medium">Tồn kho</th>
                        <th className="text-left py-3 px-4 font-medium">Nhà cung cấp</th>
                        <th className="text-left py-3 px-4 font-medium">Trạng thái</th>
                        <th className="text-left py-3 px-4 font-medium">Thao tác</th>
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
                              {product.status === "active" ? "Đang bán" : 
                               product.status === "low_stock" ? "Sắp hết hàng" : "Hết hàng"}
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
                <div className="text-muted-foreground">Không tìm thấy sản phẩm phù hợp với tiêu chí.</div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Trước
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
                Sau
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
              <h3 className="text-lg font-bold">Xem chi tiết sản phẩm</h3>
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
                  <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                  <p className="text-lg font-semibold">{selectedProduct.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mã SKU</label>
                  <p className="font-mono">{selectedProduct.sku}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Giá</label>
                  <p className="text-xl font-bold">${selectedProduct.price}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tồn kho</label>
                  <p>{selectedProduct.stock} sản phẩm</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Danh mục</label>
                  <p>{selectedProduct.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nhà cung cấp</label>
                  <p>{selectedProduct.supplier}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Trạng thái</label>
                  <Badge variant={selectedProduct.status === "active" ? "default" : "secondary"}>
                    {selectedProduct.status === "active" ? "Đang bán" : 
                     selectedProduct.status === "low_stock" ? "Sắp hết hàng" : "Hết hàng"}
                  </Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mô tả</label>
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
              <h3 className="text-lg font-bold">Chỉnh sửa sản phẩm</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowEditDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                <Input
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Giá</label>
                  <Input
                    type="number"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tồn kho</label>
                  <Input
                    type="number"
                    value={editFormData.stock}
                    onChange={(e) => setEditFormData({ ...editFormData, stock: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Danh mục</label>
                <Select
                  value={editFormData.category}
                  onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Điện tử">Điện tử</SelectItem>
                    <SelectItem value="Văn phòng">Văn phòng</SelectItem>
                    <SelectItem value="Giáo dục">Giáo dục</SelectItem>
                    <SelectItem value="Dịch vụ">Dịch vụ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nhà cung cấp</label>
                <Input
                  value={editFormData.supplier}
                  onChange={(e) => setEditFormData({ ...editFormData, supplier: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
                <Select
                  value={editFormData.status}
                  onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang bán</SelectItem>
                    <SelectItem value="low_stock">Sắp hết hàng</SelectItem>
                    <SelectItem value="out_of_stock">Hết hàng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  className="w-full p-2 border rounded-md h-24"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={saveEdit}>Lưu thay đổi</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Xóa sản phẩm</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Bạn có chắc chắn muốn xóa sản phẩm "{selectedProduct.name}"? Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Hủy
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
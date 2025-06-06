"use client"

import { useState } from "react"
import { Plus, Search, Filter, Download, Send, Edit, Trash2, Calculator, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useB2B } from "@/components/store/B2BProvider"
import { toast } from "@/hooks/use-toast"

export default function QuotesPage() {
  const { quotes, products, users, createQuote, updateQuote, sendQuote } = useB2B()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)

  const [newQuote, setNewQuote] = useState({
    productId: "",
    supplierId: "",
    customerId: "",
    quantity: 0,
    costPrice: 0,
    sellingPrice: 0,
    margin: 0,
    currency: "USD",
    terms: "FOB" as const,
    validUntil: "",
    notes: "",
  })

  const filteredQuotes = quotes.filter((quote) => {
    const product = products.find((p) => p.id === quote.productId)
    const supplier = users.find((u) => u.id === quote.supplierId)
    const customer = users.find((u) => u.id === quote.customerId)

    const matchesSearch =
      !searchQuery ||
      product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier?.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer?.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || quote.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const suppliers = users.filter((u) => u.role === "supplier")
  const customers = users.filter((u) => u.role === "customer")

  const calculateMargin = (costPrice: number, sellingPrice: number) => {
    if (costPrice === 0) return 0
    return ((sellingPrice - costPrice) / sellingPrice) * 100
  }

  const calculateSellingPrice = (costPrice: number, margin: number) => {
    if (margin === 0) return costPrice
    return costPrice / (1 - margin / 100)
  }

  const handleCreateQuote = () => {
    const validUntilDate = new Date(newQuote.validUntil).getTime()

    createQuote({
      ...newQuote,
      validUntil: validUntilDate,
    })

    setShowCreateDialog(false)
    setNewQuote({
      productId: "",
      supplierId: "",
      customerId: "",
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
      margin: 0,
      currency: "USD",
      terms: "FOB",
      validUntil: "",
      notes: "",
    })
    
    toast({
      title: "Báo giá đã được tạo",
      description: "Báo giá mới đã được tạo thành công",
    })
  }

  const handleMarginChange = (margin: number) => {
    const sellingPrice = calculateSellingPrice(newQuote.costPrice, margin)
    setNewQuote((prev) => ({ ...prev, margin, sellingPrice }))
  }

  const handleSellingPriceChange = (sellingPrice: number) => {
    const margin = calculateMargin(newQuote.costPrice, sellingPrice)
    setNewQuote((prev) => ({ ...prev, sellingPrice, margin }))
  }
  
  const handleSendQuote = (quoteId: string, customerId: string) => {
    if (!customerId) {
      toast({
        title: "Không thể gửi báo giá",
        description: "Vui lòng chọn khách hàng trước khi gửi báo giá",
        variant: "destructive",
      })
      return
    }
    
    sendQuote(quoteId, customerId)
    toast({
      title: "Đã gửi báo giá",
      description: "Báo giá đã được gửi thành công đến khách hàng",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý báo giá</h1>
          <p className="text-gray-600 mt-2">Quản lý tất cả yêu cầu báo giá và phản hồi</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo báo giá mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo báo giá mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product">Sản phẩm</Label>
                  <Select
                    value={newQuote.productId}
                    onValueChange={(value) => setNewQuote((prev) => ({ ...prev, productId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn sản phẩm" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="supplier">Nhà cung cấp</Label>
                  <Select
                    value={newQuote.supplierId}
                    onValueChange={(value) => setNewQuote((prev) => ({ ...prev, supplierId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhà cung cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Khách hàng</Label>
                  <Select
                    value={newQuote.customerId}
                    onValueChange={(value) => setNewQuote((prev) => ({ ...prev, customerId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khách hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Số lượng</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newQuote.quantity}
                    onChange={(e) => setNewQuote((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="costPrice">Giá nhập (USD)</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    step="0.01"
                    value={newQuote.costPrice}
                    onChange={(e) => setNewQuote((prev) => ({ ...prev, costPrice: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="margin">Tỷ suất lợi nhuận (%)</Label>
                  <Input
                    id="margin"
                    type="number"
                    step="0.1"
                    value={newQuote.margin}
                    onChange={(e) => handleMarginChange(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="sellingPrice">Giá bán (USD)</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    value={newQuote.sellingPrice}
                    onChange={(e) => handleSellingPriceChange(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="terms">Điều khoản thương mại</Label>
                  <Select
                    value={newQuote.terms}
                    onValueChange={(value: any) => setNewQuote((prev) => ({ ...prev, terms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EXW">EXW (Giao tại xưởng)</SelectItem>
                      <SelectItem value="FOB">FOB (Giao tại cảng đi)</SelectItem>
                      <SelectItem value="CIF">CIF (Giá CIF)</SelectItem>
                      <SelectItem value="DDP">DDP (Giao hàng đã nộp thuế)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="validUntil">Có hiệu lực đến</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={newQuote.validUntil}
                    onChange={(e) => setNewQuote((prev) => ({ ...prev, validUntil: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  value={newQuote.notes}
                  onChange={(e) => setNewQuote((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Nhập ghi chú báo giá..."
                />
              </div>

              {newQuote.costPrice > 0 && newQuote.sellingPrice > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calculator className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Tính toán lợi nhuận</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">Tổng giá nhập:</span>
                        <p className="font-medium">${(newQuote.costPrice * newQuote.quantity).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">Tổng giá bán:</span>
                        <p className="font-medium">${(newQuote.sellingPrice * newQuote.quantity).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">Tổng lợi nhuận:</span>
                        <p className="font-medium text-green-600">
                          ${((newQuote.sellingPrice - newQuote.costPrice) * newQuote.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreateQuote}>Tạo báo giá</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm sản phẩm, nhà cung cấp hoặc khách hàng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="draft">Bản nháp</SelectItem>
            <SelectItem value="sent">Đã gửi</SelectItem>
            <SelectItem value="accepted">Đã chấp nhận</SelectItem>
            <SelectItem value="rejected">Đã từ chối</SelectItem>
            <SelectItem value="expired">Đã hết hạn</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Lọc
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Xuất
        </Button>
      </div>

      {/* Quotes List */}
      <div className="space-y-4">
        {filteredQuotes.map((quote) => {
          const product = products.find((p) => p.id === quote.productId)
          const supplier = users.find((u) => u.id === quote.supplierId)
          const customer = users.find((u) => u.id === quote.customerId)
          const isExpiringSoon = quote.validUntil < Date.now() + 24 * 60 * 60 * 1000

          return (
            <Card
              key={quote.id}
              className={`${isExpiringSoon && quote.status === "sent" ? "border-orange-300 bg-orange-50" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{product?.name}</h3>
                    <p className="text-sm text-gray-600">
                      Báo giá #{quote.id.slice(-6)} • Ngày tạo: {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isExpiringSoon && quote.status === "sent" && <Badge variant="destructive">Sắp hết hạn</Badge>}
                    <Badge
                      variant={
                        quote.status === "sent"
                          ? "default"
                          : quote.status === "accepted"
                            ? "default"
                            : quote.status === "draft"
                              ? "secondary"
                              : "destructive"
                      }
                    >
                      {quote.status === "sent"
                        ? "Đã gửi"
                        : quote.status === "accepted"
                          ? "Đã chấp nhận"
                          : quote.status === "draft"
                            ? "Bản nháp"
                            : quote.status === "rejected"
                              ? "Đã từ chối"
                              : "Đã hết hạn"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Nhà cung cấp</span>
                    <p className="font-medium">{supplier?.company}</p>
                    <p className="text-xs text-gray-500">{supplier?.country}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Khách hàng</span>
                    <p className="font-medium">{customer?.company || "Chưa phân bổ"}</p>
                    <p className="text-xs text-gray-500">{customer?.country}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Số lượng</span>
                    <p className="font-medium">{quote.quantity.toLocaleString()} sản phẩm</p>
                    <p className="text-xs text-gray-500">Điều khoản: {quote.terms}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Hiệu lực đến</span>
                    <p className="font-medium">{new Date(quote.validUntil).toLocaleDateString()}</p>
                    <p className={`text-xs ${isExpiringSoon ? "text-red-500" : "text-gray-500"}`}>
                      {isExpiringSoon ? "Sắp hết hạn" : "Còn hiệu lực"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-500">Giá nhập</span>
                    <p className="font-medium">${quote.costPrice}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Giá bán</span>
                    <p className="font-medium">${quote.sellingPrice || "Chưa thiết lập"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Tỷ suất lợi nhuận</span>
                    <p className="font-medium text-green-600">{quote.margin?.toFixed(1) || 0}%</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Tổng lợi nhuận</span>
                    <p className="font-medium text-green-600">
                      $
                      {quote.sellingPrice
                        ? ((quote.sellingPrice - quote.costPrice) * quote.quantity).toLocaleString()
                        : "0"}
                    </p>
                  </div>
                </div>

                {quote.notes && (
                  <div className="mb-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">{quote.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Tổng giá trị:{" "}
                    <span className="font-medium text-gray-900">
                      $
                      {quote.sellingPrice
                        ? (quote.sellingPrice * quote.quantity).toLocaleString()
                        : (quote.costPrice * quote.quantity).toLocaleString()}{" "}
                      {quote.currency}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Chỉnh sửa
                    </Button>
                    {quote.status === "draft" && (
                      <Button size="sm" onClick={() => handleSendQuote(quote.id, quote.customerId || "")}>
                        <Send className="h-4 w-4 mr-1" />
                        Gửi
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredQuotes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FileText className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có báo giá</h3>
            <p className="text-gray-600 mb-4">Bạn chưa tạo báo giá nào, nhấn nút ở trên để bắt đầu</p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tạo báo giá đầu tiên
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
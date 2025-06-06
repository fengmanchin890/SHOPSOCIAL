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
  }

  const handleMarginChange = (margin: number) => {
    const sellingPrice = calculateSellingPrice(newQuote.costPrice, margin)
    setNewQuote((prev) => ({ ...prev, margin, sellingPrice }))
  }

  const handleSellingPriceChange = (sellingPrice: number) => {
    const margin = calculateMargin(newQuote.costPrice, sellingPrice)
    setNewQuote((prev) => ({ ...prev, sellingPrice, margin }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">報價管理</h1>
          <p className="text-gray-600 mt-2">管理所有報價請求和回覆</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新建報價
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>創建新報價</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product">產品</Label>
                  <Select
                    value={newQuote.productId}
                    onValueChange={(value) => setNewQuote((prev) => ({ ...prev, productId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇產品" />
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
                  <Label htmlFor="supplier">供應商</Label>
                  <Select
                    value={newQuote.supplierId}
                    onValueChange={(value) => setNewQuote((prev) => ({ ...prev, supplierId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇供應商" />
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
                  <Label htmlFor="customer">客戶</Label>
                  <Select
                    value={newQuote.customerId}
                    onValueChange={(value) => setNewQuote((prev) => ({ ...prev, customerId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇客戶" />
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
                  <Label htmlFor="quantity">數量</Label>
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
                  <Label htmlFor="costPrice">成本價 (USD)</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    step="0.01"
                    value={newQuote.costPrice}
                    onChange={(e) => setNewQuote((prev) => ({ ...prev, costPrice: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="margin">利潤率 (%)</Label>
                  <Input
                    id="margin"
                    type="number"
                    step="0.1"
                    value={newQuote.margin}
                    onChange={(e) => handleMarginChange(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="sellingPrice">售價 (USD)</Label>
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
                  <Label htmlFor="terms">貿易條款</Label>
                  <Select
                    value={newQuote.terms}
                    onValueChange={(value: any) => setNewQuote((prev) => ({ ...prev, terms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EXW">EXW (工廠交貨)</SelectItem>
                      <SelectItem value="FOB">FOB (離岸價)</SelectItem>
                      <SelectItem value="CIF">CIF (到岸價)</SelectItem>
                      <SelectItem value="DDP">DDP (完稅後交貨)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="validUntil">有效期至</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={newQuote.validUntil}
                    onChange={(e) => setNewQuote((prev) => ({ ...prev, validUntil: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">備註</Label>
                <Textarea
                  id="notes"
                  value={newQuote.notes}
                  onChange={(e) => setNewQuote((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="輸入報價備註..."
                />
              </div>

              {newQuote.costPrice > 0 && newQuote.sellingPrice > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calculator className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">利潤計算</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">總成本:</span>
                        <p className="font-medium">${(newQuote.costPrice * newQuote.quantity).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">總售價:</span>
                        <p className="font-medium">${(newQuote.sellingPrice * newQuote.quantity).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">總利潤:</span>
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
                  取消
                </Button>
                <Button onClick={handleCreateQuote}>創建報價</Button>
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
            placeholder="搜尋產品、供應商或客戶..."
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
            <SelectItem value="all">所有狀態</SelectItem>
            <SelectItem value="draft">草稿</SelectItem>
            <SelectItem value="sent">已發送</SelectItem>
            <SelectItem value="accepted">已接受</SelectItem>
            <SelectItem value="rejected">已拒絕</SelectItem>
            <SelectItem value="expired">已過期</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          篩選
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          匯出
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
                      報價 #{quote.id.slice(-6)} • 創建於 {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isExpiringSoon && quote.status === "sent" && <Badge variant="destructive">即將過期</Badge>}
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
                        ? "已發送"
                        : quote.status === "accepted"
                          ? "已接受"
                          : quote.status === "draft"
                            ? "草稿"
                            : quote.status === "rejected"
                              ? "已拒絕"
                              : "已過期"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">供應商</span>
                    <p className="font-medium">{supplier?.company}</p>
                    <p className="text-xs text-gray-500">{supplier?.country}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">客戶</span>
                    <p className="font-medium">{customer?.company || "待分配"}</p>
                    <p className="text-xs text-gray-500">{customer?.country}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">數量</span>
                    <p className="font-medium">{quote.quantity.toLocaleString()} 件</p>
                    <p className="text-xs text-gray-500">{quote.terms} 條款</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">有效期</span>
                    <p className="font-medium">{new Date(quote.validUntil).toLocaleDateString()}</p>
                    <p className={`text-xs ${isExpiringSoon ? "text-red-500" : "text-gray-500"}`}>
                      {isExpiringSoon ? "即將過期" : "有效"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-500">成本價</span>
                    <p className="font-medium">${quote.costPrice}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">售價</span>
                    <p className="font-medium">${quote.sellingPrice || "待設定"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">利潤率</span>
                    <p className="font-medium text-green-600">{quote.margin?.toFixed(1) || 0}%</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">總利潤</span>
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
                    總金額:{" "}
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
                      編輯
                    </Button>
                    {quote.status === "draft" && (
                      <Button size="sm" onClick={() => sendQuote(quote.id, quote.customerId || "")}>
                        <Send className="h-4 w-4 mr-1" />
                        發送
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">暫無報價</h3>
            <p className="text-gray-600 mb-4">還沒有創建任何報價，點擊上方按鈕開始創建</p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              創建第一個報價
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

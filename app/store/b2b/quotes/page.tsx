"use client"

import { useState } from "react"
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download, 
  Send, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Clock,
  Calendar,
  DollarSign,
  Building,
  User,
  Package
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"
import { useI18n } from "@/contexts/i18n-context"

export default function QuotesPage() {
  const { quotes, products, users, createQuote, updateQuote, sendQuote } = useB2B()
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)
  const [showQuoteDetailsDialog, setShowQuoteDetailsDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

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

  // Filter quotes based on search and status
  const filteredQuotes = quotes.filter(quote => {
    const product = products.find(p => p.id === quote.productId)
    const supplier = users.find(u => u.id === quote.supplierId)
    const customer = users.find(u => u.id === quote.customerId)

    // Filter by search query
    const matchesSearch = !searchQuery || 
      product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier?.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer?.company.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by status
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter

    // Filter by tab
    if (activeTab === "all") return matchesSearch && matchesStatus
    if (activeTab === "draft") return quote.status === "draft" && matchesSearch && matchesStatus
    if (activeTab === "sent") return quote.status === "sent" && matchesSearch && matchesStatus
    if (activeTab === "accepted") return quote.status === "accepted" && matchesSearch && matchesStatus
    if (activeTab === "expired") return quote.status === "expired" && matchesSearch && matchesStatus

    return matchesSearch && matchesStatus
  })

  const suppliers = users.filter(u => u.role === "supplier")
  const customers = users.filter(u => u.role === "customer")

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
    setNewQuote(prev => ({ ...prev, margin, sellingPrice }))
  }

  const handleSellingPriceChange = (sellingPrice: number) => {
    const margin = calculateMargin(newQuote.costPrice, sellingPrice)
    setNewQuote(prev => ({ ...prev, sellingPrice, margin }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "sent":
        return <Badge variant="default">Sent</Badge>
      case "accepted":
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const isExpiringSoon = (validUntil: number) => {
    return validUntil < Date.now() + 24 * 60 * 60 * 1000 && validUntil > Date.now()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{t("quotes")}</h1>
              <p className="text-gray-500">Manage your quotes and pricing</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Quote
            </Button>
          </div>
          
          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search quotes..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quote Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Quotes</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Quotes List */}
          <div className="space-y-4">
            {filteredQuotes.length > 0 ? (
              filteredQuotes.map(quote => {
                const product = products.find(p => p.id === quote.productId)
                const supplier = users.find(u => u.id === quote.supplierId)
                const customer = users.find(u => u.id === quote.customerId)
                const expiringSoon = isExpiringSoon(quote.validUntil)
                
                return (
                  <Card 
                    key={quote.id} 
                    className={`${expiringSoon && quote.status === "sent" ? "border-orange-300 bg-orange-50" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{product?.name}</h3>
                          <p className="text-sm text-gray-600">
                            Quote #{quote.id.slice(-6)} • Created on {new Date(quote.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {expiringSoon && quote.status === "sent" && (
                            <Badge variant="destructive">Expiring Soon</Badge>
                          )}
                          {getStatusBadge(quote.status)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Supplier</span>
                          <p className="font-medium">{supplier?.company}</p>
                          <p className="text-xs text-gray-500">{supplier?.country}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Customer</span>
                          <p className="font-medium">{customer?.company || "Unassigned"}</p>
                          <p className="text-xs text-gray-500">{customer?.country}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Quantity</span>
                          <p className="font-medium">{quote.quantity.toLocaleString()} units</p>
                          <p className="text-xs text-gray-500">{quote.terms} terms</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Valid Until</span>
                          <p className="font-medium">{new Date(quote.validUntil).toLocaleDateString()}</p>
                          <p className={`text-xs ${expiringSoon ? "text-red-500" : "text-gray-500"}`}>
                            {expiringSoon ? "Expiring soon" : "Valid"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm text-gray-500">Cost Price</span>
                          <p className="font-medium">${quote.costPrice}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Selling Price</span>
                          <p className="font-medium">${quote.sellingPrice || "Not set"}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Margin</span>
                          <p className="font-medium text-green-600">{quote.margin?.toFixed(1) || 0}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Value</span>
                          <p className="font-medium text-green-600">
                            ${quote.sellingPrice 
                              ? (quote.sellingPrice * quote.quantity).toLocaleString() 
                              : (quote.costPrice * quote.quantity).toLocaleString()}
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
                          Total: <span className="font-medium text-gray-900">
                            ${quote.sellingPrice 
                              ? (quote.sellingPrice * quote.quantity).toLocaleString() 
                              : (quote.costPrice * quote.quantity).toLocaleString()} {quote.currency}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedQuote(quote.id)
                              setShowQuoteDetailsDialog(true)
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            {t("edit")}
                          </Button>
                          {quote.status === "draft" && (
                            <Button 
                              size="sm" 
                              onClick={() => sendQuote(quote.id, quote.customerId || "")}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send
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
              })
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <FileText className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
                  <p className="text-gray-600 mb-4">No quotes match your current filters or search criteria</p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Quote
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Create Quote Dialog */}
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Quote</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new quote for your customer.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product">Product *</Label>
                    <Select 
                      value={newQuote.productId} 
                      onValueChange={(value) => setNewQuote(prev => ({ ...prev, productId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="supplier">Supplier *</Label>
                    <Select 
                      value={newQuote.supplierId} 
                      onValueChange={(value) => setNewQuote(prev => ({ ...prev, supplierId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map(supplier => (
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
                    <Label htmlFor="customer">Customer</Label>
                    <Select 
                      value={newQuote.customerId} 
                      onValueChange={(value) => setNewQuote(prev => ({ ...prev, customerId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map(customer => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      value={newQuote.quantity || ""}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="costPrice">Cost Price (USD) *</Label>
                    <Input 
                      id="costPrice" 
                      type="number" 
                      step="0.01"
                      value={newQuote.costPrice || ""}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, costPrice: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="margin">Margin (%)</Label>
                    <Input 
                      id="margin" 
                      type="number" 
                      step="0.1"
                      value={newQuote.margin || ""}
                      onChange={(e) => handleMarginChange(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sellingPrice">Selling Price (USD)</Label>
                    <Input 
                      id="sellingPrice" 
                      type="number" 
                      step="0.01"
                      value={newQuote.sellingPrice || ""}
                      onChange={(e) => handleSellingPriceChange(Number(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="terms">Trade Terms</Label>
                    <Select 
                      value={newQuote.terms}
                      onValueChange={(value: any) => setNewQuote(prev => ({ ...prev, terms: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EXW">EXW (Ex Works)</SelectItem>
                        <SelectItem value="FOB">FOB (Free on Board)</SelectItem>
                        <SelectItem value="CIF">CIF (Cost, Insurance & Freight)</SelectItem>
                        <SelectItem value="DDP">DDP (Delivered Duty Paid)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="validUntil">Valid Until *</Label>
                    <Input 
                      id="validUntil" 
                      type="date" 
                      value={newQuote.validUntil}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, validUntil: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    value={newQuote.notes}
                    onChange={(e) => setNewQuote(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Enter any additional notes or terms for this quote"
                  />
                </div>
                
                {newQuote.costPrice > 0 && newQuote.sellingPrice > 0 && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Profit Calculation</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-blue-700">Total Cost:</span>
                          <p className="font-medium">${(newQuote.costPrice * newQuote.quantity).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-blue-700">Total Revenue:</span>
                          <p className="font-medium">${(newQuote.sellingPrice * newQuote.quantity).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-blue-700">Total Profit:</span>
                          <p className="font-medium text-green-600">
                            ${((newQuote.sellingPrice - newQuote.costPrice) * newQuote.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>{t("cancel")}</Button>
                  <Button onClick={handleCreateQuote}>Create Quote</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Quote Details Dialog */}
          {selectedQuote && (
            <Dialog open={showQuoteDetailsDialog} onOpenChange={setShowQuoteDetailsDialog}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Quote Details</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Quote Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {quotes.filter(q => q.id === selectedQuote).map(quote => {
                            const product = products.find(p => p.id === quote.productId)
                            
                            return (
                              <div key={quote.id} className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <Package className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">Product</p>
                                    <p>{product?.name}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Calendar className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">Created On</p>
                                    <p>{new Date(quote.createdAt).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Clock className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">Valid Until</p>
                                    <p>{new Date(quote.validUntil).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">Terms</p>
                                    <p>{quote.terms}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Parties</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {quotes.filter(q => q.id === selectedQuote).map(quote => {
                            const supplier = users.find(u => u.id === quote.supplierId)
                            const customer = users.find(u => u.id === quote.customerId)
                            
                            return (
                              <div key={quote.id} className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <Building className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">Supplier</p>
                                    <p>{supplier?.company}</p>
                                    <p className="text-xs text-muted-foreground">{supplier?.country}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <User className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">Customer</p>
                                    <p>{customer?.company || "Not assigned"}</p>
                                    {customer && <p className="text-xs text-muted-foreground">{customer.country}</p>}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">Pricing</p>
                                    <p>Cost: ${quote.costPrice} | Selling: ${quote.sellingPrice || "Not set"}</p>
                                    <p className="text-xs text-muted-foreground">Margin: {quote.margin?.toFixed(1) || 0}%</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quote Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {quotes.filter(q => q.id === selectedQuote).map(quote => {
                          const product = products.find(p => p.id === quote.productId)
                          
                          return (
                            <div key={quote.id} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Product</p>
                                  <p>{product?.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Quantity</p>
                                  <p>{quote.quantity.toLocaleString()} units</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Cost Price</p>
                                  <p>${quote.costPrice} per unit</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Selling Price</p>
                                  <p>${quote.sellingPrice || "Not set"} per unit</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Total Cost</p>
                                  <p>${(quote.costPrice * quote.quantity).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Total Revenue</p>
                                  <p>${quote.sellingPrice ? (quote.sellingPrice * quote.quantity).toLocaleString() : "Not set"}</p>
                                </div>
                              </div>
                              
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium">Notes</p>
                                <p className="text-sm">{quote.notes || "No notes provided"}</p>
                              </div>
                              
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setShowQuoteDetailsDialog(false)}>
                                  Close
                                </Button>
                                <Button variant="outline">
                                  <Edit className="h-4 w-4 mr-2" />
                                  {t("edit")} Quote
                                </Button>
                                {quote.status === "draft" && (
                                  <Button onClick={() => {
                                    sendQuote(quote.id, quote.customerId || "")
                                    setShowQuoteDetailsDialog(false)
                                  }}>
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Quote
                                  </Button>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="history" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quote History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {quotes.filter(q => q.id === selectedQuote).map(quote => (
                            <div key={quote.id} className="space-y-4">
                              <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                </div>
                                <div>
                                  <p className="font-medium">Quote created</p>
                                  <p className="text-sm text-gray-600">{new Date(quote.createdAt).toLocaleString()}</p>
                                </div>
                              </div>
                              
                              {quote.status !== "draft" && (
                                <div className="flex items-start gap-4">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                  </div>
                                  <div>
                                    <p className="font-medium">Quote sent to customer</p>
                                    <p className="text-sm text-gray-600">{new Date(quote.createdAt + 3600000).toLocaleString()}</p>
                                  </div>
                                </div>
                              )}
                              
                              {quote.status === "accepted" && (
                                <div className="flex items-start gap-4">
                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                  </div>
                                  <div>
                                    <p className="font-medium">Quote accepted by customer</p>
                                    <p className="text-sm text-gray-600">{new Date(quote.createdAt + 86400000).toLocaleString()}</p>
                                  </div>
                                </div>
                              )}
                              
                              {quote.status === "rejected" && (
                                <div className="flex items-start gap-4">
                                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                                  </div>
                                  <div>
                                    <p className="font-medium">Quote rejected by customer</p>
                                    <p className="text-sm text-gray-600">{new Date(quote.createdAt + 86400000).toLocaleString()}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quote Documents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-blue-600" />
                              <div>
                                <p className="font-medium">Quote PDF</p>
                                <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                          
                          <div className="flex justify-center">
                            <Button variant="outline">
                              <Plus className="h-4 w-4 mr-2" />
                              Generate New Document
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  )
}
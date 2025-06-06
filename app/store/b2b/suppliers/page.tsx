"use client"

import { useState } from "react"
import { 
  Factory, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Globe, 
  FileText, 
  Package,
  Download,
  Upload,
  Check,
  X,
  Star
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

export default function SuppliersPage() {
  const { users, products, quotes } = useB2B()
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  const [showAddSupplierDialog, setShowAddSupplierDialog] = useState(false)
  const [showSupplierDetailsDialog, setShowSupplierDetailsDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  
  // Form state for new supplier
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    website: "",
    industry: "",
    specialties: "",
    notes: "",
  })
  
  // Form state for contact message
  const [contactMessage, setContactMessage] = useState({
    subject: "",
    message: "",
    attachments: [] as File[],
  })
  
  // Get suppliers from users
  const suppliers = users.filter(user => user.role === "supplier")
  
  // Filter suppliers based on search and status
  const filteredSuppliers = suppliers.filter(supplier => {
    // Filter by search query
    const matchesSearch = 
      supplier.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.country?.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by status
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "active" && supplier.verified) ||
      (statusFilter === "inactive" && !supplier.verified)
    
    return matchesSearch && matchesStatus
  })
  
  // Get supplier statistics
  const getSupplierStats = (supplierId: string) => {
    const supplierProducts = products.filter(product => product.supplierId === supplierId)
    const supplierQuotes = quotes.filter(quote => quote.supplierId === supplierId)
    
    return {
      totalProducts: supplierProducts.length,
      activeQuotes: supplierQuotes.filter(q => q.status === "sent" || q.status === "draft").length,
      acceptedQuotes: supplierQuotes.filter(q => q.status === "accepted").length,
      averageLeadTime: supplierProducts.reduce((sum, p) => sum + p.leadTime, 0) / 
                      (supplierProducts.length || 1),
    }
  }
  
  const handleAddSupplier = () => {
    // Validate form
    if (!newSupplier.name || !newSupplier.company || !newSupplier.email) {
      alert("Please fill in all required fields")
      return
    }
    
    // Add supplier logic would go here
    console.log("Adding new supplier:", newSupplier)
    
    // Reset form and close dialog
    setNewSupplier({
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      address: "",
      website: "",
      industry: "",
      specialties: "",
      notes: "",
    })
    setShowAddSupplierDialog(false)
  }
  
  const handleSendMessage = () => {
    // Validate form
    if (!contactMessage.subject || !contactMessage.message) {
      alert("Please fill in all required fields")
      return
    }
    
    // Send message logic would go here
    console.log("Sending message to supplier:", selectedSupplier?.name, contactMessage)
    
    // Reset form and close dialog
    setContactMessage({
      subject: "",
      message: "",
      attachments: [],
    })
    setShowContactDialog(false)
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setContactMessage({
        ...contactMessage,
        attachments: Array.from(e.target.files),
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{t("suppliers")}</h1>
              <p className="text-gray-500">Manage your supplier relationships</p>
            </div>
            <Button onClick={() => setShowAddSupplierDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
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
                      placeholder="Search suppliers..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Supplier Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Suppliers</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="preferred">Preferred</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Supplier List */}
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
              <div className="col-span-4">Supplier</div>
              <div className="col-span-2">Country</div>
              <div className="col-span-2">{t("status")}</div>
              <div className="col-span-2">Products</div>
              <div className="col-span-2 text-right">{t("actions")}</div>
            </div>
            
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => {
                const stats = getSupplierStats(supplier.id)
                
                return (
                  <div key={supplier.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Factory className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{supplier.company}</p>
                          <p className="text-sm text-muted-foreground">{supplier.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p>{supplier.country}</p>
                    </div>
                    <div className="col-span-2">
                      <Badge variant={supplier.verified ? "default" : "secondary"}>
                        {supplier.verified ? t("active") : t("inactive")}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <p>{stats.totalProducts} products</p>
                      <p className="text-sm text-muted-foreground">{stats.averageLeadTime.toFixed(0)} days avg. lead time</p>
                    </div>
                    <div className="col-span-2 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedSupplier(supplier)
                            setShowSupplierDetailsDialog(true)
                          }}>
                            {t("view")}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedSupplier(supplier)
                            setShowContactDialog(true)
                          }}>
                            Contact Supplier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>{t("edit")}</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">{t("delete")}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">
                No suppliers found matching your criteria
              </div>
            )}
          </div>
          
          {/* Add Supplier Dialog */}
          <Dialog open={showAddSupplierDialog} onOpenChange={setShowAddSupplierDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
                <DialogDescription>
                  Enter the supplier details below to add them to your database.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name *</Label>
                    <Input 
                      id="name" 
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input 
                      id="company" 
                      value={newSupplier.company}
                      onChange={(e) => setNewSupplier({...newSupplier, company: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={newSupplier.phone}
                      onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      value={newSupplier.country}
                      onChange={(e) => setNewSupplier({...newSupplier, country: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={newSupplier.industry}
                      onValueChange={(value) => setNewSupplier({...newSupplier, industry: value})}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="textiles">Textiles</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="chemicals">Chemicals</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    value={newSupplier.website}
                    onChange={(e) => setNewSupplier({...newSupplier, website: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialties">Specialties</Label>
                  <Input 
                    id="specialties" 
                    value={newSupplier.specialties}
                    onChange={(e) => setNewSupplier({...newSupplier, specialties: e.target.value})}
                    placeholder="e.g., Consumer electronics, Wireless devices, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    value={newSupplier.notes}
                    onChange={(e) => setNewSupplier({...newSupplier, notes: e.target.value})}
                    placeholder="Add any additional information about this supplier"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddSupplierDialog(false)}>{t("cancel")}</Button>
                <Button onClick={handleAddSupplier}>{t("add")} Supplier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Supplier Details Dialog */}
          {selectedSupplier && (
            <Dialog open={showSupplierDetailsDialog} onOpenChange={setShowSupplierDetailsDialog}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Supplier Details</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="quotes">Quotes</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Supplier Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Building className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Company</p>
                              <p>{selectedSupplier.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p>{selectedSupplier.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p>{selectedSupplier.phone || "N/A"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Location</p>
                              <p>{selectedSupplier.country}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Website</p>
                              <p>{selectedSupplier.website || "N/A"}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Products</p>
                              <p className="text-2xl font-bold">{getSupplierStats(selectedSupplier.id).totalProducts}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Active Quotes</p>
                              <p className="text-2xl font-bold">{getSupplierStats(selectedSupplier.id).activeQuotes}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Avg. Lead Time</p>
                              <p className="text-2xl font-bold">{getSupplierStats(selectedSupplier.id).averageLeadTime.toFixed(0)} days</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Reliability Score</p>
                              <div className="flex items-center">
                                <p className="text-2xl font-bold mr-2">4.7</p>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                      key={star} 
                                      className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <Button variant="outline" className="w-full" onClick={() => {
                              setShowSupplierDetailsDialog(false)
                              setShowContactDialog(true)
                            }}>
                              <Mail className="h-4 w-4 mr-2" />
                              Contact Supplier
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Products</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {products
                            .filter(product => product.supplierId === selectedSupplier.id)
                            .slice(0, 3)
                            .map((product, index) => (
                              <div key={index} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                  <Package className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{product.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    MOQ: {product.moq} units • Lead Time: {product.leadTime} days
                                  </p>
                                </div>
                              </div>
                            ))}
                            
                          {products.filter(product => product.supplierId === selectedSupplier.id).length === 0 && (
                            <div className="text-center py-4 text-muted-foreground">
                              <p>No products found for this supplier</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="products" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Supplier Products</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {products.filter(product => product.supplierId === selectedSupplier.id).length > 0 ? (
                          <div className="rounded-md border">
                            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                              <div className="col-span-4">Product</div>
                              <div className="col-span-2">Category</div>
                              <div className="col-span-2">MOQ</div>
                              <div className="col-span-2">Lead Time</div>
                              <div className="col-span-2 text-right">{t("actions")}</div>
                            </div>
                            
                            {products
                              .filter(product => product.supplierId === selectedSupplier.id)
                              .map((product) => (
                                <div key={product.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                                  <div className="col-span-4 font-medium">{product.name}</div>
                                  <div className="col-span-2">{product.category}</div>
                                  <div className="col-span-2">{product.moq} units</div>
                                  <div className="col-span-2">{product.leadTime} days</div>
                                  <div className="col-span-2 text-right">
                                    <Button variant="ghost" size="sm">{t("view")}</Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No products found for this supplier</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="quotes" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quote History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {quotes.filter(quote => quote.supplierId === selectedSupplier.id).length > 0 ? (
                          <div className="rounded-md border">
                            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                              <div className="col-span-3">Quote ID</div>
                              <div className="col-span-3">Date</div>
                              <div className="col-span-2">{t("status")}</div>
                              <div className="col-span-2">Amount</div>
                              <div className="col-span-2 text-right">{t("actions")}</div>
                            </div>
                            
                            {quotes
                              .filter(quote => quote.supplierId === selectedSupplier.id)
                              .map((quote) => (
                                <div key={quote.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                                  <div className="col-span-3 font-medium">#{quote.id.slice(-8)}</div>
                                  <div className="col-span-3">{new Date(quote.createdAt).toLocaleDateString()}</div>
                                  <div className="col-span-2">
                                    <Badge variant={
                                      quote.status === "accepted" ? "default" :
                                      quote.status === "sent" ? "secondary" :
                                      quote.status === "rejected" ? "destructive" :
                                      "outline"
                                    }>
                                      {quote.status}
                                    </Badge>
                                  </div>
                                  <div className="col-span-2">${(quote.costPrice * quote.quantity).toLocaleString()}</div>
                                  <div className="col-span-2 text-right">
                                    <Button variant="ghost" size="sm">{t("view")}</Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No quotes found for this supplier</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Supplier Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-medium mb-4">Quality Metrics</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Product Quality</span>
                                  <span className="text-sm font-medium">4.8/5.0</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Defect Rate</span>
                                  <span className="text-sm font-medium">1.2%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "98.8%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Documentation Accuracy</span>
                                  <span className="text-sm font-medium">4.5/5.0</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Delivery Metrics</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">On-Time Delivery</span>
                                  <span className="text-sm font-medium">92%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Lead Time Accuracy</span>
                                  <span className="text-sm font-medium">4.2/5.0</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "84%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Order Fulfillment</span>
                                  <span className="text-sm font-medium">98%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "98%" }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-4">Communication & Responsiveness</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Response Time</span>
                                <span className="text-sm font-medium">4.6/5.0</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Issue Resolution</span>
                                <span className="text-sm font-medium">4.3/5.0</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "86%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h3 className="text-lg font-medium mb-2 text-blue-800">Overall Rating</h3>
                          <div className="flex items-center">
                            <div className="text-3xl font-bold text-blue-800 mr-3">4.7</div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-5 w-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-blue-800">Excellent</span>
                          </div>
                          <p className="text-sm text-blue-800 mt-2">
                            Based on product quality, delivery performance, and communication metrics.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
          
          {/* Contact Supplier Dialog */}
          {selectedSupplier && (
            <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact {selectedSupplier.company}</DialogTitle>
                  <DialogDescription>
                    Send a message to {selectedSupplier.name} at {selectedSupplier.email}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input 
                      id="subject" 
                      value={contactMessage.subject}
                      onChange={(e) => setContactMessage({...contactMessage, subject: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      rows={6}
                      value={contactMessage.message}
                      onChange={(e) => setContactMessage({...contactMessage, message: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments</Label>
                    <Input 
                      id="attachments" 
                      type="file" 
                      multiple
                      onChange={handleFileChange}
                    />
                    {contactMessage.attachments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Selected files:</p>
                        <ul className="text-sm">
                          {contactMessage.attachments.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowContactDialog(false)}>{t("cancel")}</Button>
                  <Button onClick={handleSendMessage}>Send Message</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  )
}
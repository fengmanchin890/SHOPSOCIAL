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
  Package,
  MessageSquare,
  ArrowRight
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

export default function RFQPage() {
  const { users, products } = useB2B()
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showRfqDetailsDialog, setShowRfqDetailsDialog] = useState(false)
  const [selectedRfq, setSelectedRfq] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("all")
  
  // Form state for new RFQ
  const [newRfq, setNewRfq] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    targetPrice: "",
    deadline: "",
    attachments: [] as File[],
    supplierIds: [] as string[],
    additionalRequirements: "",
  })
  
  // Mock RFQ data
  const [rfqs, setRfqs] = useState([
    {
      id: "RFQ-001",
      title: "Wireless Bluetooth Headphones",
      description: "Looking for high-quality wireless headphones with noise cancellation features",
      category: "Electronics",
      quantity: 500,
      targetPrice: 25.00,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "open",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      responses: 3,
      createdBy: "user-middleman-1",
      supplierIds: ["user-supplier-1", "user-supplier-2"],
    },
    {
      id: "RFQ-002",
      title: "Smart Watches with Health Monitoring",
      description: "Seeking suppliers for smart watches with advanced health monitoring features",
      category: "Electronics",
      quantity: 300,
      targetPrice: 45.00,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: "open",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      responses: 1,
      createdBy: "user-middleman-1",
      supplierIds: ["user-supplier-2"],
    },
    {
      id: "RFQ-003",
      title: "Ergonomic Office Chairs",
      description: "Looking for suppliers of high-quality ergonomic office chairs",
      category: "Office Furniture",
      quantity: 100,
      targetPrice: 120.00,
      deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "closed",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      responses: 5,
      createdBy: "user-middleman-1",
      supplierIds: ["user-supplier-1", "user-supplier-2"],
    },
    {
      id: "RFQ-004",
      title: "Laptop Stands",
      description: "Seeking suppliers for adjustable laptop stands",
      category: "Office Accessories",
      quantity: 200,
      targetPrice: 15.00,
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: "draft",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      responses: 0,
      createdBy: "user-middleman-1",
      supplierIds: [],
    },
  ])
  
  // Filter RFQs based on search and status
  const filteredRfqs = rfqs.filter(rfq => {
    // Filter by search query
    const matchesSearch = !searchQuery || 
      rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || rfq.status === statusFilter
    
    // Filter by tab
    if (activeTab === "all") return matchesSearch && matchesStatus
    if (activeTab === "draft") return rfq.status === "draft" && matchesSearch && matchesStatus
    if (activeTab === "open") return rfq.status === "open" && matchesSearch && matchesStatus
    if (activeTab === "closed") return rfq.status === "closed" && matchesSearch && matchesStatus
    
    return matchesSearch && matchesStatus
  })
  
  const suppliers = users.filter(u => u.role === "supplier")
  
  const handleCreateRfq = () => {
    // Validate form
    if (!newRfq.title || !newRfq.description || !newRfq.quantity || !newRfq.deadline) {
      alert("Please fill in all required fields")
      return
    }
    
    // Create new RFQ
    const newRfqObj = {
      id: `RFQ-${(rfqs.length + 1).toString().padStart(3, '0')}`,
      title: newRfq.title,
      description: newRfq.description,
      category: newRfq.category,
      quantity: parseInt(newRfq.quantity),
      targetPrice: newRfq.targetPrice ? parseFloat(newRfq.targetPrice) : 0,
      deadline: new Date(newRfq.deadline).toISOString(),
      status: "draft",
      createdAt: new Date().toISOString(),
      responses: 0,
      createdBy: "user-middleman-1",
      supplierIds: newRfq.supplierIds,
    }
    
    setRfqs([newRfqObj, ...rfqs])
    
    // Reset form and close dialog
    setNewRfq({
      title: "",
      description: "",
      category: "",
      quantity: "",
      targetPrice: "",
      deadline: "",
      attachments: [],
      supplierIds: [],
      additionalRequirements: "",
    })
    setShowCreateDialog(false)
  }
  
  const handlePublishRfq = (rfqId: string) => {
    setRfqs(rfqs.map(rfq => 
      rfq.id === rfqId ? { ...rfq, status: "open" } : rfq
    ))
  }
  
  const handleCloseRfq = (rfqId: string) => {
    setRfqs(rfqs.map(rfq => 
      rfq.id === rfqId ? { ...rfq, status: "closed" } : rfq
    ))
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewRfq({
        ...newRfq,
        attachments: Array.from(e.target.files),
      })
    }
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "open":
        return <Badge variant="default">Open</Badge>
      case "closed":
        return <Badge variant="outline">Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  const isExpiringSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline).getTime()
    return deadlineDate < Date.now() + 2 * 24 * 60 * 60 * 1000 && deadlineDate > Date.now()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Request for Quotations</h1>
              <p className="text-gray-500">Create and manage RFQs to get quotes from suppliers</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create RFQ
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
                      placeholder="Search RFQs..."
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
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
          
          {/* RFQ Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All RFQs</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* RFQs List */}
          <div className="space-y-4">
            {filteredRfqs.length > 0 ? (
              filteredRfqs.map(rfq => {
                const expiringSoon = isExpiringSoon(rfq.deadline)
                
                return (
                  <Card 
                    key={rfq.id} 
                    className={`${expiringSoon && rfq.status === "open" ? "border-orange-300 bg-orange-50" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{rfq.title}</h3>
                          <p className="text-sm text-gray-600">
                            {rfq.id} • Created on {new Date(rfq.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {expiringSoon && rfq.status === "open" && (
                            <Badge variant="destructive">Deadline Soon</Badge>
                          )}
                          {getStatusBadge(rfq.status)}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{rfq.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Category</span>
                          <p className="font-medium">{rfq.category}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Quantity</span>
                          <p className="font-medium">{rfq.quantity.toLocaleString()} units</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Target Price</span>
                          <p className="font-medium">${rfq.targetPrice.toFixed(2)} per unit</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Deadline</span>
                          <p className={`font-medium ${expiringSoon ? "text-red-600" : ""}`}>
                            {new Date(rfq.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Responses: <span className="font-medium text-gray-900">{rfq.responses}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedRfq(rfq)
                              setShowRfqDetailsDialog(true)
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            {t("view")}
                          </Button>
                          {rfq.status === "draft" && (
                            <Button 
                              size="sm" 
                              onClick={() => handlePublishRfq(rfq.id)}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Publish
                            </Button>
                          )}
                          {rfq.status === "open" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCloseRfq(rfq.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Close
                            </Button>
                          )}
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No RFQs found</h3>
                  <p className="text-gray-600 mb-4">No RFQs match your current filters or search criteria</p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New RFQ
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Create RFQ Dialog */}
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New RFQ</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new Request for Quotation.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">RFQ Title *</Label>
                  <Input 
                    id="title" 
                    value={newRfq.title}
                    onChange={(e) => setNewRfq({...newRfq, title: e.target.value})}
                    placeholder="Enter a descriptive title for this RFQ"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    value={newRfq.description}
                    onChange={(e) => setNewRfq({...newRfq, description: e.target.value})}
                    placeholder="Provide detailed specifications and requirements"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newRfq.category}
                      onValueChange={(value) => setNewRfq({...newRfq, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Office Furniture">Office Furniture</SelectItem>
                        <SelectItem value="Office Accessories">Office Accessories</SelectItem>
                        <SelectItem value="Textiles">Textiles</SelectItem>
                        <SelectItem value="Packaging">Packaging</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input 
                      id="quantity" 
                      type="number"
                      value={newRfq.quantity}
                      onChange={(e) => setNewRfq({...newRfq, quantity: e.target.value})}
                      placeholder="Enter quantity needed"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetPrice">Target Price (per unit)</Label>
                    <Input 
                      id="targetPrice" 
                      type="number"
                      step="0.01"
                      value={newRfq.targetPrice}
                      onChange={(e) => setNewRfq({...newRfq, targetPrice: e.target.value})}
                      placeholder="Enter target price (optional)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Response Deadline *</Label>
                    <Input 
                      id="deadline" 
                      type="date"
                      value={newRfq.deadline}
                      onChange={(e) => setNewRfq({...newRfq, deadline: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Select Suppliers</Label>
                  <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                    {suppliers.map(supplier => (
                      <div key={supplier.id} className="flex items-center mb-2 last:mb-0">
                        <input 
                          type="checkbox" 
                          id={supplier.id} 
                          className="mr-2"
                          checked={newRfq.supplierIds.includes(supplier.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRfq({...newRfq, supplierIds: [...newRfq.supplierIds, supplier.id]})
                            } else {
                              setNewRfq({...newRfq, supplierIds: newRfq.supplierIds.filter(id => id !== supplier.id)})
                            }
                          }}
                        />
                        <label htmlFor={supplier.id} className="flex-1">
                          <span className="font-medium">{supplier.company}</span>
                          <span className="text-sm text-gray-500 ml-2">({supplier.country})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                  <Textarea 
                    id="additionalRequirements" 
                    value={newRfq.additionalRequirements}
                    onChange={(e) => setNewRfq({...newRfq, additionalRequirements: e.target.value})}
                    placeholder="Enter any additional requirements or specifications"
                    rows={3}
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
                  {newRfq.attachments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Selected files:</p>
                      <ul className="text-sm">
                        {newRfq.attachments.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>{t("cancel")}</Button>
                  <Button onClick={handleCreateRfq}>Create RFQ</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* RFQ Details Dialog */}
          {selectedRfq && (
            <Dialog open={showRfqDetailsDialog} onOpenChange={setShowRfqDetailsDialog}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>RFQ Details</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="responses">Responses ({selectedRfq.responses})</TabsTrigger>
                    <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">RFQ Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold">{selectedRfq.title}</h3>
                          <p className="text-sm text-gray-600">
                            {selectedRfq.id} • Created on {new Date(selectedRfq.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p>{selectedRfq.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="font-medium">{selectedRfq.category}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Quantity</p>
                            <p className="font-medium">{selectedRfq.quantity.toLocaleString()} units</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Target Price</p>
                            <p className="font-medium">${selectedRfq.targetPrice.toFixed(2)} per unit</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Deadline</p>
                            <p className="font-medium">{new Date(selectedRfq.deadline).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Additional Requirements</h4>
                          <p className="text-sm text-gray-600">
                            {selectedRfq.additionalRequirements || "No additional requirements specified."}
                          </p>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          {selectedRfq.status === "draft" && (
                            <Button onClick={() => {
                              handlePublishRfq(selectedRfq.id)
                              setShowRfqDetailsDialog(false)
                            }}>
                              <Send className="h-4 w-4 mr-2" />
                              Publish RFQ
                            </Button>
                          )}
                          {selectedRfq.status === "open" && (
                            <Button variant="outline" onClick={() => {
                              handleCloseRfq(selectedRfq.id)
                              setShowRfqDetailsDialog(false)
                            }}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Close RFQ
                            </Button>
                          )}
                          <Button variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            {t("edit")} RFQ
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="responses" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Supplier Responses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedRfq.responses > 0 ? (
                          <div className="space-y-4">
                            {Array.from({ length: selectedRfq.responses }).map((_, index) => {
                              const supplier = suppliers[index % suppliers.length]
                              const responseDate = new Date(Date.now() - (index + 1) * 12 * 60 * 60 * 1000)
                              const price = selectedRfq.targetPrice * (0.9 + Math.random() * 0.3)
                              
                              return (
                                <div key={index} className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Building className="h-5 w-5 text-primary" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{supplier.company}</p>
                                        <p className="text-sm text-gray-600">{supplier.country}</p>
                                      </div>
                                    </div>
                                    <Badge variant="outline">
                                      Received {responseDate.toLocaleDateString()}
                                    </Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-3 gap-4 mb-3">
                                    <div>
                                      <p className="text-sm text-gray-500">Quoted Price</p>
                                      <p className="font-medium">${price.toFixed(2)} per unit</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Total Value</p>
                                      <p className="font-medium">${(price * selectedRfq.quantity).toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Lead Time</p>
                                      <p className="font-medium">{10 + index * 5} days</p>
                                    </div>
                                  </div>
                                  
                                  <div className="p-3 bg-gray-50 rounded mb-3">
                                    <p className="text-sm">
                                      We can supply the requested items according to your specifications. Our products are high quality and we can guarantee delivery within the specified lead time.
                                    </p>
                                  </div>
                                  
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" size="sm">
                                      <MessageSquare className="h-4 w-4 mr-1" />
                                      Contact
                                    </Button>
                                    <Button size="sm">
                                      <ArrowRight className="h-4 w-4 mr-1" />
                                      Create Quote
                                    </Button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No responses received yet</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="suppliers" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Invited Suppliers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedRfq.supplierIds.length > 0 ? (
                          <div className="space-y-4">
                            {selectedRfq.supplierIds.map((supplierId, index) => {
                              const supplier = suppliers.find(s => s.id === supplierId)
                              if (!supplier) return null
                              
                              return (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                      <Building className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{supplier.company}</p>
                                      <p className="text-sm text-gray-600">{supplier.country}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant={index < selectedRfq.responses ? "default" : "outline"}>
                                      {index < selectedRfq.responses ? "Responded" : "Pending"}
                                    </Badge>
                                    <Button variant="ghost" size="sm">
                                      <MessageSquare className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No suppliers have been invited yet</p>
                            {selectedRfq.status === "draft" && (
                              <Button variant="outline" className="mt-4">
                                <Plus className="h-4 w-4 mr-2" />
                                Invite Suppliers
                              </Button>
                            )}
                          </div>
                        )}
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
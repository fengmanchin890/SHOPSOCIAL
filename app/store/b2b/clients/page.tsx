"use client"

import { useState } from "react"
import { 
  Users, 
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
  ShoppingCart,
  Download,
  Upload,
  Check,
  X
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

export default function ClientsPage() {
  const { users, orders, quotes } = useB2B()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [showAddClientDialog, setShowAddClientDialog] = useState(false)
  const [showClientDetailsDialog, setShowClientDetailsDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  
  // Form state for new client
  const [newClient, setNewClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    website: "",
    industry: "",
    notes: "",
  })
  
  // Form state for contact message
  const [contactMessage, setContactMessage] = useState({
    subject: "",
    message: "",
    attachments: [] as File[],
  })
  
  // Get clients from users
  const clients = users.filter(user => user.role === "customer")
  
  // Filter clients based on search and status
  const filteredClients = clients.filter(client => {
    // Filter by search query
    const matchesSearch = 
      client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.country?.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by status
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "active" && client.verified) ||
      (statusFilter === "inactive" && !client.verified)
    
    return matchesSearch && matchesStatus
  })
  
  // Get client statistics
  const getClientStats = (clientId: string) => {
    const clientOrders = orders.filter(order => order.customerId === clientId)
    const clientQuotes = quotes.filter(quote => quote.customerId === clientId)
    
    return {
      totalOrders: clientOrders.length,
      totalSpent: clientOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      lastOrderDate: clientOrders.length > 0 
        ? new Date(Math.max(...clientOrders.map(o => o.createdAt))).toLocaleDateString() 
        : "N/A",
      quotesReceived: clientQuotes.length,
      quotesAccepted: clientQuotes.filter(q => q.status === "accepted").length,
    }
  }
  
  const handleAddClient = () => {
    // Validate form
    if (!newClient.name || !newClient.company || !newClient.email) {
      alert("Please fill in all required fields")
      return
    }
    
    // Add client logic would go here
    console.log("Adding new client:", newClient)
    
    // Reset form and close dialog
    setNewClient({
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      address: "",
      website: "",
      industry: "",
      notes: "",
    })
    setShowAddClientDialog(false)
  }
  
  const handleSendMessage = () => {
    // Validate form
    if (!contactMessage.subject || !contactMessage.message) {
      alert("Please fill in all required fields")
      return
    }
    
    // Send message logic would go here
    console.log("Sending message to client:", selectedClient?.name, contactMessage)
    
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
              <h1 className="text-3xl font-bold">Client Management</h1>
              <p className="text-gray-500">Manage your client relationships</p>
            </div>
            <Button onClick={() => setShowAddClientDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
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
                      placeholder="Search clients..."
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
          
          {/* Client Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="recent">Recently Added</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Client List */}
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
              <div className="col-span-4">Client</div>
              <div className="col-span-2">Country</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Total Orders</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => {
                const stats = getClientStats(client.id)
                
                return (
                  <div key={client.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{client.company}</p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p>{client.country}</p>
                    </div>
                    <div className="col-span-2">
                      <Badge variant={client.verified ? "default" : "secondary"}>
                        {client.verified ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <p>{stats.totalOrders} orders</p>
                      <p className="text-sm text-muted-foreground">${stats.totalSpent.toLocaleString()}</p>
                    </div>
                    <div className="col-span-2 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedClient(client)
                            setShowClientDetailsDialog(true)
                          }}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedClient(client)
                            setShowContactDialog(true)
                          }}>
                            Contact Client
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete Client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">
                No clients found matching your criteria
              </div>
            )}
          </div>
          
          {/* Add Client Dialog */}
          <Dialog open={showAddClientDialog} onOpenChange={setShowAddClientDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Enter the client details below to add them to your client database.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name *</Label>
                    <Input 
                      id="name" 
                      value={newClient.name}
                      onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input 
                      id="company" 
                      value={newClient.company}
                      onChange={(e) => setNewClient({...newClient, company: e.target.value})}
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
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={newClient.phone}
                      onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      value={newClient.country}
                      onChange={(e) => setNewClient({...newClient, country: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={newClient.industry}
                      onValueChange={(value) => setNewClient({...newClient, industry: value})}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={newClient.address}
                    onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    value={newClient.website}
                    onChange={(e) => setNewClient({...newClient, website: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    value={newClient.notes}
                    onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                    placeholder="Add any additional information about this client"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddClientDialog(false)}>Cancel</Button>
                <Button onClick={handleAddClient}>Add Client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Client Details Dialog */}
          {selectedClient && (
            <Dialog open={showClientDetailsDialog} onOpenChange={setShowClientDetailsDialog}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Client Details</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="quotes">Quotes</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Client Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Building className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Company</p>
                              <p>{selectedClient.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p>{selectedClient.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p>{selectedClient.phone || "N/A"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Location</p>
                              <p>{selectedClient.country}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Website</p>
                              <p>{selectedClient.website || "N/A"}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Business Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Total Orders</p>
                              <p className="text-2xl font-bold">{getClientStats(selectedClient.id).totalOrders}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Total Spent</p>
                              <p className="text-2xl font-bold">${getClientStats(selectedClient.id).totalSpent.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Quotes Received</p>
                              <p className="text-2xl font-bold">{getClientStats(selectedClient.id).quotesReceived}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Quotes Accepted</p>
                              <p className="text-2xl font-bold">{getClientStats(selectedClient.id).quotesAccepted}</p>
                            </div>
                          </div>
                          
                          <div className="mt-6 space-y-1">
                            <p className="text-sm text-muted-foreground">Last Order Date</p>
                            <p className="font-medium">{getClientStats(selectedClient.id).lastOrderDate}</p>
                          </div>
                          
                          <div className="mt-6">
                            <Button variant="outline" className="w-full" onClick={() => {
                              setShowClientDetailsDialog(false)
                              setShowContactDialog(true)
                            }}>
                              <Mail className="h-4 w-4 mr-2" />
                              Contact Client
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {orders
                            .filter(order => order.customerId === selectedClient.id)
                            .slice(0, 3)
                            .map((order, index) => (
                              <div key={index} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                  <ShoppingCart className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Order #{order.id.slice(-8)} placed</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(order.createdAt).toLocaleDateString()} • ${order.totalAmount.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          
                          {quotes
                            .filter(quote => quote.customerId === selectedClient.id)
                            .slice(0, 3)
                            .map((quote, index) => (
                              <div key={index} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                  <FileText className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Quote #{quote.id.slice(-8)} {quote.status}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(quote.createdAt).toLocaleDateString()} • ${(quote.sellingPrice * quote.quantity).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                            
                          {orders.filter(order => order.customerId === selectedClient.id).length === 0 && 
                           quotes.filter(quote => quote.customerId === selectedClient.id).length === 0 && (
                            <div className="text-center py-4 text-muted-foreground">
                              <p>No recent activity for this client</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="orders" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Order History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {orders.filter(order => order.customerId === selectedClient.id).length > 0 ? (
                          <div className="rounded-md border">
                            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                              <div className="col-span-3">Order ID</div>
                              <div className="col-span-3">Date</div>
                              <div className="col-span-2">Status</div>
                              <div className="col-span-2">Amount</div>
                              <div className="col-span-2 text-right">Actions</div>
                            </div>
                            
                            {orders
                              .filter(order => order.customerId === selectedClient.id)
                              .map((order) => (
                                <div key={order.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                                  <div className="col-span-3 font-medium">#{order.id.slice(-8)}</div>
                                  <div className="col-span-3">{new Date(order.createdAt).toLocaleDateString()}</div>
                                  <div className="col-span-2">
                                    <Badge variant={
                                      order.status === "completed" ? "default" :
                                      order.status === "shipped" ? "secondary" :
                                      "outline"
                                    }>
                                      {order.status}
                                    </Badge>
                                  </div>
                                  <div className="col-span-2">${order.totalAmount.toLocaleString()}</div>
                                  <div className="col-span-2 text-right">
                                    <Button variant="ghost" size="sm">View</Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No orders found for this client</p>
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
                        {quotes.filter(quote => quote.customerId === selectedClient.id).length > 0 ? (
                          <div className="rounded-md border">
                            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                              <div className="col-span-3">Quote ID</div>
                              <div className="col-span-3">Date</div>
                              <div className="col-span-2">Status</div>
                              <div className="col-span-2">Amount</div>
                              <div className="col-span-2 text-right">Actions</div>
                            </div>
                            
                            {quotes
                              .filter(quote => quote.customerId === selectedClient.id)
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
                                  <div className="col-span-2">${(quote.sellingPrice * quote.quantity).toLocaleString()}</div>
                                  <div className="col-span-2 text-right">
                                    <Button variant="ghost" size="sm">View</Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No quotes found for this client</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Client Documents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No documents available for this client</p>
                          <Button variant="outline" className="mt-4">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Document
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
          
          {/* Contact Client Dialog */}
          {selectedClient && (
            <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact {selectedClient.company}</DialogTitle>
                  <DialogDescription>
                    Send a message to {selectedClient.name} at {selectedClient.email}
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
                  <Button variant="outline" onClick={() => setShowContactDialog(false)}>Cancel</Button>
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
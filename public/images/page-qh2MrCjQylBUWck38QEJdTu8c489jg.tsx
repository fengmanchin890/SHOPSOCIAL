"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Plus, Send, Clock, CheckCircle, AlertCircle, FileText, Calculator } from "lucide-react"
import { useUserRole } from "@/contexts/user-role-context"

interface RFQItem {
  id: string
  productName: string
  description: string
  quantity: number
  unit: string
  targetPrice?: number
  currency: string
  requiredBy: string
  status: "draft" | "sent" | "quoted" | "expired"
  responses: number
  createdAt: string
  customer?: string
}

export default function RFQPage() {
  const { userRole, isMiddleman, isSupplier, isCustomer } = useUserRole()
  const [activeTab, setActiveTab] = useState("list")
  const [showNewRFQ, setShowNewRFQ] = useState(false)

  const rfqList: RFQItem[] = [
    {
      id: "RFQ-001",
      productName: "Wireless Bluetooth Earbuds",
      description: "Premium quality wireless earbuds with noise cancellation",
      quantity: 1000,
      unit: "pieces",
      targetPrice: 25,
      currency: "USD",
      requiredBy: "2024-02-15",
      status: "quoted",
      responses: 3,
      createdAt: "2024-01-15",
      customer: "TechStore Inc.",
    },
    {
      id: "RFQ-002",
      productName: "Smart Watch Series X",
      description: "Fitness tracking smartwatch with heart rate monitor",
      quantity: 500,
      unit: "pieces",
      targetPrice: 80,
      currency: "USD",
      requiredBy: "2024-02-20",
      status: "sent",
      responses: 1,
      createdAt: "2024-01-18",
      customer: "FitnessTech Ltd.",
    },
    {
      id: "RFQ-003",
      productName: "USB-C Charging Cables",
      description: "Fast charging USB-C cables, 1 meter length",
      quantity: 5000,
      unit: "pieces",
      targetPrice: 3,
      currency: "USD",
      requiredBy: "2024-02-10",
      status: "expired",
      responses: 0,
      createdAt: "2024-01-10",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "quoted":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <FileText className="h-4 w-4" />
      case "sent":
        return <Clock className="h-4 w-4" />
      case "quoted":
        return <CheckCircle className="h-4 w-4" />
      case "expired":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleCreateRFQ = () => {
    setShowNewRFQ(true)
    setActiveTab("create")
  }

  const handleSendRFQ = () => {
    alert("RFQ sent to selected suppliers!")
    setShowNewRFQ(false)
    setActiveTab("list")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">
                {isMiddleman && "Request for Quotation (RFQ)"}
                {isSupplier && "Quotation Requests"}
                {isCustomer && "My Product Requests"}
              </h1>
              <p className="text-muted-foreground">
                {isMiddleman && "Manage quotation requests to suppliers"}
                {isSupplier && "Respond to quotation requests from middlemen"}
                {isCustomer && "Track your product inquiry requests"}
              </p>
            </div>
            {(isMiddleman || isCustomer) && (
              <Button onClick={handleCreateRFQ}>
                <Plus className="mr-2 h-4 w-4" />
                {isMiddleman ? "New RFQ" : "New Request"}
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="list">
                {isMiddleman && "RFQ List"}
                {isSupplier && "Received Quotes"}
                {isCustomer && "My Requests"}
              </TabsTrigger>
              {(isMiddleman || isCustomer) && <TabsTrigger value="create">Create New</TabsTrigger>}
              {isSupplier && <TabsTrigger value="responses">My Responses</TabsTrigger>}
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <div className="grid gap-6">
                {rfqList.map((rfq) => (
                  <Card key={rfq.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {rfq.id} - {rfq.productName}
                            <Badge className={getStatusColor(rfq.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(rfq.status)}
                                <span className="capitalize">{rfq.status}</span>
                              </div>
                            </Badge>
                          </CardTitle>
                          <CardDescription>{rfq.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Required by</div>
                          <div className="font-medium">{rfq.requiredBy}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Quantity</div>
                          <div className="font-medium">
                            {rfq.quantity.toLocaleString()} {rfq.unit}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Target Price</div>
                          <div className="font-medium">
                            {rfq.targetPrice ? `$${rfq.targetPrice} ${rfq.currency}` : "Not specified"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Responses</div>
                          <div className="font-medium">{rfq.responses} quotes received</div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {isMiddleman && rfq.status === "quoted" && (
                            <Button size="sm">
                              <Calculator className="h-4 w-4 mr-1" />
                              Calculate Margin
                            </Button>
                          )}
                          {isSupplier && rfq.status === "sent" && (
                            <Button size="sm">
                              <Send className="h-4 w-4 mr-1" />
                              Submit Quote
                            </Button>
                          )}
                        </div>
                      </div>
                      {rfq.customer && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="text-sm text-muted-foreground">Customer: {rfq.customer}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>{isMiddleman ? "Create New RFQ" : "Submit Product Request"}</CardTitle>
                  <CardDescription>
                    {isMiddleman
                      ? "Send quotation requests to multiple suppliers"
                      : "Request product information and pricing"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="product-name">Product Name *</Label>
                      <Input id="product-name" placeholder="Wireless Bluetooth Earbuds" />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="home">Home & Kitchen</SelectItem>
                          <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Product Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed product specifications, requirements, and quality standards..."
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input id="quantity" type="number" placeholder="1000" />
                    </div>
                    <div>
                      <Label htmlFor="unit">Unit</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pieces">Pieces</SelectItem>
                          <SelectItem value="kg">Kilograms</SelectItem>
                          <SelectItem value="meters">Meters</SelectItem>
                          <SelectItem value="boxes">Boxes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="target-price">Target Price (Optional)</Label>
                      <Input id="target-price" type="number" step="0.01" placeholder="25.00" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="required-by">Required By *</Label>
                      <Input id="required-by" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="gbp">GBP</SelectItem>
                          <SelectItem value="cny">CNY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {isMiddleman && (
                    <div>
                      <Label>Select Suppliers</Label>
                      <div className="grid gap-2 md:grid-cols-2 mt-2">
                        {["TechGadgets Co.", "ElectroWorld Ltd.", "GadgetSupply Inc.", "TechSource Pro"].map(
                          (supplier) => (
                            <div key={supplier} className="flex items-center space-x-2">
                              <input type="checkbox" id={supplier} className="rounded" />
                              <Label htmlFor={supplier} className="text-sm">
                                {supplier}
                              </Label>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="additional-notes">Additional Notes</Label>
                    <Textarea
                      id="additional-notes"
                      placeholder="Special requirements, certifications needed, packaging instructions..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setActiveTab("list")}>
                      Cancel
                    </Button>
                    <Button variant="outline">Save as Draft</Button>
                    <Button onClick={handleSendRFQ}>
                      <Send className="h-4 w-4 mr-2" />
                      {isMiddleman ? "Send RFQ" : "Submit Request"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {isSupplier && (
              <TabsContent value="responses">
                <Card>
                  <CardHeader>
                    <CardTitle>My Quote Responses</CardTitle>
                    <CardDescription>Track your submitted quotations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">RFQ-001 - Wireless Bluetooth Earbuds</h3>
                            <p className="text-sm text-muted-foreground">Quoted: $22.50 per piece</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Accepted</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Quantity: 1,000 pieces • Lead time: 15 days • MOQ: 500 pieces
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">RFQ-002 - Smart Watch Series X</h3>
                            <p className="text-sm text-muted-foreground">Quoted: $75.00 per piece</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Quantity: 500 pieces • Lead time: 20 days • MOQ: 100 pieces
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="analytics">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total RFQs</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.4h</div>
                    <p className="text-xs text-muted-foreground">-0.5h from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <Calculator className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">34%</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

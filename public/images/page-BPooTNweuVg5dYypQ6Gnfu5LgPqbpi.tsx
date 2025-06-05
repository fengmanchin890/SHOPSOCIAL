"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Calculator, Send, FileText, TrendingUp, DollarSign, Percent } from "lucide-react"
import { useUserRole } from "@/contexts/user-role-context"

interface Quote {
  id: string
  rfqId: string
  productName: string
  supplierName: string
  supplierPrice: number
  customerPrice: number
  margin: number
  marginPercent: number
  quantity: number
  currency: string
  leadTime: string
  moq: number
  validUntil: string
  status: "draft" | "sent" | "accepted" | "rejected" | "expired"
  createdAt: string
}

export default function QuotesPage() {
  const { userRole, isMiddleman, isSupplier, isCustomer } = useUserRole()
  const [activeTab, setActiveTab] = useState("list")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  const quotes: Quote[] = [
    {
      id: "QUO-001",
      rfqId: "RFQ-001",
      productName: "Wireless Bluetooth Earbuds",
      supplierName: "TechGadgets Co.",
      supplierPrice: 22.5,
      customerPrice: 35.0,
      margin: 12.5,
      marginPercent: 35.7,
      quantity: 1000,
      currency: "USD",
      leadTime: "15 days",
      moq: 500,
      validUntil: "2024-02-15",
      status: "sent",
      createdAt: "2024-01-16",
    },
    {
      id: "QUO-002",
      rfqId: "RFQ-002",
      productName: "Smart Watch Series X",
      supplierName: "ElectroWorld Ltd.",
      supplierPrice: 75.0,
      customerPrice: 120.0,
      margin: 45.0,
      marginPercent: 37.5,
      quantity: 500,
      currency: "USD",
      leadTime: "20 days",
      moq: 100,
      validUntil: "2024-02-20",
      status: "draft",
      createdAt: "2024-01-18",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCalculateMargin = (quote: Quote) => {
    setSelectedQuote(quote)
    setActiveTab("calculator")
  }

  const handleSendQuote = (quoteId: string) => {
    alert(`Quote ${quoteId} sent to customer!`)
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
                {isMiddleman && "Quotation Management"}
                {isSupplier && "My Quotations"}
                {isCustomer && "Received Quotes"}
              </h1>
              <p className="text-muted-foreground">
                {isMiddleman && "Manage quotes with margin calculation"}
                {isSupplier && "Track your submitted quotations"}
                {isCustomer && "Review and accept quotations"}
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="list">Quote List</TabsTrigger>
              {isMiddleman && <TabsTrigger value="calculator">Margin Calculator</TabsTrigger>}
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <div className="grid gap-6">
                {quotes.map((quote) => (
                  <Card key={quote.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {quote.id} - {quote.productName}
                            <Badge className={getStatusColor(quote.status)}>
                              <span className="capitalize">{quote.status}</span>
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            RFQ: {quote.rfqId} • Supplier: {quote.supplierName}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Valid until</div>
                          <div className="font-medium">{quote.validUntil}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-5">
                        <div>
                          <div className="text-sm text-muted-foreground">Supplier Price</div>
                          <div className="font-medium">
                            ${quote.supplierPrice} {quote.currency}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Customer Price</div>
                          <div className="font-medium">
                            ${quote.customerPrice} {quote.currency}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Margin</div>
                          <div className="font-medium text-green-600">
                            ${quote.margin} ({quote.marginPercent.toFixed(1)}%)
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Quantity</div>
                          <div className="font-medium">{quote.quantity.toLocaleString()} pcs</div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          {isMiddleman && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => handleCalculateMargin(quote)}>
                                <Calculator className="h-4 w-4 mr-1" />
                                Calculate
                              </Button>
                              {quote.status === "draft" && (
                                <Button size="sm" onClick={() => handleSendQuote(quote.id)}>
                                  <Send className="h-4 w-4 mr-1" />
                                  Send Quote
                                </Button>
                              )}
                            </>
                          )}
                          {isCustomer && quote.status === "sent" && <Button size="sm">Accept Quote</Button>}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t grid gap-2 md:grid-cols-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Lead Time:</span> {quote.leadTime}
                        </div>
                        <div>
                          <span className="text-muted-foreground">MOQ:</span> {quote.moq} pieces
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Profit:</span>
                          <span className="font-medium text-green-600 ml-1">
                            ${(quote.margin * quote.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {isMiddleman && (
              <TabsContent value="calculator">
                <Card>
                  <CardHeader>
                    <CardTitle>Margin Calculator</CardTitle>
                    <CardDescription>Calculate profit margins and customer pricing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedQuote && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium mb-2">Selected Quote: {selectedQuote.id}</h3>
                        <p className="text-sm text-muted-foreground">{selectedQuote.productName}</p>
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="supplier-price">Supplier Price (per unit)</Label>
                        <Input
                          id="supplier-price"
                          type="number"
                          step="0.01"
                          defaultValue={selectedQuote?.supplierPrice || ""}
                          placeholder="22.50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          defaultValue={selectedQuote?.quantity || ""}
                          placeholder="1000"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="margin-type">Margin Type</Label>
                        <Select defaultValue="percentage">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage (%)</SelectItem>
                            <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="margin-value">Margin Value</Label>
                        <Input id="margin-value" type="number" step="0.01" placeholder="35.7" />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="additional-costs">Additional Costs</Label>
                        <Input id="additional-costs" type="number" step="0.01" placeholder="0.00" />
                        <p className="text-xs text-muted-foreground mt-1">Shipping, handling, etc.</p>
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
                      <div>
                        <Label htmlFor="exchange-rate">Exchange Rate</Label>
                        <Input
                          id="exchange-rate"
                          type="number"
                          step="0.0001"
                          defaultValue="1.0000"
                          placeholder="1.0000"
                        />
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-4">Calculation Results</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Supplier Cost (per unit):</span>
                            <span className="font-medium">$22.50</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Additional Costs:</span>
                            <span className="font-medium">$0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Cost (per unit):</span>
                            <span className="font-medium">$22.50</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Margin (35.7%):</span>
                            <span className="font-medium text-green-600">$12.50</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Customer Price (per unit):</span>
                            <span className="text-blue-600">$35.00</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Total Quantity:</span>
                            <span className="font-medium">1,000 pcs</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Supplier Cost:</span>
                            <span className="font-medium">$22,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Customer Price:</span>
                            <span className="font-medium">$35,000</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-bold">
                            <span>Total Profit:</span>
                            <span className="text-green-600">$12,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ROI:</span>
                            <span className="text-green-600">55.6%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Save Calculation</Button>
                      <Button>Generate Quote</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="analytics">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">+3 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
                    <Percent className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">36.6%</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$28,750</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">72%</div>
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

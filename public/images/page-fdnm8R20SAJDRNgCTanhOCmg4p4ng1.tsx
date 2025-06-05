"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Search, Download, Eye, Package, Truck, CheckCircle, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [supplierFilter, setSupplierFilter] = useState("all")

  const orders = [
    {
      id: "ORD-12345",
      customer: "John Smith",
      email: "john@example.com",
      date: "2024-01-15",
      total: 129.99,
      currency: "USD",
      status: "processing",
      paymentStatus: "paid",
      items: 3,
      supplier: "TechGadgets Co.",
      supplierOrderId: "TG-789123",
      trackingNumber: "1Z999AA1234567890",
      shippingMethod: "Standard",
      estimatedDelivery: "2024-01-22",
    },
    {
      id: "ORD-12344",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      date: "2024-01-14",
      total: 89.5,
      currency: "USD",
      status: "shipped",
      paymentStatus: "paid",
      items: 2,
      supplier: "ElectroWorld Ltd.",
      supplierOrderId: "EW-456789",
      trackingNumber: "1Z999BB9876543210",
      shippingMethod: "Express",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: "ORD-12343",
      customer: "Michael Brown",
      email: "michael@example.com",
      date: "2024-01-13",
      total: 245.75,
      currency: "USD",
      status: "delivered",
      paymentStatus: "paid",
      items: 4,
      supplier: "TechGadgets Co.",
      supplierOrderId: "TG-321654",
      trackingNumber: "1Z999CC1122334455",
      shippingMethod: "Standard",
      estimatedDelivery: "2024-01-20",
    },
    {
      id: "ORD-12342",
      customer: "Emily Davis",
      email: "emily@example.com",
      date: "2024-01-12",
      total: 59.99,
      currency: "USD",
      status: "pending",
      paymentStatus: "pending",
      items: 1,
      supplier: "GadgetSupply Inc.",
      supplierOrderId: "",
      trackingNumber: "",
      shippingMethod: "Standard",
      estimatedDelivery: "",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on orders:`, selectedOrders)
    // Implement bulk actions
  }

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter
    const matchesSupplier =
      supplierFilter === "all" || order.supplier.toLowerCase().includes(supplierFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesPayment && matchesSupplier
  })

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Orders</h1>
              <p className="text-muted-foreground">Manage and track all customer orders</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <Card>
              <CardContent className="p-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search orders..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Payments</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Suppliers</SelectItem>
                      <SelectItem value="techgadgets">TechGadgets Co.</SelectItem>
                      <SelectItem value="electroworld">ElectroWorld Ltd.</SelectItem>
                      <SelectItem value="gadgetsupply">GadgetSupply Inc.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedOrders.length > 0 && (
                  <div className="flex items-center justify-between mt-4 p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">{selectedOrders.length} order(s) selected</span>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleBulkAction("fulfill")}>
                        Fulfill Orders
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction("export")}>
                        Export Selected
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <TabsContent value="all">
              <OrderTable orders={filteredOrders} selectedOrders={selectedOrders} onOrderSelect={handleOrderSelect} />
            </TabsContent>

            <TabsContent value="pending">
              <OrderTable
                orders={filteredOrders.filter((order) => order.status === "pending")}
                selectedOrders={selectedOrders}
                onOrderSelect={handleOrderSelect}
              />
            </TabsContent>

            <TabsContent value="processing">
              <OrderTable
                orders={filteredOrders.filter((order) => order.status === "processing")}
                selectedOrders={selectedOrders}
                onOrderSelect={handleOrderSelect}
              />
            </TabsContent>

            <TabsContent value="shipped">
              <OrderTable
                orders={filteredOrders.filter((order) => order.status === "shipped")}
                selectedOrders={selectedOrders}
                onOrderSelect={handleOrderSelect}
              />
            </TabsContent>

            <TabsContent value="delivered">
              <OrderTable
                orders={filteredOrders.filter((order) => order.status === "delivered")}
                selectedOrders={selectedOrders}
                onOrderSelect={handleOrderSelect}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function OrderDetailsModal({ order }: { order: any }) {
  const handleSendToSupplier = () => {
    alert(`Sending order ${order.id} to ${order.supplier}`)
  }

  const handleUpdateTracking = () => {
    alert(`Updating tracking for order ${order.id}`)
  }

  const handleFulfillOrder = () => {
    alert(`Fulfilling order ${order.id}`)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Name:</span> {order.customer}
            </div>
            <div>
              <span className="font-medium">Email:</span> {order.email}
            </div>
            <div>
              <span className="font-medium">Order Date:</span> {order.date}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Status:</span>
              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
            </div>
            <div>
              <span className="font-medium">Payment:</span> {order.paymentStatus}
            </div>
            <div>
              <span className="font-medium">Total:</span> ${order.total}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supplier & Shipping</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="font-medium">Supplier:</span> {order.supplier}
          </div>
          {order.supplierOrderId && (
            <div>
              <span className="font-medium">Supplier Order ID:</span> {order.supplierOrderId}
            </div>
          )}
          {order.trackingNumber && (
            <div>
              <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
            </div>
          )}
          <div>
            <span className="font-medium">Shipping Method:</span> {order.shippingMethod}
          </div>
          {order.estimatedDelivery && (
            <div>
              <span className="font-medium">Estimated Delivery:</span> {order.estimatedDelivery}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleSendToSupplier}>
          Send to Supplier
        </Button>
        <Button variant="outline" onClick={handleUpdateTracking}>
          Update Tracking
        </Button>
        <Button onClick={handleFulfillOrder}>Fulfill Order</Button>
      </div>
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "processing":
      return "bg-blue-100 text-blue-800"
    case "shipped":
      return "bg-purple-100 text-purple-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function OrderTable({
  orders,
  selectedOrders,
  onOrderSelect,
}: { orders: any[]; selectedOrders: string[]; onOrderSelect: (orderId: string) => void }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const [selectAll, setSelectAll] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
        <CardDescription>Complete list of customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => {
                      setSelectAll(e.target.checked)
                      if (e.target.checked) {
                        orders.forEach((order) => {
                          if (!selectedOrders.includes(order.id)) {
                            onOrderSelect(order.id)
                          }
                        })
                      } else {
                        orders.forEach((order) => {
                          if (selectedOrders.includes(order.id)) {
                            onOrderSelect(order.id)
                          }
                        })
                      }
                    }}
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium">Order</th>
                <th className="text-left py-3 px-4 font-medium">Customer</th>
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Supplier</th>
                <th className="text-left py-3 px-4 font-medium">Total</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => {
                        setSelectAll(false)
                        onOrderSelect(order.id)
                      }}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{order.id}</div>
                      {order.trackingNumber && (
                        <div className="text-xs text-muted-foreground">Tracking: {order.trackingNumber}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{order.date}</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className={getStatusColor(order.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{order.supplier}</div>
                    {order.supplierOrderId && (
                      <div className="text-xs text-muted-foreground">ID: {order.supplierOrderId}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                          <DialogDescription>Complete order information and tracking details</DialogDescription>
                        </DialogHeader>
                        <OrderDetailsModal order={order} />
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

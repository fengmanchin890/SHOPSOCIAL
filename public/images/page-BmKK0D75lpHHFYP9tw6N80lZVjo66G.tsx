import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Search, Download, Eye, Mail, Phone, MapPin, Star } from "lucide-react"

export default function CustomersPage() {
  const customers = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      country: "United States",
      city: "New York",
      totalOrders: 12,
      totalSpent: 1245.67,
      averageOrder: 103.81,
      lastOrder: "2024-01-15",
      status: "active",
      tier: "VIP",
      joinDate: "2023-06-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 987-6543",
      country: "Canada",
      city: "Toronto",
      totalOrders: 8,
      totalSpent: 567.89,
      averageOrder: 70.99,
      lastOrder: "2024-01-12",
      status: "active",
      tier: "Regular",
      joinDate: "2023-08-22",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+44 20 7946 0958",
      country: "United Kingdom",
      city: "London",
      totalOrders: 15,
      totalSpent: 2134.56,
      averageOrder: 142.3,
      lastOrder: "2024-01-10",
      status: "active",
      tier: "VIP",
      joinDate: "2023-04-10",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+61 2 9374 4000",
      country: "Australia",
      city: "Sydney",
      totalOrders: 3,
      totalSpent: 189.97,
      averageOrder: 63.32,
      lastOrder: "2023-12-28",
      status: "inactive",
      tier: "Regular",
      joinDate: "2023-11-05",
    },
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "VIP":
        return "bg-purple-100 text-purple-800"
      case "Wholesale":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Customers</h1>
              <p className="text-muted-foreground">Manage your customer relationships and data</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>Add Customer</Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Customers</TabsTrigger>
              <TabsTrigger value="vip">VIP</TabsTrigger>
              <TabsTrigger value="regular">Regular</TabsTrigger>
              <TabsTrigger value="wholesale">Wholesale</TabsTrigger>
            </TabsList>

            <Card>
              <CardContent className="p-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search customers..." className="pl-8" />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <TabsContent value="all">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {customers.map((customer) => (
                  <Card key={customer.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{customer.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Mail className="h-3 w-3 mr-1" />
                            {customer.email}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge className={getTierColor(customer.tier)}>{customer.tier}</Badge>
                          <Badge variant="outline" className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                          {customer.city}, {customer.country}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t">
                          <div>
                            <div className="font-medium">{customer.totalOrders}</div>
                            <div className="text-xs text-muted-foreground">Total Orders</div>
                          </div>
                          <div>
                            <div className="font-medium">${customer.totalSpent.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">Total Spent</div>
                          </div>
                          <div>
                            <div className="font-medium">${customer.averageOrder.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">Avg Order</div>
                          </div>
                          <div>
                            <div className="font-medium">{customer.lastOrder}</div>
                            <div className="text-xs text-muted-foreground">Last Order</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm">Contact</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="vip">
              <Card>
                <CardHeader>
                  <CardTitle>VIP Customers</CardTitle>
                  <CardDescription>High-value customers with special privileges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {customers
                      .filter((customer) => customer.tier === "VIP")
                      .map((customer) => (
                        <div key={customer.id} className="p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <h3 className="font-medium">{customer.name}</h3>
                              <p className="text-sm text-muted-foreground">{customer.email}</p>
                              <div className="flex items-center mt-2">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm font-medium">${customer.totalSpent.toFixed(2)} spent</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

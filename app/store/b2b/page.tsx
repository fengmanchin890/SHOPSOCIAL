"use client"

import { useState } from "react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package, 
  Calendar, 
  FileText, 
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Download,
  Filter,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"]

export default function B2BDashboardPage() {
  const { 
    orders, 
    quotes, 
    products, 
    users, 
    getProfitAnalysis, 
    getNotifications 
  } = useB2B()
  const [timeRange, setTimeRange] = useState("7d")
  const [chartType, setChartType] = useState("bar")
  
  // Get profit analysis for current user
  const profitAnalysis = getProfitAnalysis("user-middleman-1")
  
  // Get notifications
  const notifications = getNotifications("user-middleman-1")
  
  // Calculate KPIs
  const totalOrders = orders.length
  const pendingOrders = orders.filter(order => order.status === "pending").length
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  
  // Calculate quote metrics
  const totalQuotes = quotes.length
  const pendingQuotes = quotes.filter(quote => quote.status === "draft").length
  const sentQuotes = quotes.filter(quote => quote.status === "sent").length
  const acceptedQuotes = quotes.filter(quote => quote.status === "accepted").length
  const conversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0
  
  // Mock data for charts
  const revenueData = [
    { name: "Jan", revenue: 12500 },
    { name: "Feb", revenue: 18200 },
    { name: "Mar", revenue: 15800 },
    { name: "Apr", revenue: 22000 },
    { name: "May", revenue: 19500 },
    { name: "Jun", revenue: 24800 },
    { name: "Jul", revenue: 28000 },
  ]
  
  const quoteStatusData = [
    { name: "Draft", value: pendingQuotes },
    { name: "Sent", value: sentQuotes },
    { name: "Accepted", value: acceptedQuotes },
    { name: "Rejected", value: totalQuotes - pendingQuotes - sentQuotes - acceptedQuotes },
  ]
  
  const clientDistributionData = [
    { name: "North America", value: 45 },
    { name: "Europe", value: 30 },
    { name: "Asia", value: 15 },
    { name: "Other", value: 10 },
  ]
  
  const productPerformanceData = products.slice(0, 5).map(product => ({
    name: product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name,
    sales: Math.floor(Math.random() * 50) + 10,
    revenue: (Math.floor(Math.random() * 50) + 10) * 100,
  }))
  
  // Recent activities
  const recentActivities = [
    { id: 1, type: "order", description: "New order #ORD-001 received", time: "2 hours ago" },
    { id: 2, type: "quote", description: "Quote #quote-1 accepted by Import Solutions Inc", time: "5 hours ago" },
    { id: 3, type: "payment", description: "Payment received for order #ORD-001", time: "1 day ago" },
    { id: 4, type: "product", description: "New product 'Smart Watch Series X' added", time: "2 days ago" },
  ]
  
  // Upcoming tasks
  const upcomingTasks = [
    { id: 1, title: "Follow up on Quote #quote-2", dueDate: "Today", priority: "high" },
    { id: 2, title: "Prepare shipping documents for Order #ORD-001", dueDate: "Tomorrow", priority: "medium" },
    { id: 3, title: "Client meeting with European Distributors", dueDate: "Jul 15, 2024", priority: "high" },
    { id: 4, title: "Update product catalog", dueDate: "Jul 18, 2024", priority: "low" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">B2B Dashboard</h1>
              <p className="text-gray-500">Welcome back! Here's an overview of your business</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    12.5%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">+$4,500 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    8.2%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{pendingOrders} pending orders</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Quote Conversion</p>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    3.1%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{acceptedQuotes} of {totalQuotes} quotes accepted</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${averageOrderValue.toLocaleString()}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    5.3%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">+$250 from last month</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className={chartType === "bar" ? "bg-primary text-primary-foreground" : ""} onClick={() => setChartType("bar")}>
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className={chartType === "line" ? "bg-primary text-primary-foreground" : ""} onClick={() => setChartType("line")}>
                    <LineChartIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "bar" ? (
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, 'Revenue']}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Bar dataKey="revenue" fill="#3B82F6" />
                      </BarChart>
                    ) : (
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, 'Revenue']}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Quote Status Distribution</CardTitle>
                  <CardDescription>Current status of all quotes</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <PieChartIcon className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={quoteStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {quoteStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Product Performance */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product Performance</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-3 text-center">Sales</div>
                  <div className="col-span-3 text-center">Revenue</div>
                  <div className="col-span-1 text-right">Trend</div>
                </div>
                {productPerformanceData.map((product, index) => (
                  <div key={index} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-muted/50">
                    <div className="col-span-5 font-medium">{product.name}</div>
                    <div className="col-span-3 text-center">{product.sales} units</div>
                    <div className="col-span-3 text-center">${product.revenue.toLocaleString()}</div>
                    <div className="col-span-1 text-right">
                      {index % 3 === 0 ? (
                        <ArrowDownRight className="ml-auto h-4 w-4 text-red-600" />
                      ) : (
                        <ArrowUpRight className="ml-auto h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/store/b2b/products">View All Products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Activity and Tasks */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "order" ? "bg-blue-100 text-blue-600" :
                        activity.type === "quote" ? "bg-green-100 text-green-600" :
                        activity.type === "payment" ? "bg-purple-100 text-purple-600" :
                        "bg-orange-100 text-orange-600"
                      }`}>
                        {activity.type === "order" ? <ShoppingCart className="h-4 w-4" /> :
                         activity.type === "quote" ? <FileText className="h-4 w-4" /> :
                         activity.type === "payment" ? <DollarSign className="h-4 w-4" /> :
                         <Package className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Upcoming Tasks</CardTitle>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={
                              task.priority === "high" ? "destructive" :
                              task.priority === "medium" ? "default" :
                              "secondary"
                            } className="text-xs">
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View All Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Client Distribution and Notifications */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={clientDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {clientDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">Total Clients</p>
                    <p className="text-2xl font-bold">{users.filter(u => u.role === "customer").length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Active Clients</p>
                    <p className="text-2xl font-bold">{users.filter(u => u.role === "customer" && u.verified).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Notifications</CardTitle>
                <Badge>{notifications.length}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[250px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div key={index} className={`p-3 rounded-lg ${notification.read ? 'bg-muted/50' : 'bg-blue-50 border-blue-100'}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            notification.type === "quote_expiring" ? "bg-yellow-100 text-yellow-600" :
                            notification.type === "payment_pending" ? "bg-red-100 text-red-600" :
                            "bg-blue-100 text-blue-600"
                          }`}>
                            {notification.type === "quote_expiring" ? <Clock className="h-4 w-4" /> :
                             notification.type === "payment_pending" ? <DollarSign className="h-4 w-4" /> :
                             <FileText className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No new notifications</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Profit Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Profit Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${profitAnalysis.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">${profitAnalysis.totalCost.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Profit</p>
                  <p className="text-2xl font-bold text-green-600">${profitAnalysis.profit.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Profit Margin</p>
                  <p className="text-2xl font-bold">{profitAnalysis.margin.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
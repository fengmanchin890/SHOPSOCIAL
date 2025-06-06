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
  Cell,
  AreaChart,
  Area
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
  RefreshCw,
  Layers,
  TrendingUp,
  Map,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"
import { useI18n } from "@/contexts/i18n-context"

const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"]

export default function AnalyticsPage() {
  const { orders, quotes, products, users } = useB2B()
  const { t } = useI18n()
  const [timeRange, setTimeRange] = useState("30d")
  const [chartType, setChartType] = useState("bar")
  
  // Mock data for charts
  const revenueData = [
    { name: "Jan", revenue: 12500, profit: 3750 },
    { name: "Feb", revenue: 18200, profit: 5460 },
    { name: "Mar", revenue: 15800, profit: 4740 },
    { name: "Apr", revenue: 22000, profit: 6600 },
    { name: "May", revenue: 19500, profit: 5850 },
    { name: "Jun", revenue: 24800, profit: 7440 },
    { name: "Jul", revenue: 28000, profit: 8400 },
  ]
  
  const productCategoryData = [
    { name: "Electronics", value: 45 },
    { name: "Office", value: 25 },
    { name: "Textiles", value: 15 },
    { name: "Packaging", value: 10 },
    { name: "Other", value: 5 },
  ]
  
  const supplierPerformanceData = [
    { name: "Global Manufacturing Co", quality: 4.8, delivery: 4.5, communication: 4.2, overall: 4.5 },
    { name: "Tech Components Ltd", quality: 4.6, delivery: 4.7, communication: 4.8, overall: 4.7 },
    { name: "HomeOffice Supplies", quality: 4.3, delivery: 4.1, communication: 4.5, overall: 4.3 },
    { name: "PowerUp Electronics", quality: 4.7, delivery: 4.3, communication: 4.6, overall: 4.5 },
    { name: "AudioMax Ltd.", quality: 4.5, delivery: 4.6, communication: 4.4, overall: 4.5 },
  ]
  
  const customerDistributionData = [
    { name: "North America", value: 40 },
    { name: "Europe", value: 30 },
    { name: "Asia", value: 20 },
    { name: "Other", value: 10 },
  ]
  
  const quoteConversionData = [
    { month: "Jan", sent: 24, accepted: 10, conversion: 41.7 },
    { month: "Feb", sent: 32, accepted: 15, conversion: 46.9 },
    { month: "Mar", sent: 28, accepted: 12, conversion: 42.9 },
    { month: "Apr", sent: 35, accepted: 18, conversion: 51.4 },
    { month: "May", sent: 30, accepted: 14, conversion: 46.7 },
    { month: "Jun", sent: 38, accepted: 20, conversion: 52.6 },
    { month: "Jul", sent: 42, accepted: 24, conversion: 57.1 },
  ]
  
  const leadTimeData = [
    { name: "Jan", avgLeadTime: 15 },
    { name: "Feb", avgLeadTime: 14 },
    { name: "Mar", avgLeadTime: 16 },
    { name: "Apr", avgLeadTime: 13 },
    { name: "May", avgLeadTime: 12 },
    { name: "Jun", avgLeadTime: 11 },
    { name: "Jul", avgLeadTime: 10 },
  ]
  
  // Calculate KPIs
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const totalOrders = orders.length
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const totalQuotes = quotes.length
  const acceptedQuotes = quotes.filter(q => q.status === "accepted").length
  const quoteConversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{t("analytics")}</h1>
              <p className="text-gray-500">Comprehensive business analytics and insights</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Quote Conversion</p>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{quoteConversionRate.toFixed(1)}%</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    5.2%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{acceptedQuotes} of {totalQuotes} quotes accepted</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${averageOrderValue.toLocaleString()}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    3.8%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">+$250 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{users.filter(u => u.role === "customer" && u.verified).length}</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    7.2%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">+2 new customers this month</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Analytics Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
              <TabsTrigger value="suppliers">Supplier Analysis</TabsTrigger>
              <TabsTrigger value="customers">Customer Analysis</TabsTrigger>
              <TabsTrigger value="products">Product Analysis</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Revenue Overview</CardTitle>
                      <CardDescription>Monthly revenue and profit</CardDescription>
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
                              formatter={(value) => [`$${value}`, 'Amount']}
                              labelFormatter={(label) => `Month: ${label}`}
                            />
                            <Bar dataKey="revenue" name="Revenue" fill="#3B82F6" />
                            <Bar dataKey="profit" name="Profit" fill="#10B981" />
                          </BarChart>
                        ) : (
                          <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value) => [`$${value}`, 'Amount']}
                              labelFormatter={(label) => `Month: ${label}`}
                            />
                            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3B82F6" strokeWidth={2} />
                            <Line type="monotone" dataKey="profit" name="Profit" stroke="#10B981" strokeWidth={2} />
                          </LineChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Quote Conversion Rate</CardTitle>
                      <CardDescription>Monthly quote conversion trends</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={quoteConversionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                          <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                          <Tooltip />
                          <Line yAxisId="left" type="monotone" dataKey="sent" name="Quotes Sent" stroke="#3B82F6" />
                          <Line yAxisId="left" type="monotone" dataKey="accepted" name="Quotes Accepted" stroke="#8B5CF6" />
                          <Line yAxisId="right" type="monotone" dataKey="conversion" name="Conversion Rate (%)" stroke="#10B981" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={productCategoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {productCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={customerDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {customerDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Time Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={leadTimeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value} days`, 'Avg. Lead Time']} />
                          <Area type="monotone" dataKey="avgLeadTime" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-4">Product</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-2">Orders</div>
                      <div className="col-span-2">Revenue</div>
                      <div className="col-span-2">Profit Margin</div>
                    </div>
                    
                    {products.slice(0, 5).map((product, index) => {
                      const revenue = Math.floor(Math.random() * 10000) + 5000
                      const margin = Math.floor(Math.random() * 20) + 20
                      
                      return (
                        <div key={product.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                          <div className="col-span-4 font-medium">{product.name}</div>
                          <div className="col-span-2">{product.category}</div>
                          <div className="col-span-2">{Math.floor(Math.random() * 50) + 10}</div>
                          <div className="col-span-2">${revenue.toLocaleString()}</div>
                          <div className="col-span-2">{margin}%</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Sales Analysis Tab */}
            <TabsContent value="sales" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                          <Area type="monotone" dataKey="profit" name="Profit" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sales by Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { region: "North America", sales: 42500 },
                            { region: "Europe", sales: 35800 },
                            { region: "Asia", sales: 28900 },
                            { region: "Australia", sales: 15200 },
                            { region: "South America", sales: 8500 },
                            { region: "Africa", sales: 5200 },
                          ]}
                          margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="region" type="category" />
                          <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                          <Bar dataKey="sales" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales by Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={productCategoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {productCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Order Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Pending", value: 15 },
                              { name: "Processing", value: 25 },
                              { name: "Shipped", value: 35 },
                              { name: "Delivered", value: 25 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {productCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Bank Transfer", value: 45 },
                              { name: "Letter of Credit", value: 30 },
                              { name: "Wire Transfer", value: 15 },
                              { name: "Other", value: 10 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {productCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sales Seasonality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", thisYear: 12500, lastYear: 10200 },
                          { month: "Feb", thisYear: 18200, lastYear: 15800 },
                          { month: "Mar", thisYear: 15800, lastYear: 14200 },
                          { month: "Apr", thisYear: 22000, lastYear: 18500 },
                          { month: "May", thisYear: 19500, lastYear: 17200 },
                          { month: "Jun", thisYear: 24800, lastYear: 20100 },
                          { month: "Jul", thisYear: 28000, lastYear: 22500 },
                          { month: "Aug", thisYear: 26500, lastYear: 21800 },
                          { month: "Sep", thisYear: 23000, lastYear: 19500 },
                          { month: "Oct", thisYear: 25500, lastYear: 21000 },
                          { month: "Nov", thisYear: 29000, lastYear: 24500 },
                          { month: "Dec", thisYear: 32500, lastYear: 27800 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Line type="monotone" dataKey="thisYear" name="This Year" stroke="#3B82F6" strokeWidth={2} />
                        <Line type="monotone" dataKey="lastYear" name="Last Year" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Supplier Analysis Tab */}
            <TabsContent value="suppliers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={supplierPerformanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip formatter={(value) => [`${value}/5`, '']} />
                        <Bar dataKey="quality" name="Quality" fill="#3B82F6" />
                        <Bar dataKey="delivery" name="Delivery" fill="#10B981" />
                        <Bar dataKey="communication" name="Communication" fill="#F59E0B" />
                        <Bar dataKey="overall" name="Overall" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Supplier Lead Time Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={leadTimeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value} days`, 'Avg. Lead Time']} />
                          <Line type="monotone" dataKey="avgLeadTime" name="Avg. Lead Time" stroke="#8B5CF6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Supplier Geographic Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <Map className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Interactive map visualization would be displayed here</p>
                        <p className="text-sm text-gray-400 mt-2">Showing supplier distribution across regions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Suppliers by Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-3">Supplier</div>
                      <div className="col-span-2">Country</div>
                      <div className="col-span-2">Products</div>
                      <div className="col-span-2">Order Volume</div>
                      <div className="col-span-1">Quality</div>
                      <div className="col-span-1">Delivery</div>
                      <div className="col-span-1">Overall</div>
                    </div>
                    
                    {suppliers.map((supplier, index) => {
                      const performance = supplierPerformanceData[index % supplierPerformanceData.length]
                      const supplierProducts = products.filter(p => p.supplierId === supplier.id)
                      
                      return (
                        <div key={supplier.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                          <div className="col-span-3 font-medium">{supplier.company}</div>
                          <div className="col-span-2">{supplier.country}</div>
                          <div className="col-span-2">{supplierProducts.length}</div>
                          <div className="col-span-2">${(Math.floor(Math.random() * 50000) + 10000).toLocaleString()}</div>
                          <div className="col-span-1">{performance.quality.toFixed(1)}</div>
                          <div className="col-span-1">{performance.delivery.toFixed(1)}</div>
                          <div className="col-span-1">{performance.overall.toFixed(1)}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Customer Analysis Tab */}
            <TabsContent value="customers" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Distribution by Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={customerDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {customerDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={[
                            { month: "Jan", newCustomers: 3, totalCustomers: 25 },
                            { month: "Feb", newCustomers: 5, totalCustomers: 30 },
                            { month: "Mar", newCustomers: 2, totalCustomers: 32 },
                            { month: "Apr", newCustomers: 4, totalCustomers: 36 },
                            { month: "May", newCustomers: 3, totalCustomers: 39 },
                            { month: "Jun", newCustomers: 6, totalCustomers: 45 },
                            { month: "Jul", newCustomers: 4, totalCustomers: 49 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="newCustomers" name="New Customers" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                          <Area type="monotone" dataKey="totalCustomers" name="Total Customers" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Lifetime Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={users
                          .filter(u => u.role === "customer")
                          .map(customer => {
                            const customerOrders = orders.filter(o => o.customerId === customer.id)
                            const totalSpent = customerOrders.reduce((sum, o) => sum + o.totalAmount, 0)
                            const orderCount = customerOrders.length
                            
                            return {
                              name: customer.company,
                              ltv: totalSpent,
                              orders: orderCount,
                            }
                          })
                          .sort((a, b) => b.ltv - a.ltv)
                          .slice(0, 10)
                        }
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                        <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                        <Tooltip formatter={(value, name) => [name === "ltv" ? `$${value}` : value, name === "ltv" ? "Lifetime Value" : "Order Count"]} />
                        <Bar yAxisId="left" dataKey="ltv" name="Lifetime Value" fill="#3B82F6" />
                        <Bar yAxisId="right" dataKey="orders" name="Order Count" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Engagement Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Interactive global customer engagement map would be displayed here</p>
                      <p className="text-sm text-gray-400 mt-2">Showing customer activity and engagement metrics by region</p>
                    </div>
                  </CardContent>
                </Card>
              </Card>
            </TabsContent>
            
            {/* Product Analysis Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Category Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={productCategoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {productCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Product Performance Matrix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <Layers className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Product performance matrix would be displayed here</p>
                        <p className="text-sm text-gray-400 mt-2">Showing volume vs. margin analysis for product portfolio</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Profitability Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={products.slice(0, 10).map(product => {
                          const costPrice = Math.floor(Math.random() * 50) + 10
                          const sellingPrice = costPrice * (1 + (Math.random() * 0.5 + 0.2))
                          const margin = ((sellingPrice - costPrice) / sellingPrice) * 100
                          const volume = Math.floor(Math.random() * 500) + 100
                          
                          return {
                            name: product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name,
                            margin: margin,
                            volume: volume,
                            revenue: sellingPrice * volume,
                          }
                        })}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                        <YAxis yAxisId="right" orientation="right" stroke="#F59E0B" />
                        <Tooltip formatter={(value, name) => [
                          name === "margin" ? `${value.toFixed(1)}%` : 
                          name === "revenue" ? `$${value.toLocaleString()}` : 
                          value,
                          name === "margin" ? "Profit Margin" : 
                          name === "revenue" ? "Revenue" : 
                          name === "volume" ? "Volume" : 
                          name
                        ]} />
                        <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#3B82F6" />
                        <Bar yAxisId="right" dataKey="margin" name="Profit Margin" fill="#F59E0B" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Products by Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                      <div className="col-span-4">Product</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-2">Units Sold</div>
                      <div className="col-span-2">Revenue</div>
                      <div className="col-span-2">Profit Margin</div>
                    </div>
                    
                    {products.slice(0, 10).map((product, index) => {
                      const unitsSold = Math.floor(Math.random() * 500) + 100
                      const revenue = unitsSold * (Math.floor(Math.random() * 100) + 50)
                      const margin = Math.floor(Math.random() * 20) + 20
                      
                      return (
                        <div key={product.id} className="grid grid-cols-12 items-center border-b px-4 py-3 hover:bg-muted/50">
                          <div className="col-span-4 font-medium">{product.name}</div>
                          <div className="col-span-2">{product.category}</div>
                          <div className="col-span-2">{unitsSold.toLocaleString()}</div>
                          <div className="col-span-2">${revenue.toLocaleString()}</div>
                          <div className="col-span-2">{margin}%</div>
                        </div>
                      )
                    })}
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
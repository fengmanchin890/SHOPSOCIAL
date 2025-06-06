"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Building2,
  FileText,
  CreditCard,
  TrendingUp,
  Bell,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Briefcase,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function B2BDashboardPage() {
  const { t } = useLanguage()
  const { currentUser, orders, quotes, products, users, getProfitAnalysis, getNotifications } = useB2B()
  const [hasMounted, setHasMounted] = useState(false)
  const [userRole, setUserRole] = useState<"middleman" | "supplier" | "customer">("middleman")

  // Prevent hydration mismatch by only rendering after client mount
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Set user role based on current user
  useEffect(() => {
    if (currentUser) {
      setUserRole(currentUser.role as "middleman" | "supplier" | "customer")
    }
  }, [currentUser])

  if (!hasMounted) {
    return null
  }

  const profitAnalysis = getProfitAnalysis(currentUser?.id || "")
  const notifications = getNotifications(currentUser?.id || "")

  // Recent orders
  const recentOrders = orders.slice(0, 5)

  // Pending quotes
  const pendingQuotes = quotes.filter(q => q.status === "sent").slice(0, 5)

  // Top products
  const topProducts = products
    .map(product => {
      const productOrders = orders.filter(order => {
        const quote = quotes.find(q => q.id === order.quoteId)
        return quote?.productId === product.id
      })
      return {
        ...product,
        orderCount: productOrders.length,
        totalValue: productOrders.reduce((sum, order) => sum + order.totalAmount, 0)
      }
    })
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, 5)

  // Role-specific stats
  const getRoleSpecificStats = () => {
    switch (userRole) {
      case "middleman":
        return {
          title: "貿易商統計",
          stats: [
            { label: "總利潤", value: `$${profitAnalysis.profit.toLocaleString()}`, icon: DollarSign, trend: "up" },
            { label: "利潤率", value: `${profitAnalysis.margin.toFixed(1)}%`, icon: TrendingUp, trend: "up" },
            { label: "活躍供應商", value: users.filter(u => u.role === "supplier").length, icon: Building2, trend: "stable" },
            { label: "活躍客戶", value: users.filter(u => u.role === "customer").length, icon: Users, trend: "up" },
          ]
        }
      case "supplier":
        return {
          title: "供應商統計",
          stats: [
            { label: "活躍產品", value: products.filter(p => p.supplierId === currentUser?.id).length, icon: Package, trend: "up" },
            { label: "待處理訂單", value: orders.filter(o => o.supplierId === currentUser?.id && o.status === "pending").length, icon: ShoppingCart, trend: "up" },
            { label: "待確認報價", value: quotes.filter(q => q.supplierId === currentUser?.id && q.status === "sent").length, icon: FileText, trend: "down" },
            { label: "本月收入", value: `$${orders.filter(o => o.supplierId === currentUser?.id).reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}`, icon: DollarSign, trend: "up" },
          ]
        }
      case "customer":
        return {
          title: "客戶統計",
          stats: [
            { label: "待處理訂單", value: orders.filter(o => o.customerId === currentUser?.id && o.status === "pending").length, icon: ShoppingCart, trend: "stable" },
            { label: "待確認報價", value: quotes.filter(q => q.customerId === currentUser?.id && q.status === "sent").length, icon: FileText, trend: "up" },
            { label: "已完成訂單", value: orders.filter(o => o.customerId === currentUser?.id && o.status === "completed").length, icon: CheckCircle, trend: "up" },
            { label: "本月支出", value: `$${orders.filter(o => o.customerId === currentUser?.id).reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}`, icon: DollarSign, trend: "down" },
          ]
        }
      default:
        return {
          title: "統計數據",
          stats: [
            { label: "總訂單", value: orders.length, icon: ShoppingCart, trend: "up" },
            { label: "總產品", value: products.length, icon: Package, trend: "up" },
            { label: "總用戶", value: users.length, icon: Users, trend: "up" },
            { label: "總收入", value: `$${orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}`, icon: DollarSign, trend: "up" },
          ]
        }
    }
  }

  const roleStats = getRoleSpecificStats()

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">B2B {t("dashboard")}</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date().toLocaleDateString('zh-TW')}
              </Button>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Role Selector */}
          <Tabs defaultValue={userRole} className="mb-6" onValueChange={(value) => setUserRole(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="middleman" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>貿易商</span>
              </TabsTrigger>
              <TabsTrigger value="supplier" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>供應商</span>
              </TabsTrigger>
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>客戶</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {roleStats.stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge variant={stat.trend === "up" ? "default" : stat.trend === "down" ? "destructive" : "secondary"} className="flex items-center">
                      {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                       stat.trend === "down" ? <ArrowDownRight className="h-3 w-3 mr-1" /> : null}
                      {stat.trend === "up" ? "上升" : 
                       stat.trend === "down" ? "下降" : "穩定"}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {/* Recent Orders */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>最近訂單</CardTitle>
                  <CardDescription>最近處理的訂單</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/store/b2b/orders">查看全部</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => {
                      const customer = users.find(u => u.id === order.customerId)
                      const supplier = users.find(u => u.id === order.supplierId)
                      
                      return (
                        <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              {order.status === "pending" ? (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              ) : order.status === "shipped" ? (
                                <Truck className="h-5 w-5 text-blue-500" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">訂單 #{order.id.slice(-6)}</p>
                              <p className="text-sm text-gray-500">
                                {customer?.company} → {supplier?.company}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                            <Badge variant={
                              order.status === "pending" ? "secondary" : 
                              order.status === "shipped" ? "default" : 
                              "success"
                            }>
                              {order.status === "pending" ? "待處理" : 
                               order.status === "shipped" ? "運送中" : 
                               "已完成"}
                            </Badge>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-4 text-gray-500">暫無訂單</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pending Quotes */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>待處理報價</CardTitle>
                  <CardDescription>需要確認的報價</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/store/b2b/quotes">查看全部</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingQuotes.length > 0 ? (
                    pendingQuotes.map((quote) => {
                      const product = products.find(p => p.id === quote.productId)
                      
                      return (
                        <div key={quote.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                          <div>
                            <p className="font-medium">{product?.name}</p>
                            <p className="text-sm text-gray-500">數量: {quote.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${quote.sellingPrice?.toLocaleString() || quote.costPrice.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(quote.validUntil).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-4 text-gray-500">暫無待處理報價</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Top Products */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>熱門產品</CardTitle>
                  <CardDescription>最受歡迎的產品</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/store/b2b/products">查看全部</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img 
                            src={product.image || "/placeholder.svg"} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">訂單: {product.orderCount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.totalValue.toLocaleString()}</p>
                        <Link href={`/store/b2b/products/${product.id}`} className="text-sm text-blue-600 flex items-center">
                          詳情 <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>通知</CardTitle>
                  <CardDescription>最新系統通知</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  全部標為已讀
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-600'}`}></div>
                        <div>
                          <p className="font-medium text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">暫無通知</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
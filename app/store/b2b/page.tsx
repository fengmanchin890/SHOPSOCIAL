"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useI18n } from "@/contexts/i18n-context"
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Building2,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function B2BDashboardPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is authenticated
  useEffect(() => {
    const auth = localStorage.getItem("b2b-auth")
    if (auth === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple password protection (in a real app, this would be server-side)
    setTimeout(() => {
      if (password === "admin123") {
        localStorage.setItem("b2b-auth", "authenticated")
        setIsAuthenticated(true)
      } else {
        setError("Invalid password. Please try again.")
      }
      setIsLoading(false)
    }, 1000)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">{t("b2b.dashboard")} - Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-xs text-center text-gray-500">
                This is a protected area. Only authorized personnel can access the B2B platform.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{t("b2b.dashboard")}</h1>
            <Button variant="outline" onClick={() => router.push("/store/b2b/products/add")}>
              {t("button.add")} {t("b2b.products")}
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("b2b.orders")}</p>
                    <h3 className="text-2xl font-bold mt-1">24</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500 font-medium">+12% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("b2b.quotes")}</p>
                    <h3 className="text-2xl font-bold mt-1">18</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500 font-medium">+5% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("b2b.customers")}</p>
                    <h3 className="text-2xl font-bold mt-1">42</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500 font-medium">+8% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t("b2b.suppliers")}</p>
                    <h3 className="text-2xl font-bold mt-1">15</h3>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Building2 className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500 font-medium">+3% this month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue and Products */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-gray-500" />
                  {t("b2b.analytics")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Revenue chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-gray-500" />
                  {t("b2b.products")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Wireless Headphones</p>
                        <p className="text-sm text-gray-500">SKU: WH-001</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$59.99</p>
                      <p className="text-sm text-gray-500">120 in stock</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Smart Watch</p>
                        <p className="text-sm text-gray-500">SKU: SW-005</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$199.99</p>
                      <p className="text-sm text-gray-500">45 in stock</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Laptop Stand</p>
                        <p className="text-sm text-gray-500">SKU: LS-003</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$29.99</p>
                      <p className="text-sm text-gray-500">230 in stock</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders and Alerts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-gray-500" />
                  {t("b2b.orders")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Order #1234</p>
                      <p className="text-sm text-gray-500">2 items • $259.98</p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Shipped
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Order #1233</p>
                      <p className="text-sm text-gray-500">1 item • $199.99</p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        Processing
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Order #1232</p>
                      <p className="text-sm text-gray-500">3 items • $89.97</p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-gray-500" />
                  Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">Low Stock Alert</p>
                      <p className="text-sm text-amber-700">Smart Watch (SKU: SW-005) is running low on stock (5 units left).</p>
                    </div>
                  </div>

                  <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Quote Expiring</p>
                      <p className="text-sm text-blue-700">Quote #QT-2023-05 for Import Solutions Inc. expires in 2 days.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Payment Received</p>
                      <p className="text-sm text-green-700">Payment of $3,450.00 received for Order #1231.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
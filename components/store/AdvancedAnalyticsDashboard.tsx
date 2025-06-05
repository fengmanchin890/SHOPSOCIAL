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
} from "recharts"
import { TrendingUp, Users, ShoppingCart, Eye, Smartphone, Monitor, Tablet, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdvancedAnalytics } from "./AdvancedAnalyticsProvider"

const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"]

export function AdvancedAnalyticsDashboard() {
  const { analyticsData, getInsights, exportAnalytics } = useAdvancedAnalytics()
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  // Provide default values to prevent undefined errors
  const analytics = analyticsData || {
    pageViews: {},
    userSessions: 0,
    conversionRate: 0,
    averageOrderValue: 0,
    topProducts: [],
    userBehavior: {
      bounceRate: 0,
      sessionDuration: 0,
      pagesPerSession: 0,
    },
    salesMetrics: {
      totalRevenue: 0,
      totalOrders: 0,
      newCustomers: 0,
      returningCustomers: 0,
    },
  }

  const insights = getInsights ? getInsights() : []

  // Mock data for charts with safe defaults
  const timeSeriesData = [
    { time: "00:00", users: 12, pageViews: 45, conversions: 2 },
    { time: "04:00", users: 8, pageViews: 23, conversions: 1 },
    { time: "08:00", users: 35, pageViews: 156, conversions: 8 },
    { time: "12:00", users: 67, pageViews: 234, conversions: 15 },
    { time: "16:00", users: 89, pageViews: 345, conversions: 23 },
    { time: "20:00", users: 56, pageViews: 198, conversions: 12 },
  ]

  // Safe device data with defaults
  const deviceData = [
    { name: "mobile", value: 65 },
    { name: "desktop", value: 25 },
    { name: "tablet", value: 10 },
  ]

  // Safe top pages data
  const topPagesData = Object.entries(analytics.pageViews || {})
    .map(([page, views]) => ({
      page,
      views: views || 0,
    }))
    .slice(0, 5)

  // Safe behavior patterns
  const behaviorData = [
    { pattern: "Browse\n→ Compare\n→ Purchase", frequency: 45 },
    { pattern: "Search\n→ Wishlist\n→ Return Later", frequency: 32 },
    { pattern: "Voice Search\n→ Quick Purchase", frequency: 18 },
  ]

  // Safe top search terms
  const topSearchTerms = [
    { term: "牛仔外套", count: 15 },
    { term: "運動鞋", count: 12 },
    { term: "手提包", count: 8 },
  ]

  return (
    <div className="space-y-6">
      {/* 關鍵指標 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">用戶會話</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.userSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> 較上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">頁面瀏覽量</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(analytics.pageViews || {})
                .reduce((sum, views) => sum + (views || 0), 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> 較昨日
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">轉換率</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-0.3%</span> 較上週
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均訂單價值</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.1%</span> 較上週
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 洞察和建議 */}
      {insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>AI 洞察與建議</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Badge
                    variant={
                      insight.impact === "high" ? "destructive" : insight.impact === "medium" ? "default" : "secondary"
                    }
                  >
                    {insight.impact === "high" ? "高" : insight.impact === "medium" ? "中" : "低"}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium capitalize">{insight.type}</p>
                    <p className="text-sm text-gray-600">{insight.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">總覽</TabsTrigger>
            <TabsTrigger value="behavior">用戶行為</TabsTrigger>
            <TabsTrigger value="devices">設備分析</TabsTrigger>
            <TabsTrigger value="realtime">即時數據</TabsTrigger>
          </TabsList>
          <Button onClick={() => exportAnalytics && exportAnalytics("json")} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            匯出數據
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* 頁面瀏覽量趨勢 */}
          <Card>
            <CardHeader>
              <CardTitle>頁面瀏覽量趨勢</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pageViews" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 熱門頁面 */}
          {topPagesData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>熱門頁面</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topPagesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="page" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          {/* 用戶行為模式 */}
          <Card>
            <CardHeader>
              <CardTitle>用戶行為模式</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={behaviorData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="pattern" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="frequency" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 熱門商品 */}
          <Card>
            <CardHeader>
              <CardTitle>熱門商品分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topProducts.length > 0 ? (
                  analytics.topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.views} 次瀏覽</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.sales} 次銷售</p>
                        <p className="text-sm text-gray-600">
                          {((product.sales / product.views) * 100).toFixed(1)}% 轉換率
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">暫無商品數據</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          {/* 設備分佈 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>設備類型分佈</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>設備詳細統計</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                      <span>移動設備</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">65%</p>
                      <p className="text-sm text-gray-600">主要流量來源</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-5 w-5 text-green-600" />
                      <span>桌面設備</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">25%</p>
                      <p className="text-sm text-gray-600">高轉換率</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tablet className="h-5 w-5 text-purple-600" />
                      <span>平板設備</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">10%</p>
                      <p className="text-sm text-gray-600">成長中</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          {/* 即時指標 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">當前在線用戶</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">23</div>
                <p className="text-sm text-gray-600">正在瀏覽網站</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">每分鐘頁面瀏覽</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">12</div>
                <p className="text-sm text-gray-600">實時活動</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">每小時轉換</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">3</div>
                <p className="text-sm text-gray-600">購買行為</p>
              </CardContent>
            </Card>
          </div>

          {/* 熱門搜索詞 */}
          <Card>
            <CardHeader>
              <CardTitle>即時熱門搜索</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topSearchTerms.map((term, index) => (
                  <div key={term.term} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span className="font-medium">{term.term}</span>
                    </div>
                    <Badge>{term.count} 次搜索</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

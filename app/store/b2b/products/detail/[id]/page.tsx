"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Building2, Calendar, Clock, Download, Edit, FileText, Package, ShoppingCart, Truck, Users } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const { products, quotes, orders, users, createQuote } = useB2B()
  const [hasMounted, setHasMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreatingQuote, setIsCreatingQuote] = useState(false)
  
  // Prevent hydration mismatch by only rendering after client mount
  useEffect(() => {
    setHasMounted(true)
  }, [])
  
  if (!hasMounted) {
    return null
  }
  
  const productId = params.id as string
  const product = products.find(p => p.id === productId)
  
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardNav />
          <main className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回
              </Button>
              <h1 className="text-3xl font-bold">產品不存在</h1>
            </div>
            <p>找不到指定的產品，請返回產品列表。</p>
          </main>
        </div>
      </div>
    )
  }
  
  const supplier = users.find(u => u.id === product.supplierId)
  
  // Get related quotes and orders
  const productQuotes = quotes.filter(q => q.productId === product.id)
  const productOrders = orders.filter(o => {
    const quote = quotes.find(q => q.id === o.quoteId)
    return quote?.productId === product.id
  })
  
  const handleCreateQuote = () => {
    setIsCreatingQuote(true)
    
    try {
      const quoteId = createQuote({
        productId: product.id,
        supplierId: product.supplierId,
        quantity: product.moq,
        costPrice: 100, // Example price
        currency: "USD",
        terms: "FOB",
        validUntil: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
      })
      
      toast({
        title: "報價建立成功",
        description: "已成功建立產品報價",
      })
      
      router.push(`/store/b2b/quotes?highlight=${quoteId}`)
    } catch (error) {
      toast({
        title: "報價建立失敗",
        description: "建立報價時發生錯誤，請稍後再試",
        variant: "destructive",
      })
    } finally {
      setIsCreatingQuote(false)
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/store/b2b/products">
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image || "/placeholder.svg"} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <Badge className="mb-4">{product.category}</Badge>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">最小訂購量 (MOQ)</p>
                          <p className="font-medium">{product.moq} 件</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">生產前置時間</p>
                          <p className="font-medium">{product.leadTime} 天</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">供應商</p>
                        <p className="font-medium">{supplier?.company}</p>
                        <p className="text-sm text-gray-500">{supplier?.country}</p>
                      </div>
                      
                      <div className="pt-4 flex gap-2">
                        <Button onClick={handleCreateQuote} disabled={isCreatingQuote}>
                          <FileText className="h-4 w-4 mr-2" />
                          {isCreatingQuote ? "處理中..." : "請求報價"}
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/store/b2b/products/edit/${product.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            編輯產品
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">概覽</TabsTrigger>
                  <TabsTrigger value="specifications">規格</TabsTrigger>
                  <TabsTrigger value="quotes">報價歷史</TabsTrigger>
                  <TabsTrigger value="orders">訂單歷史</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>產品描述</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line">{product.description}</p>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">報價數量</p>
                            <p className="text-xl font-bold">{productQuotes.length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <ShoppingCart className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">訂單數量</p>
                            <p className="text-xl font-bold">{productOrders.length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">客戶數量</p>
                            <p className="text-xl font-bold">
                              {new Set(productOrders.map(o => o.customerId)).size}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="specifications" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>產品規格</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {Object.keys(product.specifications).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="border rounded p-3">
                              <p className="text-sm text-gray-500">{key}</p>
                              <p className="font-medium">{value}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">暫無規格資訊</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="quotes" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>報價歷史</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {productQuotes.length > 0 ? (
                        <div className="space-y-4">
                          {productQuotes.map((quote) => {
                            const customer = users.find(u => u.id === quote.customerId)
                            
                            return (
                              <div key={quote.id} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Badge variant={
                                      quote.status === "draft" ? "outline" :
                                      quote.status === "sent" ? "default" :
                                      quote.status === "accepted" ? "success" :
                                      "destructive"
                                    }>
                                      {quote.status === "draft" ? "草稿" :
                                       quote.status === "sent" ? "已發送" :
                                       quote.status === "accepted" ? "已接受" :
                                       "已拒絕"}
                                    </Badge>
                                    <p className="text-sm">報價 #{quote.id.slice(-6)}</p>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {new Date(quote.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                  <div>
                                    <p className="text-sm text-gray-500">客戶</p>
                                    <p className="font-medium">{customer?.company || "未指定"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">數量</p>
                                    <p className="font-medium">{quote.quantity} 件</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">單價</p>
                                    <p className="font-medium">${quote.costPrice}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">總價</p>
                                    <p className="font-medium">${(quote.costPrice * quote.quantity).toLocaleString()}</p>
                                  </div>
                                </div>
                                
                                <div className="flex justify-end mt-4">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/store/b2b/quotes?highlight=${quote.id}`}>
                                      查看詳情
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-500">暫無報價歷史</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>訂單歷史</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {productOrders.length > 0 ? (
                        <div className="space-y-4">
                          {productOrders.map((order) => {
                            const customer = users.find(u => u.id === order.customerId)
                            
                            return (
                              <div key={order.id} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Badge variant={
                                      order.status === "pending" ? "secondary" :
                                      order.status === "confirmed" ? "default" :
                                      order.status === "shipped" ? "default" :
                                      "success"
                                    }>
                                      {order.status === "pending" ? "待處理" :
                                       order.status === "confirmed" ? "已確認" :
                                       order.status === "shipped" ? "運送中" :
                                       "已完成"}
                                    </Badge>
                                    <p className="text-sm">訂單 #{order.id.slice(-6)}</p>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                  <div>
                                    <p className="text-sm text-gray-500">客戶</p>
                                    <p className="font-medium">{customer?.company}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">總金額</p>
                                    <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">付款狀態</p>
                                    <Badge variant={order.paymentStatus === "paid" ? "success" : "outline"}>
                                      {order.paymentStatus === "paid" ? "已付款" : "待付款"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">文件數量</p>
                                    <p className="font-medium">{order.documents.length} 份</p>
                                  </div>
                                </div>
                                
                                <div className="flex justify-end mt-4">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/store/b2b/orders?highlight=${order.id}`}>
                                      查看詳情
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-500">暫無訂單歷史</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>供應商資訊</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-bold">{supplier?.company}</p>
                      <p className="text-sm text-gray-500">{supplier?.country}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">驗證狀態</p>
                        <Badge variant={supplier?.verified ? "success" : "outline"}>
                          {supplier?.verified ? "已驗證" : "未驗證"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">合作時間</p>
                        <p className="text-sm">2 年</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">回應時間</p>
                        <p className="text-sm">通常 24 小時內</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>訂購資訊</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">最小訂購量</p>
                      <p className="font-medium">{product.moq} 件</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">生產前置時間</p>
                      <p className="font-medium">{product.leadTime} 天</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">付款方式</p>
                      <p className="font-medium">T/T, L/C</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">貿易條款</p>
                      <p className="font-medium">FOB, CIF</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full" onClick={handleCreateQuote} disabled={isCreatingQuote}>
                      <FileText className="h-4 w-4 mr-2" />
                      {isCreatingQuote ? "處理中..." : "請求報價"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>相關文件</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      產品規格書
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      產品認證
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      使用手冊
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
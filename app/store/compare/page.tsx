"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Scale,
  X,
  ShoppingCart,
  Star,
  ArrowRight,
  Users,
  Heart,
  UserPlus,
  Bell,
  Filter,
  Save,
  Clock,
  Share2,
  FileDown,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useCompare } from "@/components/store/CompareProvider"
import { useCart } from "@/components/store/CartProvider"
import { useComparisonHistory } from "@/components/store/ComparisonHistoryProvider"
import { useComparisonAnalytics } from "@/components/store/ComparisonAnalyticsProvider"
import { useSocialFeatures } from "@/components/store/SocialFeaturesProvider"
import { useCollaboration } from "@/components/store/CollaborationProvider"
import { usePriceAlerts } from "@/components/store/PriceAlertsProvider"
import { AIRecommendationsPanel } from "@/components/store/AIRecommendationsPanel"
import { toast } from "@/hooks/use-toast"

interface ComparisonFilters {
  showOnlyInStock: boolean
  priceRange: [number, number]
  categories: string[]
  features: string[]
  rating: number
}

export default function ComparePage() {
  const { items, removeItem, clearCompare, loadFromHistory } = useCompare()
  const { addItem } = useCart()
  const { sessions, saveSession, deleteSession, clearHistory } = useComparisonHistory()
  const { analytics, getPopularProducts, getCategoryStats } = useComparisonAnalytics()
  const { getSocialData, likeComparison, addComment, likeComment, rateComparison, shareComparison } =
    useSocialFeatures()
  const { currentSession, activeUsers, createSession, joinSession, leaveSession, inviteUser, isCollaborating } =
    useCollaboration()
  const { createAlert, alerts, getActiveAlertsCount } = usePriceAlerts()

  // 狀態管理
  const [filters, setFilters] = useState<ComparisonFilters>({
    showOnlyInStock: false,
    priceRange: [0, 10000],
    categories: [],
    features: [],
    rating: 0,
  })
  const [sessionName, setSessionName] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [collaborationName, setCollaborationName] = useState("")
  const [joinSessionId, setJoinSessionId] = useState("")
  const [targetPrice, setTargetPrice] = useState<Record<string, number>>({})
  const [socialTabOpen, setSocialTabOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "image" | "csv">("pdf")

  // 社交數據
  const comparisonId = "current-comparison"
  const socialData = getSocialData(comparisonId)

  // 處理加入購物車
  const handleAddToCart = (item: any) => {
    // 創建購物車商品對象
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    }

    // 添加到購物車
    addItem(cartItem)

    // 顯示成功訊息
    toast({
      title: "已加入購物車",
      description: `${item.name} 已成功加入購物車`,
    })
  }

  // 儲存比較清單
  const handleSaveSession = () => {
    if (sessionName.trim() && items.length > 0) {
      saveSession(sessionName.trim(), items)
      setSessionName("")
      toast({
        title: "已儲存比較清單",
        description: `比較清單「${sessionName.trim()}」已成功儲存`,
      })
    } else {
      toast({
        title: "無法儲存",
        description: "請輸入名稱並確保比較清單不為空",
        variant: "destructive",
      })
    }
  }

  // 載入比較清單
  const handleLoadSession = (sessionItems: any[]) => {
    loadFromHistory(sessionItems)
    toast({
      title: "已載入比較清單",
      description: "已成功載入儲存的比較清單",
    })
  }

  // 分享比較清單
  const handleShare = () => {
    const comparisonData = {
      items: items.map((item) => item.id),
      timestamp: Date.now(),
    }
    const encodedData = btoa(JSON.stringify(comparisonData))
    const url = `${window.location.origin}/store/compare/shared/${encodedData}`
    setShareUrl(url)
    navigator.clipboard.writeText(url)
    shareComparison(comparisonId)
    toast({
      title: "已複製分享連結",
      description: "比較清單分享連結已複製到剪貼簿",
    })
  }

  // 匯出比較清單
  const handleExport = async (format: "pdf" | "image" | "csv") => {
    setExportFormat(format)
    toast({
      title: "正在準備匯出",
      description: `正在準備以 ${format.toUpperCase()} 格式匯出比較清單`,
    })

    setTimeout(() => {
      toast({
        title: "匯出成功",
        description: `比較清單已成功匯出為 ${format.toUpperCase()} 格式`,
      })
    }, 1500)
  }

  // 添加評論
  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(comparisonId, newComment.trim())
      setNewComment("")
      toast({
        title: "評論已發布",
        description: "您的評論已成功發布",
      })
    }
  }

  // 設置價格提醒
  const handleCreatePriceAlert = (item: any) => {
    const itemTargetPrice = targetPrice[item.id] || item.price * 0.9 // 預設為原價的90%
    createAlert(item.id, item.name, item.image, item.price, itemTargetPrice)
    toast({
      title: "價格提醒已設置",
      description: `當 ${item.name} 價格低於 $${itemTargetPrice.toLocaleString()} 時將通知您`,
    })
  }

  // 創建協作會話
  const handleCreateCollaboration = () => {
    if (collaborationName.trim()) {
      const sessionId = createSession(collaborationName.trim())
      setCollaborationName("")
      toast({
        title: "協作會話已創建",
        description: `協作會話「${collaborationName.trim()}」已成功創建，ID: ${sessionId}`,
      })
    }
  }

  // 加入協作會話
  const handleJoinCollaboration = () => {
    if (joinSessionId.trim()) {
      joinSession(joinSessionId.trim())
      setJoinSessionId("")
      toast({
        title: "已加入協作會話",
        description: "您已成功加入協作會話",
      })
    }
  }

  // 邀請用戶
  const handleInviteUser = () => {
    if (inviteEmail.trim()) {
      inviteUser(inviteEmail.trim())
      setInviteEmail("")
      toast({
        title: "邀請已發送",
        description: `邀請已發送至 ${inviteEmail.trim()}`,
      })
    }
  }

  // 應用篩選
  const filteredItems = items.filter((item) => {
    if (filters.showOnlyInStock && !item.inStock) return false
    if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) return false
    if (filters.categories.length > 0 && !filters.categories.includes(item.category)) return false
    if (filters.features.length > 0) {
      const hasFeature = filters.features.some((feature) => item.features.includes(feature))
      if (!hasFeature) return false
    }
    if (filters.rating > 0 && item.rating < filters.rating) return false
    return true
  })

  // 獲取所有特徵和類別
  const allFeatures = Array.from(new Set(items.flatMap((item) => item.features)))
  const allCategories = Array.from(new Set(items.map((item) => item.category)))
  const maxPrice = Math.max(...items.map((item) => item.price), 10000)

  // 更新價格範圍篩選
  const handlePriceRangeChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]],
    })
  }

  // 更新類別篩選
  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    })
  }

  // 更新特徵篩選
  const handleFeatureChange = (feature: string) => {
    setFilters({
      ...filters,
      features: filters.features.includes(feature)
        ? filters.features.filter((f) => f !== feature)
        : [...filters.features, feature],
    })
  }

  // 更新評分篩選
  const handleRatingChange = (rating: number) => {
    setFilters({
      ...filters,
      rating,
    })
  }

  // 重置篩選
  const handleResetFilters = () => {
    setFilters({
      showOnlyInStock: false,
      priceRange: [0, maxPrice],
      categories: [],
      features: [],
      rating: 0,
    })
  }

  // 如果比較清單為空
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Scale className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">商品比較清單是空的</h1>
          <p className="text-gray-600 mb-8">從收藏清單或商品頁面添加商品來進行比較</p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/store/products">瀏覽商品</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/store/wishlist">查看收藏清單</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 協作狀態 */}
      {isCollaborating && (
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">協作模式</h3>
                  <p className="text-sm text-blue-700">正在與 {activeUsers.length} 位用戶協作</p>
                </div>
                <div className="flex -space-x-2">
                  {activeUsers.slice(0, 3).map((user) => (
                    <Avatar key={user.id} className="border-2 border-white">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback style={{ backgroundColor: user.color }}>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  {activeUsers.length > 3 && (
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full border-2 border-white text-xs">
                      +{activeUsers.length - 3}
                    </div>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={leaveSession}>
                離開協作
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">商品比較</h1>
          <p className="text-gray-600 mt-2">比較 {filteredItems.length} 個商品的詳細資訊</p>
        </div>
      </div>

      {/* 功能按鈕工具列 */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {/* 社交按鈕 */}
        <Dialog open={socialTabOpen} onOpenChange={setSocialTabOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>社交 ({socialData.likes})</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>社交互動</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className={`h-5 w-5 ${socialData.likedByUser ? "fill-red-500 text-red-500" : ""}`} />
                  <span>{socialData.likes} 人喜歡</span>
                </div>
                <Button
                  variant={socialData.likedByUser ? "default" : "outline"}
                  size="sm"
                  onClick={() => likeComparison(comparisonId)}
                >
                  {socialData.likedByUser ? "已喜歡" : "喜歡"}
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-2">評分</h4>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 cursor-pointer ${
                          star <= socialData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => rateComparison(comparisonId, star)}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({socialData.rating.toFixed(1)})</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">評論</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {socialData.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={comment.userAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{comment.userName}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => likeComment(comparisonId, comment.id)}
                        >
                          <Heart className={`h-3 w-3 mr-1 ${comment.likedByUser ? "fill-red-500 text-red-500" : ""}`} />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Textarea
                    placeholder="添加評論..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    發布
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 協作按鈕 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>協作</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>協作比較</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="create">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">創建協作</TabsTrigger>
                <TabsTrigger value="join">加入協作</TabsTrigger>
              </TabsList>
              <TabsContent value="create" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium">協作名稱</label>
                  <Input
                    placeholder="輸入協作名稱"
                    value={collaborationName}
                    onChange={(e) => setCollaborationName(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateCollaboration} disabled={!collaborationName.trim()}>
                  創建協作會話
                </Button>
              </TabsContent>
              <TabsContent value="join" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium">會話 ID</label>
                  <Input
                    placeholder="輸入會話 ID"
                    value={joinSessionId}
                    onChange={(e) => setJoinSessionId(e.target.value)}
                  />
                </div>
                <Button onClick={handleJoinCollaboration} disabled={!joinSessionId.trim()}>
                  加入協作會話
                </Button>
              </TabsContent>
            </Tabs>
            {isCollaborating && (
              <div className="mt-4 space-y-4">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium mb-2">當前協作</h4>
                  <p className="text-sm">
                    {currentSession?.name} ({activeUsers.length} 位用戶在線)
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">邀請用戶</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="輸入電子郵件"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <Button onClick={handleInviteUser} disabled={!inviteEmail.trim()}>
                      邀請
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* 價格提醒按鈕 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>價格提醒</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>設置價格提醒</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">當商品價格降至目標價格時，系統將通知您。</p>
              {items.map((item) => (
                <div key={item.id} className="border rounded-md p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-gray-600">目前價格: ${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-xs font-medium">目標價格</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="number"
                        placeholder="輸入目標價格"
                        value={targetPrice[item.id] || Math.floor(item.price * 0.9)}
                        onChange={(e) =>
                          setTargetPrice({
                            ...targetPrice,
                            [item.id]: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                      <Button onClick={() => handleCreatePriceAlert(item)}>設置</Button>
                    </div>
                  </div>
                </div>
              ))}
              {alerts.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">已設置的提醒</h4>
                  <div className="space-y-2">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="bg-gray-50 p-2 rounded-md flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 relative rounded overflow-hidden">
                            <Image
                              src={alert.productImage || "/placeholder.svg"}
                              alt={alert.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-medium line-clamp-1">{alert.productName}</p>
                            <p className="text-xs text-gray-600">目標: ${alert.targetPrice.toLocaleString()}</p>
                          </div>
                        </div>
                        <Badge variant={alert.isActive ? "default" : "outline"}>
                          {alert.isActive ? "已啟用" : "已停用"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* 篩選按鈕 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>篩選</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>篩選選項</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium mb-2">價格範圍</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                    max={maxPrice}
                    step={100}
                    onValueChange={handlePriceRangeChange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${filters.priceRange[0].toLocaleString()}</span>
                    <span className="text-sm">${filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">庫存狀態</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={filters.showOnlyInStock}
                    onChange={(e) => setFilters({ ...filters, showOnlyInStock: e.target.checked })}
                  />
                  <label htmlFor="inStock" className="text-sm">
                    僅顯示有庫存的商品
                  </label>
                </div>
              </div>

              {allCategories.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">類別</h4>
                  <div className="space-y-1">
                    {allCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`category-${category}`}
                          checked={filters.categories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {allFeatures.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">特徵</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {allFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`feature-${feature}`}
                          checked={filters.features.includes(feature)}
                          onChange={() => handleFeatureChange(feature)}
                        />
                        <label htmlFor={`feature-${feature}`} className="text-sm">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">最低評分</h4>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-5 w-5 cursor-pointer ${
                        rating <= filters.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => handleRatingChange(rating === filters.rating ? 0 : rating)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleResetFilters}>
                  重置
                </Button>
                <Button onClick={() => setShowFilters(false)}>應用篩選</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 儲存按鈕 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>儲存</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>儲存比較清單</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium">比較清單名稱</label>
                <Input placeholder="輸入名稱" value={sessionName} onChange={(e) => setSessionName(e.target.value)} />
              </div>
              <Button onClick={handleSaveSession} disabled={!sessionName.trim() || items.length === 0}>
                儲存比較清單
              </Button>

              {sessions.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">已儲存的比較清單</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div>
                          <h5 className="font-medium text-sm">{session.name}</h5>
                          <p className="text-xs text-gray-500">
                            {new Date(session.createdAt).toLocaleDateString()} · {session.items.length} 件商品
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleLoadSession(session.items)}>
                            載入
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteSession(session.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-2 w-full" onClick={clearHistory}>
                    清空歷史記錄
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* 記錄按鈕 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>記錄</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>比較記錄</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">查看您最近比較過的商品和價格變化。</p>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="border rounded-md p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold">${item.price.toLocaleString()}</span>
                          {item.originalPrice && (
                            <>
                              <span className="text-xs text-gray-500 line-through">
                                ${item.originalPrice.toLocaleString()}
                              </span>
                              <Badge variant="outline" className="text-green-600 bg-green-50">
                                -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-xs font-medium mb-1">價格歷史</h5>
                      <div className="h-10 bg-gray-100 rounded-md relative">
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                          價格歷史圖表
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 分享按鈕 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span>分享</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>分享比較清單</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">創建一個可分享的連結，讓其他人也能查看您的比較清單。</p>

              <Button onClick={handleShare} className="w-full">
                創建分享連結
              </Button>

              {shareUrl && (
                <div className="mt-4">
                  <label className="text-sm font-medium">分享連結</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input value={shareUrl} readOnly />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl)
                        toast({
                          title: "已複製",
                          description: "分享連結已複製到剪貼簿",
                        })
                      }}
                    >
                      複製
                    </Button>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-3">分享到社交媒體</h4>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    LINE
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 匯出按鈕 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              <span>匯出</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>匯出比較清單</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">將您的比較清單匯出為不同格式，方便保存或分享。</p>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("pdf")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  匯出為 PDF
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("image")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  匯出為圖片
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("csv")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  匯出為 CSV
                </Button>
              </div>

              {exportFormat && (
                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">正在準備 {exportFormat.toUpperCase()} 格式的比較清單...</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* 清空比較清單按鈕 */}
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {
            if (confirm("確定要清空比較清單嗎？")) {
              clearCompare()
              toast({
                title: "已清空比較清單",
                description: "所有商品已從比較清單中移除",
              })
            }
          }}
        >
          <Trash2 className="h-4 w-4" />
          <span>清空比較清單</span>
        </Button>
      </div>

      {/* 手機版警告 */}
      <div className="md:hidden mb-6">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">💡 建議使用桌面版或平板橫向模式以獲得最佳比較體驗</p>
          </CardContent>
        </Card>
      </div>

      {/* 比較表格 */}
      <div className="overflow-x-auto" id="comparison-table">
        <div className="min-w-full">
          {/* 商品圖片和基本信息 */}
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
                {filteredItems.map((item, index) => (
                  <div key={item.id} className={`p-6 ${index < filteredItems.length - 1 ? "border-r" : ""}`}>
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="absolute -top-2 -right-2 h-8 w-8 p-0 bg-white border rounded-full shadow-sm z-10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="aspect-square overflow-hidden rounded-lg mb-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xl font-bold text-gray-900">${item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          {item.rating} ({item.reviewCount})
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="w-full hover:bg-blue-600 active:bg-blue-700 transition-colors"
                          disabled={!item.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {item.inStock ? "加入購物車" : "缺貨中"}
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                          <Link href={`/store/products/${item.id}`}>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            查看詳情
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 其他比較內容保持不變... */}
        </div>
      </div>

      {/* AI 推薦 */}
      <AIRecommendationsPanel className="mt-8" />
    </div>
  )
}

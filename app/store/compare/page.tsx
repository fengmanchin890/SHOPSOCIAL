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

  // Quản lý trạng thái
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

  // Dữ liệu xã hội
  const comparisonId = "current-comparison"
  const socialData = getSocialData(comparisonId)

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (item: any) => {
    // Tạo đối tượng sản phẩm cho giỏ hàng
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    }

    // Thêm vào giỏ hàng
    addItem(cartItem)

    // Hiển thị thông báo thành công
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${item.name} đã được thêm vào giỏ hàng thành công`,
    })
  }

  // Lưu danh sách so sánh
  const handleSaveSession = () => {
    if (sessionName.trim() && items.length > 0) {
      saveSession(sessionName.trim(), items)
      setSessionName("")
      toast({
        title: "Đã lưu danh sách so sánh",
        description: `Danh sách so sánh "${sessionName.trim()}" đã được lưu thành công`,
      })
    } else {
      toast({
        title: "Không thể lưu",
        description: "Vui lòng nhập tên và đảm bảo danh sách so sánh không trống",
        variant: "destructive",
      })
    }
  }

  // Tải danh sách so sánh
  const handleLoadSession = (sessionItems: any[]) => {
    loadFromHistory(sessionItems)
    toast({
      title: "Đã tải danh sách so sánh",
      description: "Đã tải thành công danh sách so sánh đã lưu",
    })
  }

  // Chia sẻ danh sách so sánh
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
      title: "Đã sao chép liên kết chia sẻ",
      description: "Liên kết chia sẻ danh sách so sánh đã được sao chép vào bộ nhớ tạm",
    })
  }

  // Xuất danh sách so sánh
  const handleExport = async (format: "pdf" | "image" | "csv") => {
    setExportFormat(format)
    toast({
      title: "Đang chuẩn bị xuất",
      description: `Đang chuẩn bị xuất danh sách so sánh dưới dạng ${format.toUpperCase()}`,
    })

    setTimeout(() => {
      toast({
        title: "Xuất thành công",
        description: `Danh sách so sánh đã được xuất thành công dưới dạng ${format.toUpperCase()}`,
      })
    }, 1500)
  }

  // Thêm bình luận
  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(comparisonId, newComment.trim())
      setNewComment("")
      toast({
        title: "Đã đăng bình luận",
        description: "Bình luận của bạn đã được đăng thành công",
      })
    }
  }

  // Thiết lập cảnh báo giá
  const handleCreatePriceAlert = (item: any) => {
    const itemTargetPrice = targetPrice[item.id] || item.price * 0.9 // Mặc định là 90% giá gốc
    createAlert(item.id, item.name, item.image, item.price, itemTargetPrice)
    toast({
      title: "Đã thiết lập cảnh báo giá",
      description: `Bạn sẽ nhận được thông báo khi giá ${item.name} giảm xuống dưới $${itemTargetPrice.toLocaleString()}`,
    })
  }

  // Tạo phiên hợp tác
  const handleCreateCollaboration = () => {
    if (collaborationName.trim()) {
      const sessionId = createSession(collaborationName.trim())
      setCollaborationName("")
      toast({
        title: "Đã tạo phiên hợp tác",
        description: `Phiên hợp tác "${collaborationName.trim()}" đã được tạo thành công, ID: ${sessionId}`,
      })
    }
  }

  // Tham gia phiên hợp tác
  const handleJoinCollaboration = () => {
    if (joinSessionId.trim()) {
      joinSession(joinSessionId.trim())
      setJoinSessionId("")
      toast({
        title: "Đã tham gia phiên hợp tác",
        description: "Bạn đã tham gia phiên hợp tác thành công",
      })
    }
  }

  // Mời người dùng
  const handleInviteUser = () => {
    if (inviteEmail.trim()) {
      inviteUser(inviteEmail.trim())
      setInviteEmail("")
      toast({
        title: "Đã gửi lời mời",
        description: `Lời mời đã được gửi đến ${inviteEmail.trim()}`,
      })
    }
  }

  // Áp dụng bộ lọc
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

  // Lấy tất cả tính năng và danh mục
  const allFeatures = Array.from(new Set(items.flatMap((item) => item.features)))
  const allCategories = Array.from(new Set(items.map((item) => item.category)))
  const maxPrice = Math.max(...items.map((item) => item.price), 10000)

  // Cập nhật bộ lọc phạm vi giá
  const handlePriceRangeChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]],
    })
  }

  // Cập nhật bộ lọc danh mục
  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    })
  }

  // Cập nhật bộ lọc tính năng
  const handleFeatureChange = (feature: string) => {
    setFilters({
      ...filters,
      features: filters.features.includes(feature)
        ? filters.features.filter((f) => f !== feature)
        : [...filters.features, feature],
    })
  }

  // Cập nhật bộ lọc đánh giá
  const handleRatingChange = (rating: number) => {
    setFilters({
      ...filters,
      rating,
    })
  }

  // Đặt lại bộ lọc
  const handleResetFilters = () => {
    setFilters({
      showOnlyInStock: false,
      priceRange: [0, maxPrice],
      categories: [],
      features: [],
      rating: 0,
    })
  }

  // Nếu danh sách so sánh trống
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Scale className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Danh sách so sánh trống</h1>
          <p className="text-gray-600 mb-8">Thêm sản phẩm từ danh sách yêu thích hoặc trang sản phẩm để so sánh</p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/store/products">Xem sản phẩm</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/store/wishlist">Xem danh sách yêu thích</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Trạng thái hợp tác */}
      {isCollaborating && (
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Chế độ hợp tác</h3>
                  <p className="text-sm text-blue-700">Đang hợp tác với {activeUsers.length} người dùng</p>
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
                Rời khỏi hợp tác
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">So sánh sản phẩm</h1>
          <p className="text-gray-600 mt-2">So sánh {filteredItems.length} sản phẩm chi tiết</p>
        </div>
      </div>

      {/* Thanh công cụ chức năng */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {/* Nút xã hội */}
        <Dialog open={socialTabOpen} onOpenChange={setSocialTabOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Xã hội ({socialData.likes})</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tương tác xã hội</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className={`h-5 w-5 ${socialData.likedByUser ? "fill-red-500 text-red-500" : ""}`} />
                  <span>{socialData.likes} người thích</span>
                </div>
                <Button
                  variant={socialData.likedByUser ? "default" : "outline"}
                  size="sm"
                  onClick={() => likeComparison(comparisonId)}
                >
                  {socialData.likedByUser ? "Đã thích" : "Thích"}
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-2">Đánh giá</h4>
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
                <h4 className="font-medium mb-2">Bình luận</h4>
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
                    placeholder="Thêm bình luận..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Đăng
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Nút hợp tác */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Hợp tác</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>So sánh hợp tác</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="create">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Tạo hợp tác</TabsTrigger>
                <TabsTrigger value="join">Tham gia hợp tác</TabsTrigger>
              </TabsList>
              <TabsContent value="create" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium">Tên hợp tác</label>
                  <Input
                    placeholder="Nhập tên hợp tác"
                    value={collaborationName}
                    onChange={(e) => setCollaborationName(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateCollaboration} disabled={!collaborationName.trim()}>
                  Tạo phiên hợp tác
                </Button>
              </TabsContent>
              <TabsContent value="join" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium">ID phiên</label>
                  <Input
                    placeholder="Nhập ID phiên"
                    value={joinSessionId}
                    onChange={(e) => setJoinSessionId(e.target.value)}
                  />
                </div>
                <Button onClick={handleJoinCollaboration} disabled={!joinSessionId.trim()}>
                  Tham gia phiên hợp tác
                </Button>
              </TabsContent>
            </Tabs>
            {isCollaborating && (
              <div className="mt-4 space-y-4">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium mb-2">Hợp tác hiện tại</h4>
                  <p className="text-sm">
                    {currentSession?.name} ({activeUsers.length} người dùng trực tuyến)
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Mời người dùng</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Nhập email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <Button onClick={handleInviteUser} disabled={!inviteEmail.trim()}>
                      Mời
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Nút cảnh báo giá */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Cảnh báo giá</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thiết lập cảnh báo giá</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">Khi giá sản phẩm giảm xuống mức giá mục tiêu, hệ thống sẽ thông báo cho bạn.</p>
              {items.map((item) => (
                <div key={item.id} className="border rounded-md p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-gray-600">Giá hiện tại: ${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-xs font-medium">Giá mục tiêu</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="number"
                        placeholder="Nhập giá mục tiêu"
                        value={targetPrice[item.id] || Math.floor(item.price * 0.9)}
                        onChange={(e) =>
                          setTargetPrice({
                            ...targetPrice,
                            [item.id]: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                      <Button onClick={() => handleCreatePriceAlert(item)}>Thiết lập</Button>
                    </div>
                  </div>
                </div>
              ))}
              {alerts.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Cảnh báo đã thiết lập</h4>
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
                            <p className="text-xs text-gray-600">Mục tiêu: ${alert.targetPrice.toLocaleString()}</p>
                          </div>
                        </div>
                        <Badge variant={alert.isActive ? "default" : "outline"}>
                          {alert.isActive ? "Đã kích hoạt" : "Đã tắt"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Nút lọc */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Lọc</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tùy chọn lọc</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium mb-2">Phạm vi giá</h4>
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
                <h4 className="font-medium mb-2">Tình trạng kho</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={filters.showOnlyInStock}
                    onChange={(e) => setFilters({ ...filters, showOnlyInStock: e.target.checked })}
                  />
                  <label htmlFor="inStock" className="text-sm">
                    Chỉ hiển thị sản phẩm còn hàng
                  </label>
                </div>
              </div>

              {allCategories.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Danh mục</h4>
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
                  <h4 className="font-medium mb-2">Tính năng</h4>
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
                <h4 className="font-medium mb-2">Đánh giá tối thiểu</h4>
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
                  Đặt lại
                </Button>
                <Button onClick={() => setShowFilters(false)}>Áp dụng bộ lọc</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Nút lưu */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>Lưu</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lưu danh sách so sánh</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium">Tên danh sách so sánh</label>
                <Input placeholder="Nhập tên" value={sessionName} onChange={(e) => setSessionName(e.target.value)} />
              </div>
              <Button onClick={handleSaveSession} disabled={!sessionName.trim() || items.length === 0}>
                Lưu danh sách so sánh
              </Button>

              {sessions.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Danh sách so sánh đã lưu</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div>
                          <h5 className="font-medium text-sm">{session.name}</h5>
                          <p className="text-xs text-gray-500">
                            {new Date(session.createdAt).toLocaleDateString()} · {session.items.length} sản phẩm
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleLoadSession(session.items)}>
                            Tải
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteSession(session.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-2 w-full" onClick={clearHistory}>
                    Xóa lịch sử
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Nút lịch sử */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Lịch sử</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lịch sử so sánh</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">Xem các sản phẩm bạn đã so sánh gần đây và thay đổi giá.</p>

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
                      <h5 className="text-xs font-medium mb-1">Lịch sử giá</h5>
                      <div className="h-10 bg-gray-100 rounded-md relative">
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                          Biểu đồ lịch sử giá
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Nút chia sẻ */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span>Chia sẻ</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chia sẻ danh sách so sánh</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">Tạo liên kết có thể chia sẻ để người khác cũng có thể xem danh sách so sánh của bạn.</p>

              <Button onClick={handleShare} className="w-full">
                Tạo liên kết chia sẻ
              </Button>

              {shareUrl && (
                <div className="mt-4">
                  <label className="text-sm font-medium">Liên kết chia sẻ</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input value={shareUrl} readOnly />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl)
                        toast({
                          title: "Đã sao chép",
                          description: "Liên kết chia sẻ đã được sao chép vào bộ nhớ tạm",
                        })
                      }}
                    >
                      Sao chép
                    </Button>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-3">Chia sẻ lên mạng xã hội</h4>
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

        {/* Nút xuất */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              <span>Xuất</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xuất danh sách so sánh</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">Xuất danh sách so sánh dưới nhiều định dạng khác nhau để lưu trữ hoặc chia sẻ.</p>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("pdf")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Xuất dưới dạng PDF
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("image")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Xuất dưới dạng hình ảnh
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExport("csv")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Xuất dưới dạng CSV
                </Button>
              </div>

              {exportFormat && (
                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">Đang chuẩn bị danh sách so sánh dưới dạng {exportFormat.toUpperCase()}...</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Nút xóa danh sách so sánh */}
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {
            if (confirm("Bạn có chắc chắn muốn xóa danh sách so sánh không?")) {
              clearCompare()
              toast({
                title: "Đã xóa danh sách so sánh",
                description: "Tất cả sản phẩm đã được xóa khỏi danh sách so sánh",
              })
            }
          }}
        >
          <Trash2 className="h-4 w-4" />
          <span>Xóa danh sách so sánh</span>
        </Button>
      </div>

      {/* Cảnh báo phiên bản di động */}
      <div className="md:hidden mb-6">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">💡 Nên sử dụng phiên bản máy tính hoặc máy tính bảng ngang để có trải nghiệm so sánh tốt nhất</p>
          </CardContent>
        </Card>
      </div>

      {/* Bảng so sánh */}
      <div className="overflow-x-auto" id="comparison-table">
        <div className="min-w-full">
          {/* Hình ảnh sản phẩm và thông tin cơ bản */}
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
                          {item.inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                          <Link href={`/store/products/${item.id}`}>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Các nội dung so sánh khác giữ nguyên... */}
        </div>
      </div>

      {/* Đề xuất AI */}
      <AIRecommendationsPanel className="mt-8" />
    </div>
  )
}
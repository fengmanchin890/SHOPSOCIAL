"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  User,
  Package,
  Settings,
  LogOut,
  Eye,
  Edit,
  Save,
  X,
  Download,
  MessageCircle,
  HelpCircle,
  Bell,
  Shield,
  Globe,
  Key,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock user data
const mockUser = {
  id: "1",
  name: "王小明",
  email: "wang@example.com",
  phone: "0912-345-678",
  address: "台北市信義區信義路五段7號",
  joinDate: "2023-01-15",
}

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 3680,
    items: [
      { name: "經典牛仔外套", quantity: 1, price: 2980 },
      { name: "舒適棉質T恤", quantity: 1, price: 680 },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipping",
    total: 1680,
    items: [{ name: "優雅連身洋裝", quantity: 1, price: 1680 }],
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 4500,
    items: [{ name: "真皮手提包", quantity: 1, price: 4500 }],
  },
]

const statusMap = {
  processing: { label: "處理中", color: "bg-yellow-100 text-yellow-800" },
  shipping: { label: "配送中", color: "bg-blue-100 text-blue-800" },
  delivered: { label: "已送達", color: "bg-green-100 text-green-800" },
  cancelled: { label: "已取消", color: "bg-red-100 text-red-800" },
}

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "profile"
  const [activeTab, setActiveTab] = useState(defaultTab)

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(mockUser)

  // Settings dialogs state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showNotificationDialog, setShowNotificationDialog] = useState(false)
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false)
  const [showLanguageDialog, setShowLanguageDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [showFAQDialog, setShowFAQDialog] = useState(false)

  // Form states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [customerMessage, setCustomerMessage] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("zh-TW")

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
    orderUpdates: true,
    priceAlerts: true,
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showPurchaseHistory: false,
    allowDataCollection: true,
    shareWithPartners: false,
  })

  const handleSaveProfile = () => {
    // 模擬保存用戶資料
    alert("個人資料已更新！")
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedUser(mockUser)
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("新密碼與確認密碼不符！")
      return
    }
    if (newPassword.length < 6) {
      alert("密碼長度至少需要6個字符！")
      return
    }
    alert("密碼已成功更新！")
    setShowPasswordDialog(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleSaveNotifications = () => {
    alert("通知設定已保存！")
    setShowNotificationDialog(false)
  }

  const handleSavePrivacy = () => {
    alert("隱私設定已保存！")
    setShowPrivacyDialog(false)
  }

  const handleSaveLanguage = () => {
    alert(
      `語言已切換為 ${selectedLanguage === "zh-TW" ? "繁體中文" : selectedLanguage === "zh-CN" ? "簡體中文" : "英文"}！`,
    )
    setShowLanguageDialog(false)
  }

  const handleContactSupport = () => {
    if (customerMessage.trim()) {
      alert(`客服訊息已發送！\n訊息: ${customerMessage}\n客服將在24小時內回覆您。`)
      setShowContactDialog(false)
      setCustomerMessage("")
    }
  }

  const handleDownloadData = () => {
    // 模擬下載個人資料
    const userData = {
      profile: mockUser,
      orders: mockOrders,
      settings: { notifications, privacy },
      downloadDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `personal-data-${mockUser.id}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    alert("個人資料已下載到您的裝置！")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">會員中心</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            個人資料
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            訂單記錄
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            帳戶設定
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>基本資料</CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      編輯
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        取消
                      </Button>
                      <Button size="sm" onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        保存
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditing ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-600">姓名</label>
                      <p className="text-gray-900">{mockUser.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">電子郵件</label>
                      <p className="text-gray-900">{mockUser.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">電話</label>
                      <p className="text-gray-900">{mockUser.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">地址</label>
                      <p className="text-gray-900">{mockUser.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">加入日期</label>
                      <p className="text-gray-900">{mockUser.joinDate}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="name">姓名</Label>
                      <Input
                        id="name"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">電子郵件</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">電話</Label>
                      <Input
                        id="phone"
                        value={editedUser.phone}
                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">地址</Label>
                      <Input
                        id="address"
                        value={editedUser.address}
                        onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>會員統計</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{mockOrders.length}</p>
                    <p className="text-sm text-gray-600">總訂單數</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      ${mockOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">總消費金額</p>
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-lg font-semibold text-purple-600">一般會員</p>
                  <p className="text-sm text-gray-600">再消費 $2,000 升級為 VIP 會員</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>訂單記錄</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">訂單 #{order.id}</h3>
                        <p className="text-sm text-gray-600">下單日期: {order.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={statusMap[order.status as keyof typeof statusMap].color}>
                          {statusMap[order.status as keyof typeof statusMap].label}
                        </Badge>
                        <p className="text-lg font-semibold text-gray-900 mt-1">${order.total.toLocaleString()}</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>${item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/store/user/orders/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          查看詳情
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>帳戶設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Change Password */}
                <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Key className="h-4 w-4 mr-2" />
                      修改密碼
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>修改密碼</DialogTitle>
                      <DialogDescription>請輸入您的當前密碼和新密碼</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">當前密碼</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">新密碼</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">確認新密碼</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                        取消
                      </Button>
                      <Button onClick={handleChangePassword}>更新密碼</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Notification Settings */}
                <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      通知設定
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>通知設定</DialogTitle>
                      <DialogDescription>管理您的通知偏好</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">電子郵件通知</Label>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-notifications">簡訊通知</Label>
                        <Switch
                          id="sms-notifications"
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications">推播通知</Label>
                        <Switch
                          id="push-notifications"
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-notifications">行銷通知</Label>
                        <Switch
                          id="marketing-notifications"
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="order-notifications">訂單更新</Label>
                        <Switch
                          id="order-notifications"
                          checked={notifications.orderUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="price-notifications">價格提醒</Label>
                        <Switch
                          id="price-notifications"
                          checked={notifications.priceAlerts}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>
                        取消
                      </Button>
                      <Button onClick={handleSaveNotifications}>保存設定</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Privacy Settings */}
                <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      隱私設定
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>隱私設定</DialogTitle>
                      <DialogDescription>管理您的隱私偏好</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="profile-visible">公開個人檔案</Label>
                        <Switch
                          id="profile-visible"
                          checked={privacy.profileVisible}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="purchase-history">顯示購買記錄</Label>
                        <Switch
                          id="purchase-history"
                          checked={privacy.showPurchaseHistory}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, showPurchaseHistory: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-collection">允許數據收集</Label>
                        <Switch
                          id="data-collection"
                          checked={privacy.allowDataCollection}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, allowDataCollection: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="share-partners">與合作夥伴分享</Label>
                        <Switch
                          id="share-partners"
                          checked={privacy.shareWithPartners}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, shareWithPartners: checked })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowPrivacyDialog(false)}>
                        取消
                      </Button>
                      <Button onClick={handleSavePrivacy}>保存設定</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Language Settings */}
                <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      語言設定
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>語言設定</DialogTitle>
                      <DialogDescription>選擇您偏好的語言</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="language">選擇語言</Label>
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zh-TW">繁體中文</SelectItem>
                            <SelectItem value="zh-CN">簡體中文</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ja">日本語</SelectItem>
                            <SelectItem value="ko">한국어</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowLanguageDialog(false)}>
                        取消
                      </Button>
                      <Button onClick={handleSaveLanguage}>保存設定</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>其他操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Download Personal Data */}
                <Button variant="outline" className="w-full justify-start" onClick={handleDownloadData}>
                  <Download className="h-4 w-4 mr-2" />
                  下載個人資料
                </Button>

                {/* Contact Support */}
                <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      聯繫客服
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>聯繫客服</DialogTitle>
                      <DialogDescription>有任何問題嗎？請告訴我們，我們會盡快回覆您。</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="customerMessage">您的訊息</Label>
                        <Textarea
                          id="customerMessage"
                          placeholder="請描述您的問題或需求..."
                          value={customerMessage}
                          onChange={(e) => setCustomerMessage(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>• 客服時間：週一至週五 9:00-18:00</p>
                        <p>• 預計回覆時間：24小時內</p>
                        <p>• 緊急問題請撥打：02-1234-5678</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowContactDialog(false)}>
                        取消
                      </Button>
                      <Button onClick={handleContactSupport} disabled={!customerMessage.trim()}>
                        發送訊息
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* FAQ */}
                <Dialog open={showFAQDialog} onOpenChange={setShowFAQDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      常見問題
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>常見問題</DialogTitle>
                      <DialogDescription>以下是一些常見問題的解答</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      <div>
                        <h4 className="font-semibold">如何修改訂單？</h4>
                        <p className="text-sm text-gray-600">訂單確認後30分鐘內可以修改，請聯繫客服協助處理。</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold">退換貨政策是什麼？</h4>
                        <p className="text-sm text-gray-600">商品到貨後7天內可申請退換貨，商品需保持原狀且包裝完整。</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold">如何追蹤我的訂單？</h4>
                        <p className="text-sm text-gray-600">
                          您可以在「訂單記錄」中查看訂單狀態，或使用追蹤編號在物流網站查詢。
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold">忘記密碼怎麼辦？</h4>
                        <p className="text-sm text-gray-600">
                          點擊登入頁面的「忘記密碼」，輸入您的電子郵件地址即可重設密碼。
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold">如何成為VIP會員？</h4>
                        <p className="text-sm text-gray-600">累計消費滿$10,000即可自動升級為VIP會員，享受更多優惠。</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setShowFAQDialog(false)}>關閉</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Separator />
                <Button variant="destructive" className="w-full justify-start">
                  <LogOut className="h-4 w-4 mr-2" />
                  登出帳戶
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

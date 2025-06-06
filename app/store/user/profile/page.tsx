"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
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
import { useI18n } from "@/contexts/i18n-context"
import { toast } from "@/hooks/use-toast"
import { LogoutButton } from "@/components/store/LogoutButton"

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "profile"
  const [activeTab, setActiveTab] = useState(defaultTab)
  const { t } = useI18n()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

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
  const [selectedLanguage, setSelectedLanguage] = useState("vi-VN")

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

  // Prevent hydration mismatch by only rendering after client mount
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Check login status and load user data
  useEffect(() => {
    if (!hasMounted) return

    const authStatus = localStorage.getItem("lifeTradeAuth")
    if (authStatus === "authenticated") {
      setIsLoggedIn(true)
      
      // Load user data
      const userDataStr = localStorage.getItem("lifeTradeUser")
      if (userDataStr) {
        const parsedUserData = JSON.parse(userDataStr)
        setUserData(parsedUserData)
        setEditedUser({
          name: parsedUserData.fullName || "",
          email: parsedUserData.email || "",
          phone: parsedUserData.phoneNumber || "",
          address: parsedUserData.address || "",
        })
      }
    } else {
      router.push("/store/login")
    }
  }, [router, hasMounted])

  // Don't render anything until component has mounted on client
  if (!hasMounted) {
    return null
  }

  const handleSaveProfile = () => {
    // Update user data in localStorage
    if (userData) {
      const updatedUserData = {
        ...userData,
        fullName: editedUser.name,
        email: editedUser.email,
        phoneNumber: editedUser.phone,
        address: editedUser.address,
      }
      
      localStorage.setItem("lifeTradeUser", JSON.stringify(updatedUserData))
      setUserData(updatedUserData)
    }
    
    toast({
      title: "Thông tin cá nhân đã được cập nhật!",
      description: "Thông tin của bạn đã được lưu thành công.",
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    if (userData) {
      setEditedUser({
        name: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phoneNumber || "",
        address: userData.address || "",
      })
    }
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Mật khẩu mới và xác nhận mật khẩu không khớp!",
        description: "Vui lòng kiểm tra lại mật khẩu mới và xác nhận mật khẩu.",
        variant: "destructive",
      })
      return
    }
    if (newPassword.length < 6) {
      toast({
        title: "Mật khẩu phải có ít nhất 6 ký tự!",
        description: "Vui lòng chọn mật khẩu dài hơn để đảm bảo an toàn.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Mật khẩu đã được cập nhật thành công!",
      description: "Mật khẩu mới của bạn đã được thiết lập.",
    })
    setShowPasswordDialog(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Cài đặt thông báo đã được lưu!",
      description: "Tùy chọn thông báo của bạn đã được cập nhật.",
    })
    setShowNotificationDialog(false)
  }

  const handleSavePrivacy = () => {
    toast({
      title: "Cài đặt quyền riêng tư đã được lưu!",
      description: "Tùy chọn quyền riêng tư của bạn đã được cập nhật.",
    })
    setShowPrivacyDialog(false)
  }

  const handleSaveLanguage = () => {
    toast({
      title: "Ngôn ngữ đã được thay đổi!",
      description: `Ngôn ngữ đã được chuyển sang ${selectedLanguage === "vi-VN" ? "Tiếng Việt" : selectedLanguage === "zh-CN" ? "Tiếng Trung Giản thể" : "Tiếng Anh"}!`,
    })
    setShowLanguageDialog(false)
  }

  const handleContactSupport = () => {
    if (customerMessage.trim()) {
      toast({
        title: "Đã gửi tin nhắn hỗ trợ!",
        description: `Tin nhắn của bạn đã được gửi. Bộ phận hỗ trợ sẽ phản hồi trong vòng 24 giờ.`,
      })
      setShowContactDialog(false)
      setCustomerMessage("")
    }
  }

  const handleDownloadData = () => {
    // Create user data object for download
    const userData = {
      profile: {
        name: editedUser.name,
        email: editedUser.email,
        phone: editedUser.phone,
        address: editedUser.address,
        joinDate: new Date().toISOString(),
      },
      orders: [],
      settings: { notifications, privacy },
      downloadDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `personal-data-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Dữ liệu cá nhân đã được tải về!",
      description: "Tệp dữ liệu cá nhân đã được tải về thiết bị của bạn.",
    })
  }

  if (!isLoggedIn || !userData) {
    return null // Will redirect to login page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("profile.title")}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {t("profile.info")}
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            {t("profile.orders")}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            {t("profile.settings")}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("profile.basicInfo")}</CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      {t("profile.edit")}
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        {t("profile.cancel")}
                      </Button>
                      <Button size="sm" onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        {t("profile.save")}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditing ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("profile.name")}</label>
                      <p className="text-gray-900">{userData.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("profile.email")}</label>
                      <p className="text-gray-900">{userData.email || "-"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("profile.phone")}</label>
                      <p className="text-gray-900">{userData.phoneNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("profile.address")}</label>
                      <p className="text-gray-900">{userData.address || "-"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t("profile.joinDate")}</label>
                      <p className="text-gray-900">{new Date(userData.joinDate).toLocaleDateString()}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="name">{t("profile.name")}</Label>
                      <Input
                        id="name"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("profile.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t("profile.phone")}</Label>
                      <Input
                        id="phone"
                        value={editedUser.phone}
                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">{t("profile.address")}</Label>
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
                <CardTitle>{t("profile.stats")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">3</p>
                    <p className="text-sm text-gray-600">{t("profile.totalOrders")}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">$9,860</p>
                    <p className="text-sm text-gray-600">{t("profile.totalSpent")}</p>
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-lg font-semibold text-purple-600">Thành viên thường</p>
                  <p className="text-sm text-gray-600">Chi tiêu thêm $2,000 để nâng cấp lên thành viên VIP</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.orders")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
                <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào trong lịch sử</p>
                <Button asChild>
                  <Link href="/store/products">Bắt đầu mua sắm</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.settings")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Change Password */}
                <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Key className="h-4 w-4 mr-2" />
                      Đổi mật khẩu
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Đổi mật khẩu</DialogTitle>
                      <DialogDescription>Vui lòng nhập mật khẩu hiện tại và mật khẩu mới</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">Mật khẩu mới</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
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
                        Hủy
                      </Button>
                      <Button onClick={handleChangePassword}>Cập nhật mật khẩu</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Notification Settings */}
                <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Cài đặt thông báo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cài đặt thông báo</DialogTitle>
                      <DialogDescription>Quản lý tùy chọn thông báo của bạn</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">Thông báo qua email</Label>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-notifications">Thông báo qua SMS</Label>
                        <Switch
                          id="sms-notifications"
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications">Thông báo đẩy</Label>
                        <Switch
                          id="push-notifications"
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-notifications">Thông báo tiếp thị</Label>
                        <Switch
                          id="marketing-notifications"
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="order-notifications">Cập nhật đơn hàng</Label>
                        <Switch
                          id="order-notifications"
                          checked={notifications.orderUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="price-notifications">Thông báo giá</Label>
                        <Switch
                          id="price-notifications"
                          checked={notifications.priceAlerts}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleSaveNotifications}>Lưu cài đặt</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Privacy Settings */}
                <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Cài đặt quyền riêng tư
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cài đặt quyền riêng tư</DialogTitle>
                      <DialogDescription>Quản lý tùy chọn quyền riêng tư của bạn</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="profile-visible">Hồ sơ công khai</Label>
                        <Switch
                          id="profile-visible"
                          checked={privacy.profileVisible}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="purchase-history">Hiển thị lịch sử mua hàng</Label>
                        <Switch
                          id="purchase-history"
                          checked={privacy.showPurchaseHistory}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, showPurchaseHistory: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-collection">Cho phép thu thập dữ liệu</Label>
                        <Switch
                          id="data-collection"
                          checked={privacy.allowDataCollection}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, allowDataCollection: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="share-partners">Chia sẻ với đối tác</Label>
                        <Switch
                          id="share-partners"
                          checked={privacy.shareWithPartners}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, shareWithPartners: checked })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowPrivacyDialog(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleSavePrivacy}>Lưu cài đặt</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Language Settings */}
                <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Cài đặt ngôn ngữ
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cài đặt ngôn ngữ</DialogTitle>
                      <DialogDescription>Chọn ngôn ngữ ưa thích của bạn</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="language">Chọn ngôn ngữ</Label>
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vi-VN">Tiếng Việt</SelectItem>
                            <SelectItem value="zh-CN">Tiếng Trung Giản thể</SelectItem>
                            <SelectItem value="en">Tiếng Anh</SelectItem>
                            <SelectItem value="ja">Tiếng Nhật</SelectItem>
                            <SelectItem value="ko">Tiếng Hàn</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowLanguageDialog(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleSaveLanguage}>Lưu cài đặt</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thao tác khác</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Download Personal Data */}
                <Button variant="outline" className="w-full justify-start" onClick={handleDownloadData}>
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống dữ liệu cá nhân
                </Button>

                {/* Contact Support */}
                <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Liên hệ hỗ trợ
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Liên hệ hỗ trợ</DialogTitle>
                      <DialogDescription>Bạn có vấn đề gì? Hãy cho chúng tôi biết, chúng tôi sẽ phản hồi sớm nhất có thể.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="customerMessage">Tin nhắn của bạn</Label>
                        <Textarea
                          id="customerMessage"
                          placeholder="Vui lòng mô tả vấn đề hoặc yêu cầu của bạn..."
                          value={customerMessage}
                          onChange={(e) => setCustomerMessage(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>• Giờ hỗ trợ: Thứ Hai đến Thứ Sáu 9:00-18:00</p>
                        <p>• Thời gian phản hồi dự kiến: trong vòng 24 giờ</p>
                        <p>• Đối với vấn đề khẩn cấp, vui lòng gọi: 028-1234-5678</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowContactDialog(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleContactSupport} disabled={!customerMessage.trim()}>
                        Gửi tin nhắn
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* FAQ */}
                <Dialog open={showFAQDialog} onOpenChange={setShowFAQDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Câu hỏi thường gặp
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Câu hỏi thường gặp</DialogTitle>
                      <DialogDescription>Dưới đây là một số câu trả lời cho các câu hỏi thường gặp</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      <div>
                        <h4 className="font-semibold">Làm thế nào để sửa đổi đơn hàng?</h4>
                        <p className="text-sm text-gray-600">Đơn hàng có thể được sửa đổi trong vòng 30 phút sau khi xác nhận, vui lòng liên hệ bộ phận hỗ trợ để được hỗ trợ.</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold">Chính sách đổi trả hàng là gì?</h4>
                        <p className="text-sm text-gray-600">Sản phẩm có thể được đổi trả trong vòng 7 ngày sau khi nhận hàng, sản phẩm phải còn nguyên trạng và đầy đủ bao bì.</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold">Làm thế nào để theo dõi đơn hàng?</h4>
                        <p className="text-sm text-gray-600">
                          Bạn có thể xem trạng thái đơn hàng trong phần "Lịch sử đơn hàng" hoặc sử dụng mã vận đơn để tra cứu trên trang web của đơn vị vận chuyển.
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold">Tôi quên mật khẩu thì phải làm sao?</h4>
                        <p className="text-sm text-gray-600">
                          Nhấp vào "Quên mật khẩu" trên trang đăng nhập, nhập địa chỉ email của bạn để đặt lại mật khẩu.
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold">Làm thế nào để trở thành thành viên VIP?</h4>
                        <p className="text-sm text-gray-600">Tích lũy chi tiêu đạt $10,000 sẽ tự động nâng cấp lên thành viên VIP, được hưởng nhiều ưu đãi hơn.</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setShowFAQDialog(false)}>Đóng</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Separator />
                
                {/* Logout Button */}
                <LogoutButton className="w-full justify-start" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
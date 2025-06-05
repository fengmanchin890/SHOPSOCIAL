"use client"

import { useState, useEffect } from "react"
import { Download, Bell, Wifi, WifiOff, Smartphone, Share, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useMobileApp } from "./MobileAppProvider"

export function MobileAppFeatures() {
  const {
    appState,
    installApp,
    sendPushNotification,
    markNotificationAsRead,
    clearAllNotifications,
    shareContent,
    addToHomeScreen,
    requestNotificationPermission,
    checkForUpdates,
  } = useMobileApp()

  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [offlineMode, setOfflineMode] = useState(false)

  useEffect(() => {
    // 檢查通知權限
    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted")
    }
  }, [])

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermission()
      setNotificationsEnabled(granted)
      if (granted) {
        sendPushNotification({
          title: "通知已啟用",
          body: "您將收到重要的購物提醒和優惠通知",
          icon: "/icon-192x192.png",
        })
      }
    } else {
      setNotificationsEnabled(false)
    }
  }

  const handleShare = () => {
    shareContent({
      title: "ShopLogo - 智能購物平台",
      text: "發現最新的購物體驗，AI 推薦、語音搜索、即時比較！",
      url: window.location.origin,
    })
  }

  const handleTestNotification = () => {
    sendPushNotification({
      title: "測試通知",
      body: "這是一個測試通知，確認推送功能正常運作",
      icon: "/icon-192x192.png",
    })
  }

  return (
    <div className="space-y-6">
      {/* PWA 安裝提示 */}
      {!appState.isInstalled && (
        <Alert>
          <Download className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>安裝應用程式以獲得更好的體驗</span>
            <Button onClick={installApp} size="sm">
              安裝應用
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* 更新提示 */}
      {appState.updateAvailable && (
        <Alert>
          <RefreshCw className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>有新版本可用</span>
            <Button onClick={checkForUpdates} size="sm">
              更新應用
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* 網路狀態 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {appState.isOnline ? (
              <Wifi className="h-5 w-5 text-green-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-600" />
            )}
            <span>網路狀態</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{appState.isOnline ? "已連接" : "離線模式"}</p>
              <p className="text-sm text-gray-600">
                {appState.isOnline ? "所有功能正常運作" : "使用緩存數據，部分功能受限"}
              </p>
            </div>
            <Badge variant={appState.isOnline ? "default" : "secondary"}>{appState.isOnline ? "在線" : "離線"}</Badge>
          </div>
          {!appState.isOnline && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">💡 離線模式下您仍可瀏覽已緩存的商品和收藏清單</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 應用設置 */}
      <Card>
        <CardHeader>
          <CardTitle>應用設置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 推送通知 */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">推送通知</Label>
              <p className="text-sm text-gray-600">接收優惠和重要更新</p>
            </div>
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
          </div>

          {/* 離線模式 */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="offline">離線模式</Label>
              <p className="text-sm text-gray-600">緩存數據以供離線使用</p>
            </div>
            <Switch id="offline" checked={offlineMode} onCheckedChange={setOfflineMode} />
          </div>

          {/* 測試功能 */}
          <div className="space-y-3">
            <Label>測試功能</Label>
            <div className="flex space-x-2">
              <Button onClick={handleTestNotification} variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                測試通知
              </Button>
              <Button onClick={handleShare} variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                分享應用
              </Button>
              <Button onClick={addToHomeScreen} variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                添加到主畫面
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 通知歷史 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>通知歷史</span>
            <div className="flex space-x-2">
              <Badge variant="secondary">{appState.notifications.filter((n) => !n.read).length} 未讀</Badge>
              <Button onClick={clearAllNotifications} variant="outline" size="sm">
                清空全部
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appState.notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">暫無通知</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {appState.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.body}</p>
                      <p className="text-xs text-gray-500 mt-2">{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 應用信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>應用信息</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">版本</span>
              <span className="text-sm font-medium">{appState.appVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">安裝狀態</span>
              <Badge variant={appState.isInstalled ? "default" : "secondary"}>
                {appState.isInstalled ? "已安裝" : "瀏覽器版本"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">離線數據</span>
              <span className="text-sm font-medium">{new Date(appState.offlineData.lastSync).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">緩存大小</span>
              <span className="text-sm font-medium">2.3 MB</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

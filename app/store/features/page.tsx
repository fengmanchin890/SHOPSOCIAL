"use client"

import { useState } from "react"
import { Wallet, Glasses, Wifi, Trophy, Globe, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useBlockchain } from "@/components/store/BlockchainProvider"
import { useARVR } from "@/components/store/ARVRProvider"
import { useIoT } from "@/components/store/IoTProvider"
import { useGamification } from "@/components/store/GamificationProvider"
import { useMultiLanguage } from "@/components/store/MultiLanguageProvider"

export default function FeaturesPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const { connectWallet, isWalletConnected, nftProducts } = useBlockchain()
  const { startARSession, isARSupported, startVRSession, isVRSupported } = useARVR()
  const { devices, connectDevice } = useIoT()
  const { userLevel, achievements, earnXP } = useGamification()
  const { changeLanguage, availableLanguages, currentLanguage } = useMultiLanguage()

  const handleARDemo = async () => {
    setActiveDemo("ar")
    const success = await startARSession("try-on", "1")
    if (success) {
      earnXP(50, "AR試穿體驗")
    }
  }

  const handleVRDemo = async () => {
    setActiveDemo("vr")
    const success = await startVRSession("showroom")
    if (success) {
      earnXP(75, "VR展廳體驗")
    }
  }

  const handleWalletConnect = async () => {
    const success = await connectWallet("metamask")
    if (success) {
      earnXP(100, "連接區塊鏈錢包")
    }
  }

  const handleIoTConnect = async () => {
    const success = await connectDevice("smart_mirror", {
      name: "智能魔鏡",
      brand: "HiMirror",
      location: "臥室",
    })
    if (success) {
      earnXP(80, "連接IoT設備")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 未來購物體驗</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          體驗最前沿的購物技術：區塊鏈支付、AR/VR試穿、IoT智能整合、遊戲化系統和多語言支持
        </p>
      </div>

      {/* 功能概覽 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Wallet className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle>區塊鏈整合</CardTitle>
                <Badge variant={isWalletConnected ? "default" : "secondary"}>
                  {isWalletConnected ? "已連接" : "未連接"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">支援加密貨幣支付、NFT商品和智能合約</p>
            <Button onClick={handleWalletConnect} disabled={isWalletConnected} className="w-full">
              {isWalletConnected ? "錢包已連接" : "連接錢包"}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Glasses className="h-8 w-8 text-purple-600" />
              <div>
                <CardTitle>AR/VR 購物</CardTitle>
                <Badge variant={isARSupported ? "default" : "secondary"}>{isARSupported ? "支援" : "不支援"}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">虛擬試穿、3D商品預覽和沉浸式購物體驗</p>
            <div className="space-y-2">
              <Button onClick={handleARDemo} disabled={!isARSupported} className="w-full">
                啟動 AR 試穿
              </Button>
              <Button onClick={handleVRDemo} disabled={!isVRSupported} variant="outline" className="w-full">
                進入 VR 展廳
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Wifi className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle>IoT 智能整合</CardTitle>
                <Badge variant="secondary">{devices.length} 設備</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">連接智能家居設備，實現自動化購物體驗</p>
            <Button onClick={handleIoTConnect} className="w-full">
              連接 IoT 設備
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <CardTitle>遊戲化系統</CardTitle>
                <Badge variant="default">等級 {userLevel.level}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">積分獎勵、成就系統和排行榜競爭</p>
            <div className="text-sm text-gray-600 mb-2">
              經驗值: {userLevel.xp}/{userLevel.xpToNext}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full"
                style={{ width: `${(userLevel.xp / userLevel.xpToNext) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-indigo-600" />
              <div>
                <CardTitle>多語言支持</CardTitle>
                <Badge variant="outline">{currentLanguage.nativeName}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">支援多種語言和地區本地化</p>
            <select
              className="w-full p-2 border rounded"
              value={currentLanguage.code}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      {/* 詳細功能展示 */}
      <Tabs defaultValue="blockchain" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="blockchain">區塊鏈</TabsTrigger>
          <TabsTrigger value="arvr">AR/VR</TabsTrigger>
          <TabsTrigger value="iot">IoT</TabsTrigger>
          <TabsTrigger value="gamification">遊戲化</TabsTrigger>
          <TabsTrigger value="multilang">多語言</TabsTrigger>
        </TabsList>

        <TabsContent value="blockchain" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wallet className="h-6 w-6" />
                <span>區塊鏈整合功能</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🔐 加密錢包支持</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• MetaMask 錢包整合</li>
                    <li>• WalletConnect 支援</li>
                    <li>• 多種加密貨幣支付</li>
                    <li>• 安全的交易處理</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🎨 NFT 商品市場</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 數位時尚 NFT</li>
                    <li>• 虛擬收藏品</li>
                    <li>• 智能合約驗證</li>
                    <li>• 所有權證明</li>
                  </ul>
                </div>
              </div>

              {nftProducts.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">🌟 精選 NFT 商品</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {nftProducts.slice(0, 2).map((nft) => (
                      <Card key={nft.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                              NFT
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{nft.name}</h4>
                              <p className="text-sm text-gray-600">{nft.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="outline">{nft.price} ETH</Badge>
                                {nft.verified && <Badge variant="default">✓ 已驗證</Badge>}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arvr" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Glasses className="h-6 w-6" />
                <span>AR/VR 購物體驗</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">📱 AR 試穿功能</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src="/images/ar-tryOn-demo.png"
                      alt="AR試穿演示"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 即時虛擬試穿</li>
                    <li>• 3D 商品預覽</li>
                    <li>• 拍照分享功能</li>
                    <li>• 多種濾鏡效果</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🥽 VR 虛擬展廳</h3>
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Glasses className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-semibold">沉浸式購物體驗</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 360° 虛擬展廳</li>
                    <li>• 互動式商品展示</li>
                    <li>• 虛擬購物助手</li>
                    <li>• 社交購物體驗</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-6 w-6" />
                <span>IoT 智能整合</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🏠 智能家居</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 智能冰箱庫存追蹤</li>
                    <li>• 智能音箱語音購物</li>
                    <li>• 智能魔鏡試穿</li>
                    <li>• 自動補貨系統</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🌡️ 環境感知</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 溫濕度監測</li>
                    <li>• 光線感應調節</li>
                    <li>• 空氣品質檢測</li>
                    <li>• 個性化推薦</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🔄 自動化</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 使用量追蹤</li>
                    <li>• 智能補貨提醒</li>
                    <li>• 預測性訂購</li>
                    <li>• 節能優化</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">📱 已連接設備</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {devices.map((device) => (
                    <Card key={device.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{device.name}</h4>
                          <Badge variant={device.status === "online" ? "default" : "secondary"}>
                            {device.status === "online" ? "在線" : "離線"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {device.brand} • {device.location}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {device.capabilities.slice(0, 2).map((capability) => (
                            <Badge key={capability} variant="outline" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gamification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-6 w-6" />
                <span>遊戲化系統</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🏆 等級系統</h3>
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{userLevel.icon}</div>
                      <div>
                        <h4 className="font-bold">等級 {userLevel.level}</h4>
                        <p className="text-sm opacity-90">{userLevel.title}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>經驗值</span>
                        <span>
                          {userLevel.xp}/{userLevel.xpToNext}
                        </span>
                      </div>
                      <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                        <div
                          className="bg-white h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(userLevel.xp / userLevel.xpToNext) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">會員權益</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {userLevel.benefits.map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🎖️ 成就系統</h3>
                  <div className="space-y-3">
                    {achievements.slice(0, 4).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          {achievement.progress !== undefined && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>進度</span>
                                <span>
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div
                                  className="bg-blue-600 h-1 rounded-full"
                                  style={{ width: `${(achievement.progress! / achievement.maxProgress!) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                            {achievement.unlocked ? "已解鎖" : "未解鎖"}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{achievement.points} 積分</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multilang" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-6 w-6" />
                <span>多語言與本地化</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🌍 支援語言</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {availableLanguages.map((lang) => (
                      <div
                        key={lang.code}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          currentLanguage.code === lang.code ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                        }`}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{lang.flag}</span>
                          <div>
                            <p className="font-medium text-sm">{lang.nativeName}</p>
                            <p className="text-xs text-gray-600">{lang.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">💱 本地化功能</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">貨幣</Badge>
                      <span>自動貨幣轉換和格式化</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">日期</Badge>
                      <span>本地化日期時間格式</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">數字</Badge>
                      <span>地區數字格式顯示</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">文化</Badge>
                      <span>符合當地文化的界面設計</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">RTL</Badge>
                      <span>支援右到左文字方向</span>
                    </li>
                  </ul>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">當前設定</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>語言:</span>
                        <span>{currentLanguage.nativeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>方向:</span>
                        <span>{currentLanguage.rtl ? "右到左" : "左到右"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 演示區域 */}
      {activeDemo && (
        <Dialog open={!!activeDemo} onOpenChange={() => setActiveDemo(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {activeDemo === "ar" && "AR 試穿演示"}
                {activeDemo === "vr" && "VR 展廳演示"}
              </DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg flex items-center justify-center text-white">
              <div className="text-center">
                {activeDemo === "ar" && (
                  <>
                    <Camera className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">AR 試穿體驗</h3>
                    <p>正在啟動相機和 AR 引擎...</p>
                  </>
                )}
                {activeDemo === "vr" && (
                  <>
                    <Glasses className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">VR 虛擬展廳</h3>
                    <p>正在載入 3D 環境...</p>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

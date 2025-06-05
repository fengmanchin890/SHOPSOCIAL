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
      earnXP(50, "Trải nghiệm thử đồ AR")
    }
  }

  const handleVRDemo = async () => {
    setActiveDemo("vr")
    const success = await startVRSession("showroom")
    if (success) {
      earnXP(75, "Trải nghiệm phòng trưng bày VR")
    }
  }

  const handleWalletConnect = async () => {
    const success = await connectWallet("metamask")
    if (success) {
      earnXP(100, "Kết nối ví blockchain")
    }
  }

  const handleIoTConnect = async () => {
    const success = await connectDevice("smart_mirror", {
      name: "Gương thông minh",
      brand: "HiMirror",
      location: "Phòng ngủ",
    })
    if (success) {
      earnXP(80, "Kết nối thiết bị IoT")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 Trải nghiệm mua sắm tương lai</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Trải nghiệm công nghệ mua sắm tiên tiến nhất: thanh toán blockchain, thử đồ AR/VR, tích hợp IoT thông minh, hệ thống gamification và hỗ trợ đa ngôn ngữ
        </p>
      </div>

      {/* Tổng quan tính năng */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Wallet className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle>Tích hợp Blockchain</CardTitle>
                <Badge variant={isWalletConnected ? "default" : "secondary"}>
                  {isWalletConnected ? "Đã kết nối" : "Chưa kết nối"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Hỗ trợ thanh toán tiền điện tử, sản phẩm NFT và hợp đồng thông minh</p>
            <Button onClick={handleWalletConnect} disabled={isWalletConnected} className="w-full">
              {isWalletConnected ? "Ví đã kết nối" : "Kết nối ví"}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Glasses className="h-8 w-8 text-purple-600" />
              <div>
                <CardTitle>Mua sắm AR/VR</CardTitle>
                <Badge variant={isARSupported ? "default" : "secondary"}>{isARSupported ? "Hỗ trợ" : "Không hỗ trợ"}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Thử đồ ảo, xem trước sản phẩm 3D và trải nghiệm mua sắm đắm chìm</p>
            <div className="space-y-2">
              <Button onClick={handleARDemo} disabled={!isARSupported} className="w-full">
                Bắt đầu thử đồ AR
              </Button>
              <Button onClick={handleVRDemo} disabled={!isVRSupported} variant="outline" className="w-full">
                Vào phòng trưng bày VR
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Wifi className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle>Tích hợp IoT thông minh</CardTitle>
                <Badge variant="secondary">{devices.length} thiết bị</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Kết nối thiết bị nhà thông minh, tạo trải nghiệm mua sắm tự động</p>
            <Button onClick={handleIoTConnect} className="w-full">
              Kết nối thiết bị IoT
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <CardTitle>Hệ thống Gamification</CardTitle>
                <Badge variant="default">Cấp độ {userLevel.level}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Phần thưởng điểm, hệ thống thành tích và bảng xếp hạng cạnh tranh</p>
            <div className="text-sm text-gray-600 mb-2">
              Điểm kinh nghiệm: {userLevel.xp}/{userLevel.xpToNext}
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
                <CardTitle>Hỗ trợ đa ngôn ngữ</CardTitle>
                <Badge variant="outline">{currentLanguage.nativeName}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Hỗ trợ nhiều ngôn ngữ và bản địa hóa khu vực</p>
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

      {/* Hiển thị tính năng chi tiết */}
      <Tabs defaultValue="blockchain" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="arvr">AR/VR</TabsTrigger>
          <TabsTrigger value="iot">IoT</TabsTrigger>
          <TabsTrigger value="gamification">Gamification</TabsTrigger>
          <TabsTrigger value="multilang">Đa ngôn ngữ</TabsTrigger>
        </TabsList>

        <TabsContent value="blockchain" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wallet className="h-6 w-6" />
                <span>Tính năng tích hợp Blockchain</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🔐 Hỗ trợ ví tiền điện tử</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Tích hợp ví MetaMask</li>
                    <li>• Hỗ trợ WalletConnect</li>
                    <li>• Thanh toán bằng nhiều loại tiền điện tử</li>
                    <li>• Xử lý giao dịch an toàn</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🎨 Thị trường sản phẩm NFT</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• NFT thời trang kỹ thuật số</li>
                    <li>• Bộ sưu tập ảo</li>
                    <li>• Xác minh hợp đồng thông minh</li>
                    <li>• Chứng minh quyền sở hữu</li>
                  </ul>
                </div>
              </div>

              {nftProducts.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">🌟 Sản phẩm NFT nổi bật</h3>
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
                                {nft.verified && <Badge variant="default">✓ Đã xác minh</Badge>}
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
                <span>Trải nghiệm mua sắm AR/VR</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">📱 Tính năng thử đồ AR</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src="/images/ar-tryOn-demo.png"
                      alt="Demo thử đồ AR"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Thử đồ ảo thời gian thực</li>
                    <li>• Xem trước sản phẩm 3D</li>
                    <li>• Chức năng chụp ảnh chia sẻ</li>
                    <li>• Nhiều hiệu ứng bộ lọc</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🥽 Phòng trưng bày ảo VR</h3>
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Glasses className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-semibold">Trải nghiệm mua sắm đắm chìm</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Phòng trưng bày ảo 360°</li>
                    <li>• Trưng bày sản phẩm tương tác</li>
                    <li>• Trợ lý mua sắm ảo</li>
                    <li>• Trải nghiệm mua sắm xã hội</li>
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
                <span>Tích hợp IoT thông minh</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🏠 Nhà thông minh</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Theo dõi kho tủ lạnh thông minh</li>
                    <li>• Mua sắm bằng giọng nói qua loa thông minh</li>
                    <li>• Thử đồ qua gương thông minh</li>
                    <li>• Hệ thống tự động bổ sung</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🌡️ Cảm biến môi trường</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Giám sát nhiệt độ và độ ẩm</li>
                    <li>• Điều chỉnh theo cảm biến ánh sáng</li>
                    <li>• Kiểm tra chất lượng không khí</li>
                    <li>• Đề xuất cá nhân hóa</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🔄 Tự động hóa</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Theo dõi mức sử dụng</li>
                    <li>• Nhắc nhở bổ sung thông minh</li>
                    <li>• Đặt hàng dự đoán</li>
                    <li>• Tối ưu hóa tiết kiệm năng lượng</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">📱 Thiết bị đã kết nối</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {devices.map((device) => (
                    <Card key={device.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{device.name}</h4>
                          <Badge variant={device.status === "online" ? "default" : "secondary"}>
                            {device.status === "online" ? "Trực tuyến" : "Ngoại tuyến"}
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
                <span>Hệ thống Gamification</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🏆 Hệ thống cấp độ</h3>
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{userLevel.icon}</div>
                      <div>
                        <h4 className="font-bold">Cấp độ {userLevel.level}</h4>
                        <p className="text-sm opacity-90">{userLevel.title}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Kinh nghiệm</span>
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
                    <h4 className="font-medium mb-2">Quyền lợi thành viên</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {userLevel.benefits.map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">🎖️ Hệ thống thành tích</h3>
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
                                <span>Tiến độ</span>
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
                            {achievement.unlocked ? "Đã mở khóa" : "Chưa mở khóa"}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{achievement.points} điểm</p>
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
                <span>Đa ngôn ngữ và bản địa hóa</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">🌍 Ngôn ngữ hỗ trợ</h3>
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
                  <h3 className="font-semibold mb-3">💱 Tính năng bản địa hóa</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">Tiền tệ</Badge>
                      <span>Tự động chuyển đổi và định dạng tiền tệ</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">Ngày tháng</Badge>
                      <span>Định dạng ngày giờ theo địa phương</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">Số</Badge>
                      <span>Hiển thị định dạng số theo khu vực</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">Văn hóa</Badge>
                      <span>Thiết kế giao diện phù hợp với văn hóa địa phương</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">RTL</Badge>
                      <span>Hỗ trợ hướng văn bản từ phải sang trái</span>
                    </li>
                  </ul>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Cài đặt hiện tại</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ngôn ngữ:</span>
                        <span>{currentLanguage.nativeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hướng:</span>
                        <span>{currentLanguage.rtl ? "Phải sang trái" : "Trái sang phải"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Khu vực demo */}
      {activeDemo && (
        <Dialog open={!!activeDemo} onOpenChange={() => setActiveDemo(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {activeDemo === "ar" && "Demo thử đồ AR"}
                {activeDemo === "vr" && "Demo phòng trưng bày VR"}
              </DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg flex items-center justify-center text-white">
              <div className="text-center">
                {activeDemo === "ar" && (
                  <>
                    <Camera className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Trải nghiệm thử đồ AR</h3>
                    <p>Đang khởi động camera và công cụ AR...</p>
                  </>
                )}
                {activeDemo === "vr" && (
                  <>
                    <Glasses className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Phòng trưng bày ảo VR</h3>
                    <p>Đang tải môi trường 3D...</p>
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
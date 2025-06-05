import Link from "next/link"
import { ArrowRight, ShoppingCart, Building2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">LiveTrade Connect</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            生活貿易一站式平台 - 連接電商、B2B交易與生活服務
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/store/home">
                <ShoppingCart className="mr-2 h-5 w-5" />
                進入電商平台
              </Link>
            </Button>
            <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/store/b2b">
                <Building2 className="mr-2 h-5 w-5" />
                B2B 交易平台
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">平台特色</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我們提供全方位的電商、B2B交易與生活服務整合平台，滿足您的所有需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* E-Commerce Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  電商平台
                </CardTitle>
                <CardDescription>全方位的線上購物體驗</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 豐富的商品類別與選擇</li>
                  <li>• 智能商品比較與推薦</li>
                  <li>• 多語言與多貨幣支持</li>
                  <li>• 安全便捷的支付方式</li>
                  <li>• 完整的訂單追蹤系統</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/store/home">
                    探索電商平台
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* B2B Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  B2B 交易平台
                </CardTitle>
                <CardDescription>專業的企業間交易解決方案</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 供應商與客戶管理</li>
                  <li>• 報價與訂單處理系統</li>
                  <li>• 智能利潤計算工具</li>
                  <li>• 國際貿易文件生成</li>
                  <li>• 完整的交易追蹤與分析</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/store/b2b">
                    探索 B2B 平台
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Advanced Features Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  進階功能
                </CardTitle>
                <CardDescription>創新科技與服務整合</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• AR/VR 虛擬試穿體驗</li>
                  <li>• 區塊鏈支付與 NFT 整合</li>
                  <li>• IoT 智能設備連接</li>
                  <li>• AI 驅動的個人化推薦</li>
                  <li>• 語音搜索與指令控制</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/store/features">
                    探索進階功能
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">立即開始使用</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            無論您是消費者、企業買家還是供應商，我們的平台都能滿足您的需求
          </p>
          <Button size="lg" asChild>
            <Link href="/store/home">
              開始體驗
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
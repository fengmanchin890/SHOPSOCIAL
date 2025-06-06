"use client"

import Link from "next/link"
import { ArrowRight, ShoppingCart, Building2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/contexts/i18n-context"

export default function HomePage() {
  const { t } = useI18n()
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("platform.name")}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t("platform.description")} - {t("platform.slogan")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/store/home">
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t("nav.products")}
              </Link>
            </Button>
            <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/store/b2b">
                <Building2 className="mr-2 h-5 w-5" />
                {t("nav.b2b")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("features.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("platform.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* E-Commerce Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  {t("nav.products")}
                </CardTitle>
                <CardDescription>{t("features.food.desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Nhiều loại sản phẩm phong phú</li>
                  <li>• So sánh và đề xuất sản phẩm thông minh</li>
                  <li>• Hỗ trợ đa ngôn ngữ và đa tiền tệ</li>
                  <li>• Phương thức thanh toán an toàn và tiện lợi</li>
                  <li>• Hệ thống theo dõi đơn hàng đầy đủ</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/store/home">
                    {t("nav.products")}
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
                  {t("nav.b2b")}
                </CardTitle>
                <CardDescription>Giải pháp giao dịch chuyên nghiệp giữa các doanh nghiệp</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Quản lý nhà cung cấp và khách hàng</li>
                  <li>• Hệ thống xử lý báo giá và đơn hàng</li>
                  <li>• Công cụ tính toán lợi nhuận thông minh</li>
                  <li>• Tạo tài liệu thương mại quốc tế</li>
                  <li>• Theo dõi và phân tích giao dịch đầy đủ</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/store/b2b">
                    {t("nav.b2b")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Life Services Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  {t("nav.lifeServices")}
                </CardTitle>
                <CardDescription>Kết nối cộng đồng người Việt tại nước ngoài và người nước ngoài tại Việt Nam</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Trải nghiệm ẩm thực địa phương</li>
                  <li>• Trao đổi nhà ở và tìm bạn cùng phòng</li>
                  <li>• Kết nối cùng đi khám phá</li>
                  <li>• Trao đổi ngôn ngữ và văn hóa</li>
                  <li>• Tài nguyên hòa nhập đa văn hóa</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/store/life-trade">
                    {t("nav.lifeServices")}
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bắt đầu sử dụng ngay</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Dù bạn là người tiêu dùng, người mua doanh nghiệp hay nhà cung cấp, nền tảng của chúng tôi đều có thể đáp ứng nhu cầu của bạn
          </p>
          <Button size="lg" asChild>
            <Link href="/store/home">
              Bắt đầu trải nghiệm
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
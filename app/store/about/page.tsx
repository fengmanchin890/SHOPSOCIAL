"use client"

import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Users, Award, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/contexts/i18n-context"

export default function AboutPage() {
  const { t } = useI18n()
  
  const teamMembers = [
    {
      name: "Giám đốc Trương",
      position: "Nhà sáng lập & Giám đốc điều hành",
      image: "/placeholder.svg?height=300&width=300",
      description: "Có 15 năm kinh nghiệm trong thương mại điện tử, cam kết mang đến trải nghiệm mua sắm tốt nhất.",
    },
    {
      name: "Nhà thiết kế Lý",
      position: "Trưởng phòng thiết kế",
      image: "/placeholder.svg?height=300&width=300",
      description: "Chuyên gia trong thiết kế thời trang, mang đến sự đổi mới và thẩm mỹ cho thương hiệu.",
    },
    {
      name: "Quản lý Vương",
      position: "Giám đốc vận hành",
      image: "/placeholder.svg?height=300&width=300",
      description: "Phụ trách quản lý vận hành hàng ngày, đảm bảo mọi khâu đều hoàn hảo.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Phục vụ tận tâm",
      description: "Chúng tôi phục vụ mỗi khách hàng với tất cả tâm huyết, mang đến trải nghiệm dịch vụ chu đáo nhất.",
    },
    {
      icon: Award,
      title: "Đảm bảo chất lượng",
      description: "Lựa chọn sản phẩm chất lượng cao, đảm bảo mỗi sản phẩm đều đạt tiêu chuẩn cao nhất.",
    },
    {
      icon: Users,
      title: "Khách hàng là trên hết",
      description: "Lấy nhu cầu khách hàng làm trọng tâm, liên tục cải tiến và đổi mới dịch vụ.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("about.title")}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Chúng tôi cam kết mang đến cho bạn những sản phẩm và dịch vụ chất lượng nhất, biến việc mua sắm thành niềm vui
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("about.story")}</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  ShopLogo được thành lập vào năm 2020, ban đầu chỉ là một cửa hàng trực tuyến nhỏ, bắt đầu hành trình với tâm niệm mang đến sản phẩm chất lượng cho khách hàng.
                </p>
                <p>
                  Sau bốn năm nỗ lực và phát triển, chúng tôi đã phục vụ hơn 10.000 khách hàng, xây dựng hệ thống chuỗi cung ứng hoàn chỉnh và không ngừng mở rộng danh mục sản phẩm.
                </p>
                <p>
                  Chúng tôi tin rằng mỗi lần mua sắm đều phải là trải nghiệm thú vị. Vì vậy, chúng tôi liên tục cải thiện chất lượng dịch vụ, từ việc lựa chọn sản phẩm, trải nghiệm trang web đến dịch vụ khách hàng, mỗi khâu đều hướng tới sự hoàn hảo.
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Văn phòng công ty"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("about.values")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những giá trị cốt lõi này định hướng mọi quyết định của chúng tôi, đồng thời là nền tảng để xây dựng niềm tin với khách hàng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("about.team")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Một nhóm chuyên gia đầy nhiệt huyết, cùng nhau nỗ lực mang đến trải nghiệm mua sắm tốt nhất</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("about.contact")}</h2>
            <p className="text-gray-600">Nếu có bất kỳ câu hỏi hoặc đề xuất nào, hãy liên hệ với chúng tôi bất cứ lúc nào</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Địa chỉ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quận Tân Bình, TP.HCM
                  <br />
                  Đường Cộng Hòa
                  <br />
                  Tầng 10
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Phone className="h-5 w-5 mr-2 text-green-600" />
                  Điện thoại
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Đường dây nóng:
                  <br />
                  028-1234-5678
                  <br />
                  Thứ Hai đến Thứ Sáu 9:00-18:00
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Mail className="h-5 w-5 mr-2 text-purple-600" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Thông tin chung:
                  <br />
                  service@shop.com
                  <br />
                  <br />
                  Hợp tác kinh doanh:
                  <br />
                  business@shop.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-orange-600" />
                  Giờ làm việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cửa hàng trực tuyến: 24/7
                  <br />
                  Giờ hỗ trợ khách hàng:
                  <br />
                  Thứ Hai đến Thứ Sáu 9:00-18:00
                  <br />
                  Thứ Bảy 10:00-17:00
                  <br />
                  Chủ Nhật nghỉ
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Liên hệ ngay
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
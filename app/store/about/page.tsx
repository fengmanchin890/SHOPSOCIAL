import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Users, Award, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "張執行長",
      position: "創辦人 & 執行長",
      image: "/placeholder.svg?height=300&width=300",
      description: "擁有 15 年電商經驗，致力於提供最優質的購物體驗。",
    },
    {
      name: "李設計師",
      position: "首席設計師",
      image: "/placeholder.svg?height=300&width=300",
      description: "專精於時尚設計，為品牌注入創新與美感。",
    },
    {
      name: "王經理",
      position: "營運經理",
      image: "/placeholder.svg?height=300&width=300",
      description: "負責日常營運管理，確保每個環節都完美執行。",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "用心服務",
      description: "我們用心對待每一位顧客，提供最貼心的服務體驗。",
    },
    {
      icon: Award,
      title: "品質保證",
      description: "嚴選優質商品，確保每件商品都符合最高品質標準。",
    },
    {
      icon: Users,
      title: "顧客至上",
      description: "以顧客需求為出發點，持續改善與創新服務內容。",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">關於我們</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            我們致力於為您提供最優質的商品與服務，讓購物成為一種享受
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">我們的故事</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  ShopLogo 成立於 2020 年，起初只是一個小小的線上商店， 懷著為顧客提供優質商品的初心開始了我們的旅程。
                </p>
                <p>
                  經過四年的努力與成長，我們已經服務了超過 10,000 位顧客，
                  建立了完整的供應鏈體系，並持續擴展我們的商品類別。
                </p>
                <p>
                  我們相信，每一次購物都應該是愉快的體驗。因此，我們不斷改善服務品質，
                  從商品挑選、網站體驗到客戶服務，每個環節都力求完美。
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="公司辦公室"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我們的價值觀</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              這些核心價值觀指引著我們的每一個決策，也是我們與顧客建立信任的基礎
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我們的團隊</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">一群充滿熱忱的專業人士，共同為提供最佳購物體驗而努力</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">聯絡我們</h2>
            <p className="text-gray-600">有任何問題或建議，歡迎隨時與我們聯繫</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  地址
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  台北市信義區
                  <br />
                  信義路五段7號
                  <br />
                  10樓
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Phone className="h-5 w-5 mr-2 text-green-600" />
                  電話
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  客服專線：
                  <br />
                  02-1234-5678
                  <br />
                  週一至週五 9:00-18:00
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Mail className="h-5 w-5 mr-2 text-purple-600" />
                  電子郵件
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  一般諮詢：
                  <br />
                  service@shop.com
                  <br />
                  <br />
                  合作洽談：
                  <br />
                  business@shop.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-orange-600" />
                  營業時間
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  線上商店：24/7
                  <br />
                  客服時間：
                  <br />
                  週一至週五 9:00-18:00
                  <br />
                  週六 10:00-17:00
                  <br />
                  週日休息
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              <Mail className="h-5 w-5 mr-2" />
              立即聯繫我們
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

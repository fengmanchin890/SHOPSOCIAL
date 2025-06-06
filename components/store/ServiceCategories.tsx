"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  FileText, 
  Heart, 
  GraduationCap, 
  DollarSign, 
  Bus, 
  ShoppingBag, 
  Users,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Star,
  Info
} from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

export function ServiceCategories() {
  const { language } = useI18n()
  const [activeCategory, setActiveCategory] = useState("housing")

  const getLocalizedText = () => {
    const texts = {
      zh: {
        title: "服務類別",
        housing: "住宿與住房",
        legal: "法律與文件",
        healthcare: "醫療服務",
        education: "教育與語言",
        financial: "金融服務",
        transport: "交通",
        daily: "日常生活服務",
        community: "社區與社交",
        viewAll: "查看全部",
        featured: "精選服務",
        nearYou: "附近服務",
        topRated: "評分最高",
        searchPlaceholder: "搜尋服務...",
        distance: "距離",
        contact: "聯繫",
        openHours: "營業時間",
        reviews: "評論",
        viewMore: "查看更多"
      },
      vi: {
        title: "Danh mục dịch vụ",
        housing: "Nhà ở & Chỗ ở",
        legal: "Pháp lý & Tài liệu",
        healthcare: "Dịch vụ y tế",
        education: "Giáo dục & Ngôn ngữ",
        financial: "Dịch vụ tài chính",
        transport: "Giao thông",
        daily: "Dịch vụ đời sống hàng ngày",
        community: "Cộng đồng & Xã hội",
        viewAll: "Xem tất cả",
        featured: "Dịch vụ nổi bật",
        nearYou: "Dịch vụ gần bạn",
        topRated: "Đánh giá cao nhất",
        searchPlaceholder: "Tìm kiếm dịch vụ...",
        distance: "Khoảng cách",
        contact: "Liên hệ",
        openHours: "Giờ mở cửa",
        reviews: "Đánh giá",
        viewMore: "Xem thêm"
      },
      en: {
        title: "Service Categories",
        housing: "Housing & Accommodation",
        legal: "Legal & Documentation",
        healthcare: "Healthcare Services",
        education: "Education & Language",
        financial: "Financial Services",
        transport: "Transportation",
        daily: "Daily Life Services",
        community: "Community & Social",
        viewAll: "View All",
        featured: "Featured Services",
        nearYou: "Services Near You",
        topRated: "Top Rated",
        searchPlaceholder: "Search services...",
        distance: "Distance",
        contact: "Contact",
        openHours: "Opening Hours",
        reviews: "Reviews",
        viewMore: "View More"
      }
    }
    
    if (language === "zh-TW") return texts.zh
    if (language === "vi") return texts.vi
    return texts.en
  }
  
  const texts = getLocalizedText()

  // Sample services data
  const services = {
    housing: [
      {
        id: "housing-1",
        name: language === "zh-TW" ? "外國人友好租房平台" : 
              language === "vi" ? "Nền tảng cho thuê thân thiện với người nước ngoài" : 
              "Foreigner-Friendly Rental Platform",
        description: language === "zh-TW" ? "專為外國人設計的租房平台，提供英文服務和無需台灣保證人" : 
                     language === "vi" ? "Nền tảng cho thuê được thiết kế cho người nước ngoài, cung cấp dịch vụ tiếng Anh và không cần người bảo lãnh Đài Loan" : 
                     "Rental platform designed for foreigners, offering English service and no Taiwanese guarantor needed",
        address: "Online Service",
        distance: "N/A",
        phone: "+886-2-2345-6789",
        email: "support@rentalplatform.com",
        hours: "24/7 Online",
        rating: 4.8,
        reviews: 156,
        featured: true
      },
      {
        id: "housing-2",
        name: language === "zh-TW" ? "國際學生宿舍" : 
              language === "vi" ? "Ký túc xá sinh viên quốc tế" : 
              "International Student Dormitory",
        description: language === "zh-TW" ? "為留學生提供的經濟實惠住宿選擇，包括公共廚房、洗衣設施和學習區域" : 
                     language === "vi" ? "Lựa chọn chỗ ở giá cả phải chăng cho sinh viên quốc tế, bao gồm nhà bếp chung, tiện nghi giặt ủi và khu vực học tập" : 
                     "Affordable accommodation options for international students, including shared kitchen, laundry facilities, and study areas",
        address: "No. 123, University Road, Taipei",
        distance: "2.5 km",
        phone: "+886-2-3456-7890",
        email: "info@studentdorm.edu.tw",
        hours: "Office: Mon-Fri 9:00-18:00",
        rating: 4.2,
        reviews: 89,
        featured: false
      }
    ],
    legal: [
      {
        id: "legal-1",
        name: language === "zh-TW" ? "外國人法律諮詢中心" : 
              language === "vi" ? "Trung tâm tư vấn pháp lý cho người nước ngoài" : 
              "Foreigner Legal Consultation Center",
        description: language === "zh-TW" ? "提供多語言法律諮詢服務，專門處理簽證、居留證和工作許可相關問題" : 
                     language === "vi" ? "Cung cấp dịch vụ tư vấn pháp lý đa ngôn ngữ, chuyên xử lý các vấn đề liên quan đến visa, thẻ cư trú và giấy phép lao động" : 
                     "Multilingual legal consultation services specializing in visa, ARC, and work permit related issues",
        address: "5F, No. 100, Civic Blvd, Taipei",
        distance: "3.8 km",
        phone: "+886-2-8765-4321",
        email: "help@legalcenter.org.tw",
        hours: "Mon-Fri 10:00-17:00",
        rating: 4.9,
        reviews: 203,
        featured: true
      }
    ],
    healthcare: [
      {
        id: "healthcare-1",
        name: language === "zh-TW" ? "國際醫療中心" : 
              language === "vi" ? "Trung tâm y tế quốc tế" : 
              "International Medical Center",
        description: language === "zh-TW" ? "提供多語言醫療服務的醫院，有英語、日語、韓語和越南語翻譯" : 
                     language === "vi" ? "Bệnh viện cung cấp dịch vụ y tế đa ngôn ngữ với phiên dịch tiếng Anh, Nhật, Hàn và Việt" : 
                     "Hospital offering multilingual medical services with English, Japanese, Korean, and Vietnamese interpreters",
        address: "No. 300, Healthcare Road, Taipei",
        distance: "5.2 km",
        phone: "+886-2-2222-3333",
        email: "appointment@imc.com.tw",
        hours: "Mon-Sun 8:00-22:00",
        rating: 4.7,
        reviews: 178,
        featured: true
      }
    ],
    education: [
      {
        id: "education-1",
        name: language === "zh-TW" ? "台北語言中心" : 
              language === "vi" ? "Trung tâm ngôn ngữ Đài Bắc" : 
              "Taipei Language Center",
        description: language === "zh-TW" ? "提供中文、英文、日文和韓文課程，小班教學和靈活的課程安排" : 
                     language === "vi" ? "Cung cấp các khóa học tiếng Trung, Anh, Nhật và Hàn, lớp học nhỏ và lịch học linh hoạt" : 
                     "Offering Chinese, English, Japanese, and Korean courses with small class sizes and flexible schedules",
        address: "2F, No. 45, Education Street, Taipei",
        distance: "1.8 km",
        phone: "+886-2-3333-4444",
        email: "info@taipeilanguage.edu.tw",
        hours: "Mon-Sat 9:00-21:00",
        rating: 4.6,
        reviews: 145,
        featured: false
      }
    ],
    financial: [
      {
        id: "financial-1",
        name: language === "zh-TW" ? "外國人友好銀行" : 
              language === "vi" ? "Ngân hàng thân thiện với người nước ngoài" : 
              "Foreigner-Friendly Bank",
        description: language === "zh-TW" ? "為外國人提供英語服務的銀行，簡化開戶流程，提供國際匯款服務" : 
                     language === "vi" ? "Ngân hàng cung cấp dịch vụ tiếng Anh cho người nước ngoài, đơn giản hóa quy trình mở tài khoản, cung cấp dịch vụ chuyển tiền quốc tế" : 
                     "Bank offering English services for foreigners, simplified account opening process, and international remittance services",
        address: "No. 88, Finance Road, Taipei",
        distance: "4.1 km",
        phone: "+886-2-5555-6666",
        email: "service@friendlybank.com.tw",
        hours: "Mon-Fri 9:00-16:30",
        rating: 4.5,
        reviews: 112,
        featured: true
      }
    ],
    transport: [
      {
        id: "transport-1",
        name: language === "zh-TW" ? "外國人駕照轉換中心" : 
              language === "vi" ? "Trung tâm chuyển đổi bằng lái xe cho người nước ngoài" : 
              "Foreign Driver's License Conversion Center",
        description: language === "zh-TW" ? "協助外國人將國際駕照轉換為台灣駕照，提供英語服務和指導" : 
                     language === "vi" ? "Hỗ trợ người nước ngoài chuyển đổi bằng lái xe quốc tế sang bằng lái xe Đài Loan, cung cấp dịch vụ và hướng dẫn bằng tiếng Anh" : 
                     "Assisting foreigners in converting international driver's licenses to Taiwanese licenses, with English service and guidance",
        address: "1F, No. 200, Transport Blvd, Taipei",
        distance: "6.3 km",
        phone: "+886-2-7777-8888",
        email: "license@transport.gov.tw",
        hours: "Mon-Fri 9:00-17:00",
        rating: 4.3,
        reviews: 87,
        featured: false
      }
    ],
    daily: [
      {
        id: "daily-1",
        name: language === "zh-TW" ? "國際食品超市" : 
              language === "vi" ? "Siêu thị thực phẩm quốc tế" : 
              "International Food Supermarket",
        description: language === "zh-TW" ? "提供來自世界各地的食品和產品，滿足不同國籍人士的需求" : 
                     language === "vi" ? "Cung cấp thực phẩm và sản phẩm từ khắp nơi trên thế giới, đáp ứng nhu cầu của người nhiều quốc tịch khác nhau" : 
                     "Offering food and products from around the world to cater to people of different nationalities",
        address: "No. 55, Market Street, Taipei",
        distance: "2.2 km",
        phone: "+886-2-9999-0000",
        email: "info@internationalmarket.com.tw",
        hours: "Daily 8:00-22:00",
        rating: 4.7,
        reviews: 234,
        featured: true
      }
    ],
    community: [
      {
        id: "community-1",
        name: language === "zh-TW" ? "國際社區中心" : 
              language === "vi" ? "Trung tâm cộng đồng quốc tế" : 
              "International Community Center",
        description: language === "zh-TW" ? "為外國人提供社交活動、文化交流和支持網絡的社區中心" : 
                     language === "vi" ? "Trung tâm cộng đồng cung cấp các hoạt động xã hội, trao đổi văn hóa và mạng lưới hỗ trợ cho người nước ngoài" : 
                     "Community center offering social activities, cultural exchanges, and support networks for foreigners",
        address: "3F, No. 77, Community Road, Taipei",
        distance: "3.5 km",
        phone: "+886-2-1111-2222",
        email: "hello@communitycenter.org.tw",
        hours: "Tue-Sun 10:00-20:00",
        rating: 4.8,
        reviews: 167,
        featured: false
      }
    ]
  }

  const activeServices = services[activeCategory as keyof typeof services] || []
  const featuredServices = Object.values(services).flat().filter(service => service.featured).slice(0, 3)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{texts.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Icons */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          <Button 
            variant={activeCategory === "housing" ? "default" : "outline"} 
            className="flex flex-col h-auto py-3 px-2 gap-1"
            onClick={() => setActiveCategory("housing")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs text-center">{texts.housing}</span>
          </Button>
          <Button 
            variant={activeCategory === "legal" ? "default" : "outline"} 
            className="flex flex-col h-auto py-3 px-2 gap-1"
            onClick={() => setActiveCategory("legal")}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs text-center">{texts.legal}</span>
          </Button>
          <Button 
            variant={activeCategory === "healthcare" ? "default" : "outline"} 
            className="flex flex-col h-auto py-3 px-2 gap-1"
            onClick={() => setActiveCategory("healthcare")}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs text-center">{texts.healthcare}</span>
          </Button>
          <Button 
            variant={activeCategory === "education" ? "default" : "outline"} 
            className="flex flex-col h-auto py-3 px-2 gap-1"
            onClick={() => setActiveCategory("education")}
          >
            <GraduationCap className="h-5 w-5" />
            <span className="text-xs text-center">{texts.education}</span>
          </Button>
          <Button 
            variant={activeCategory === "financial" ? "default" : "outline"} 
            className="flex flex-col h-auto py-3 px-2 gap-1"
            onClick={() => setActiveCategory("financial")}
          >
            <DollarSign className="h-5 w-5" />
            <span className="text-xs text-center">{texts.financial}</span>
          </Button>
          <Button 
            variant={activeCategory === "transport" ? "default" : "outline"} 
            className="flex flex-col h-auto py-3 px-2 gap-1"
            onClick={() => setActiveCategory("transport")}
          >
            <Bus className="h-5 w-5" />
            <span className="text-xs text-center">{texts.transport}</span>
          </Button>
          <Button 
            variant={activeCategory === "daily" ? "default" : "outline"} 
            className="flex flex-col h-auto py-3 px-2 gap-1"
            onClick={() => setActiveCategory("daily")}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs text-center">{texts.daily}</span>
          </Button>
          <Button 
            variant={activeCategory === "community" ? "default" : "outline"} 
            className="flex flex-col h-auto py-3 px-2 gap-1"
            onClick={() => setActiveCategory("community")}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs text-center">{texts.community}</span>
          </Button>
        </div>

        {/* Service Listings */}
        <Tabs defaultValue="featured">
          <TabsList>
            <TabsTrigger value="featured">{texts.featured}</TabsTrigger>
            <TabsTrigger value="near">{texts.nearYou}</TabsTrigger>
            <TabsTrigger value="rated">{texts.topRated}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="space-y-4 mt-4">
            {featuredServices.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                texts={texts}
              />
            ))}
            <Button variant="outline" className="w-full">
              {texts.viewMore}
            </Button>
          </TabsContent>
          
          <TabsContent value="near" className="space-y-4 mt-4">
            {activeServices.sort((a, b) => {
              const distA = a.distance === "N/A" ? 9999 : parseFloat(a.distance.replace(" km", ""))
              const distB = b.distance === "N/A" ? 9999 : parseFloat(b.distance.replace(" km", ""))
              return distA - distB
            }).map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                texts={texts}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="rated" className="space-y-4 mt-4">
            {activeServices.sort((a, b) => b.rating - a.rating).map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                texts={texts}
              />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface ServiceCardProps {
  service: {
    id: string
    name: string
    description: string
    address: string
    distance: string
    phone: string
    email: string
    hours: string
    rating: number
    reviews: number
    featured: boolean
  }
  texts: any
}

function ServiceCard({ service, texts }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{service.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
          </div>
          {service.featured && (
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <p className="text-gray-700">{service.address}</p>
              <p className="text-gray-500">{texts.distance}: {service.distance}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-700">{service.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-700">{service.email}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-700">{service.hours}</span>
          </div>
          
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-gray-700">{service.rating} ({service.reviews} {texts.reviews})</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button size="sm">
            <Info className="h-4 w-4 mr-1" />
            {texts.viewMore}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
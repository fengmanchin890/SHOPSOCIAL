"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ChefHat,
  Home,
  Users2,
  Users,
  GraduationCap,
  Star,
  Clock,
  MapPin,
  CalendarIcon,
  User,
  Languages,
  Lock,
  Plus,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "@/components/store/MembershipProvider"
import { MembershipUpgradeDialog } from "@/components/store/MembershipUpgradeDialog"
import { MembershipStatus } from "@/components/store/MembershipStatus"
import { AddActivityForm } from "@/components/store/AddActivityForm"

// 語言設定
const languages = {
  zh: {
    title: "LiveTrade Connect",
    subtitle: "生活 × 貿易一站式平台，讓你買得到、玩得到、學得到、交得到！",
    tabs: {
      food: "體驗美食模組",
      accommodation: "探索住宿交換",
      travel: "搭訕共遊",
      language: "參加語言交流",
      courses: "報名專家課程",
    },
    currency: "NT$",
    bookNow: "立即預訂",
    joinTravel: "邀請共遊",
    joinNow: "報名參加",
    registerNow: "立即報名",
    viewDetails: "查看詳情",
    confirmRegistration: "確認報名",
    upgradeRequired: "需要會員升級",
    addActivity: {
      food: "新增餐廳",
      accommodation: "新增出租住宿",
      travel: "新增共遊活動",
      language: "新增語言教室",
      courses: "新增課程報名",
    },
  },
  en: {
    title: "LiveTrade Connect",
    subtitle: "Life × Trade One-Stop Platform - Buy, Play, Learn, Connect!",
    tabs: {
      food: "Food Experience",
      accommodation: "Accommodation Exchange",
      travel: "Travel Together",
      language: "Language Exchange",
      courses: "Expert Courses",
    },
    currency: "NT$",
    bookNow: "Book Now",
    joinTravel: "Join Travel",
    joinNow: "Join Now",
    registerNow: "Register Now",
    viewDetails: "View Details",
    confirmRegistration: "Confirm Registration",
    upgradeRequired: "Membership Upgrade Required",
    addActivity: {
      food: "Add Restaurant",
      accommodation: "Add Rental",
      travel: "Add Travel Activity",
      language: "Add Language Class",
      courses: "Add Course Registration",
    },
  },
  vi: {
    title: "LiveTrade Connect",
    subtitle: "Nền tảng Một cửa Cuộc sống × Thương mại - Mua, Chơi, Học, Kết nối!",
    tabs: {
      food: "Trải nghiệm Ẩm thực",
      accommodation: "Trao đổi Chỗ ở",
      travel: "Du lịch cùng nhau",
      language: "Trao đổi Ngôn ngữ",
      courses: "Khóa học Chuyên gia",
    },
    currency: "NT$",
    bookNow: "Đặt ngay",
    joinTravel: "Tham gia du lịch",
    joinNow: "Tham gia ngay",
    registerNow: "Đăng ký ngay",
    viewDetails: "Xem chi tiết",
    confirmRegistration: "Xác nhận đăng ký",
    upgradeRequired: "Cần nâng cấp thành viên",
    addActivity: {
      food: "Thêm nhà hàng",
      accommodation: "Thêm cho thuê",
      travel: "Thêm hoạt động du lịch",
      language: "Thêm lớp ngôn ngữ",
      courses: "Thêm đăng ký khóa học",
    },
  },
}

// 美食體驗數據
const foodExperiences = [
  {
    id: 1,
    title: "正宗越南河粉烹飪體驗",
    chef: "阮氏美",
    location: "胡志明市",
    price: 1350,
    duration: "3小時",
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=200&width=300",
    description: "學習製作正宗越南河粉，包含湯底熬煮、米粉製作和傳統配菜",
    languages: ["中文", "英語", "越南語"],
    includes: ["食材", "食譜", "用餐", "拍照"],
    maxGuests: 6,
    category: "越南料理",
  },
  {
    id: 2,
    title: "台式夜市小吃製作",
    chef: "陳師傅",
    location: "台北士林夜市",
    price: 1200,
    duration: "2.5小時",
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg?height=200&width=300",
    description: "親手製作珍珠奶茶、小籠包、蔥抓餅等經典台式小吃",
    languages: ["中文", "英語", "日語"],
    includes: ["食材", "飲料", "打包盒", "證書"],
    maxGuests: 8,
    category: "台灣小吃",
  },
  {
    id: 3,
    title: "台南傳統小吃巡禮",
    chef: "林阿嬤",
    location: "台南安平區",
    price: 980,
    duration: "4小時",
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    description: "學習製作擔仔麵、棺材板、安平豆花等台南經典小吃",
    languages: ["中文", "英語"],
    includes: ["食材", "工具使用", "品嚐", "技巧指導"],
    maxGuests: 6,
    category: "台灣料理",
  },
  {
    id: 4,
    title: "越南春捲製作工坊",
    chef: "Linh Nguyen",
    location: "河內老城區",
    price: 850,
    duration: "2小時",
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=300",
    description: "學習製作新鮮春捲和炸春捲，體驗越南傳統手工藝",
    languages: ["中文", "英語", "越南語"],
    includes: ["新鮮食材", "醬料", "包裝", "食譜卡"],
    maxGuests: 8,
    category: "越南料理",
  },
]

// 住宿交換數據
const accommodationExchanges = [
  {
    id: 1,
    title: "台北共享工作空間住宿",
    host: "David Chen",
    location: "台北信義區",
    price: 800,
    type: "共享空間",
    rating: 4.8,
    reviews: 45,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["高速WiFi", "24小時門禁", "廚房", "洗衣機"],
    workFriendly: true,
    description:
      "位於台北信義區的現代化共享工作空間，適合數位遊牧者和商務旅客。提供24小時安全門禁、高速WiFi、完整廚房設備和洗衣設施。",
    fullAmenities: [
      "高速WiFi",
      "24小時門禁",
      "共享廚房",
      "洗衣機",
      "冷氣空調",
      "獨立衛浴",
      "工作桌椅",
      "會議室使用",
      "咖啡茶水",
      "清潔服務",
    ],
    houseRules: ["禁止吸煙", "保持安靜", "共同維護清潔", "訪客需登記"],
    checkIn: "15:00",
    checkOut: "11:00",
    cancellation: "免費取消至入住前24小時",
  },
  {
    id: 2,
    title: "越南農場志工交換",
    host: "Linh Nguyen",
    location: "大叻",
    price: 0,
    type: "志工交換",
    rating: 4.9,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["免費住宿", "三餐", "農場體驗", "語言交流"],
    workRequired: "每日4小時農場工作",
    description:
      "位於越南大叻的有機農場，提供免費住宿換取農場工作。體驗越南鄉村生活，學習有機農業知識，與當地人深度交流。",
    fullAmenities: ["免費住宿", "一日三餐", "農場體驗", "語言交流", "有機蔬果", "文化活動", "自然環境", "WiFi網路"],
    houseRules: ["每日工作4小時", "尊重當地文化", "愛護環境", "參與集體活動"],
    checkIn: "任何時間",
    checkOut: "彈性安排",
    cancellation: "提前3天通知即可",
  },
  {
    id: 3,
    title: "台中文創青年旅館",
    host: "張小美",
    location: "台中西區",
    price: 600,
    type: "青年旅館",
    rating: 4.7,
    reviews: 123,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["文創氛圍", "交流空間", "腳踏車租借", "導覽服務"],
    workFriendly: false,
    description: "位於台中西區的文創主題青年旅館，鄰近審計新村和勤美綠園道。提供濃厚的文創氛圍和豐富的文化體驗活動。",
    fullAmenities: ["文創氛圍", "交流空間", "腳踏車租借", "導覽服務", "共享廚房", "洗衣設施", "WiFi網路", "行李寄存"],
    houseRules: ["保持安靜", "愛護設施", "參與交流活動", "禁止攜帶寵物"],
    checkIn: "14:00",
    checkOut: "12:00",
    cancellation: "免費取消至入住前48小時",
  },
]

// 搭訕共遊數據
const travelCompanions = [
  {
    id: 1,
    title: "胡志明市文化探索夥伴",
    companion: "Minh Tran",
    age: 28,
    gender: "男",
    location: "胡志明市",
    price: 1050,
    duration: "6小時",
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg?height=200&width=300",
    highlights: ["戰爭博物館", "統一宮", "濱城市場", "當地美食"],
    languages: ["中文", "英語", "越南語"],
    transportation: "私人車輛",
    personality: ["友善", "健談", "文化愛好者", "美食達人"],
    interests: ["歷史文化", "攝影", "美食探索", "語言交流"],
  },
  {
    id: 2,
    title: "台北夜市美食探索夥伴",
    companion: "Lisa Wang",
    age: 25,
    gender: "女",
    location: "台北",
    price: 850,
    duration: "4小時",
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg?height=200&width=300",
    highlights: ["士林夜市", "饒河夜市", "小吃品嚐", "文化解說"],
    languages: ["中文", "英語", "日語"],
    transportation: "步行 + 捷運",
    personality: ["活潑", "熱情", "美食愛好者", "購物達人"],
    interests: ["夜市文化", "小吃美食", "購物", "拍照打卡"],
  },
  {
    id: 3,
    title: "台中文創園區漫遊夥伴",
    companion: "張小明",
    age: 30,
    gender: "男",
    location: "台中",
    price: 750,
    duration: "5小時",
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    highlights: ["審計新村", "勤美綠園道", "文創市集", "在地咖啡"],
    languages: ["中文", "英語"],
    transportation: "腳踏車 + 步行",
    personality: ["文藝", "細心", "創意", "咖啡愛好者"],
    interests: ["文創設計", "咖啡文化", "藝術展覽", "手作體驗"],
  },
]

// 共遊活動數據
const travelActivities = [
  {
    id: 1,
    title: "台北101夜景攝影團",
    organizer: "攝影愛好者聯盟",
    location: "台北101觀景台",
    price: 450,
    duration: "3小時",
    date: "2024-02-15 18:00",
    maxParticipants: 12,
    currentParticipants: 8,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    description: "專業攝影師帶領，學習夜景攝影技巧，捕捉台北最美夜景",
    highlights: ["專業指導", "器材借用", "後製教學", "作品分享"],
    includes: ["門票", "攝影指導", "器材使用", "數位相框"],
    difficulty: "初級",
    ageRange: "16-65歲",
    languages: ["中文", "英語"],
    category: "攝影體驗",
  },
  {
    id: 2,
    title: "胡志明市美食探索之旅",
    organizer: "越南美食達人",
    location: "胡志明市第一郡",
    price: 680,
    duration: "5小時",
    date: "2024-02-18 10:00",
    maxParticipants: 15,
    currentParticipants: 11,
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=300",
    description: "深度探索越南街頭美食，品嚐最道地的越南料理",
    highlights: ["在地美食", "文化解說", "市場導覽", "料理體驗"],
    includes: ["所有餐食", "飲料", "導覽服務", "食譜卡"],
    difficulty: "輕鬆",
    ageRange: "18-70歲",
    languages: ["中文", "越南語", "英語"],
    category: "美食體驗",
  },
  {
    id: 3,
    title: "台中文創市集手作工坊",
    organizer: "文創工作室",
    location: "台中審計新村",
    price: 320,
    duration: "2.5小時",
    date: "2024-02-20 14:00",
    maxParticipants: 10,
    currentParticipants: 6,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300",
    description: "親手製作獨特文創商品，體驗台中文創魅力",
    highlights: ["手作體驗", "文創導覽", "作品帶回", "茶點招待"],
    includes: ["材料費", "工具使用", "指導費", "包裝"],
    difficulty: "初級",
    ageRange: "12-60歲",
    languages: ["中文"],
    category: "文創體驗",
  },
  {
    id: 4,
    title: "越南河內古城文化漫步",
    organizer: "河內文化協會",
    location: "河內古城區",
    price: 280,
    duration: "4小時",
    date: "2024-02-22 09:00",
    maxParticipants: 20,
    currentParticipants: 14,
    rating: 4.6,
    reviews: 134,
    image: "/placeholder.svg?height=200&width=300",
    description: "漫步河內千年古城，感受越南深厚的歷史文化",
    highlights: ["歷史古蹟", "文化故事", "傳統建築", "當地生活"],
    includes: ["導覽服務", "文化手冊", "紀念品", "茶水"],
    difficulty: "輕鬆",
    ageRange: "15-75歲",
    languages: ["中文", "越南語"],
    category: "文化體驗",
  },
]

// 語言交流數據
const languageExchanges = [
  {
    id: 1,
    title: "中越語言交流聚會",
    organizer: "Language Bridge",
    location: "胡志明市咖啡廳",
    price: 150,
    duration: "2小時",
    date: "每週三 19:00",
    participants: 15,
    image: "/placeholder.svg?height=200&width=300",
    languages: ["中文", "越南語"],
    level: "初級到高級",
    description: "在輕鬆的咖啡廳環境中練習中文和越南語，與當地人和國際友人交流。",
    activities: ["自由對話", "主題討論", "文化分享", "遊戲互動"],
    ageRange: "18-45歲",
    maxParticipants: 20,
  },
  {
    id: 2,
    title: "國際青年交流派對",
    organizer: "Global Connect",
    location: "台北國際青年旅館",
    price: 250,
    duration: "3小時",
    date: "每週五 20:00",
    participants: 25,
    image: "/placeholder.svg?height=200&width=300",
    languages: ["中文", "英語", "日語", "韓語"],
    level: "所有級別",
    description: "多國語言環境的國際青年交流派對，認識來自世界各地的朋友。",
    activities: ["破冰遊戲", "語言配對", "文化表演", "聯誼活動"],
    ageRange: "20-35歲",
    maxParticipants: 30,
  },
  {
    id: 3,
    title: "台中英語角落",
    organizer: "English Corner Taichung",
    location: "台中逢甲夜市附近",
    price: 200,
    duration: "2小時",
    date: "每週六 15:00",
    participants: 20,
    image: "/placeholder.svg?height=200&width=300",
    languages: ["中文", "英語"],
    level: "中級以上",
    description: "專為中級以上英語學習者設計的英語角落，提升口語表達能力。",
    activities: ["主題辯論", "角色扮演", "新聞討論", "商務英語"],
    ageRange: "22-40歲",
    maxParticipants: 25,
  },
]

// 專家課程數據
const expertCourses = [
  {
    id: 1,
    title: "跨境電商實戰課程",
    instructor: "王志明",
    price: 8970,
    duration: "8週",
    format: "線上 + 線下",
    rating: 4.9,
    students: 1247,
    image: "/placeholder.svg?height=200&width=300",
    topics: ["平台選擇", "產品開發", "行銷策略", "物流管理"],
    certificate: true,
    description: "從零開始學習跨境電商，涵蓋平台選擇、產品開發、行銷策略到物流管理的完整實戰課程。",
    schedule: "每週二、四 19:00-21:00",
    requirements: "具備基本電腦操作能力",
    materials: ["課程講義", "實戰案例", "工具軟體", "一對一諮詢"],
    refundPolicy: "開課前7天可全額退費",
  },
  {
    id: 2,
    title: "越南語商務會話",
    instructor: "Hoa Pham",
    price: 5400,
    duration: "12週",
    format: "一對一線上",
    rating: 4.8,
    students: 456,
    image: "/placeholder.svg?height=200&width=300",
    topics: ["商務詞彙", "會議用語", "談判技巧", "文化禮儀"],
    certificate: true,
    description: "專為商務人士設計的越南語課程，學習商務詞彙、會議用語和談判技巧。",
    schedule: "彈性安排，每週2次課程",
    requirements: "具備基礎越南語能力",
    materials: ["教材", "音頻資料", "練習冊", "文化指南"],
    refundPolicy: "首次課程後不滿意可退費",
  },
  {
    id: 3,
    title: "台灣文創產業分析",
    instructor: "林美惠",
    price: 6750,
    duration: "6週",
    format: "實體課程",
    rating: 4.7,
    students: 324,
    image: "/placeholder.svg?height=200&width=300",
    topics: ["文創趨勢", "品牌建立", "市場分析", "創業指導"],
    certificate: true,
    description: "深入了解台灣文創產業發展趨勢，學習品牌建立和市場分析技巧。",
    schedule: "每週六 14:00-17:00",
    requirements: "對文創產業有興趣",
    materials: ["產業報告", "案例分析", "實地參訪", "創業輔導"],
    refundPolicy: "開課前3天可退費80%",
  },
]

// 會員限制組件
function MembershipGate({
  children,
  feature,
  showUpgrade = true,
}: {
  children: React.ReactNode
  feature: string
  showUpgrade?: boolean
}) {
  const { checkFeatureAccess } = useMembership()
  const hasAccess = checkFeatureAccess(feature)

  if (!hasAccess) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gray-100 bg-opacity-90 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <div className="text-center p-6">
            <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">會員專享功能</h3>
            <p className="text-gray-600 mb-4">升級會員即可使用「{feature}」功能</p>
            {showUpgrade && (
              <MembershipUpgradeDialog requiredFeature={feature}>
                <Button>立即升級</Button>
              </MembershipUpgradeDialog>
            )}
          </div>
        </div>
        <div className="opacity-30 pointer-events-none">{children}</div>
      </div>
    )
  }

  return <>{children}</>
}

export default function LifeTradePage() {
  const [currentLang, setCurrentLang] = useState<"zh" | "en" | "vi">("zh")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    message: "",
  })
  const [activeTab, setActiveTab] = useState("food")
  const [showAddActivityForm, setShowAddActivityForm] = useState(false)
  const [addActivityType, setAddActivityType] = useState<"food" | "accommodation" | "travel" | "language" | "courses">(
    "food",
  )

  // 新增狀態來存儲用戶新增的餐廳
  const [addedRestaurants, setAddedRestaurants] = useState<any[]>([])

  const { checkFeatureAccess } = useMembership()
  const t = languages[currentLang]

  // 處理預訂功能
  const handleBooking = (experienceId: number, type: string) => {
    console.log(`Booking ${type} experience ${experienceId}`, bookingData)
    toast({
      title: "預訂成功！",
      description: "我們將盡快與您聯繫確認詳情。",
    })
  }

  // 處理共遊邀請
  const handleTravelInvite = (companionId: number) => {
    console.log(`Inviting travel companion ${companionId}`, bookingData)
    toast({
      title: "邀請成功！",
      description: "共遊夥伴將在24小時內與您聯繫確認行程。",
    })
  }

  // 處理共遊活動報名
  const handleActivityJoin = (activityId: number) => {
    console.log(`Joining travel activity ${activityId}`, bookingData)
    toast({
      title: "報名成功！",
      description: "您已成功報名共遊活動，活動詳情和集合資訊已發送至您的郵箱。",
    })
  }

  // 處理付款功能
  const handlePayment = (amount: number, type: string, id: number) => {
    console.log(`Processing payment: ${amount} for ${type} ${id}`)
    toast({
      title: "付款成功！",
      description: `已成功付款 ${t.currency}${amount.toLocaleString()}，相關憑證已發送至您的郵箱。`,
    })
  }

  // 處理住宿詳情查看
  const handleAccommodationDetails = (accommodationId: number) => {
    console.log(`Viewing accommodation details ${accommodationId}`)
    toast({
      title: "詳情已載入！",
      description: "您可以查看完整的住宿資訊和設施詳情。",
    })
  }

  // 處理語言交流報名
  const handleLanguageJoin = (exchangeId: number) => {
    console.log(`Joining language exchange ${exchangeId}`, bookingData)
    toast({
      title: "確認參加成功！",
      description: "您已成功確認參加語言交流活動，活動詳情已發送至您的郵箱。",
    })
  }

  // 處理課程報名確認
  const handleCourseConfirm = (courseId: number) => {
    console.log(`Confirming course registration ${courseId}`, bookingData)
    toast({
      title: "確認報名成功！",
      description: "您已成功確認報名課程，付款資訊和課程詳情已發送至您的郵箱。",
    })
  }

  // 處理新增活動
  const handleAddActivity = (module: "food" | "accommodation" | "travel" | "language" | "courses") => {
    console.log(`Opening add form for module: ${module}`)
    setAddActivityType(module)
    setShowAddActivityForm(true)
  }

  // 處理新增活動成功
  const handleAddActivitySuccess = () => {
    setShowAddActivityForm(false)
    toast({
      title: "活動新增成功！",
      description: "您的活動已提交審核，審核通過後將顯示在平台上。",
    })
  }

  // 處理新增餐廳成功
  const handleAddRestaurantSuccess = (restaurantData?: any) => {
    // 如果沒有傳遞數據，使用默認數據
    const defaultData = {
      name: "新增餐廳",
      description: "用戶新增的餐廳",
      cuisine: "台灣料理",
      location: "台灣",
      languages: ["中文"],
    }

    const data = restaurantData || defaultData

    const newRestaurant = {
      id: Date.now(),
      title: data.name || "新增餐廳",
      chef: "新增用戶",
      location: data.location || "台灣",
      price: 1000, // 預設價格
      duration: "2小時",
      rating: 5.0,
      reviews: 0,
      image: "/placeholder.svg?height=200&width=300",
      description: data.description || "用戶新增的餐廳體驗",
      languages: data.languages || ["中文"],
      includes: ["食材", "指導", "用餐"],
      maxGuests: 6,
      category: data.cuisine || "台灣料理",
      isNewlyAdded: true,
    }

    setAddedRestaurants((prev) => [...prev, newRestaurant])
    setShowAddActivityForm(false)

    toast({
      title: "餐廳新增成功！",
      description: `餐廳「${data.name || "新增餐廳"}」已成功新增到平台上！`,
    })
  }

  // 合併原有餐廳和新增餐廳
  const allFoodExperiences = [...foodExperiences, ...addedRestaurants]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 語言切換器 */}
      <div className="flex justify-end mb-4">
        <Select value={currentLang} onValueChange={(value: "zh" | "en" | "vi") => setCurrentLang(value)}>
          <SelectTrigger className="w-[180px]">
            <Languages className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zh">繁體中文</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="vi">Tiếng Việt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 頁面標題 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>

        {/* 導航圖片 */}
        <div className="mb-8">
          <img
            src="/images/life-trade-nav.png"
            alt="生活貿易平台導航"
            className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>

      {/* 會員狀態 */}
      <div className="mb-8">
        <MembershipStatus />
      </div>

      {/* 新增活動表單對話框 */}
      <Dialog open={showAddActivityForm} onOpenChange={setShowAddActivityForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <AddActivityForm
            moduleType={addActivityType}
            onSuccess={addActivityType === "food" ? handleAddRestaurantSuccess : handleAddActivitySuccess}
            onCancel={() => setShowAddActivityForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* 主要功能模組 */}
      <Tabs
        defaultValue="food"
        className="w-full"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          setShowAddActivityForm(false)
        }}
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="food" className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            {t.tabs.food}
          </TabsTrigger>
          <TabsTrigger value="accommodation" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            {t.tabs.accommodation}
          </TabsTrigger>
          <TabsTrigger value="travel" className="flex items-center gap-2">
            <Users2 className="h-4 w-4" />
            {t.tabs.travel}
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t.tabs.language}
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            {t.tabs.courses}
          </TabsTrigger>
        </TabsList>

        {/* 體驗美食模組 */}
        <TabsContent value="food" className="space-y-6">
          <MembershipGate feature="體驗美食模組">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🍽 {t.tabs.food}</h2>
              <p className="text-lg text-gray-600">與當地廚師學習正宗料理，體驗台灣越南的美食精髓</p>

              {/* 新增活動按鈕 */}
              <div className="mt-4">
                <Button variant="outline" onClick={() => handleAddActivity("food")}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addActivity.food}
                </Button>
              </div>
            </div>

            {/* 篩選器 */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="選擇料理類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="taiwan">台灣料理</SelectItem>
                  <SelectItem value="vietnam">越南料理</SelectItem>
                  <SelectItem value="street">街頭小吃</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="選擇地區" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="taipei">台北</SelectItem>
                  <SelectItem value="taichung">台中</SelectItem>
                  <SelectItem value="tainan">台南</SelectItem>
                  <SelectItem value="hcmc">胡志明市</SelectItem>
                  <SelectItem value="hanoi">河內</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="價格範圍" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">NT$500-1000</SelectItem>
                  <SelectItem value="medium">NT$1000-1500</SelectItem>
                  <SelectItem value="high">NT$1500+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 美食體驗列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allFoodExperiences.map((experience) => (
                <Card
                  key={experience.id}
                  className={`overflow-hidden hover:shadow-lg transition-shadow ${experience.isNewlyAdded ? "border-2 border-green-400" : ""}`}
                >
                  <div className="relative">
                    <img
                      src={experience.image || "/placeholder.svg"}
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">{experience.category}</Badge>
                    {experience.isNewlyAdded && <Badge className="absolute top-2 left-2 bg-blue-500">新增</Badge>}
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{experience.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {experience.chef} • {experience.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{experience.rating}</span>
                        <span className="text-gray-500">({experience.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{experience.duration}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{experience.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {experience.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">包含內容：</div>
                      <div className="flex flex-wrap gap-1">
                        {experience.includes.map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-lg font-bold text-green-600">
                        {t.currency}
                        {experience.price.toLocaleString()}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">{t.bookNow}</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>預訂 {experience.title}</DialogTitle>
                            <DialogDescription>請填寫以下資訊完成預訂並付款</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">姓名</Label>
                                <Input
                                  id="name"
                                  value={bookingData.name}
                                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                  placeholder="請輸入姓名"
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">電子郵件</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={bookingData.email}
                                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                  placeholder="請輸入郵件"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="phone">聯絡電話</Label>
                                <Input
                                  id="phone"
                                  value={bookingData.phone}
                                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                  placeholder="請輸入電話"
                                />
                              </div>
                              <div>
                                <Label htmlFor="guests">參與人數</Label>
                                <Select
                                  value={bookingData.guests.toString()}
                                  onValueChange={(value) =>
                                    setBookingData({ ...bookingData, guests: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: experience.maxGuests }, (_, i) => (
                                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                                        {i + 1} 人
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="date">預約日期</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !selectedDate && "text-muted-foreground",
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {selectedDate ? format(selectedDate, "PPP") : "選擇日期"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            <div>
                              <Label htmlFor="message">特殊需求</Label>
                              <Textarea
                                id="message"
                                value={bookingData.message}
                                onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                                placeholder="請告訴我們您的特殊需求或問題"
                                rows={3}
                              />
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-sm mb-2">付款資訊</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>體驗費用：</span>
                                  <span>
                                    {t.currency}
                                    {(experience.price * bookingData.guests).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>服務費：</span>
                                  <span>{t.currency}50</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between font-semibold">
                                  <span>總計：</span>
                                  <span className="text-green-600">
                                    {t.currency}
                                    {(experience.price * bookingData.guests + 50).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                              <div className="text-lg font-bold">
                                總計：{t.currency}
                                {(experience.price * bookingData.guests + 50).toLocaleString()}
                              </div>
                              <Button
                                onClick={() => {
                                  handleBooking(experience.id, "food")
                                  handlePayment(experience.price * bookingData.guests + 50, "food", experience.id)
                                }}
                              >
                                確認預訂並付款
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </MembershipGate>
        </TabsContent>

        {/* 其他模組保持不變... */}
        {/* 探索住宿交換 */}
        <TabsContent value="accommodation" className="space-y-6">
          <MembershipGate feature="探索住宿交換">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🏠 {t.tabs.accommodation}</h2>
              <p className="text-lg text-gray-600">找到理想的住宿空間，體驗台灣越南當地生活方式</p>

              {/* 新增活動按鈕 */}
              <div className="mt-4">
                <Button variant="outline" onClick={() => handleAddActivity("accommodation")}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addActivity.accommodation}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodationExchanges.map((accommodation) => (
                <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={accommodation.image || "/placeholder.svg"}
                    alt={accommodation.title}
                    className="w-full h-48 object-cover"
                  />

                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {accommodation.title}
                      <Badge variant={accommodation.price === 0 ? "secondary" : "default"}>{accommodation.type}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {accommodation.location} • {accommodation.host}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{accommodation.rating}</span>
                        <span className="text-gray-500">({accommodation.reviews})</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{accommodation.description}</p>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">設施包含：</div>
                      <div className="flex flex-wrap gap-1">
                        {accommodation.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {accommodation.workRequired && (
                      <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                        <strong>工作要求：</strong>
                        {accommodation.workRequired}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-lg font-bold text-green-600">
                        {accommodation.price === 0
                          ? "免費交換"
                          : `${t.currency}${accommodation.price.toLocaleString()}`}
                      </div>
                      <Button size="sm" onClick={() => handleAccommodationDetails(accommodation.id)}>
                        {t.viewDetails}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </MembershipGate>
        </TabsContent>

        {/* 搭訕共遊 */}
        <TabsContent value="travel" className="space-y-6">
          <MembershipGate feature="搭訕共遊">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <Users2 className="inline-block h-6 w-6 mr-2" />
                {t.tabs.travel}
              </h2>
              <p className="text-lg text-gray-600">尋找志同道合的旅伴，一同探索台灣越南之美</p>

              {/* 新增活動按鈕 */}
              <div className="mt-4">
                <Button variant="outline" onClick={() => handleAddActivity("travel")}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addActivity.travel}
                </Button>
              </div>
            </div>

            {/* 共遊夥伴列表 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">共遊夥伴</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelCompanions.map((companion) => (
                  <Card key={companion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={companion.image || "/placeholder.svg"}
                      alt={companion.title}
                      className="w-full h-48 object-cover"
                    />

                    <CardHeader>
                      <CardTitle className="text-lg">{companion.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {companion.companion} ({companion.age}歲, {companion.gender}) • {companion.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{companion.rating}</span>
                          <span className="text-gray-500">({companion.reviews})</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">亮點：</div>
                        <div className="flex flex-wrap gap-1">
                          {companion.highlights.map((highlight) => (
                            <Badge key={highlight} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">語言：</div>
                        <div className="flex flex-wrap gap-1">
                          {companion.languages.map((language) => (
                            <Badge key={language} variant="secondary" className="text-xs">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-lg font-bold text-green-600">
                          {t.currency}
                          {companion.price.toLocaleString()}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">{t.joinTravel}</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>邀請 {companion.companion} 共遊</DialogTitle>
                              <DialogDescription>請填寫以下資訊發送共遊邀請</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="name">姓名</Label>
                                  <Input
                                    id="name"
                                    value={bookingData.name}
                                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                    placeholder="請輸入姓名"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="email">電子郵件</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={bookingData.email}
                                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                    placeholder="請輸入郵件"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="phone">聯絡電話</Label>
                                  <Input
                                    id="phone"
                                    value={bookingData.phone}
                                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                    placeholder="請輸入電話"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="guests">參與人數</Label>
                                  <Select
                                    value={bookingData.guests.toString()}
                                    onValueChange={(value) =>
                                      setBookingData({ ...bookingData, guests: Number.parseInt(value) })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1 人</SelectItem>
                                      <SelectItem value="2">2 人</SelectItem>
                                      <SelectItem value="3">3 人</SelectItem>
                                      <SelectItem value="4">4 人</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="date">預計出遊日期</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !selectedDate && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {selectedDate ? format(selectedDate, "PPP") : "選擇日期"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={selectedDate}
                                      onSelect={setSelectedDate}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>

                              <div>
                                <Label htmlFor="message">行程規劃</Label>
                                <Textarea
                                  id="message"
                                  value={bookingData.message}
                                  onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                                  placeholder="請告訴我們您的行程規劃或想法"
                                  rows={3}
                                />
                              </div>

                              <div className="flex justify-between items-center pt-4">
                                <Button onClick={() => handleTravelInvite(companion.id)}>發送邀請</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 共遊活動列表 */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">共遊活動</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-blue-500">{activity.category}</Badge>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {activity.organizer} • {activity.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{activity.rating}</span>
                          <span className="text-gray-500">({activity.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{activity.date}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>

                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">亮點：</div>
                        <div className="flex flex-wrap gap-1">
                          {activity.highlights.map((highlight) => (
                            <Badge key={highlight} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">包含內容：</div>
                        <div className="flex flex-wrap gap-1">
                          {activity.includes.map((item) => (
                            <Badge key={item} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-lg font-bold text-green-600">
                          {t.currency}
                          {activity.price.toLocaleString()}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              {activity.currentParticipants < activity.maxParticipants ? t.joinNow : "已額滿"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>報名 {activity.title}</DialogTitle>
                              <DialogDescription>請填寫以下資訊完成報名</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="name">姓名</Label>
                                  <Input
                                    id="name"
                                    value={bookingData.name}
                                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                    placeholder="請輸入姓名"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="email">電子郵件</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={bookingData.email}
                                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                    placeholder="請輸入郵件"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="phone">聯絡電話</Label>
                                  <Input
                                    id="phone"
                                    value={bookingData.phone}
                                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                    placeholder="請輸入電話"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="guests">參與人數</Label>
                                  <Select
                                    value={bookingData.guests.toString()}
                                    onValueChange={(value) =>
                                      setBookingData({ ...bookingData, guests: Number.parseInt(value) })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1 人</SelectItem>
                                      <SelectItem value="2">2 人</SelectItem>
                                      <SelectItem value="3">3 人</SelectItem>
                                      <SelectItem value="4">4 人</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="message">特殊需求</Label>
                                <Textarea
                                  id="message"
                                  value={bookingData.message}
                                  onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                                  placeholder="請告訴我們您的特殊需求或問題"
                                  rows={3}
                                />
                              </div>

                              <div className="flex justify-between items-center pt-4">
                                <Button onClick={() => handleActivityJoin(activity.id)}>確認報名</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </MembershipGate>
        </TabsContent>

        {/* 參加語言交流 */}
        <TabsContent value="language" className="space-y-6">
          <MembershipGate feature="參加語言交流">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <Users className="inline-block h-6 w-6 mr-2" />
                {t.tabs.language}
              </h2>
              <p className="text-lg text-gray-600">與來自世界各地的朋友交流，提升語言能力</p>

              {/* 新增活動按鈕 */}
              <div className="mt-4">
                <Button variant="outline" onClick={() => handleAddActivity("language")}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addActivity.language}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {languageExchanges.map((exchange) => (
                <Card key={exchange.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={exchange.image || "/placeholder.svg"}
                      alt={exchange.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{exchange.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {exchange.organizer} • {exchange.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{exchange.participants}</span>
                        <span className="text-gray-500">人參加</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{exchange.duration}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{exchange.description}</p>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">語言：</div>
                      <div className="flex flex-wrap gap-1">
                        {exchange.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-lg font-bold text-green-600">
                        {t.currency}
                        {exchange.price.toLocaleString()}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">{t.registerNow}</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>報名 {exchange.title}</DialogTitle>
                            <DialogDescription>請填寫以下資訊完成報名</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">姓名</Label>
                                <Input
                                  id="name"
                                  value={bookingData.name}
                                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                  placeholder="請輸入姓名"
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">電子郵件</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={bookingData.email}
                                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                  placeholder="請輸入郵件"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="phone">聯絡電話</Label>
                                <Input
                                  id="phone"
                                  value={bookingData.phone}
                                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                  placeholder="請輸入電話"
                                />
                              </div>
                              <div>
                                <Label htmlFor="guests">參與人數</Label>
                                <Select
                                  value={bookingData.guests.toString()}
                                  onValueChange={(value) =>
                                    setBookingData({ ...bookingData, guests: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 人</SelectItem>
                                    <SelectItem value="2">2 人</SelectItem>
                                    <SelectItem value="3">3 人</SelectItem>
                                    <SelectItem value="4">4 人</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="message">特殊需求</Label>
                              <Textarea
                                id="message"
                                value={bookingData.message}
                                onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                                placeholder="請告訴我們您的特殊需求或問題"
                                rows={3}
                              />
                            </div>

                            <div className="flex justify-between items-center pt-4">
                              <Button onClick={() => handleLanguageJoin(exchange.id)}>確認參加</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </MembershipGate>
        </TabsContent>

        {/* 報名專家課程 */}
        <TabsContent value="courses" className="space-y-6">
          <MembershipGate feature="報名專家課程">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <GraduationCap className="inline-block h-6 w-6 mr-2" />
                {t.tabs.courses}
              </h2>
              <p className="text-lg text-gray-600">與行業專家學習，提升專業技能</p>

              {/* 新增活動按鈕 */}
              <div className="mt-4">
                <Button variant="outline" onClick={() => handleAddActivity("courses")}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addActivity.courses}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    {course.certificate && <Badge className="absolute top-2 right-2 bg-yellow-500">結業證書</Badge>}
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {course.instructor}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-gray-500">({course.students})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{course.duration}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">主題：</div>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-lg font-bold text-green-600">
                        {t.currency}
                        {course.price.toLocaleString()}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">{t.confirmRegistration}</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>確認報名 {course.title}</DialogTitle>
                            <DialogDescription>請填寫以下資訊完成報名</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">姓名</Label>
                                <Input
                                  id="name"
                                  value={bookingData.name}
                                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                  placeholder="請輸入姓名"
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">電子郵件</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={bookingData.email}
                                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                  placeholder="請輸入郵件"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="phone">聯絡電話</Label>
                                <Input
                                  id="phone"
                                  value={bookingData.phone}
                                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                  placeholder="請輸入電話"
                                />
                              </div>
                              <div>
                                <Label htmlFor="guests">參與人數</Label>
                                <Select
                                  value={bookingData.guests.toString()}
                                  onValueChange={(value) =>
                                    setBookingData({ ...bookingData, guests: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 人</SelectItem>
                                    <SelectItem value="2">2 人</SelectItem>
                                    <SelectItem value="3">3 人</SelectItem>
                                    <SelectItem value="4">4 人</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="message">特殊需求</Label>
                              <Textarea
                                id="message"
                                value={bookingData.message}
                                onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                                placeholder="請告訴我們您的特殊需求或問題"
                                rows={3}
                              />
                            </div>

                            <div className="flex justify-between items-center pt-4">
                              <Button onClick={() => handleCourseConfirm(course.id)}>確認報名</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </MembershipGate>
        </TabsContent>
      </Tabs>
    </div>
  )
}

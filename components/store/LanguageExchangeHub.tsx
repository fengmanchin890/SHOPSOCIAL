"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Globe, 
  Users, 
  GraduationCap, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Star, 
  Filter,
  Clock,
  BookOpen,
  Video,
  Laptop,
  UserPlus,
  School
} from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

interface LanguagePartner {
  id: string
  name: string
  avatar: string
  age: number
  gender: string
  nationality: string
  nativeLanguages: string[]
  learningLanguages: string[]
  proficiency: Record<string, "beginner" | "intermediate" | "advanced" | "native">
  interests: string[]
  availability: string
  location: string
  bio: string
  lastActive: string
  rating: number
  reviews: number
}

interface LanguageCourse {
  id: string
  title: string
  language: string
  level: string
  format: string
  schedule: string
  location: string
  price: string
  instructor: {
    name: string
    avatar: string
    rating: number
    reviews: number
  }
  description: string
  features: string[]
  maxStudents: number
  currentStudents: number
}

interface LanguageEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  languages: string[]
  attendees: number
  maxAttendees: number
  organizer: {
    name: string
    avatar: string
  }
  price: string
  tags: string[]
}

export function LanguageExchangeHub() {
  const { language } = useI18n()
  const [activeTab, setActiveTab] = useState("partners")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const getLocalizedText = () => {
    const texts = {
      zh: {
        title: "語言交流中心",
        searchPlaceholder: "搜尋語言夥伴、課程或活動...",
        partners: "語言夥伴",
        courses: "語言課程",
        events: "語言活動",
        resources: "學習資源",
        filter: "篩選",
        languages: "語言",
        level: "程度",
        location: "地點",
        availability: "可用時間",
        interests: "興趣",
        apply: "套用篩選",
        reset: "重置",
        nativeLanguage: "母語",
        learning: "學習中",
        lastActive: "最近活動",
        connect: "聯繫",
        viewProfile: "查看資料",
        beginner: "初學者",
        intermediate: "中級",
        advanced: "高級",
        native: "母語者",
        registerCourse: "報名課程",
        joinEvent: "參加活動",
        attendees: "參加者",
        organizer: "組織者",
        price: "價格",
        free: "免費",
        features: "特色",
        schedule: "時間表",
        instructor: "講師",
        format: "形式",
        inPerson: "實體",
        online: "線上",
        hybrid: "混合",
        viewAll: "查看全部",
        findPartner: "尋找夥伴"
      },
      vi: {
        title: "Trung tâm trao đổi ngôn ngữ",
        searchPlaceholder: "Tìm kiếm đối tác ngôn ngữ, khóa học hoặc sự kiện...",
        partners: "Đối tác ngôn ngữ",
        courses: "Khóa học ngôn ngữ",
        events: "Sự kiện ngôn ngữ",
        resources: "Tài nguyên học tập",
        filter: "Lọc",
        languages: "Ngôn ngữ",
        level: "Trình độ",
        location: "Địa điểm",
        availability: "Thời gian rảnh",
        interests: "Sở thích",
        apply: "Áp dụng bộ lọc",
        reset: "Đặt lại",
        nativeLanguage: "Tiếng mẹ đẻ",
        learning: "Đang học",
        lastActive: "Hoạt động gần đây",
        connect: "Kết nối",
        viewProfile: "Xem hồ sơ",
        beginner: "Người mới",
        intermediate: "Trung cấp",
        advanced: "Nâng cao",
        native: "Bản ngữ",
        registerCourse: "Đăng ký khóa học",
        joinEvent: "Tham gia sự kiện",
        attendees: "Người tham dự",
        organizer: "Người tổ chức",
        price: "Giá",
        free: "Miễn phí",
        features: "Tính năng",
        schedule: "Lịch trình",
        instructor: "Giảng viên",
        format: "Hình thức",
        inPerson: "Trực tiếp",
        online: "Trực tuyến",
        hybrid: "Kết hợp",
        viewAll: "Xem tất cả",
        findPartner: "Tìm đối tác"
      },
      en: {
        title: "Language Exchange Hub",
        searchPlaceholder: "Search language partners, courses, or events...",
        partners: "Language Partners",
        courses: "Language Courses",
        events: "Language Events",
        resources: "Learning Resources",
        filter: "Filter",
        languages: "Languages",
        level: "Level",
        location: "Location",
        availability: "Availability",
        interests: "Interests",
        apply: "Apply Filters",
        reset: "Reset",
        nativeLanguage: "Native Language",
        learning: "Learning",
        lastActive: "Last Active",
        connect: "Connect",
        viewProfile: "View Profile",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        native: "Native",
        registerCourse: "Register Course",
        joinEvent: "Join Event",
        attendees: "Attendees",
        organizer: "Organizer",
        price: "Price",
        free: "Free",
        features: "Features",
        schedule: "Schedule",
        instructor: "Instructor",
        format: "Format",
        inPerson: "In Person",
        online: "Online",
        hybrid: "Hybrid",
        viewAll: "View All",
        findPartner: "Find Partner"
      }
    }
    
    if (language === "zh-TW") return texts.zh
    if (language === "vi") return texts.vi
    return texts.en
  }
  
  const texts = getLocalizedText()

  // Sample language partners data
  const partners: LanguagePartner[] = [
    {
      id: "partner-1",
      name: "Emily Chen",
      avatar: "/placeholder.svg?height=80&width=80&text=EC",
      age: 28,
      gender: "Female",
      nationality: "Taiwan",
      nativeLanguages: ["Chinese"],
      learningLanguages: ["English", "Japanese"],
      proficiency: {
        "Chinese": "native",
        "English": "advanced",
        "Japanese": "beginner"
      },
      interests: ["Travel", "Movies", "Cooking", "Reading"],
      availability: "Weekends, Evenings",
      location: "Taipei",
      bio: "Hi! I'm a software engineer looking to improve my English and Japanese. I can help with Chinese in return. I enjoy discussing technology, travel, and food.",
      lastActive: "Today",
      rating: 4.8,
      reviews: 12
    },
    {
      id: "partner-2",
      name: "John Smith",
      avatar: "/placeholder.svg?height=80&width=80&text=JS",
      age: 32,
      gender: "Male",
      nationality: "USA",
      nativeLanguages: ["English"],
      learningLanguages: ["Chinese", "Korean"],
      proficiency: {
        "English": "native",
        "Chinese": "intermediate",
        "Korean": "beginner"
      },
      interests: ["Hiking", "Photography", "History", "Music"],
      availability: "Weekday afternoons",
      location: "Taipei",
      bio: "English teacher from California living in Taipei for 3 years. Looking to improve my Chinese and start learning Korean. Happy to help with English conversation and writing.",
      lastActive: "Yesterday",
      rating: 4.9,
      reviews: 24
    },
    {
      id: "partner-3",
      name: "Nguyen Minh",
      avatar: "/placeholder.svg?height=80&width=80&text=NM",
      age: 25,
      gender: "Female",
      nationality: "Vietnam",
      nativeLanguages: ["Vietnamese"],
      learningLanguages: ["Chinese", "English"],
      proficiency: {
        "Vietnamese": "native",
        "Chinese": "intermediate",
        "English": "advanced"
      },
      interests: ["Dancing", "Cooking", "Languages", "Travel"],
      availability: "Weekends, Friday evenings",
      location: "Taichung",
      bio: "Graduate student from Vietnam studying International Business. Looking for language exchange partners to practice Chinese and English. I can teach Vietnamese in return.",
      lastActive: "2 days ago",
      rating: 4.7,
      reviews: 8
    }
  ]

  // Sample language courses data
  const courses: LanguageCourse[] = [
    {
      id: "course-1",
      title: language === "zh-TW" ? "實用中文會話課程" : 
             language === "vi" ? "Khóa học hội thoại tiếng Trung thực tế" : 
             "Practical Chinese Conversation Course",
      language: "Chinese",
      level: "Beginner to Intermediate",
      format: "In-person",
      schedule: "Tuesdays & Thursdays, 19:00-21:00",
      location: "Taipei Language Center, Daan District",
      price: "NT$6,000 / 8 weeks",
      instructor: {
        name: "Prof. Lin",
        avatar: "/placeholder.svg?height=40&width=40&text=Lin",
        rating: 4.9,
        reviews: 45
      },
      description: language === "zh-TW" ? "專為外國人設計的實用中文會話課程，著重於日常對話和實用表達。小班教學，每班最多8名學生。" : 
                   language === "vi" ? "Khóa học hội thoại tiếng Trung thực tế được thiết kế cho người nước ngoài, tập trung vào giao tiếp hàng ngày và biểu đạt thực tế. Lớp học nhỏ với tối đa 8 học viên." : 
                   "Practical Chinese conversation course designed for foreigners, focusing on everyday communication and practical expressions. Small class size with maximum 8 students.",
      features: [
        "Small class size (max 8 students)",
        "Native speaker instructor",
        "Textbook included",
        "Weekly practice sessions",
        "Cultural activities"
      ],
      maxStudents: 8,
      currentStudents: 5
    },
    {
      id: "course-2",
      title: language === "zh-TW" ? "商業英語線上課程" : 
             language === "vi" ? "Khóa học tiếng Anh thương mại trực tuyến" : 
             "Business English Online Course",
      language: "English",
      level: "Intermediate to Advanced",
      format: "Online",
      schedule: "Flexible - 10 hours of content",
      location: "Online",
      price: "NT$4,500",
      instructor: {
        name: "Sarah Wilson",
        avatar: "/placeholder.svg?height=40&width=40&text=SW",
        rating: 4.8,
        reviews: 37
      },
      description: language === "zh-TW" ? "專為專業人士設計的商業英語課程，涵蓋會議、簡報、電子郵件和談判等主題。靈活的線上學習，可按照自己的節奏完成。" : 
                   language === "vi" ? "Khóa học tiếng Anh thương mại được thiết kế cho các chuyên gia, bao gồm các chủ đề như cuộc họp, thuyết trình, email và đàm phán. Học trực tuyến linh hoạt, có thể hoàn thành theo tốc độ của riêng bạn." : 
                   "Business English course designed for professionals, covering topics such as meetings, presentations, emails, and negotiations. Flexible online learning that can be completed at your own pace.",
      features: [
        "Self-paced learning",
        "Business-focused content",
        "Practice exercises",
        "Certificate upon completion",
        "1 year access"
      ],
      maxStudents: 100,
      currentStudents: 42
    }
  ]

  // Sample language events data
  const events: LanguageEvent[] = [
    {
      id: "event-1",
      title: language === "zh-TW" ? "多語言交流咖啡聚會" : 
             language === "vi" ? "Gặp gỡ cà phê trao đổi đa ngôn ngữ" : 
             "Multilingual Exchange Coffee Meetup",
      description: language === "zh-TW" ? "輕鬆的咖啡廳聚會，練習各種語言。所有程度的學習者都歡迎參加。每週輪換不同的語言桌。" : 
                   language === "vi" ? "Gặp gỡ tại quán cà phê thoải mái để thực hành các ngôn ngữ khác nhau. Chào đón người học ở mọi trình độ. Các bàn ngôn ngữ khác nhau luân phiên hàng tuần." : 
                   "Casual cafe meetup to practice various languages. Learners of all levels welcome. Different language tables rotate each week.",
      date: "2024-03-10",
      time: "14:00-16:00",
      location: "Cafe Lingua, Xinyi District, Taipei",
      languages: ["Chinese", "English", "Japanese", "Korean", "Spanish"],
      attendees: 18,
      maxAttendees: 30,
      organizer: {
        name: "Taipei Language Exchange Club",
        avatar: "/placeholder.svg?height=40&width=40&text=TLEC"
      },
      price: "Free (purchase your own drinks)",
      tags: ["casual", "multilingual", "weekly", "beginner-friendly"]
    },
    {
      id: "event-2",
      title: language === "zh-TW" ? "中文電影之夜與討論" : 
             language === "vi" ? "Đêm phim tiếng Trung và thảo luận" : 
             "Chinese Movie Night & Discussion",
      description: language === "zh-TW" ? "觀看中文電影（有英文字幕），之後進行語言和文化討論。適合中級及以上的中文學習者。" : 
                   language === "vi" ? "Xem phim tiếng Trung (có phụ đề tiếng Anh) với thảo luận ngôn ngữ và văn hóa sau đó. Phù hợp cho người học tiếng Trung trình độ trung cấp trở lên." : 
                   "Watch a Chinese movie (with English subtitles) followed by language and cultural discussion. Suitable for intermediate Chinese learners and above.",
      date: "2024-03-15",
      time: "19:00-22:00",
      location: "Community Center, Daan District, Taipei",
      languages: ["Chinese", "English"],
      attendees: 12,
      maxAttendees: 20,
      organizer: {
        name: "Chinese Culture Club",
        avatar: "/placeholder.svg?height=40&width=40&text=CCC"
      },
      price: "NT$100 (includes snacks)",
      tags: ["movie", "discussion", "cultural", "intermediate"]
    }
  ]

  const filteredPartners = partners.filter(partner => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        partner.name.toLowerCase().includes(query) ||
        partner.nationality.toLowerCase().includes(query) ||
        partner.nativeLanguages.some(lang => lang.toLowerCase().includes(query)) ||
        partner.learningLanguages.some(lang => lang.toLowerCase().includes(query)) ||
        partner.interests.some(interest => interest.toLowerCase().includes(query)) ||
        partner.location.toLowerCase().includes(query)
      )
    }
    
    if (selectedLanguages.length > 0) {
      return (
        partner.nativeLanguages.some(lang => selectedLanguages.includes(lang)) ||
        partner.learningLanguages.some(lang => selectedLanguages.includes(lang))
      )
    }
    
    return true
  })

  const filteredCourses = courses.filter(course => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        course.title.toLowerCase().includes(query) ||
        course.language.toLowerCase().includes(query) ||
        course.level.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.location.toLowerCase().includes(query)
      )
    }
    
    if (selectedLanguages.length > 0) {
      return selectedLanguages.includes(course.language)
    }
    
    return true
  })

  const filteredEvents = events.filter(event => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.languages.some(lang => lang.toLowerCase().includes(query)) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    if (selectedLanguages.length > 0) {
      return event.languages.some(lang => selectedLanguages.includes(lang))
    }
    
    return true
  })

  const handleLanguageToggle = (lang: string) => {
    setSelectedLanguages(prev => 
      prev.includes(lang) 
        ? prev.filter(l => l !== lang) 
        : [...prev, lang]
    )
  }

  const allLanguages = Array.from(new Set([
    ...partners.flatMap(p => [...p.nativeLanguages, ...p.learningLanguages]),
    ...courses.map(c => c.language),
    ...events.flatMap(e => e.languages)
  ]))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 mr-2 text-green-600" />
          {texts.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={texts.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">{texts.languages}</h3>
                <div className="flex flex-wrap gap-2">
                  {allLanguages.map(lang => (
                    <Badge 
                      key={lang} 
                      variant={selectedLanguages.includes(lang) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleLanguageToggle(lang)}
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedLanguages([])}
                >
                  {texts.reset}
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  {texts.apply}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="partners" className="flex items-center">
              <Users className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">{texts.partners}</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">{texts.courses}</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">{texts.events}</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">{texts.resources}</span>
            </TabsTrigger>
          </TabsList>

          {/* Language Partners Tab */}
          <TabsContent value="partners" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{texts.findPartner}</h3>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                {texts.findPartner}
              </Button>
            </div>
            
            {filteredPartners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPartners.map(partner => (
                  <Card key={partner.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={partner.avatar} />
                          <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{partner.name}</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{partner.location}</span>
                                <span className="mx-2">•</span>
                                <span>{partner.age}, {partner.gender}</span>
                              </div>
                            </div>
                            <Badge variant="outline">{partner.nationality}</Badge>
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center">
                              <span className="text-xs font-medium mr-2">{texts.nativeLanguage}:</span>
                              <div className="flex flex-wrap gap-1">
                                {partner.nativeLanguages.map(lang => (
                                  <Badge key={lang} variant="secondary" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="text-xs font-medium mr-2">{texts.learning}:</span>
                              <div className="flex flex-wrap gap-1">
                                {partner.learningLanguages.map(lang => (
                                  <Badge key={lang} variant="outline" className="text-xs">
                                    {lang} ({
                                      partner.proficiency[lang] === "beginner" ? texts.beginner :
                                      partner.proficiency[lang] === "intermediate" ? texts.intermediate :
                                      partner.proficiency[lang] === "advanced" ? texts.advanced :
                                      texts.native
                                    })
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{texts.lastActive}: {partner.lastActive}</span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                {texts.viewProfile}
                              </Button>
                              <Button size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {texts.connect}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No language partners found matching your criteria</p>
              </div>
            )}
            
            <div className="text-center">
              <Button variant="outline">
                {texts.viewAll}
              </Button>
            </div>
          </TabsContent>

          {/* Language Courses Tab */}
          <TabsContent value="courses" className="space-y-4 mt-4">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCourses.map(course => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg">{course.title}</h3>
                          <Badge>
                            {course.language}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="flex items-center text-sm">
                            <GraduationCap className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{course.level}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            {course.format === "In-person" ? (
                              <Users className="h-4 w-4 text-gray-500 mr-1" />
                            ) : course.format === "Online" ? (
                              <Laptop className="h-4 w-4 text-gray-500 mr-1" />
                            ) : (
                              <Video className="h-4 w-4 text-gray-500 mr-1" />
                            )}
                            <span>
                              {course.format === "In-person" ? texts.inPerson :
                               course.format === "Online" ? texts.online :
                               texts.hybrid}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{course.location}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{course.schedule}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-3">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={course.instructor.avatar} />
                            <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{texts.instructor}: {course.instructor.name}</p>
                            <div className="flex items-center text-xs">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span>{course.instructor.rating} ({course.instructor.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="font-medium">{course.price}</div>
                          <Button>
                            {texts.registerCourse}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <School className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No language courses found matching your criteria</p>
              </div>
            )}
          </TabsContent>

          {/* Language Events Tab */}
          <TabsContent value="events" className="space-y-4 mt-4">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg">{event.title}</h3>
                          <Badge variant={event.price.includes("Free") ? "secondary" : "outline"}>
                            {event.price.includes("Free") ? texts.free : event.price}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.languages.map(lang => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{event.date}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{event.time}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{texts.attendees}: {event.attendees}/{event.maxAttendees}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-3">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={event.organizer.avatar} />
                            <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{texts.organizer}: {event.organizer.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <Button>
                            {texts.joinEvent}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No language events found matching your criteria</p>
              </div>
            )}
          </TabsContent>

          {/* Learning Resources Tab */}
          <TabsContent value="resources" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center h-32 bg-blue-50 rounded-lg mb-4">
                    <BookOpen className="h-16 w-16 text-blue-500" />
                  </div>
                  <h3 className="font-medium text-center mb-2">
                    {language === "zh-TW" ? "線上學習資源" : 
                     language === "vi" ? "Tài nguyên học trực tuyến" : 
                     "Online Learning Resources"}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {language === "zh-TW" ? "免費和付費的語言學習網站、應用和工具集合" : 
                     language === "vi" ? "Tập hợp các trang web, ứng dụng và công cụ học ngôn ngữ miễn phí và trả phí" : 
                     "Collection of free and paid language learning websites, apps, and tools"}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center h-32 bg-green-50 rounded-lg mb-4">
                    <Video className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="font-medium text-center mb-2">
                    {language === "zh-TW" ? "視頻教程庫" : 
                     language === "vi" ? "Thư viện hướng dẫn video" : 
                     "Video Tutorial Library"}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {language === "zh-TW" ? "按語言和程度分類的教學視頻集合" : 
                     language === "vi" ? "Bộ sưu tập video hướng dẫn được phân loại theo ngôn ngữ và trình độ" : 
                     "Collection of instructional videos categorized by language and level"}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center h-32 bg-purple-50 rounded-lg mb-4">
                    <MessageSquare className="h-16 w-16 text-purple-500" />
                  </div>
                  <h3 className="font-medium text-center mb-2">
                    {language === "zh-TW" ? "語言學習社區" : 
                     language === "vi" ? "Cộng đồng học ngôn ngữ" : 
                     "Language Learning Community"}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {language === "zh-TW" ? "加入討論組，分享資源，並與其他學習者聯繫" : 
                     language === "vi" ? "Tham gia các nhóm thảo luận, chia sẻ tài nguyên và kết nối với những người học khác" : 
                     "Join discussion groups, share resources, and connect with other learners"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
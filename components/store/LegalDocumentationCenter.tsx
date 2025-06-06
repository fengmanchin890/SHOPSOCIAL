"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Search, 
  Download, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  FileQuestion,
  FilePlus,
  FileSearch,
  FileCheck
} from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

interface Document {
  id: string
  title: string
  description: string
  category: string
  languages: string[]
  downloadUrl: string
  lastUpdated: string
  views: number
}

interface Procedure {
  id: string
  title: string
  description: string
  steps: {
    number: number
    title: string
    description: string
    estimatedTime: string
    requiredDocuments: string[]
  }[]
  category: string
  difficulty: "easy" | "medium" | "hard"
  estimatedTime: string
  officialLink: string
}

export function LegalDocumentationCenter() {
  const { language } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("documents")

  const getLocalizedText = () => {
    const texts = {
      zh: {
        title: "法律與文件中心",
        searchPlaceholder: "搜尋文件、程序或常見問題...",
        documents: "文件範本",
        procedures: "申請程序",
        reminders: "重要提醒",
        faq: "常見問題",
        download: "下載",
        lastUpdated: "最後更新",
        views: "瀏覽次數",
        steps: "步驟",
        difficulty: "難度",
        estimatedTime: "預計時間",
        officialLink: "官方連結",
        easy: "簡單",
        medium: "中等",
        hard: "困難",
        upcoming: "即將到期",
        noReminders: "沒有即將到期的提醒",
        viewAll: "查看全部",
        languages: "語言"
      },
      vi: {
        title: "Trung tâm pháp lý và tài liệu",
        searchPlaceholder: "Tìm kiếm tài liệu, thủ tục hoặc câu hỏi thường gặp...",
        documents: "Mẫu tài liệu",
        procedures: "Thủ tục đăng ký",
        reminders: "Nhắc nhở quan trọng",
        faq: "Câu hỏi thường gặp",
        download: "Tải xuống",
        lastUpdated: "Cập nhật lần cuối",
        views: "Lượt xem",
        steps: "Các bước",
        difficulty: "Độ khó",
        estimatedTime: "Thời gian ước tính",
        officialLink: "Liên kết chính thức",
        easy: "Dễ",
        medium: "Trung bình",
        hard: "Khó",
        upcoming: "Sắp đến hạn",
        noReminders: "Không có nhắc nhở sắp đến hạn",
        viewAll: "Xem tất cả",
        languages: "Ngôn ngữ"
      },
      en: {
        title: "Legal & Documentation Center",
        searchPlaceholder: "Search documents, procedures, or FAQs...",
        documents: "Document Templates",
        procedures: "Application Procedures",
        reminders: "Important Reminders",
        faq: "Frequently Asked Questions",
        download: "Download",
        lastUpdated: "Last Updated",
        views: "Views",
        steps: "Steps",
        difficulty: "Difficulty",
        estimatedTime: "Estimated Time",
        officialLink: "Official Link",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        upcoming: "Upcoming",
        noReminders: "No upcoming reminders",
        viewAll: "View All",
        languages: "Languages"
      }
    }
    
    if (language === "zh-TW") return texts.zh
    if (language === "vi") return texts.vi
    return texts.en
  }
  
  const texts = getLocalizedText()

  // Sample documents data
  const documents: Document[] = [
    {
      id: "doc-1",
      title: language === "zh-TW" ? "外國人居留證申請表" : 
             language === "vi" ? "Đơn xin thẻ cư trú cho người nước ngoài" : 
             "ARC Application Form",
      description: language === "zh-TW" ? "申請或更新外國人居留證所需的官方表格" : 
                   language === "vi" ? "Mẫu đơn chính thức cần thiết để đăng ký hoặc gia hạn thẻ cư trú cho người nước ngoài" : 
                   "Official form required for applying for or renewing an Alien Resident Certificate",
      category: "visa",
      languages: ["English", "中文", "Tiếng Việt", "日本語"],
      downloadUrl: "#",
      lastUpdated: "2024-01-15",
      views: 1245
    },
    {
      id: "doc-2",
      title: language === "zh-TW" ? "工作許可申請指南" : 
             language === "vi" ? "Hướng dẫn xin giấy phép lao động" : 
             "Work Permit Application Guide",
      description: language === "zh-TW" ? "在台灣申請工作許可的詳細步驟和要求" : 
                   language === "vi" ? "Các bước và yêu cầu chi tiết để xin giấy phép lao động tại Đài Loan" : 
                   "Detailed steps and requirements for applying for a work permit in Taiwan",
      category: "work",
      languages: ["English", "中文", "Tiếng Việt"],
      downloadUrl: "#",
      lastUpdated: "2024-02-10",
      views: 876
    },
    {
      id: "doc-3",
      title: language === "zh-TW" ? "租房合約範本" : 
             language === "vi" ? "Mẫu hợp đồng thuê nhà" : 
             "Rental Agreement Template",
      description: language === "zh-TW" ? "適合外國人的雙語租房合約範本，包含重要條款和條件" : 
                   language === "vi" ? "Mẫu hợp đồng thuê nhà song ngữ phù hợp cho người nước ngoài, bao gồm các điều khoản và điều kiện quan trọng" : 
                   "Bilingual rental agreement template suitable for foreigners, including important terms and conditions",
      category: "housing",
      languages: ["English", "中文"],
      downloadUrl: "#",
      lastUpdated: "2024-01-28",
      views: 932
    }
  ]

  // Sample procedures data
  const procedures: Procedure[] = [
    {
      id: "proc-1",
      title: language === "zh-TW" ? "外國人居留證（ARC）申請流程" : 
             language === "vi" ? "Quy trình đăng ký thẻ cư trú (ARC)" : 
             "Alien Resident Certificate (ARC) Application Process",
      description: language === "zh-TW" ? "在台灣申請外國人居留證的完整指南" : 
                   language === "vi" ? "Hướng dẫn đầy đủ về cách đăng ký thẻ cư trú cho người nước ngoài tại Đài Loan" : 
                   "Complete guide on how to apply for an Alien Resident Certificate in Taiwan",
      steps: [
        {
          number: 1,
          title: language === "zh-TW" ? "準備所需文件" : 
                 language === "vi" ? "Chuẩn bị tài liệu cần thiết" : 
                 "Prepare Required Documents",
          description: language === "zh-TW" ? "收集護照、簽證、照片和其他必要文件" : 
                       language === "vi" ? "Thu thập hộ chiếu, thị thực, ảnh và các tài liệu cần thiết khác" : 
                       "Gather passport, visa, photos, and other necessary documents",
          estimatedTime: "1-2 days",
          requiredDocuments: ["Passport", "Visa", "Photos", "Application Form"]
        },
        {
          number: 2,
          title: language === "zh-TW" ? "前往移民署" : 
                 language === "vi" ? "Đến Cục Di trú" : 
                 "Visit Immigration Office",
          description: language === "zh-TW" ? "前往當地移民署辦公室提交申請" : 
                       language === "vi" ? "Đến văn phòng Cục Di trú địa phương để nộp đơn" : 
                       "Go to your local immigration office to submit your application",
          estimatedTime: "2-3 hours",
          requiredDocuments: ["All prepared documents", "Application fee"]
        },
        {
          number: 3,
          title: language === "zh-TW" ? "繳交費用並領取收據" : 
                 language === "vi" ? "Thanh toán phí và nhận biên lai" : 
                 "Pay Fee and Receive Receipt",
          description: language === "zh-TW" ? "支付申請費用並獲取收據和領取日期" : 
                       language === "vi" ? "Thanh toán phí đăng ký và nhận biên lai cùng ngày nhận" : 
                       "Pay the application fee and get a receipt with a pickup date",
          estimatedTime: "15-30 minutes",
          requiredDocuments: ["Payment method"]
        },
        {
          number: 4,
          title: language === "zh-TW" ? "領取ARC" : 
                 language === "vi" ? "Nhận ARC" : 
                 "Collect ARC",
          description: language === "zh-TW" ? "在指定日期返回移民署領取您的ARC" : 
                       language === "vi" ? "Quay lại Cục Di trú vào ngày được chỉ định để nhận ARC của bạn" : 
                       "Return to the immigration office on the designated date to collect your ARC",
          estimatedTime: "30 minutes",
          requiredDocuments: ["Receipt", "Passport"]
        }
      ],
      category: "visa",
      difficulty: "medium",
      estimatedTime: "1-2 weeks",
      officialLink: "https://www.immigration.gov.tw"
    },
    {
      id: "proc-2",
      title: language === "zh-TW" ? "開設銀行帳戶流程" : 
             language === "vi" ? "Quy trình mở tài khoản ngân hàng" : 
             "Bank Account Opening Process",
      description: language === "zh-TW" ? "外國人在台灣開設銀行帳戶的步驟指南" : 
                   language === "vi" ? "Hướng dẫn từng bước để người nước ngoài mở tài khoản ngân hàng tại Đài Loan" : 
                   "Step-by-step guide for foreigners to open a bank account in Taiwan",
      steps: [
        {
          number: 1,
          title: language === "zh-TW" ? "選擇適合的銀行" : 
                 language === "vi" ? "Chọn ngân hàng phù hợp" : 
                 "Choose a Suitable Bank",
          description: language === "zh-TW" ? "研究並選擇對外國人友好的銀行" : 
                       language === "vi" ? "Nghiên cứu và chọn ngân hàng thân thiện với người nước ngoài" : 
                       "Research and select a foreigner-friendly bank",
          estimatedTime: "1 day",
          requiredDocuments: []
        },
        {
          number: 2,
          title: language === "zh-TW" ? "準備所需文件" : 
                 language === "vi" ? "Chuẩn bị tài liệu cần thiết" : 
                 "Prepare Required Documents",
          description: language === "zh-TW" ? "收集護照、ARC、地址證明和其他必要文件" : 
                       language === "vi" ? "Thu thập hộ chiếu, ARC, chứng minh địa chỉ và các tài liệu cần thiết khác" : 
                       "Gather passport, ARC, proof of address, and other necessary documents",
          estimatedTime: "1-2 days",
          requiredDocuments: ["Passport", "ARC", "Proof of Address", "Tax ID (if available)"]
        },
        {
          number: 3,
          title: language === "zh-TW" ? "前往銀行分行" : 
                 language === "vi" ? "Đến chi nhánh ngân hàng" : 
                 "Visit Bank Branch",
          description: language === "zh-TW" ? "親自前往銀行分行並填寫申請表" : 
                       language === "vi" ? "Đến chi nhánh ngân hàng trực tiếp và điền vào đơn đăng ký" : 
                       "Go to the bank branch in person and fill out application forms",
          estimatedTime: "1-2 hours",
          requiredDocuments: ["All prepared documents", "Initial deposit amount"]
        },
        {
          number: 4,
          title: language === "zh-TW" ? "開設帳戶並獲取銀行卡" : 
                 language === "vi" ? "Mở tài khoản và nhận thẻ ngân hàng" : 
                 "Open Account and Get Bank Card",
          description: language === "zh-TW" ? "完成開戶流程並領取您的銀行卡和帳戶資訊" : 
                       language === "vi" ? "Hoàn tất quá trình mở tài khoản và nhận thẻ ngân hàng cùng thông tin tài khoản của bạn" : 
                       "Complete the account opening process and receive your bank card and account information",
          estimatedTime: "30 minutes - 1 hour",
          requiredDocuments: []
        }
      ],
      category: "financial",
      difficulty: "easy",
      estimatedTime: "1-3 days",
      officialLink: ""
    }
  ]

  // Sample reminders
  const reminders = [
    {
      id: "reminder-1",
      title: language === "zh-TW" ? "ARC更新提醒" : 
             language === "vi" ? "Nhắc nhở gia hạn ARC" : 
             "ARC Renewal Reminder",
      description: language === "zh-TW" ? "您的外國人居留證將在30天內到期。請準備必要文件進行更新。" : 
                   language === "vi" ? "Thẻ cư trú của bạn sẽ hết hạn trong 30 ngày. Vui lòng chuẩn bị các tài liệu cần thiết để gia hạn." : 
                   "Your Alien Resident Certificate will expire in 30 days. Please prepare necessary documents for renewal.",
      dueDate: "2024-03-15",
      category: "visa",
      priority: "high"
    },
    {
      id: "reminder-2",
      title: language === "zh-TW" ? "健保卡更新" : 
             language === "vi" ? "Cập nhật thẻ bảo hiểm y tế" : 
             "Health Insurance Card Update",
      description: language === "zh-TW" ? "請在下個月前往健保署更新您的健保卡資訊。" : 
                   language === "vi" ? "Vui lòng đến Cục Bảo hiểm Y tế để cập nhật thông tin thẻ bảo hiểm của bạn vào tháng tới." : 
                   "Please visit the Health Insurance Bureau to update your health insurance card information next month.",
      dueDate: "2024-04-10",
      category: "healthcare",
      priority: "medium"
    }
  ]

  // Sample FAQs
  const faqs = [
    {
      id: "faq-1",
      question: language === "zh-TW" ? "我如何申請工作許可？" : 
                language === "vi" ? "Làm thế nào để đăng ký giấy phép lao động?" : 
                "How do I apply for a work permit?",
      answer: language === "zh-TW" ? "外國人在台灣工作需要申請工作許可。申請流程包括準備必要文件（如護照、學歷證明、工作合約）、填寫申請表並提交給勞動部。處理時間通常為7-10個工作日。" : 
              language === "vi" ? "Người nước ngoài làm việc tại Đài Loan cần đăng ký giấy phép lao động. Quy trình đăng ký bao gồm chuẩn bị các tài liệu cần thiết (như hộ chiếu, bằng cấp, hợp đồng làm việc), điền vào mẫu đơn và nộp cho Bộ Lao động. Thời gian xử lý thường là 7-10 ngày làm việc." : 
              "Foreigners working in Taiwan need to apply for a work permit. The application process includes preparing necessary documents (such as passport, educational certificates, work contract), filling out the application form, and submitting it to the Ministry of Labor. Processing time is typically 7-10 working days.",
      category: "work"
    },
    {
      id: "faq-2",
      question: language === "zh-TW" ? "我可以用外國駕照在台灣開車嗎？" : 
                language === "vi" ? "Tôi có thể lái xe ở Đài Loan bằng bằng lái xe nước ngoài không?" : 
                "Can I drive in Taiwan with a foreign driver's license?",
      answer: language === "zh-TW" ? "您可以使用國際駕照在台灣開車最多一年。如果您計劃在台灣長期居住，建議將您的外國駕照轉換為台灣駕照。轉換過程需要您的原始駕照、ARC、護照和健康檢查證明。" : 
              language === "vi" ? "Bạn có thể lái xe ở Đài Loan với bằng lái xe quốc tế tối đa một năm. Nếu bạn dự định cư trú dài hạn tại Đài Loan, bạn nên chuyển đổi bằng lái xe nước ngoài của mình thành bằng lái xe Đài Loan. Quá trình chuyển đổi yêu cầu bằng lái xe gốc, ARC, hộ chiếu và giấy chứng nhận kiểm tra sức khỏe của bạn." : 
              "You can drive in Taiwan with an International Driving Permit for up to one year. If you plan to reside in Taiwan long-term, it's recommended to convert your foreign driver's license to a Taiwanese one. The conversion process requires your original license, ARC, passport, and health check certificate.",
      category: "transport"
    },
    {
      id: "faq-3",
      question: language === "zh-TW" ? "外國人如何在台灣開設銀行帳戶？" : 
                language === "vi" ? "Người nước ngoài mở tài khoản ngân hàng ở Đài Loan như thế nào?" : 
                "How can foreigners open a bank account in Taiwan?",
      answer: language === "zh-TW" ? "外國人可以在台灣開設銀行帳戶，但需要有效的ARC。您需要攜帶護照、ARC、台灣手機號碼和地址證明前往銀行。某些銀行對外國人更友好，如兆豐銀行和台灣銀行。建議提前致電確認具體要求。" : 
              language === "vi" ? "Người nước ngoài có thể mở tài khoản ngân hàng tại Đài Loan, nhưng cần có ARC hợp lệ. Bạn cần mang theo hộ chiếu, ARC, số điện thoại di động Đài Loan và chứng minh địa chỉ đến ngân hàng. Một số ngân hàng thân thiện hơn với người nước ngoài, như Ngân hàng Mega và Ngân hàng Đài Loan. Nên gọi trước để xác nhận các yêu cầu cụ thể." : 
              "Foreigners can open bank accounts in Taiwan, but a valid ARC is required. You need to bring your passport, ARC, Taiwan mobile number, and proof of address to the bank. Some banks are more foreigner-friendly, such as Mega Bank and Bank of Taiwan. It's advisable to call ahead to confirm specific requirements.",
      category: "financial"
    }
  ]

  const filteredDocuments = documents.filter(doc => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query)
      )
    }
    return true
  })

  const filteredProcedures = procedures.filter(proc => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        proc.title.toLowerCase().includes(query) ||
        proc.description.toLowerCase().includes(query) ||
        proc.category.toLowerCase().includes(query)
      )
    }
    return true
  })

  const filteredFaqs = faqs.filter(faq => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
      )
    }
    return true
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          {texts.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={texts.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="documents" className="flex items-center">
              <FileText className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">{texts.documents}</span>
            </TabsTrigger>
            <TabsTrigger value="procedures" className="flex items-center">
              <FileCheck className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">{texts.procedures}</span>
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">{texts.reminders}</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center">
              <FileQuestion className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">{texts.faq}</span>
            </TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4 mt-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map(doc => (
                <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{doc.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {doc.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {texts.languages}: {doc.languages.join(", ")}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.downloadUrl} download>
                          <Download className="h-4 w-4 mr-1" />
                          {texts.download}
                        </a>
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div>
                        <Clock className="h-4 w-4 inline mr-1" />
                        {texts.lastUpdated}: {doc.lastUpdated}
                      </div>
                      <div>
                        <Eye className="h-4 w-4 inline mr-1" />
                        {texts.views}: {doc.views}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <FileSearch className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No documents found matching your search</p>
              </div>
            )}
          </TabsContent>

          {/* Procedures Tab */}
          <TabsContent value="procedures" className="space-y-4 mt-4">
            {filteredProcedures.length > 0 ? (
              filteredProcedures.map(proc => (
                <Card key={proc.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{proc.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{proc.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {proc.category}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              proc.difficulty === "easy" ? "bg-green-100 text-green-800" : 
                              proc.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" : 
                              "bg-red-100 text-red-800"
                            }`}
                          >
                            {texts.difficulty}: {
                              proc.difficulty === "easy" ? texts.easy : 
                              proc.difficulty === "medium" ? texts.medium : 
                              texts.hard
                            }
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {texts.estimatedTime}: {proc.estimatedTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-sm">{texts.steps}:</h4>
                      {proc.steps.map(step => (
                        <div key={step.number} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2">
                            {step.number}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{step.title}</p>
                            <p className="text-xs text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {proc.officialLink && (
                      <div className="mt-4 text-right">
                        <Button size="sm" asChild>
                          <a href={proc.officialLink} target="_blank" rel="noopener noreferrer">
                            {texts.officialLink}
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <FileSearch className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No procedures found matching your search</p>
              </div>
            )}
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
                  {texts.upcoming}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reminders.length > 0 ? (
                  <div className="space-y-4">
                    {reminders.map(reminder => (
                      <div key={reminder.id} className="flex items-start p-3 border rounded-lg">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          reminder.priority === "high" ? "bg-red-100 text-red-800" : 
                          reminder.priority === "medium" ? "bg-yellow-100 text-yellow-800" : 
                          "bg-blue-100 text-blue-800"
                        }`}>
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{reminder.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                          <div className="flex items-center mt-2">
                            <Badge variant="outline" className="text-xs mr-2">
                              {reminder.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {texts.dueDate}: {reminder.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 mx-auto text-green-300 mb-4" />
                    <p className="text-gray-500">{texts.noReminders}</p>
                  </div>
                )}
                
                <div className="mt-4 text-center">
                  <Button variant="outline">
                    {texts.viewAll}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-4 mt-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map(faq => (
                <Card key={faq.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div>
                      <h3 className="font-medium text-lg flex items-start">
                        <FileQuestion className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-sm text-gray-600 mt-3 ml-7">{faq.answer}</p>
                      
                      <div className="mt-3 ml-7">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <FileSearch className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No FAQs found matching your search</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
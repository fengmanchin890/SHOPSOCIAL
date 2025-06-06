"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Globe, X, Minimize, Maximize } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function HelpDeskChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useI18n()

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initial bot message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage()
      setMessages([
        {
          id: "welcome",
          content: welcomeMessage,
          sender: "bot",
          timestamp: new Date()
        }
      ])
    }
  }, [isOpen, messages.length])

  const getWelcomeMessage = () => {
    switch (language) {
      case "zh-TW":
        return "您好！我是您的虛擬助手。我可以幫助您解答關於生活服務平台的問題。請問您需要什麼幫助？"
      case "vi":
        return "Xin chào! Tôi là trợ lý ảo của bạn. Tôi có thể giúp bạn trả lời các câu hỏi về nền tảng dịch vụ đời sống. Bạn cần giúp đỡ gì?"
      case "th":
        return "สวัสดี! ฉันเป็นผู้ช่วยเสมือนของคุณ ฉันสามารถช่วยตอบคำถามเกี่ยวกับแพลตฟอร์มบริการไลฟ์สไตล์ คุณต้องการความช่วยเหลืออะไร?"
      case "id":
        return "Halo! Saya asisten virtual Anda. Saya dapat membantu menjawab pertanyaan tentang platform layanan kehidupan. Apa yang bisa saya bantu?"
      case "ja":
        return "こんにちは！私はあなたの仮想アシスタントです。ライフサービスプラットフォームに関するご質問にお答えします。どのようにお手伝いできますか？"
      case "ko":
        return "안녕하세요! 저는 가상 비서입니다. 라이프 서비스 플랫폼에 관한 질문에 답변해 드릴 수 있습니다. 어떤 도움이 필요하신가요?"
      default:
        return "Hello! I'm your virtual assistant. I can help answer questions about the Life Services Platform. How can I help you today?"
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const getBotResponse = (query: string) => {
    const lowerQuery = query.toLowerCase()
    
    // Simple pattern matching for responses
    if (lowerQuery.includes("visa") || lowerQuery.includes("arc") || lowerQuery.includes("permit")) {
      return getLocalizedResponse("legal")
    } else if (lowerQuery.includes("language") || lowerQuery.includes("chinese") || lowerQuery.includes("english") || 
               lowerQuery.includes("learn") || lowerQuery.includes("speak")) {
      return getLocalizedResponse("language")
    } else if (lowerQuery.includes("food") || lowerQuery.includes("restaurant") || lowerQuery.includes("eat")) {
      return getLocalizedResponse("food")
    } else if (lowerQuery.includes("house") || lowerQuery.includes("apartment") || lowerQuery.includes("rent") || 
               lowerQuery.includes("accommodation")) {
      return getLocalizedResponse("accommodation")
    } else if (lowerQuery.includes("hospital") || lowerQuery.includes("doctor") || lowerQuery.includes("medical") || 
               lowerQuery.includes("health")) {
      return getLocalizedResponse("healthcare")
    } else if (lowerQuery.includes("bank") || lowerQuery.includes("money") || lowerQuery.includes("transfer") || 
               lowerQuery.includes("financial")) {
      return getLocalizedResponse("financial")
    } else {
      return getLocalizedResponse("general")
    }
  }

  const getLocalizedResponse = (type: string) => {
    const responses: Record<string, Record<string, string>> = {
      legal: {
        "zh-TW": "關於簽證和居留證的信息可以在「法律與文件」部分找到。我們提供簽證申請指南、ARC更新提醒和文件翻譯服務。您需要更具體的信息嗎？",
        "vi": "Thông tin về visa và thẻ cư trú có thể được tìm thấy trong phần 'Pháp lý & Tài liệu'. Chúng tôi cung cấp hướng dẫn đăng ký visa, nhắc nhở gia hạn ARC và dịch vụ dịch thuật tài liệu. Bạn cần thông tin cụ thể hơn không?",
        "en": "Information about visas and residence cards can be found in the 'Legal & Documentation' section. We offer visa application guides, ARC renewal reminders, and document translation services. Do you need more specific information?"
      },
      language: {
        "zh-TW": "我們的「語言交流」部分提供語言課程、語言交換活動和線上輔導服務。您可以找到中文課程、英語交流小組和其他語言學習資源。您想了解哪種語言學習選項？",
        "vi": "Phần 'Trao đổi ngôn ngữ' của chúng tôi cung cấp các khóa học ngôn ngữ, hoạt động trao đổi ngôn ngữ và dịch vụ gia sư trực tuyến. Bạn có thể tìm thấy các khóa học tiếng Trung, nhóm trao đổi tiếng Anh và các nguồn học ngôn ngữ khác. Bạn muốn tìm hiểu về lựa chọn học ngôn ngữ nào?",
        "en": "Our 'Language Exchange' section offers language courses, language exchange events, and online tutoring services. You can find Chinese classes, English conversation groups, and other language learning resources. Which language learning option are you interested in?"
      },
      food: {
        "zh-TW": "在「美食體驗」部分，您可以找到餐廳推薦、烹飪課程和美食之旅。我們的智能發現系統可以根據您的口味偏好和位置推薦餐廳。您想探索哪種類型的美食？",
        "vi": "Trong phần 'Trải nghiệm ẩm thực', bạn có thể tìm thấy các đề xuất nhà hàng, lớp học nấu ăn và tour ẩm thực. Hệ thống khám phá thông minh của chúng tôi có thể đề xuất nhà hàng dựa trên sở thích và vị trí của bạn. Bạn muốn khám phá loại ẩm thực nào?",
        "en": "In the 'Food Experience' section, you can find restaurant recommendations, cooking classes, and food tours. Our smart discovery system can recommend restaurants based on your taste preferences and location. What type of cuisine would you like to explore?"
      },
      accommodation: {
        "zh-TW": "我們的「住宿交換」部分提供租房列表、室友匹配和短期住宿選項。所有房東都經過驗證，對外國人友好。您正在尋找什麼類型的住宿？",
        "vi": "Phần 'Trao đổi nhà ở' của chúng tôi cung cấp danh sách cho thuê, ghép bạn cùng phòng và các lựa chọn chỗ ở ngắn hạn. Tất cả chủ nhà đều được xác minh và thân thiện với người nước ngoài. Bạn đang tìm kiếm loại chỗ ở nào?",
        "en": "Our 'Housing Exchange' section offers rental listings, roommate matching, and short-term accommodation options. All landlords are verified and foreigner-friendly. What type of accommodation are you looking for?"
      },
      healthcare: {
        "zh-TW": "在「醫療服務」部分，您可以找到外國人友好的醫院和診所目錄、健康保險指南和心理健康支持資源。您需要什麼類型的醫療信息？",
        "vi": "Trong phần 'Dịch vụ y tế', bạn có thể tìm thấy danh mục các bệnh viện và phòng khám thân thiện với người nước ngoài, hướng dẫn bảo hiểm y tế và nguồn hỗ trợ sức khỏe tâm thần. Bạn cần loại thông tin y tế nào?",
        "en": "In the 'Healthcare Services' section, you can find a directory of foreigner-friendly hospitals and clinics, health insurance guides, and mental health support resources. What type of medical information do you need?"
      },
      financial: {
        "zh-TW": "我們的「金融服務」部分提供開設銀行賬戶指南、外國人友好銀行列表和國際匯款服務比較。您需要什麼類型的金融幫助？",
        "vi": "Phần 'Dịch vụ tài chính' của chúng tôi cung cấp hướng dẫn mở tài khoản ngân hàng, danh sách ngân hàng thân thiện với người nước ngoài và so sánh dịch vụ chuyển tiền quốc tế. Bạn cần loại hỗ trợ tài chính nào?",
        "en": "Our 'Financial Services' section offers bank account opening guides, foreigner-friendly bank listings, and international money transfer service comparisons. What type of financial assistance do you need?"
      },
      general: {
        "zh-TW": "我可以幫助您了解我們平台上的各種服務，包括美食體驗、住宿交換、一起探索、語言交流和多元文化資源。您對哪個領域最感興趣？",
        "vi": "Tôi có thể giúp bạn tìm hiểu về các dịch vụ khác nhau trên nền tảng của chúng tôi, bao gồm trải nghiệm ẩm thực, trao đổi nhà ở, cùng đi khám phá, trao đổi ngôn ngữ và tài nguyên đa văn hóa. Bạn quan tâm nhất đến lĩnh vực nào?",
        "en": "I can help you learn about the various services on our platform, including food experiences, housing exchange, exploring together, language exchange, and multicultural resources. Which area are you most interested in?"
      }
    }
    
    // Return response in user's language or fall back to English
    return responses[type][language] || responses[type]["en"]
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  if (!isOpen) {
    return (
      <Button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 md:w-96 shadow-xl rounded-lg transition-all duration-300 z-50 ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
      <Card className="h-full flex flex-col">
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b">
          <div className="flex items-center">
            <Bot className="h-5 w-5 text-blue-600 mr-2" />
            <CardTitle className="text-sm font-medium">
              {language === "zh-TW" ? "幫助中心" : 
               language === "vi" ? "Trung tâm trợ giúp" : 
               "Help Center"}
            </CardTitle>
            <Badge variant="outline" className="ml-2 text-xs">
              <Globe className="h-3 w-3 mr-1" />
              {language === "zh-TW" ? "多語言" : 
               language === "vi" ? "Đa ngôn ngữ" : 
               "Multilingual"}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={toggleMinimize}>
              {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8 mr-2">
                      {message.sender === 'bot' ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=Bot" />
                          <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" />
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div 
                      className={`rounded-lg px-3 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white ml-2' 
                          : 'bg-gray-100 text-gray-800 mr-2'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start max-w-[80%]">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=Bot" />
                      <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-3 py-2 bg-gray-100 text-gray-800">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>
            
            <div className="p-4 border-t">
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex space-x-2"
              >
                <Input
                  placeholder={
                    language === "zh-TW" ? "輸入您的問題..." : 
                    language === "vi" ? "Nhập câu hỏi của bạn..." : 
                    "Type your question..."
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                />
                <Button type="submit" size="sm" disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
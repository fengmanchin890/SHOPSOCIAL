"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "@/components/store/MembershipProvider"
import { MembershipUpgradeDialog } from "@/components/store/MembershipUpgradeDialog"
import { useI18n } from "@/contexts/i18n-context"

export default function LoginPage() {
  const router = useRouter()
  const { upgradeMembership } = useMembership()
  const { language } = useI18n()
  const [hasMounted, setHasMounted] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userType, setUserType] = useState<"student" | "married" | "worker">("student")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Prevent hydration mismatch by only rendering after client mount
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Check if user is already logged in
  useEffect(() => {
    if (!hasMounted) return
    
    const authStatus = localStorage.getItem("lifeTradeAuth")
    if (authStatus === "authenticated") {
      router.push("/store/life-trade")
    }
  }, [router, hasMounted])

  // Don't render anything until component has mounted on client
  if (!hasMounted) {
    return null
  }

  const getLocalizedText = () => {
    switch (language) {
      case "zh-TW":
        return {
          title: "登入",
          description: "使用手機號碼登入以訪問生活服務平台",
          phoneNumber: "手機號碼",
          enterPhone: "請輸入您的手機號碼",
          userType: "您是",
          student: "留學生",
          married: "外籍配偶",
          worker: "外籍工作者",
          loginButton: "繼續",
          processingButton: "處理中...",
          noAccount: "還沒有帳戶？",
          register: "註冊",
          trialMessage: "登入以獲得7天免費試用所有功能",
          learnMore: "了解更多關於會員方案"
        }
      case "vi":
        return {
          title: "Đăng nhập",
          description: "Đăng nhập bằng số điện thoại để truy cập nền tảng thương mại đời sống",
          phoneNumber: "Số điện thoại",
          enterPhone: "Nhập số điện thoại của bạn",
          userType: "Bạn là",
          student: "Sinh viên quốc tế",
          married: "Người nước ngoài kết hôn và định cư",
          worker: "Người lao động nước ngoài",
          loginButton: "Tiếp tục",
          processingButton: "Đang xử lý...",
          noAccount: "Chưa có tài khoản?",
          register: "Đăng ký",
          trialMessage: "Đăng nhập để trải nghiệm 7 ngày miễn phí tất cả tính năng",
          learnMore: "Tìm hiểu thêm về gói thành viên"
        }
      default:
        return {
          title: "Login",
          description: "Login with your phone number to access the Life Services Platform",
          phoneNumber: "Phone Number",
          enterPhone: "Enter your phone number",
          userType: "You are",
          student: "International Student",
          married: "Foreign Spouse",
          worker: "Foreign Worker",
          loginButton: "Continue",
          processingButton: "Processing...",
          noAccount: "Don't have an account?",
          register: "Register",
          trialMessage: "Login to get a 7-day free trial of all features",
          learnMore: "Learn more about membership plans"
        }
    }
  }
  
  const texts = getLocalizedText()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: language === "zh-TW" ? "手機號碼無效" : 
               language === "vi" ? "Số điện thoại không hợp lệ" : 
               "Invalid phone number",
        description: language === "zh-TW" ? "請輸入有效的手機號碼" : 
                     language === "vi" ? "Vui lòng nhập số điện thoại hợp lệ" : 
                     "Please enter a valid phone number",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call to check if phone number exists
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store login data for verification
      localStorage.setItem("pendingLogin", JSON.stringify({
        phoneNumber,
        userType
      }))
      
      // Redirect to verification page
      router.push(`/store/verify?phone=${encodeURIComponent(phoneNumber)}&action=login`)
    } catch (error) {
      toast({
        title: language === "zh-TW" ? "登入失敗" : 
               language === "vi" ? "Đăng nhập thất bại" : 
               "Login Failed",
        description: language === "zh-TW" ? "登入時發生錯誤，請稍後再試" : 
                     language === "vi" ? "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau." : 
                     "An error occurred during login. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{texts.title}</h1>
          <p className="text-gray-600">{texts.description}</p>
        </div>

        <Card>
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>{texts.title}</CardTitle>
              <CardDescription>{texts.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{texts.phoneNumber}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={texts.enterPhone}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userType">{texts.userType}</Label>
                <Select value={userType} onValueChange={(value: "student" | "married" | "worker") => setUserType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={texts.userType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">{texts.student}</SelectItem>
                    <SelectItem value="married">{texts.married}</SelectItem>
                    <SelectItem value="worker">{texts.worker}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? texts.processingButton : texts.loginButton}
              </Button>
              
              <div className="text-center text-sm">
                {texts.noAccount} <Link href="/store/register" className="text-blue-600 hover:underline">{texts.register}</Link>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            {texts.trialMessage}
          </p>
          <MembershipUpgradeDialog>
            <Button variant="outline">{texts.learnMore}</Button>
          </MembershipUpgradeDialog>
        </div>
      </div>
    </div>
  )
}
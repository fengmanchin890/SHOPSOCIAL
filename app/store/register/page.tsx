"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { TargetAudienceSelector } from "@/components/store/TargetAudienceSelector"
import { useI18n } from "@/contexts/i18n-context"

export default function RegisterPage() {
  const router = useRouter()
  const { language } = useI18n()
  const [hasMounted, setHasMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Registration form
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    nationality: "",
    userType: "student" as "student" | "married" | "worker",
    agreeTerms: false,
  })

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
          title: "註冊帳戶",
          description: "創建帳戶以訪問平台的所有功能",
          fullName: "姓名",
          phoneNumber: "手機號碼",
          email: "電子郵件",
          nationality: "國籍",
          userType: "您是",
          student: "留學生",
          married: "外籍配偶",
          worker: "外籍工作者",
          agreeTerms: "我同意條款和條件",
          registerButton: "註冊",
          processingButton: "處理中...",
          alreadyHaveAccount: "已有帳戶？",
          login: "登入",
          namePlaceholder: "請輸入您的全名",
          phonePlaceholder: "請輸入您的手機號碼",
          emailPlaceholder: "請輸入您的電子郵件",
          nationalityPlaceholder: "請輸入您的國籍"
        }
      case "vi":
        return {
          title: "Đăng ký tài khoản",
          description: "Tạo tài khoản để truy cập đầy đủ tính năng của nền tảng",
          fullName: "Họ và tên",
          phoneNumber: "Số điện thoại",
          email: "Email",
          nationality: "Quốc tịch",
          userType: "Bạn là",
          student: "Sinh viên quốc tế",
          married: "Người nước ngoài kết hôn và định cư",
          worker: "Người lao động nước ngoài",
          agreeTerms: "Tôi đồng ý với các điều khoản và điều kiện",
          registerButton: "Đăng ký",
          processingButton: "Đang xử lý...",
          alreadyHaveAccount: "Đã có tài khoản?",
          login: "Đăng nhập",
          namePlaceholder: "Nhập họ và tên đầy đủ",
          phonePlaceholder: "Nhập số điện thoại của bạn",
          emailPlaceholder: "Nhập địa chỉ email của bạn",
          nationalityPlaceholder: "Nhập quốc tịch của bạn"
        }
      default:
        return {
          title: "Register Account",
          description: "Create an account to access all features of the platform",
          fullName: "Full Name",
          phoneNumber: "Phone Number",
          email: "Email",
          nationality: "Nationality",
          userType: "You are",
          student: "International Student",
          married: "Foreign Spouse",
          worker: "Foreign Worker",
          agreeTerms: "I agree to the terms and conditions",
          registerButton: "Register",
          processingButton: "Processing...",
          alreadyHaveAccount: "Already have an account?",
          login: "Login",
          namePlaceholder: "Enter your full name",
          phonePlaceholder: "Enter your phone number",
          emailPlaceholder: "Enter your email address",
          nationalityPlaceholder: "Enter your nationality"
        }
    }
  }
  
  const texts = getLocalizedText()

  const handleUserTypeSelect = (type: "student" | "married" | "worker") => {
    setRegisterForm({...registerForm, userType: type})
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!registerForm.fullName || !registerForm.phoneNumber || !registerForm.nationality) {
      toast({
        title: language === "zh-TW" ? "資料不完整" : 
               language === "vi" ? "Thông tin không đầy đủ" : 
               "Incomplete Information",
        description: language === "zh-TW" ? "請填寫所有必填欄位" : 
                     language === "vi" ? "Vui lòng điền đầy đủ thông tin bắt buộc" : 
                     "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    
    if (!registerForm.agreeTerms) {
      toast({
        title: language === "zh-TW" ? "尚未同意條款" : 
               language === "vi" ? "Chưa đồng ý điều khoản" : 
               "Terms Not Accepted",
        description: language === "zh-TW" ? "請同意條款和條件" : 
                     language === "vi" ? "Vui lòng đồng ý với điều khoản và điều kiện" : 
                     "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store registration data in localStorage for verification
      localStorage.setItem("pendingRegistration", JSON.stringify({
        fullName: registerForm.fullName,
        phoneNumber: registerForm.phoneNumber,
        email: registerForm.email,
        nationality: registerForm.nationality,
        userType: registerForm.userType
      }))
      
      toast({
        title: language === "zh-TW" ? "註冊成功" : 
               language === "vi" ? "Đăng ký thành công" : 
               "Registration Successful",
        description: language === "zh-TW" ? "請驗證您的手機號碼以完成註冊" : 
                     language === "vi" ? "Vui lòng xác minh số điện thoại của bạn để hoàn tất đăng ký" : 
                     "Please verify your phone number to complete registration",
      })
      
      // Redirect to verification page
      router.push(`/store/verify?phone=${encodeURIComponent(registerForm.phoneNumber)}`)
    } catch (error) {
      toast({
        title: language === "zh-TW" ? "註冊失敗" : 
               language === "vi" ? "Đăng ký thất bại" : 
               "Registration Failed",
        description: language === "zh-TW" ? "註冊時發生錯誤，請稍後再試" : 
                     language === "vi" ? "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau." : 
                     "An error occurred during registration. Please try again later.",
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
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle>{texts.title}</CardTitle>
              <CardDescription>{texts.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TargetAudienceSelector 
                onSelect={handleUserTypeSelect}
                selectedType={registerForm.userType}
              />
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="fullName">{texts.fullName} *</Label>
                <Input
                  id="fullName"
                  placeholder={texts.namePlaceholder}
                  value={registerForm.fullName}
                  onChange={(e) => setRegisterForm({...registerForm, fullName: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registerPhone">{texts.phoneNumber} *</Label>
                <Input
                  id="registerPhone"
                  type="tel"
                  placeholder={texts.phonePlaceholder}
                  value={registerForm.phoneNumber}
                  onChange={(e) => setRegisterForm({...registerForm, phoneNumber: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{texts.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={texts.emailPlaceholder}
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationality">{texts.nationality} *</Label>
                <Input
                  id="nationality"
                  placeholder={texts.nationalityPlaceholder}
                  value={registerForm.nationality}
                  onChange={(e) => setRegisterForm({...registerForm, nationality: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={registerForm.agreeTerms}
                  onCheckedChange={(checked) => 
                    setRegisterForm({...registerForm, agreeTerms: checked as boolean})
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {texts.agreeTerms}
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? texts.processingButton : texts.registerButton}
              </Button>
              
              <div className="text-center text-sm">
                {texts.alreadyHaveAccount} <Link href="/store/login" className="text-blue-600 hover:underline">{texts.login}</Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "@/components/store/MembershipProvider"
import { useI18n } from "@/contexts/i18n-context"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { upgradeMembership } = useMembership()
  const { language } = useI18n()
  
  const [hasMounted, setHasMounted] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [action, setAction] = useState<"register" | "login">("register")
  
  // Prevent hydration mismatch by only rendering after client mount
  useEffect(() => {
    setHasMounted(true)
  }, [])
  
  // Get phone number and action from URL params
  useEffect(() => {
    if (!hasMounted) return
    
    const phone = searchParams.get("phone")
    const actionParam = searchParams.get("action")
    
    if (phone) {
      setPhoneNumber(phone)
      // Automatically send OTP when page loads
      handleSendOtp(phone)
    } else {
      // Redirect to login if no phone number
      router.push("/store/login")
    }
    
    if (actionParam === "login") {
      setAction("login")
    } else {
      setAction("register")
    }
  }, [searchParams, hasMounted, router])
  
  // Countdown timer for resend OTP
  useEffect(() => {
    if (!otpSent) return
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [otpSent])
  
  // Don't render anything until component has mounted on client
  if (!hasMounted) {
    return null
  }

  const getLocalizedText = () => {
    switch (language) {
      case "zh-TW":
        return {
          title: "驗證手機號碼",
          description: "我們已發送驗證碼至您的手機",
          otpCode: "驗證碼",
          enterOtp: "請輸入6位數驗證碼",
          resendOtp: "重新發送",
          resendIn: "重新發送 ({seconds}秒)",
          verifyButton: "驗證",
          processingButton: "處理中...",
          backToLogin: "返回登入",
          otpSent: "驗證碼已發送至",
          otpSentTitle: "已發送驗證碼",
          otpSentDesc: "驗證碼已發送至您的手機",
          verifySuccess: "驗證成功",
          verifySuccessDesc: "您的手機號碼已成功驗證",
          verifyFailed: "驗證失敗",
          verifyFailedDesc: "驗證碼不正確或已過期，請重試",
          invalidOtp: "驗證碼無效",
          invalidOtpDesc: "請輸入6位數驗證碼"
        }
      case "vi":
        return {
          title: "Xác minh số điện thoại",
          description: "Chúng tôi đã gửi mã xác minh đến điện thoại của bạn",
          otpCode: "Mã xác minh",
          enterOtp: "Nhập mã xác minh 6 chữ số",
          resendOtp: "Gửi lại mã",
          resendIn: "Gửi lại sau ({seconds}s)",
          verifyButton: "Xác minh",
          processingButton: "Đang xử lý...",
          backToLogin: "Quay lại đăng nhập",
          otpSent: "Mã xác minh đã được gửi đến",
          otpSentTitle: "Đã gửi mã xác minh",
          otpSentDesc: "Mã xác minh đã được gửi đến số điện thoại của bạn",
          verifySuccess: "Xác minh thành công",
          verifySuccessDesc: "Số điện thoại của bạn đã được xác minh thành công",
          verifyFailed: "Xác minh thất bại",
          verifyFailedDesc: "Mã xác minh không chính xác hoặc đã hết hạn. Vui lòng thử lại",
          invalidOtp: "Mã xác minh không hợp lệ",
          invalidOtpDesc: "Vui lòng nhập mã xác minh 6 chữ số"
        }
      default:
        return {
          title: "Verify Phone Number",
          description: "We've sent a verification code to your phone",
          otpCode: "Verification Code",
          enterOtp: "Enter 6-digit verification code",
          resendOtp: "Resend Code",
          resendIn: "Resend in ({seconds}s)",
          verifyButton: "Verify",
          processingButton: "Processing...",
          backToLogin: "Back to Login",
          otpSent: "Verification code sent to",
          otpSentTitle: "Code Sent",
          otpSentDesc: "Verification code has been sent to your phone",
          verifySuccess: "Verification Successful",
          verifySuccessDesc: "Your phone number has been successfully verified",
          verifyFailed: "Verification Failed",
          verifyFailedDesc: "The verification code is incorrect or has expired. Please try again",
          invalidOtp: "Invalid Verification Code",
          invalidOtpDesc: "Please enter a 6-digit verification code"
        }
    }
  }
  
  const texts = getLocalizedText()

  const handleSendOtp = async (phone: string) => {
    if (!phone || phone.length < 10) {
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

    setIsSendingOtp(true)
    
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setOtpSent(true)
      setCountdown(60)
      
      toast({
        title: texts.otpSentTitle,
        description: texts.otpSentDesc,
      })
    } catch (error) {
      toast({
        title: language === "zh-TW" ? "無法發送驗證碼" : 
               language === "vi" ? "Không thể gửi mã xác minh" : 
               "Could not send verification code",
        description: language === "zh-TW" ? "發送驗證碼時出錯，請稍後再試" : 
                     language === "vi" ? "Đã xảy ra lỗi khi gửi mã xác minh. Vui lòng thử lại sau." : 
                     "An error occurred while sending the verification code. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSendingOtp(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!otp || otp.length !== 6) {
      toast({
        title: texts.invalidOtp,
        description: texts.invalidOtpDesc,
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (action === "register") {
        // Get registration data from localStorage
        const registrationData = localStorage.getItem("pendingRegistration")
        if (registrationData) {
          const userData = JSON.parse(registrationData)
          
          // Save user data
          localStorage.setItem("lifeTradeUser", JSON.stringify({
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            nationality: userData.nationality,
            userType: userData.userType,
            joinDate: new Date().toISOString()
          }))
        }
      }
      
      // Save authentication state
      localStorage.setItem("lifeTradeAuth", "authenticated")
      localStorage.setItem("lifeTradeUserType", action === "register" ? 
        JSON.parse(localStorage.getItem("pendingRegistration") || "{}").userType || "student" : 
        JSON.parse(localStorage.getItem("pendingLogin") || "{}").userType || "student"
      )
      
      // Clean up pending data
      localStorage.removeItem("pendingRegistration")
      localStorage.removeItem("pendingLogin")
      
      // Automatically upgrade to trial membership if not already
      await upgradeMembership("trial", true)
      
      toast({
        title: texts.verifySuccess,
        description: texts.verifySuccessDesc,
      })
      
      // Redirect to main platform page
      router.push("/store/life-trade")
    } catch (error) {
      toast({
        title: texts.verifyFailed,
        description: texts.verifyFailedDesc,
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
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
          <form onSubmit={handleVerifyOtp}>
            <CardHeader>
              <CardTitle>{texts.title}</CardTitle>
              <CardDescription>
                {texts.otpSent} <strong>{phoneNumber}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">{texts.otpCode}</Label>
                <Input
                  id="otp"
                  placeholder={texts.enterOtp}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              
              <div className="text-center">
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0 h-auto text-sm"
                  onClick={() => handleSendOtp(phoneNumber)}
                  disabled={isSendingOtp || countdown > 0}
                >
                  {countdown > 0 ? texts.resendIn.replace("{seconds}", countdown.toString()) : texts.resendOtp}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full" 
                type="submit"
                disabled={isVerifying || !otp}
              >
                {isVerifying ? texts.processingButton : texts.verifyButton}
              </Button>
              
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  type="button" 
                  onClick={() => router.push("/store/login")}
                >
                  {texts.backToLogin}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
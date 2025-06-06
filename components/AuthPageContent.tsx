"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "@/components/store/MembershipProvider"
import { MembershipUpgradeDialog } from "@/components/store/MembershipUpgradeDialog"
import { TargetAudienceSelector } from "@/components/store/TargetAudienceSelector"
import { useI18n } from "@/contexts/i18n-context"

type Props = {
  searchParams: Record<string, string>
}

export default function AuthPageContent({ searchParams }: Props) {
  const router = useRouter()
  const { upgradeMembership } = useMembership()
  const { t, language } = useI18n()
  const [activeTab, setActiveTab] = useState("login")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [userType, setUserType] = useState<"student" | "married" | "worker">("student")
  const [agreeTerms, setAgreeTerms] = useState(false)
  
  // Registration form
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    nationality: "",
    userType: "student" as "student" | "married" | "worker",
    agreeTerms: false,
  })

  // Check if user is already logged in
  useEffect(() => {
    const authStatus = localStorage.getItem("lifeTradeAuth")
    if (authStatus === "authenticated") {
      router.push("/store/life-trade")
    }
  }, [router])

  const getLocalizedText = () => {
    const texts = {
      zh: {
        title: "生活服務平台",
        description: "連接在國外的台灣人和在台灣的外國人社區",
        login: "登入",
        register: "註冊",
        phoneNumber: "手機號碼",
        enterPhone: "請輸入您的手機號碼",
        otpCode: "驗證碼",
        enterOtp: "請輸入6位數驗證碼",
        otpSent: "驗證碼已發送至您的手機",
        resendOtp: "重新發送",
        userType: "您是",
        student: "留學生",
        married: "外籍配偶",
        worker: "外籍工作者",
        fullName: "姓名",
        email: "電子郵件",
        nationality: "國籍",
        agreeTerms: "我同意條款和條件",
        registerButton: "註冊",
        loginButton: "登入",
        processingButton: "處理中...",
        trialMessage: "登入以獲得7天免費試用所有功能",
        learnMore: "了解更多關於會員方案",
        verifyOtp: "驗證",
        sendOtp: "發送驗證碼"
      },
      vi: {
        title: "Nền tảng thương mại đời sống",
        description: "Kết nối cộng đồng người Việt tại nước ngoài và người nước ngoài tại Việt Nam",
        login: "Đăng nhập",
        register: "Đăng ký",
        phoneNumber: "Số điện thoại",
        enterPhone: "Nhập số điện thoại của bạn",
        otpCode: "Mã xác thực OTP",
        enterOtp: "Nhập mã OTP 6 chữ số",
        otpSent: "Mã xác thực đã được gửi đến số điện thoại",
        resendOtp: "Gửi lại mã",
        userType: "Bạn là",
        student: "Sinh viên quốc tế",
        married: "Người nước ngoài kết hôn và định cư",
        worker: "Người lao động nước ngoài",
        fullName: "Họ và tên",
        email: "Email",
        nationality: "Quốc tịch",
        agreeTerms: "Tôi đồng ý với các điều khoản và điều kiện",
        registerButton: "Đăng ký",
        loginButton: "Đăng nhập",
        processingButton: "Đang xử lý...",
        trialMessage: "Đăng nhập để trải nghiệm 7 ngày miễn phí tất cả tính năng",
        learnMore: "Tìm hiểu thêm về gói thành viên",
        verifyOtp: "Xác thực",
        sendOtp: "Gửi mã xác thực"
      },
      en: {
        title: "Life Services Platform",
        description: "Connecting international communities abroad and foreigners in the local country",
        login: "Login",
        register: "Register",
        phoneNumber: "Phone Number",
        enterPhone: "Enter your phone number",
        otpCode: "OTP Code",
        enterOtp: "Enter 6-digit OTP code",
        otpSent: "Verification code sent to your phone",
        resendOtp: "Resend code",
        userType: "You are",
        student: "International Student",
        married: "Foreign Spouse",
        worker: "Foreign Worker",
        fullName: "Full Name",
        email: "Email",
        nationality: "Nationality",
        agreeTerms: "I agree to the terms and conditions",
        registerButton: "Register",
        loginButton: "Login",
        processingButton: "Processing...",
        trialMessage: "Login to get a 7-day free trial of all features",
        learnMore: "Learn more about membership plans",
        verifyOtp: "Verify",
        sendOtp: "Send verification code"
      }
    }
    
    if (language === "zh-TW") return texts.zh
    if (language === "vi") return texts.vi
    return texts.en
  }
  
  const localizedText = getLocalizedText()

  const handleSendOtp = async () => {
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

    setIsSendingOtp(true)
    
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setOtpSent(true)
      toast({
        title: language === "zh-TW" ? "已發送驗證碼" : 
               language === "vi" ? "Đã gửi mã OTP" : 
               "OTP Sent",
        description: language === "zh-TW" ? "驗證碼已發送至您的手機" : 
                     language === "vi" ? "Mã xác thực đã được gửi đến số điện thoại của bạn" : 
                     "Verification code has been sent to your phone",
      })
    } catch (error) {
      toast({
        title: language === "zh-TW" ? "無法發送驗證碼" : 
               language === "vi" ? "Không thể gửi OTP" : 
               "Could not send OTP",
        description: language === "zh-TW" ? "發送驗證碼時出錯，請稍後再試" : 
                     language === "vi" ? "Đã xảy ra lỗi khi gửi mã OTP. Vui lòng thử lại sau." : 
                     "An error occurred while sending the verification code. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSendingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: language === "zh-TW" ? "驗證碼無效" : 
               language === "vi" ? "Mã OTP không hợp lệ" : 
               "Invalid OTP",
        description: language === "zh-TW" ? "請輸入6位數驗證碼" : 
                     language === "vi" ? "Vui lòng nhập mã OTP 6 chữ số" : 
                     "Please enter a 6-digit OTP code",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Save authentication state
      localStorage.setItem("lifeTradeAuth", "authenticated")
      localStorage.setItem("lifeTradeUserType", userType)
      
      // Automatically upgrade to trial membership if not already
      const hasTrial = await upgradeMembership("trial", true)
      
      toast({
        title: language === "zh-TW" ? "登入成功" : 
               language === "vi" ? "Đăng nhập thành công" : 
               "Login Successful",
        description: language === "zh-TW" ? "您已成功登入生活服務平台" : 
                     language === "vi" ? "Bạn đã đăng nhập thành công vào nền tảng thương mại đời sống" : 
                     "You have successfully logged in to the Life Services Platform",
      })
      
      // Redirect to main platform page
      router.push("/store/life-trade")
    } catch (error) {
      toast({
        title: language === "zh-TW" ? "驗證失敗" : 
               language === "vi" ? "Xác thực thất bại" : 
               "Verification Failed",
        description: language === "zh-TW" ? "驗證碼不正確或已過期，請重試" : 
                     language === "vi" ? "Mã OTP không chính xác hoặc đã hết hạn. Vui lòng thử lại." : 
                     "The OTP code is incorrect or has expired. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
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
    
    setIsSendingOtp(true)
    
    try {
      // Simulate registration and OTP sending
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Switch to login tab with the registered phone number
      setPhoneNumber(registerForm.phoneNumber)
      setUserType(registerForm.userType)
      setActiveTab("login")
      
      toast({
        title: language === "zh-TW" ? "註冊成功" : 
               language === "vi" ? "Đăng ký thành công" : 
               "Registration Successful",
        description: language === "zh-TW" ? "請使用您的手機號碼登入" : 
                     language === "vi" ? "Vui lòng đăng nhập bằng số điện thoại của bạn" : 
                     "Please login with your phone number",
      })
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
      setIsSendingOtp(false)
    }
  }

  const handleUserTypeSelect = (type: "student" | "married" | "worker") => {
    setUserType(type)
    setRegisterForm({...registerForm, userType: type})
  }

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{localizedText.title}</h1>
          <p className="text-gray-600">{localizedText.description}</p>
          {searchParams.token && (
            <p className="text-sm text-blue-600 mt-2">Token: {searchParams.token}</p>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{localizedText.login}</TabsTrigger>
            <TabsTrigger value="register">{localizedText.register}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>{localizedText.login}</CardTitle>
                <CardDescription>
                  {language === "zh-TW" 
                    ? "使用手機號碼登入以訪問生活服務平台" 
                    : language === "vi" 
                      ? "Đăng nhập bằng số điện thoại để truy cập nền tảng thương mại đời sống"
                      : "Login with your phone number to access the Life Services Platform"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{localizedText.phoneNumber}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={localizedText.enterPhone}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={otpSent}
                  />
                </div>
                
                {otpSent && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="otp">{localizedText.otpCode}</Label>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                      >
                        {localizedText.resendOtp}
                      </Button>
                    </div>
                    <Input
                      id="otp"
                      placeholder={localizedText.enterOtp}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                    />
                    <p className="text-xs text-gray-500">
                      {localizedText.otpSent} {phoneNumber}
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="userType">{localizedText.userType}</Label>
                  <Select value={userType} onValueChange={(value: "student" | "married" | "worker") => setUserType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={localizedText.userType} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">{localizedText.student}</SelectItem>
                      <SelectItem value="married">{localizedText.married}</SelectItem>
                      <SelectItem value="worker">{localizedText.worker}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                {!otpSent ? (
                  <Button 
                    className="w-full" 
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || !phoneNumber}
                  >
                    {isSendingOtp ? localizedText.processingButton : localizedText.sendOtp}
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={handleVerifyOtp}
                    disabled={isVerifying || !otp}
                  >
                    {isVerifying ? localizedText.processingButton : localizedText.verifyOtp}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>{localizedText.register}</CardTitle>
                  <CardDescription>
                    {language === "zh-TW" 
                      ? "創建帳戶以訪問平台的所有功能" 
                      : language === "vi" 
                        ? "Tạo tài khoản để truy cập đầy đủ tính năng của nền tảng"
                        : "Create an account to access all features of the platform"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TargetAudienceSelector 
                    onSelect={handleUserTypeSelect}
                    selectedType={registerForm.userType}
                  />
                  
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="fullName">{localizedText.fullName} *</Label>
                    <Input
                      id="fullName"
                      placeholder={language === "zh-TW" ? "請輸入您的全名" : language === "vi" ? "Nhập họ và tên đầy đủ" : "Enter your full name"}
                      value={registerForm.fullName}
                      onChange={(e) => setRegisterForm({...registerForm, fullName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerPhone">{localizedText.phoneNumber} *</Label>
                    <Input
                      id="registerPhone"
                      type="tel"
                      placeholder={localizedText.enterPhone}
                      value={registerForm.phoneNumber}
                      onChange={(e) => setRegisterForm({...registerForm, phoneNumber: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{localizedText.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === "zh-TW" ? "請輸入您的電子郵件" : language === "vi" ? "Nhập địa chỉ email của bạn" : "Enter your email address"}
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nationality">{localizedText.nationality} *</Label>
                    <Input
                      id="nationality"
                      placeholder={language === "zh-TW" ? "請輸入您的國籍" : language === "vi" ? "Nhập quốc tịch của bạn" : "Enter your nationality"}
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
                      {localizedText.agreeTerms}
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    type="submit"
                    disabled={isSendingOtp}
                  >
                    {isSendingOtp ? localizedText.processingButton : localizedText.registerButton}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            {localizedText.trialMessage}
          </p>
          <MembershipUpgradeDialog>
            <Button variant="outline">{localizedText.learnMore}</Button>
          </MembershipUpgradeDialog>
        </div>
      </div>
    </div>
  )
}
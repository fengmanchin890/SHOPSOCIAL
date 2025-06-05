"use client"

import { useState } from "react"
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

export default function AuthPage() {
  const router = useRouter()
  const { upgradeMembership } = useMembership()
  const [activeTab, setActiveTab] = useState("login")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [userType, setUserType] = useState<"student" | "married" | "worker">("student")
  const [agreeTerms, setAgreeTerms] = useState(false)
  
  // Đăng ký
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    nationality: "",
    userType: "student" as "student" | "married" | "worker",
    agreeTerms: false,
  })

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Số điện thoại không hợp lệ",
        description: "Vui lòng nhập số điện thoại hợp lệ",
        variant: "destructive",
      })
      return
    }

    setIsSendingOtp(true)
    
    try {
      // Mô phỏng gửi OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setOtpSent(true)
      toast({
        title: "Đã gửi mã OTP",
        description: "Mã xác thực đã được gửi đến số điện thoại của bạn",
      })
    } catch (error) {
      toast({
        title: "Không thể gửi OTP",
        description: "Đã xảy ra lỗi khi gửi mã OTP. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSendingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Mã OTP không hợp lệ",
        description: "Vui lòng nhập mã OTP 6 chữ số",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    
    try {
      // Mô phỏng xác thực OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Lưu trạng thái đăng nhập
      localStorage.setItem("lifeTradeAuth", "authenticated")
      localStorage.setItem("lifeTradeUserType", userType)
      
      // Tự động nâng cấp lên gói dùng thử nếu chưa có
      const hasTrial = await upgradeMembership("trial", true)
      
      toast({
        title: "Đăng nhập thành công",
        description: "Bạn đã đăng nhập thành công vào nền tảng thương mại đời sống",
      })
      
      // Chuyển hướng đến trang chính
      router.push("/store/life-trade")
    } catch (error) {
      toast({
        title: "Xác thực thất bại",
        description: "Mã OTP không chính xác hoặc đã hết hạn. Vui lòng thử lại.",
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
        title: "Thông tin không đầy đủ",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      })
      return
    }
    
    if (!registerForm.agreeTerms) {
      toast({
        title: "Chưa đồng ý điều khoản",
        description: "Vui lòng đồng ý với điều khoản và điều kiện",
        variant: "destructive",
      })
      return
    }
    
    setIsSendingOtp(true)
    
    try {
      // Mô phỏng đăng ký và gửi OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Chuyển sang tab đăng nhập với số điện thoại đã điền
      setPhoneNumber(registerForm.phoneNumber)
      setUserType(registerForm.userType)
      setActiveTab("login")
      
      toast({
        title: "Đăng ký thành công",
        description: "Vui lòng đăng nhập bằng số điện thoại của bạn",
      })
    } catch (error) {
      toast({
        title: "Đăng ký thất bại",
        description: "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSendingOtp(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nền tảng thương mại đời sống</h1>
          <p className="text-gray-600">Kết nối cộng đồng người Việt tại nước ngoài và người nước ngoài tại Việt Nam</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Đăng nhập</CardTitle>
                <CardDescription>
                  Đăng nhập bằng số điện thoại để truy cập nền tảng thương mại đời sống
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại của bạn"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={otpSent}
                  />
                </div>
                
                {otpSent && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="otp">Mã xác thực OTP</Label>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                      >
                        Gửi lại mã
                      </Button>
                    </div>
                    <Input
                      id="otp"
                      placeholder="Nhập mã OTP 6 chữ số"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                    />
                    <p className="text-xs text-gray-500">
                      Mã xác thực đã được gửi đến số điện thoại {phoneNumber}
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="userType">Bạn là</Label>
                  <Select value={userType} onValueChange={(value: "student" | "married" | "worker") => setUserType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại người dùng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Sinh viên quốc tế</SelectItem>
                      <SelectItem value="married">Người nước ngoài kết hôn và định cư</SelectItem>
                      <SelectItem value="worker">Người lao động nước ngoài</SelectItem>
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
                    {isSendingOtp ? "Đang gửi mã..." : "Gửi mã xác thực"}
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={handleVerifyOtp}
                    disabled={isVerifying || !otp}
                  >
                    {isVerifying ? "Đang xác thực..." : "Đăng nhập"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Đăng ký tài khoản</CardTitle>
                  <CardDescription>
                    Tạo tài khoản để truy cập đầy đủ tính năng của nền tảng
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên *</Label>
                    <Input
                      id="fullName"
                      placeholder="Nhập họ và tên đầy đủ"
                      value={registerForm.fullName}
                      onChange={(e) => setRegisterForm({...registerForm, fullName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerPhone">Số điện thoại *</Label>
                    <Input
                      id="registerPhone"
                      type="tel"
                      placeholder="Nhập số điện thoại của bạn"
                      value={registerForm.phoneNumber}
                      onChange={(e) => setRegisterForm({...registerForm, phoneNumber: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập địa chỉ email của bạn"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Quốc tịch *</Label>
                    <Input
                      id="nationality"
                      placeholder="Nhập quốc tịch của bạn"
                      value={registerForm.nationality}
                      onChange={(e) => setRegisterForm({...registerForm, nationality: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerUserType">Bạn là *</Label>
                    <Select 
                      value={registerForm.userType} 
                      onValueChange={(value: "student" | "married" | "worker") => 
                        setRegisterForm({...registerForm, userType: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại người dùng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Sinh viên quốc tế</SelectItem>
                        <SelectItem value="married">Người nước ngoài kết hôn và định cư</SelectItem>
                        <SelectItem value="worker">Người lao động nước ngoài</SelectItem>
                      </SelectContent>
                    </Select>
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
                      Tôi đồng ý với các điều khoản và điều kiện
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    type="submit"
                    disabled={isSendingOtp}
                  >
                    {isSendingOtp ? "Đang xử lý..." : "Đăng ký"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Đăng nhập để trải nghiệm 7 ngày miễn phí tất cả tính năng
          </p>
          <MembershipUpgradeDialog>
            <Button variant="outline">Tìm hiểu thêm về gói thành viên</Button>
          </MembershipUpgradeDialog>
        </div>
      </div>
    </div>
  )
}
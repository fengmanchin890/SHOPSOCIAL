"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useI18n } from "@/contexts/i18n-context"

interface EventRegistrationButtonProps {
  eventTitle: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function EventRegistrationButton({ 
  eventTitle, 
  className,
  variant = "default",
  size = "default"
}: EventRegistrationButtonProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  })
  const { language } = useI18n()

  const getLocalizedText = () => {
    switch (language) {
      case "zh-TW":
        return {
          register: "報名",
          title: "活動報名",
          description: "請填寫以下資訊以報名參加",
          name: "姓名",
          email: "電子郵件",
          phone: "電話號碼",
          notes: "備註",
          cancel: "取消",
          submit: "提交報名",
          processing: "處理中...",
          required: "必填",
          optional: "選填",
          namePlaceholder: "請輸入您的姓名",
          emailPlaceholder: "請輸入您的電子郵件",
          phonePlaceholder: "請輸入您的電話號碼",
          notesPlaceholder: "有任何特殊要求或問題嗎？",
          successTitle: "報名成功！",
          successMessage: "您已成功報名參加活動。我們將盡快與您聯繫。"
        }
      case "vi":
        return {
          register: "Đăng ký",
          title: "Đăng ký sự kiện",
          description: "Vui lòng điền thông tin dưới đây để đăng ký tham gia",
          name: "Họ và tên",
          email: "Email",
          phone: "Số điện thoại",
          notes: "Ghi chú",
          cancel: "Hủy",
          submit: "Gửi đăng ký",
          processing: "Đang xử lý...",
          required: "bắt buộc",
          optional: "tùy chọn",
          namePlaceholder: "Nhập họ và tên của bạn",
          emailPlaceholder: "Nhập địa chỉ email của bạn",
          phonePlaceholder: "Nhập số điện thoại của bạn",
          notesPlaceholder: "Bạn có yêu cầu đặc biệt hoặc câu hỏi nào không?",
          successTitle: "Đăng ký thành công!",
          successMessage: "Bạn đã đăng ký tham gia sự kiện thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể."
        }
      default:
        return {
          register: "Register",
          title: "Event Registration",
          description: "Please fill in the information below to register for the event",
          name: "Name",
          email: "Email",
          phone: "Phone Number",
          notes: "Notes",
          cancel: "Cancel",
          submit: "Submit Registration",
          processing: "Processing...",
          required: "required",
          optional: "optional",
          namePlaceholder: "Enter your name",
          emailPlaceholder: "Enter your email address",
          phonePlaceholder: "Enter your phone number",
          notesPlaceholder: "Any special requirements or questions?",
          successTitle: "Registration Successful!",
          successMessage: "You have successfully registered for the event. We will contact you as soon as possible."
        }
    }
  }

  const texts = getLocalizedText()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: language === "zh-TW" ? "請填寫所有必填欄位" : 
               language === "vi" ? "Vui lòng điền đầy đủ thông tin bắt buộc" : 
               "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: texts.successTitle,
        description: texts.successMessage,
      })
      
      setOpen(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        notes: ""
      })
    } catch (error) {
      toast({
        title: language === "zh-TW" ? "報名失敗" : 
               language === "vi" ? "Đăng ký thất bại" : 
               "Registration Failed",
        description: language === "zh-TW" ? "處理您的報名時出現問題，請稍後再試" : 
                     language === "vi" ? "Đã xảy ra lỗi khi xử lý đăng ký của bạn. Vui lòng thử lại sau." : 
                     "There was an error processing your registration. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className={className}
        variant={variant}
        size={size}
      >
        {texts.register}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{texts.title}: {eventTitle}</DialogTitle>
              <DialogDescription>
                {texts.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {texts.name} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={texts.namePlaceholder}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  {texts.email} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={texts.emailPlaceholder}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">
                  {texts.phone} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={texts.phonePlaceholder}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">
                  {texts.notes} <span className="text-gray-400 text-sm">({texts.optional})</span>
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={texts.notesPlaceholder}
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {texts.cancel}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? texts.processing : texts.submit}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useI18n } from "@/contexts/i18n-context"

interface ActivityRegistrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activityTitle: string
  activityType: "food" | "accommodation" | "travel" | "language" | "culture"
}

export function ActivityRegistrationDialog({
  open,
  onOpenChange,
  activityTitle,
  activityType,
}: ActivityRegistrationDialogProps) {
  const { t, language } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const getTranslatedLabels = () => {
    switch (language) {
      case "zh-TW":
        return {
          name: "姓名",
          email: "電子郵件",
          phone: "電話號碼",
          notes: "備註",
          namePlaceholder: "請輸入您的姓名",
          emailPlaceholder: "請輸入您的電子郵件",
          phonePlaceholder: "請輸入您的電話號碼",
          notesPlaceholder: "請輸入任何特殊要求或備註",
          cancel: "取消",
          register: "報名",
          required: "必填",
          optional: "選填",
        }
      case "vi":
        return {
          name: "Họ và tên",
          email: "Email",
          phone: "Số điện thoại",
          notes: "Ghi chú",
          namePlaceholder: "Nhập họ và tên của bạn",
          emailPlaceholder: "Nhập địa chỉ email của bạn",
          phonePlaceholder: "Nhập số điện thoại của bạn",
          notesPlaceholder: "Nhập thông tin bổ sung hoặc yêu cầu đặc biệt",
          cancel: "Hủy",
          register: "Đăng ký",
          required: "bắt buộc",
          optional: "tùy chọn",
        }
      case "th":
        return {
          name: "ชื่อ-นามสกุล",
          email: "อีเมล",
          phone: "เบอร์โทรศัพท์",
          notes: "หมายเหตุ",
          namePlaceholder: "กรุณากรอกชื่อ-นามสกุลของคุณ",
          emailPlaceholder: "กรุณากรอกอีเมลของคุณ",
          phonePlaceholder: "กรุณากรอกเบอร์โทรศัพท์ของคุณ",
          notesPlaceholder: "กรุณากรอกความต้องการพิเศษหรือหมายเหตุ",
          cancel: "ยกเลิก",
          register: "ลงทะเบียน",
          required: "จำเป็น",
          optional: "ไม่จำเป็น",
        }
      case "hi":
        return {
          name: "नाम",
          email: "ईमेल",
          phone: "फोन नंबर",
          notes: "नोट्स",
          namePlaceholder: "अपना नाम दर्ज करें",
          emailPlaceholder: "अपना ईमेल पता दर्ज करें",
          phonePlaceholder: "अपना फोन नंबर दर्ज करें",
          notesPlaceholder: "कोई विशेष आवश्यकता या नोट्स दर्ज करें",
          cancel: "रद्द करें",
          register: "पंजीकरण",
          required: "आवश्यक",
          optional: "वैकल्पिक",
        }
      default:
        return {
          name: "Name",
          email: "Email",
          phone: "Phone Number",
          notes: "Notes",
          namePlaceholder: "Enter your name",
          emailPlaceholder: "Enter your email address",
          phonePlaceholder: "Enter your phone number",
          notesPlaceholder: "Enter any special requirements or notes",
          cancel: "Cancel",
          register: "Register",
          required: "required",
          optional: "optional",
        }
    }
  }

  const labels = getTranslatedLabels()

  const getButtonText = () => {
    switch (activityType) {
      case "food":
        return language === "vi" ? "Đăng ký" : language === "zh-TW" ? "報名" : "Register"
      case "accommodation":
        return language === "vi" ? "Liên hệ" : language === "zh-TW" ? "聯繫" : "Contact"
      case "travel":
        return language === "vi" ? "Tham gia" : language === "zh-TW" ? "參加" : "Join"
      case "language":
        return language === "vi" ? "Đăng ký" : language === "zh-TW" ? "報名" : "Register"
      case "culture":
        return language === "vi" ? "Đăng ký" : language === "zh-TW" ? "報名" : "Register"
      default:
        return language === "vi" ? "Đăng ký" : language === "zh-TW" ? "報名" : "Register"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Họ tên, email và số điện thoại là bắt buộc",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Đăng ký thành công!",
        description: `Bạn đã đăng ký thành công cho "${activityTitle}"`,
      })
      
      onOpenChange(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        notes: "",
      })
    } catch (error) {
      toast({
        title: "Đăng ký thất bại",
        description: "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>
                {language === "vi" 
                  ? `Đăng ký tham gia: ${activityTitle}` 
                  : language === "zh-TW" 
                    ? `報名參加: ${activityTitle}` 
                    : `Registration: ${activityTitle}`}
              </DialogTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              {language === "vi"
                ? "Vui lòng điền thông tin để đăng ký tham gia"
                : language === "zh-TW"
                  ? "請填寫以下信息進行報名"
                  : "Please fill in your information to register"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {labels.name} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={labels.namePlaceholder}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                {labels.email} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={labels.emailPlaceholder}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">
                {labels.phone} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={labels.phonePlaceholder}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">
                {labels.notes} <span className="text-gray-400 text-sm">({labels.optional})</span>
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={labels.notesPlaceholder}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {labels.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === "vi" ? "Đang xử lý..." : language === "zh-TW" ? "處理中..." : "Processing..."}
                </span>
              ) : (
                getButtonText()
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
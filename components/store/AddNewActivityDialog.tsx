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
import { X, Upload } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useI18n } from "@/contexts/i18n-context"

interface AddNewActivityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activityType: "food" | "accommodation" | "travel" | "language" | "culture" | "legal" | "healthcare" | "financial" | "transportation" | "daily"
  onSuccess: (newActivity: any) => void
}

export function AddNewActivityDialog({
  open,
  onOpenChange,
  activityType,
  onSuccess,
}: AddNewActivityDialogProps) {
  const { t, language } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    location: "",
    image: null as File | null,
    contactEmail: "",
    contactPhone: "",
    price: "",
    capacity: "",
  })

  const getTranslatedLabels = () => {
    switch (language) {
      case "zh-TW":
        return {
          title: "標題",
          description: "描述",
          time: "時間",
          location: "地點",
          image: "圖片",
          contactEmail: "聯繫郵箱",
          contactPhone: "聯繫電話",
          price: "價格",
          capacity: "容量",
          titlePlaceholder: "請輸入活動標題",
          descriptionPlaceholder: "請輸入活動描述",
          timePlaceholder: "例如：週六，14:00",
          locationPlaceholder: "例如：第1區，胡志明市",
          contactEmailPlaceholder: "請輸入聯繫郵箱",
          contactPhonePlaceholder: "請輸入聯繫電話",
          pricePlaceholder: "例如：200,000 VND",
          capacityPlaceholder: "例如：10人",
          cancel: "取消",
          add: "添加",
          required: "必填",
          optional: "選填",
          uploadImage: "上傳圖片",
          uploadImageDesc: "支持JPG，PNG格式，建議尺寸1200x800像素",
        }
      case "vi":
        return {
          title: "Tiêu đề",
          description: "Mô tả",
          time: "Thời gian",
          location: "Địa điểm",
          image: "Hình ảnh",
          contactEmail: "Email liên hệ",
          contactPhone: "Điện thoại liên hệ",
          price: "Giá",
          capacity: "Sức chứa",
          titlePlaceholder: "Nhập tiêu đề hoạt động",
          descriptionPlaceholder: "Nhập mô tả chi tiết về hoạt động",
          timePlaceholder: "Ví dụ: Thứ Bảy, 14:00",
          locationPlaceholder: "Ví dụ: Quận 1, TP.HCM",
          contactEmailPlaceholder: "Nhập email liên hệ",
          contactPhonePlaceholder: "Nhập số điện thoại liên hệ",
          pricePlaceholder: "Ví dụ: 200,000 VND",
          capacityPlaceholder: "Ví dụ: 10 người",
          cancel: "Hủy",
          add: "Thêm",
          required: "bắt buộc",
          optional: "tùy chọn",
          uploadImage: "Tải lên hình ảnh",
          uploadImageDesc: "Hỗ trợ định dạng JPG, PNG, kích thước đề xuất 1200x800 pixel",
        }
      case "th":
        return {
          title: "ชื่อ-นามสกุล",
          description: "รายละเอียด",
          time: "เวลา",
          location: "สถานที่",
          image: "รูปภาพ",
          contactEmail: "อีเมลติดต่อ",
          contactPhone: "เบอร์โทรศัพท์ติดต่อ",
          price: "ราคา",
          capacity: "ความจุ",
          titlePlaceholder: "กรุณากรอกชื่อกิจกรรม",
          descriptionPlaceholder: "กรุณากรอกรายละเอียดกิจกรรม",
          timePlaceholder: "ตัวอย่าง: วันเสาร์, 14:00",
          locationPlaceholder: "ตัวอย่าง: เขต 1, โฮจิมินห์",
          contactEmailPlaceholder: "กรุณากรอกอีเมลติดต่อ",
          contactPhonePlaceholder: "กรุณากรอกเบอร์โทรศัพท์ติดต่อ",
          pricePlaceholder: "ตัวอย่าง: 200,000 VND",
          capacityPlaceholder: "ตัวอย่าง: 10 คน",
          cancel: "ยกเลิก",
          add: "เพิ่ม",
          required: "จำเป็น",
          optional: "ไม่จำเป็น",
          uploadImage: "อัปโหลดรูปภาพ",
          uploadImageDesc: "รองรับรูปแบบ JPG, PNG ขนาดที่แนะนำ 1200x800 พิกเซล",
        }
      case "hi":
        return {
          title: "शीर्षक",
          description: "विवरण",
          time: "समय",
          location: "स्थान",
          image: "छवि",
          contactEmail: "संपर्क ईमेल",
          contactPhone: "संपर्क फोन",
          price: "मूल्य",
          capacity: "क्षमता",
          titlePlaceholder: "गतिविधि का शीर्षक दर्ज करें",
          descriptionPlaceholder: "गतिविधि का विस्तृत विवरण दर्ज करें",
          timePlaceholder: "उदाहरण: शनिवार, 14:00",
          locationPlaceholder: "उदाहरण: जिला 1, हो ची मिन्ह सिटी",
          contactEmailPlaceholder: "संपर्क ईमेल दर्ज करें",
          contactPhonePlaceholder: "संपर्क फोन नंबर दर्ज करें",
          pricePlaceholder: "उदाहरण: 200,000 VND",
          capacityPlaceholder: "उदाहरण: 10 लोग",
          cancel: "रद्द करें",
          add: "जोड़ें",
          required: "आवश्यक",
          optional: "वैकल्पिक",
          uploadImage: "छवि अपलोड करें",
          uploadImageDesc: "JPG, PNG प्रारूप समर्थित, अनुशंसित आकार 1200x800 पिक्सेल",
        }
      default:
        return {
          title: "Title",
          description: "Description",
          time: "Time",
          location: "Location",
          image: "Image",
          contactEmail: "Contact Email",
          contactPhone: "Contact Phone",
          price: "Price",
          capacity: "Capacity",
          titlePlaceholder: "Enter activity title",
          descriptionPlaceholder: "Enter activity description",
          timePlaceholder: "Example: Saturday, 14:00",
          locationPlaceholder: "Example: District 1, HCMC",
          contactEmailPlaceholder: "Enter contact email",
          contactPhonePlaceholder: "Enter contact phone",
          pricePlaceholder: "Example: 200,000 VND",
          capacityPlaceholder: "Example: 10 people",
          cancel: "Cancel",
          add: "Add",
          required: "required",
          optional: "optional",
          uploadImage: "Upload Image",
          uploadImageDesc: "Supports JPG, PNG formats, recommended size 1200x800 pixels",
        }
    }
  }

  const labels = getTranslatedLabels()

  const getDialogTitle = () => {
    switch (activityType) {
      case "food":
        return language === "vi" ? "Thêm trải nghiệm ẩm thực" : language === "zh-TW" ? "添加美食體驗" : "Add Food Experience"
      case "accommodation":
        return language === "vi" ? "Thêm chỗ ở" : language === "zh-TW" ? "添加住宿" : "Add Accommodation"
      case "travel":
        return language === "vi" ? "Thêm hoạt động cùng đi" : language === "zh-TW" ? "添加一起探索活動" : "Add Travel Activity"
      case "language":
        return language === "vi" ? "Thêm lớp học ngôn ngữ" : language === "zh-TW" ? "添加語言課程" : "Add Language Class"
      case "culture":
        return language === "vi" ? "Thêm tài nguyên văn hóa" : language === "zh-TW" ? "添加文化資源" : "Add Cultural Resource"
      case "legal":
        return language === "vi" ? "Thêm dịch vụ pháp lý" : language === "zh-TW" ? "添加法律服務" : "Add Legal Service"
      case "healthcare":
        return language === "vi" ? "Thêm dịch vụ y tế" : language === "zh-TW" ? "添加醫療服務" : "Add Healthcare Service"
      case "financial":
        return language === "vi" ? "Thêm dịch vụ tài chính" : language === "zh-TW" ? "添加金融服務" : "Add Financial Service"
      case "transportation":
        return language === "vi" ? "Thêm dịch vụ giao thông" : language === "zh-TW" ? "添加交通服務" : "Add Transportation Service"
      case "daily":
        return language === "vi" ? "Thêm dịch vụ đời sống" : language === "zh-TW" ? "添加日常生活服務" : "Add Daily Life Service"
      default:
        return language === "vi" ? "Thêm hoạt động" : language === "zh-TW" ? "添加活動" : "Add Activity"
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Tiêu đề và mô tả là bắt buộc",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Create a placeholder image URL
      const imageUrl = "/placeholder.svg?height=400&width=400&text=" + encodeURIComponent(formData.title)
      
      // Create new activity object
      const newActivity = {
        id: `activity-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        time: formData.time,
        location: formData.location,
        image: imageUrl,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        price: formData.price,
        capacity: formData.capacity,
        type: activityType,
      }
      
      toast({
        title: "Thêm hoạt động thành công!",
        description: `"${formData.title}" đã được thêm vào danh sách`,
      })
      
      onSuccess(newActivity)
      onOpenChange(false)
      setFormData({
        title: "",
        description: "",
        time: "",
        location: "",
        image: null,
        contactEmail: "",
        contactPhone: "",
        price: "",
        capacity: "",
      })
    } catch (error) {
      toast({
        title: "Thêm hoạt động thất bại",
        description: "Đã xảy ra lỗi khi thêm hoạt động. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{getDialogTitle()}</DialogTitle>
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
                ? "Thêm hoạt động mới vào nền tảng"
                : language === "zh-TW"
                  ? "添加新活動到平台"
                  : "Add a new activity to the platform"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                {labels.title} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={labels.titlePlaceholder}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">
                {labels.description} <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={labels.descriptionPlaceholder}
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">
                  {labels.time} <span className="text-gray-400 text-sm">({labels.optional})</span>
                </Label>
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder={labels.timePlaceholder}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">
                  {labels.location} <span className="text-gray-400 text-sm">({labels.optional})</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={labels.locationPlaceholder}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">
                  {labels.contactEmail} <span className="text-gray-400 text-sm">({labels.optional})</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder={labels.contactEmailPlaceholder}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">
                  {labels.contactPhone} <span className="text-gray-400 text-sm">({labels.optional})</span>
                </Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder={labels.contactPhonePlaceholder}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">
                  {labels.price} <span className="text-gray-400 text-sm">({labels.optional})</span>
                </Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder={labels.pricePlaceholder}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">
                  {labels.capacity} <span className="text-gray-400 text-sm">({labels.optional})</span>
                </Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder={labels.capacityPlaceholder}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">
                {labels.image} <span className="text-gray-400 text-sm">({labels.optional})</span>
              </Label>
              <div className="border border-dashed rounded-md p-6 text-center">
                <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-sm font-medium">
                    {formData.image ? formData.image.name : labels.uploadImage}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{labels.uploadImageDesc}</span>
                </label>
              </div>
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
                labels.add
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
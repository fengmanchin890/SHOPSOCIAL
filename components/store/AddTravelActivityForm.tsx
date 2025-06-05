"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Upload, Users2, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "./MembershipProvider"

interface AddTravelActivityFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function AddTravelActivityForm({ onSuccess, onCancel }: AddTravelActivityFormProps) {
  const { isPremiumMember } = useMembership()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    price: "",
    duration: "",
    maxParticipants: "",
    difficulty: "",
    ageRange: "",
    highlights: [] as string[],
    includes: [] as string[],
    languages: [] as string[],
    requirements: "",
    organizer: "",
    phone: "",
    email: "",
    image: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ["Trải nghiệm văn hóa", "Khám phá ẩm thực", "Tour chụp ảnh", "Hoạt động ngoài trời", "Tour thành phố", "Nghệ thuật", "Sinh thái", "Di tích lịch sử"]
  const difficulties = ["Dễ dàng", "Cơ bản", "Trung bình", "Nâng cao", "Chuyên nghiệp"]
  const availableHighlights = [
    "Hướng dẫn chuyên nghiệp",
    "Trải nghiệm địa phương",
    "Giao lưu văn hóa",
    "Thưởng thức ẩm thực",
    "Chụp ảnh check-in",
    "Trải nghiệm làm thủ công",
    "Giới thiệu lịch sử",
    "Cảnh quan thiên nhiên",
    "Đưa đón",
    "Nhóm nhỏ",
    "Dịch vụ cá nhân hóa",
    "Quà lưu niệm",
  ]
  const availableIncludes = [
    "Vé vào cổng",
    "Phương tiện di chuyển",
    "Bữa ăn",
    "Đồ uống",
    "Hướng dẫn viên",
    "Thiết bị",
    "Bảo hiểm",
    "Quà lưu niệm",
    "Dịch vụ chụp ảnh",
    "Dịch vụ phiên dịch",
    "Chỗ ở",
    "Đưa đón",
  ]
  const availableLanguages = ["Tiếng Việt", "Tiếng Anh", "Tiếng Hàn", "Tiếng Trung", "Tiếng Nhật"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "Cần quyền thành viên",
        description: "Vui lòng nâng cấp thành viên để sử dụng tính năng thêm hoạt động cùng đi",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.description || !formData.category || !formData.location || !formData.price) {
      toast({
        title: "Vui lòng điền các trường bắt buộc",
        description: "Tiêu đề, mô tả, danh mục, địa điểm và giá là bắt buộc",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Thêm hoạt động thành công!",
        description: `Hoạt động "${formData.title}" đã được gửi để xét duyệt và sẽ hiển thị trên nền tảng sau khi được phê duyệt`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Thêm thất bại",
        description: "Đã xảy ra lỗi khi thêm hoạt động, vui lòng thử lại sau",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  const handleHighlightToggle = (highlight: string) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.includes(highlight)
        ? formData.highlights.filter((h) => h !== highlight)
        : [...formData.highlights, highlight],
    })
  }

  const handleIncludeToggle = (include: string) => {
    setFormData({
      ...formData,
      includes: formData.includes.includes(include)
        ? formData.includes.filter((i) => i !== include)
        : [...formData.includes, include],
    })
  }

  const handleLanguageToggle = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.includes(language)
        ? formData.languages.filter((l) => l !== language)
        : [...formData.languages, language],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users2 className="h-6 w-6 text-purple-500" />
          <h2 className="text-2xl font-bold">Thêm hoạt động cùng đi</h2>
        </div>
        <p className="text-gray-500 text-sm">Điền thông tin bên dưới để tạo hoạt động cùng đi. Hoạt động sẽ được hiển thị sau khi được phê duyệt.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề hoạt động *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nhập tiêu đề hoạt động"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Danh mục hoạt động *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục hoạt động" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả hoạt động *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Mô tả chi tiết về hoạt động, lịch trình và đặc điểm nổi bật"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Địa điểm hoạt động *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Nhập địa điểm hoạt động"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organizer">Người tổ chức</Label>
          <Input
            id="organizer"
            value={formData.organizer}
            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
            placeholder="Nhập tên người/đơn vị tổ chức"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Giá hoạt động (VNĐ) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="Nhập giá"
            min="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Thời gian hoạt động</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="Ví dụ: 3 giờ, nửa ngày, 1 ngày"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxParticipants">Số người tham gia tối đa</Label>
          <Select
            value={formData.maxParticipants}
            onValueChange={(value) => setFormData({ ...formData, maxParticipants: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn số người" />
            </SelectTrigger>
            <SelectContent>
              {[5, 8, 10, 12, 15, 20, 25, 30, 50].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} người
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="difficulty">Mức độ khó</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn mức độ" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ageRange">Độ tuổi phù hợp</Label>
          <Input
            id="ageRange"
            value={formData.ageRange}
            onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
            placeholder="Ví dụ: 18-65 tuổi"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Ngày hoạt động</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Điểm nổi bật (có thể chọn nhiều)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableHighlights.map((highlight) => (
            <div key={highlight} className="flex items-center space-x-2">
              <Checkbox
                id={highlight}
                checked={formData.highlights.includes(highlight)}
                onCheckedChange={() => handleHighlightToggle(highlight)}
              />
              <Label htmlFor={highlight} className="text-sm">
                {highlight}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Bao gồm trong giá (có thể chọn nhiều)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableIncludes.map((include) => (
            <div key={include} className="flex items-center space-x-2">
              <Checkbox
                id={include}
                checked={formData.includes.includes(include)}
                onCheckedChange={() => handleIncludeToggle(include)}
              />
              <Label htmlFor={include} className="text-sm">
                {include}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Ngôn ngữ hỗ trợ (có thể chọn nhiều)</Label>
        <div className="flex flex-wrap gap-2">
          {availableLanguages.map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={language}
                checked={formData.languages.includes(language)}
                onCheckedChange={() => handleLanguageToggle(language)}
              />
              <Label htmlFor={language} className="text-sm">
                {language}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Yêu cầu tham gia</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          placeholder="Mô tả các yêu cầu đặc biệt hoặc lưu ý khi tham gia hoạt động"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Nhập số điện thoại liên hệ"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Nhập địa chỉ email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Hình ảnh hoạt động</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "Nhấp để tải lên hình ảnh hoạt động"}</span>
            <span className="text-xs text-gray-500 mt-1">Hỗ trợ định dạng JPG, PNG, kích thước đề xuất 1200x800 pixel</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Thêm hoạt động"}
        </Button>
      </div>
    </form>
  )
}
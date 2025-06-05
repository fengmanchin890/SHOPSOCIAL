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
import { Upload, GraduationCap, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "./MembershipProvider"

interface AddCourseRegistrationFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function AddCourseRegistrationForm({ onSuccess, onCancel }: AddCourseRegistrationFormProps) {
  const { isPremiumMember } = useMembership()
  const [selectedStartDate, setSelectedStartDate] = useState<Date>()
  const [selectedEndDate, setSelectedEndDate] = useState<Date>()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    instructor: "",
    format: "",
    duration: "",
    price: "",
    maxStudents: "",
    level: "",
    language: "",
    topics: [] as string[],
    materials: [] as string[],
    requirements: "",
    schedule: "",
    location: "",
    certificate: false,
    refundPolicy: "",
    phone: "",
    email: "",
    image: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ["Kỹ năng kinh doanh", "Học ngôn ngữ", "Nghệ thuật và văn hóa", "Công nghệ số", "Chứng chỉ chuyên môn", "Kỹ năng sống", "Hướng dẫn khởi nghiệp", "Phát triển nghề nghiệp"]
  const formats = ["Khóa học trực tuyến", "Khóa học trực tiếp", "Học kết hợp", "Học 1-1", "Lớp nhỏ", "Lớp lớn", "Hội thảo", "Trại hè"]
  const levels = ["Sơ cấp", "Trung cấp", "Cao cấp", "Chuyên gia", "Tất cả cấp độ"]
  const languages = ["Tiếng Việt", "Tiếng Anh", "Tiếng Hàn", "Tiếng Nhật", "Tiếng Trung"]
  const availableTopics = [
    "Lý thuyết cơ bản",
    "Thực hành",
    "Phân tích tình huống",
    "Thảo luận chuyên đề",
    "Bài tập thực tế",
    "Ôn thi",
    "Hướng dẫn chứng chỉ",
    "Ứng dụng thực tế",
    "Tư duy sáng tạo",
    "Làm việc nhóm",
    "Kỹ năng lãnh đạo",
    "Kỹ năng giao tiếp",
  ]
  const availableMaterials = [
    "Tài liệu giảng dạy",
    "Sách giáo khoa",
    "Tài nguyên trực tuyến",
    "Tình huống thực tế",
    "Phần mềm công cụ",
    "Đề thi chứng chỉ",
    "Tài liệu video",
    "Ngân hàng bài tập",
    "Tài liệu tham khảo",
    "Mẫu chứng chỉ",
    "Mẫu bài tập",
    "Công cụ đánh giá",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "Cần quyền thành viên",
        description: "Vui lòng nâng cấp thành viên để sử dụng tính năng thêm khóa học",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.description || !formData.category || !formData.instructor || !formData.price) {
      toast({
        title: "Vui lòng điền các trường bắt buộc",
        description: "Tiêu đề khóa học, mô tả, danh mục, giảng viên và giá là bắt buộc",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Thêm khóa học thành công!",
        description: `Khóa học "${formData.title}" đã được gửi để xét duyệt và sẽ mở đăng ký sau khi được phê duyệt`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Thêm thất bại",
        description: "Đã xảy ra lỗi khi thêm khóa học, vui lòng thử lại sau",
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

  const handleTopicToggle = (topic: string) => {
    setFormData({
      ...formData,
      topics: formData.topics.includes(topic)
        ? formData.topics.filter((t) => t !== topic)
        : [...formData.topics, topic],
    })
  }

  const handleMaterialToggle = (material: string) => {
    setFormData({
      ...formData,
      materials: formData.materials.includes(material)
        ? formData.materials.filter((m) => m !== material)
        : [...formData.materials, material],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-indigo-500" />
          <h2 className="text-2xl font-bold">Thêm khóa học</h2>
        </div>
        <p className="text-gray-500 text-sm">Điền thông tin bên dưới để tạo khóa học chuyên môn. Khóa học sẽ được mở đăng ký sau khi được phê duyệt.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề khóa học *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nhập tiêu đề khóa học"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Danh mục khóa học *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục khóa học" />
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
        <Label htmlFor="description">Mô tả khóa học *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Mô tả chi tiết nội dung khóa học, mục tiêu và đặc điểm nổi bật"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="instructor">Giảng viên *</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            placeholder="Nhập tên giảng viên"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Hình thức học</Label>
          <Select value={formData.format} onValueChange={(value) => setFormData({ ...formData, format: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn hình thức học" />
            </SelectTrigger>
            <SelectContent>
              {formats.map((format) => (
                <SelectItem key={format} value={format}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Thời lượng khóa học</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="Ví dụ: 8 tuần, 40 giờ"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Học phí (VNĐ) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="Nhập học phí"
            min="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxStudents">Số học viên tối đa</Label>
          <Select
            value={formData.maxStudents}
            onValueChange={(value) => setFormData({ ...formData, maxStudents: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn số học viên" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20, 25, 30, 50, 100].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} người
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="level">Cấp độ khóa học</Label>
          <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn cấp độ" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Ngôn ngữ giảng dạy</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn ngôn ngữ" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Ngày khai giảng</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedStartDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedStartDate ? format(selectedStartDate, "PPP") : "Chọn ngày khai giảng"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedStartDate} onSelect={setSelectedStartDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Ngày kết thúc</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedEndDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedEndDate ? format(selectedEndDate, "PPP") : "Chọn ngày kết thúc"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedEndDate} onSelect={setSelectedEndDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="schedule">Lịch học</Label>
          <Input
            id="schedule"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            placeholder="Ví dụ: Thứ Ba, Thứ Năm 19:00-21:00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Địa điểm học</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Nhập địa điểm học"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Chủ đề khóa học (có thể chọn nhiều)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableTopics.map((topic) => (
            <div key={topic} className="flex items-center space-x-2">
              <Checkbox
                id={topic}
                checked={formData.topics.includes(topic)}
                onCheckedChange={() => handleTopicToggle(topic)}
              />
              <Label htmlFor={topic} className="text-sm">
                {topic}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tài liệu học tập (có thể chọn nhiều)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableMaterials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={material}
                checked={formData.materials.includes(material)}
                onCheckedChange={() => handleMaterialToggle(material)}
              />
              <Label htmlFor={material} className="text-sm">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Yêu cầu đầu vào</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          placeholder="Mô tả các yêu cầu đầu vào hoặc điều kiện đặc biệt"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="refundPolicy">Chính sách hoàn tiền</Label>
        <Textarea
          id="refundPolicy"
          value={formData.refundPolicy}
          onChange={(e) => setFormData({ ...formData, refundPolicy: e.target.value })}
          placeholder="Mô tả chính sách hoàn tiền và quy định của khóa học"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="certificate"
          checked={formData.certificate}
          onCheckedChange={(checked) => setFormData({ ...formData, certificate: checked as boolean })}
        />
        <Label htmlFor="certificate">Cấp chứng chỉ sau khi hoàn thành khóa học</Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại liên hệ</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Nhập số điện thoại liên hệ"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email liên hệ</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Nhập địa chỉ email liên hệ"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Hình ảnh khóa học</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "Nhấp để tải lên hình ảnh khóa học"}</span>
            <span className="text-xs text-gray-500 mt-1">Hỗ trợ định dạng JPG, PNG, kích thước đề xuất 1200x800 pixel</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Thêm khóa học"}
        </Button>
      </div>
    </form>
  )
}
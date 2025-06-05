"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Users } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "./MembershipProvider"

interface AddLanguageClassFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function AddLanguageClassForm({ onSuccess, onCancel }: AddLanguageClassFormProps) {
  const { isPremiumMember } = useMembership()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
    level: "",
    format: "",
    location: "",
    price: "",
    duration: "",
    schedule: "",
    maxParticipants: "",
    instructor: "",
    qualifications: "",
    activities: [] as string[],
    materials: [] as string[],
    targetAudience: "",
    phone: "",
    email: "",
    image: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const languages = ["Tiếng Việt", "Tiếng Anh", "Tiếng Hàn", "Tiếng Nhật", "Tiếng Trung", "Tiếng Pháp", "Tiếng Đức", "Tiếng Tây Ban Nha"]
  const levels = ["Sơ cấp", "Trung cấp", "Cao cấp", "Thương mại", "Bản ngữ", "Đa cấp độ"]
  const formats = ["Lớp học trực tiếp", "Lớp học trực tuyến", "Dạy kèm 1-1", "Nhóm nhỏ", "Nhóm lớn", "Hội thảo", "Trải nghiệm đắm chìm"]
  const availableActivities = [
    "Trò chuyện tự do",
    "Thảo luận chủ đề",
    "Đóng vai",
    "Trò chơi tương tác",
    "Chia sẻ văn hóa",
    "Thảo luận tin tức",
    "Hội thoại thương mại",
    "Hội thoại du lịch",
    "Luyện viết",
    "Luyện nghe",
    "Sửa phát âm",
    "Dạy ngữ pháp",
  ]
  const availableMaterials = [
    "Sách giáo khoa",
    "Tài liệu",
    "Tài liệu âm thanh",
    "Tài liệu video",
    "Sách bài tập",
    "Từ điển",
    "Sách văn hóa",
    "Tài nguyên trực tuyến",
    "Ứng dụng",
    "Đồ chơi trò chơi",
    "Bảng trắng",
    "Máy chiếu",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "Cần quyền thành viên",
        description: "Vui lòng nâng cấp thành viên để sử dụng tính năng thêm lớp ngôn ngữ",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.description || !formData.language || !formData.level || !formData.price) {
      toast({
        title: "Vui lòng điền các trường bắt buộc",
        description: "Tiêu đề, mô tả, ngôn ngữ, cấp độ và giá là bắt buộc",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Thêm lớp ngôn ngữ thành công!",
        description: `Lớp học "${formData.title}" đã được gửi để xét duyệt và sẽ hiển thị trên nền tảng sau khi được phê duyệt`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Thêm thất bại",
        description: "Đã xảy ra lỗi khi thêm lớp học, vui lòng thử lại sau",
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

  const handleActivityToggle = (activity: string) => {
    setFormData({
      ...formData,
      activities: formData.activities.includes(activity)
        ? formData.activities.filter((a) => a !== activity)
        : [...formData.activities, activity],
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
          <Users className="h-6 w-6 text-green-500" />
          <h2 className="text-2xl font-bold">Thêm lớp ngôn ngữ</h2>
        </div>
        <p className="text-gray-500 text-sm">Điền thông tin bên dưới để tạo lớp học ngôn ngữ. Lớp học sẽ được hiển thị sau khi được phê duyệt.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề lớp học *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nhập tiêu đề lớp học"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Ngôn ngữ giảng dạy *</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn ngôn ngữ giảng dạy" />
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

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả lớp học *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Mô tả chi tiết về nội dung lớp học, phương pháp giảng dạy và đặc điểm nổi bật"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="level">Cấp độ *</Label>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <Label htmlFor="duration">Thời lượng khóa học</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="Ví dụ: 2 giờ, 8 tuần"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxParticipants">Số học viên tối đa</Label>
          <Select
            value={formData.maxParticipants}
            onValueChange={(value) => setFormData({ ...formData, maxParticipants: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn số học viên" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 4, 6, 8, 10, 12, 15, 20, 25, 30].map((num) => (
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
          <Label htmlFor="instructor">Giáo viên</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            placeholder="Nhập tên giáo viên"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule">Lịch học</Label>
          <Input
            id="schedule"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            placeholder="Ví dụ: Thứ Tư 19:00-21:00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qualifications">Trình độ giáo viên</Label>
        <Textarea
          id="qualifications"
          value={formData.qualifications}
          onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
          placeholder="Mô tả kinh nghiệm giảng dạy và trình độ chuyên môn của giáo viên"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Hoạt động học tập (có thể chọn nhiều)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableActivities.map((activity) => (
            <div key={activity} className="flex items-center space-x-2">
              <Checkbox
                id={activity}
                checked={formData.activities.includes(activity)}
                onCheckedChange={() => handleActivityToggle(activity)}
              />
              <Label htmlFor={activity} className="text-sm">
                {activity}
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
        <Label htmlFor="targetAudience">Đối tượng phù hợp</Label>
        <Textarea
          id="targetAudience"
          value={formData.targetAudience}
          onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          placeholder="Mô tả đối tượng học viên phù hợp và mục tiêu học tập"
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
        <Label htmlFor="image">Hình ảnh lớp học</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "Nhấp để tải lên hình ảnh lớp học"}</span>
            <span className="text-xs text-gray-500 mt-1">Hỗ trợ định dạng JPG, PNG, kích thước đề xuất 1200x800 pixel</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Thêm lớp học"}
        </Button>
      </div>
    </form>
  )
}
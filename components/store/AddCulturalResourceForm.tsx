"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Book } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "./MembershipProvider"

interface AddCulturalResourceFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function AddCulturalResourceForm({ onSuccess, onCancel }: AddCulturalResourceFormProps) {
  const { isPremiumMember } = useMembership()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    resourceType: "",
    language: "",
    targetAudience: "",
    contentFormat: "",
    topics: [] as string[],
    accessLevel: "",
    author: "",
    organization: "",
    contactEmail: "",
    contactPhone: "",
    image: null as File | null,
    file: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resourceTypes = ["Hướng dẫn", "Tài liệu pháp lý", "Tài liệu văn hóa", "Hướng dẫn hòa nhập", "Thông tin y tế", "Tài liệu giáo dục", "Khác"]
  const languages = ["Tiếng Việt", "Tiếng Anh", "Tiếng Hàn", "Tiếng Nhật", "Tiếng Trung", "Tiếng Thái", "Tiếng Indonesia", "Đa ngôn ngữ"]
  const targetAudiences = ["Người Việt ở nước ngoài", "Người nước ngoài tại Việt Nam", "Sinh viên quốc tế", "Người lao động nước ngoài", "Người kết hôn quốc tế", "Tất cả mọi người"]
  const contentFormats = ["PDF", "Video", "Bài viết", "Infographic", "Podcast", "Khóa học trực tuyến", "Ứng dụng di động"]
  const accessLevels = ["Miễn phí cho tất cả", "Chỉ thành viên", "Thành viên cao cấp", "Trả phí"]
  
  const availableTopics = [
    "Thủ tục hành chính",
    "Visa và giấy phép cư trú",
    "Giấy phép lao động",
    "Thuế và tài chính",
    "Y tế và bảo hiểm",
    "Giáo dục",
    "Nhà ở",
    "Giao thông",
    "Ngôn ngữ",
    "Ẩm thực",
    "Phong tục tập quán",
    "Lễ hội truyền thống",
    "Luật pháp địa phương",
    "Tìm việc làm",
    "Khởi nghiệp",
    "Sức khỏe tâm thần",
    "Nuôi dạy con cái",
    "Hôn nhân đa văn hóa"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "Cần quyền thành viên",
        description: "Vui lòng nâng cấp thành viên để sử dụng tính năng thêm tài nguyên văn hóa",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.description || !formData.resourceType || !formData.language) {
      toast({
        title: "Vui lòng điền các trường bắt buộc",
        description: "Tiêu đề, mô tả, loại tài nguyên và ngôn ngữ là bắt buộc",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Thêm tài nguyên thành công!",
        description: `Tài nguyên "${formData.title}" đã được gửi để xét duyệt và sẽ hiển thị trên nền tảng sau khi được phê duyệt`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Thêm thất bại",
        description: "Đã xảy ra lỗi khi thêm tài nguyên, vui lòng thử lại sau",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-bold">Thêm tài nguyên đa văn hóa</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Điền thông tin bên dưới để thêm tài nguyên văn hóa vào nền tảng. Tài nguyên sẽ được hiển thị sau khi được phê duyệt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề tài nguyên *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nhập tiêu đề tài nguyên"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resourceType">Loại tài nguyên *</Label>
          <Select value={formData.resourceType} onValueChange={(value) => setFormData({ ...formData, resourceType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại tài nguyên" />
            </SelectTrigger>
            <SelectContent>
              {resourceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả tài nguyên *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Mô tả chi tiết về tài nguyên, mục đích và cách sử dụng"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="language">Ngôn ngữ *</Label>
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

        <div className="space-y-2">
          <Label htmlFor="targetAudience">Đối tượng mục tiêu</Label>
          <Select value={formData.targetAudience} onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn đối tượng" />
            </SelectTrigger>
            <SelectContent>
              {targetAudiences.map((audience) => (
                <SelectItem key={audience} value={audience}>
                  {audience}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contentFormat">Định dạng nội dung</Label>
          <Select value={formData.contentFormat} onValueChange={(value) => setFormData({ ...formData, contentFormat: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn định dạng" />
            </SelectTrigger>
            <SelectContent>
              {contentFormats.map((format) => (
                <SelectItem key={format} value={format}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Chủ đề (có thể chọn nhiều)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="author">Tác giả/Người đóng góp</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Nhập tên tác giả hoặc người đóng góp"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">Tổ chức (nếu có)</Label>
          <Input
            id="organization"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            placeholder="Nhập tên tổ chức"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accessLevel">Mức độ truy cập</Label>
        <Select value={formData.accessLevel} onValueChange={(value) => setFormData({ ...formData, accessLevel: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn mức độ truy cập" />
          </SelectTrigger>
          <SelectContent>
            {accessLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Email liên hệ</Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            placeholder="Nhập email liên hệ"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Số điện thoại liên hệ</Label>
          <Input
            id="contactPhone"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            placeholder="Nhập số điện thoại liên hệ"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Hình ảnh minh họa</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "Nhấp để tải lên hình ảnh minh họa"}</span>
            <span className="text-xs text-gray-500 mt-1">Hỗ trợ định dạng JPG, PNG, kích thước đề xuất 1200x800 pixel</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Tệp tài nguyên (nếu có)</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="file" onChange={handleFileChange} className="hidden" />
          <label htmlFor="file" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.file ? formData.file.name : "Nhấp để tải lên tệp tài nguyên"}</span>
            <span className="text-xs text-gray-500 mt-1">Hỗ trợ các định dạng PDF, DOCX, PPTX, MP3, MP4</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Thêm tài nguyên"}
        </Button>
      </div>
    </form>
  )
}
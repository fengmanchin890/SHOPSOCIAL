"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, ChefHat } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "./MembershipProvider"

interface AddRestaurantFormProps {
  onSuccess: (formData: any) => void
  onCancel: () => void
}

export function AddRestaurantForm({ onSuccess, onCancel }: AddRestaurantFormProps) {
  const { isPremiumMember } = useMembership()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine: "",
    location: "",
    address: "",
    phone: "",
    email: "",
    priceRange: "",
    openingHours: "",
    specialties: [] as string[],
    amenities: [] as string[],
    languages: [] as string[],
    image: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cuisineTypes = ["Món Việt", "Món Hàn", "Món Trung", "Món Nhật", "Món Thái", "Món Âu", "Món chay", "Hải sản"]
  const priceRanges = [
    "Giá rẻ (50.000-150.000₫)",
    "Giá trung bình (150.000-300.000₫)",
    "Giá cao (300.000-600.000₫)",
    "Giá cao cấp (600.000₫+)",
  ]
  const availableSpecialties = [
    "Món đặc sản",
    "Món theo mùa",
    "Món tự chế biến",
    "Nguyên liệu hữu cơ",
    "Không phụ gia",
    "Công thức truyền thống",
    "Món sáng tạo",
    "Món ăn lành mạnh",
  ]
  const availableAmenities = ["WiFi miễn phí", "Bãi đỗ xe", "Phòng riêng", "Giao hàng", "Đặt chỗ trước", "Thân thiện với trẻ em", "Thân thiện với thú cưng", "Lối đi cho người khuyết tật"]
  const availableLanguages = ["Tiếng Việt", "Tiếng Anh", "Tiếng Hàn", "Tiếng Trung", "Tiếng Nhật"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "Cần quyền thành viên",
        description: "Vui lòng nâng cấp thành viên để sử dụng tính năng thêm nhà hàng",
        variant: "destructive",
      })
      return
    }

    if (!formData.name || !formData.description || !formData.cuisine || !formData.location) {
      toast({
        title: "Vui lòng điền các trường bắt buộc",
        description: "Tên nhà hàng, mô tả, loại ẩm thực và địa điểm là bắt buộc",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Thêm nhà hàng thành công!",
        description: `Nhà hàng "${formData.name}" đã được gửi để xét duyệt và sẽ hiển thị trên nền tảng sau khi được phê duyệt`,
      })

      // Truyền dữ liệu biểu mẫu cho component cha
      onSuccess(formData)
    } catch (error) {
      toast({
        title: "Thêm thất bại",
        description: "Đã xảy ra lỗi khi thêm nhà hàng, vui lòng thử lại sau",
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

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.includes(specialty)
        ? formData.specialties.filter((s) => s !== specialty)
        : [...formData.specialties, specialty],
    })
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter((a) => a !== amenity)
        : [...formData.amenities, amenity],
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
          <ChefHat className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold">Thêm nhà hàng</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Điền thông tin bên dưới để thêm nhà hàng của bạn vào nền tảng. Nhà hàng sẽ được hiển thị sau khi được phê duyệt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tên nhà hàng *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nhập tên nhà hàng"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cuisine">Loại ẩm thực *</Label>
          <Select value={formData.cuisine} onValueChange={(value) => setFormData({ ...formData, cuisine: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại ẩm thực" />
            </SelectTrigger>
            <SelectContent>
              {cuisineTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả nhà hàng *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Mô tả chi tiết về nhà hàng, đặc trưng, không gian và dịch vụ"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Khu vực *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Ví dụ: Quận 1, TP.HCM"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ chi tiết</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Nhập địa chỉ đầy đủ"
          />
        </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priceRange">Khoảng giá</Label>
          <Select
            value={formData.priceRange}
            onValueChange={(value) => setFormData({ ...formData, priceRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn khoảng giá" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="openingHours">Giờ mở cửa</Label>
          <Input
            id="openingHours"
            value={formData.openingHours}
            onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
            placeholder="Ví dụ: Thứ 2 - Chủ nhật, 10:00 - 22:00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Món đặc trưng (có thể chọn nhiều)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={formData.specialties.includes(specialty)}
                onCheckedChange={() => handleSpecialtyToggle(specialty)}
              />
              <Label htmlFor={specialty} className="text-sm">
                {specialty}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tiện ích (có thể chọn nhiều)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={formData.amenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <Label htmlFor={amenity} className="text-sm">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Ngôn ngữ phục vụ (có thể chọn nhiều)</Label>
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
        <Label htmlFor="image">Hình ảnh nhà hàng</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "Nhấp để tải lên hình ảnh nhà hàng"}</span>
            <span className="text-xs text-gray-500 mt-1">Hỗ trợ định dạng JPG, PNG, kích thước đề xuất 1200x800 pixel</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Thêm nhà hàng"}
        </Button>
      </div>
    </form>
  )
}
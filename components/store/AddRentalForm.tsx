"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Home } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useMembership } from "./MembershipProvider"

interface AddRentalFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function AddRentalForm({ onSuccess, onCancel }: AddRentalFormProps) {
  const { isPremiumMember } = useMembership()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    address: "",
    price: "",
    priceType: "",
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    amenities: [] as string[],
    houseRules: [] as string[],
    checkIn: "",
    checkOut: "",
    cancellationPolicy: "",
    phone: "",
    email: "",
    image: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const propertyTypes = ["Nhà nguyên căn", "Phòng riêng", "Phòng chung", "Studio", "Homestay", "Nhà nghỉ", "Không gian chung"]
  const priceTypes = ["Mỗi đêm", "Mỗi tuần", "Mỗi tháng", "Thuê dài hạn"]
  const availableAmenities = [
    "WiFi", 
    "Máy lạnh", 
    "Máy sưởi", 
    "Bếp", 
    "Máy giặt", 
    "Máy sấy", 
    "Chỗ đậu xe", 
    "Thang máy", 
    "Ban công", 
    "Vườn", 
    "Hồ bơi", 
    "Phòng tập gym", 
    "An ninh 24/7", 
    "Quản lý tòa nhà", 
    "Thân thiện với thú cưng", 
    "Khu vực hút thuốc"
  ]
  const availableRules = [
    "Không hút thuốc",
    "Không thú cưng",
    "Không tổ chức tiệc",
    "Giữ yên lặng",
    "Giữ sạch sẽ",
    "Đăng ký khách",
    "Giờ giới nghiêm",
    "Phân loại rác",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "Cần quyền thành viên",
        description: "Vui lòng nâng cấp thành viên để sử dụng tính năng thêm chỗ ở",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.description || !formData.type || !formData.location || !formData.price) {
      toast({
        title: "Vui lòng điền các trường bắt buộc",
        description: "Tiêu đề, mô tả, loại chỗ ở, vị trí và giá là bắt buộc",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Thêm chỗ ở thành công!",
        description: `Chỗ ở "${formData.title}" đã được gửi để xét duyệt và sẽ hiển thị trên nền tảng sau khi được phê duyệt`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Thêm thất bại",
        description: "Đã xảy ra lỗi khi thêm chỗ ở, vui lòng thử lại sau",
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

  const handleAmenityToggle = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter((a) => a !== amenity)
        : [...formData.amenities, amenity],
    })
  }

  const handleRuleToggle = (rule: string) => {
    setFormData({
      ...formData,
      houseRules: formData.houseRules.includes(rule)
        ? formData.houseRules.filter((r) => r !== rule)
        : [...formData.houseRules, rule],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Thêm chỗ ở trao đổi</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Điền thông tin bên dưới để thêm chỗ ở của bạn vào nền tảng. Chỗ ở sẽ được hiển thị sau khi được phê duyệt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề chỗ ở *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nhập tiêu đề chỗ ở"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Loại chỗ ở *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại chỗ ở" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả chỗ ở *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Mô tả chi tiết về chỗ ở, môi trường và đặc điểm"
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
            placeholder="Ví dụ: Quận 2, TP.HCM"
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
          <Label htmlFor="price">Giá thuê *</Label>
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
          <Label htmlFor="priceType">Loại giá</Label>
          <Select value={formData.priceType} onValueChange={(value) => setFormData({ ...formData, priceType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại giá" />
            </SelectTrigger>
            <SelectContent>
              {priceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Số phòng ngủ</Label>
          <Select value={formData.bedrooms} onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn số phòng ngủ" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num === 0 ? "Không có phòng ngủ riêng" : `${num} phòng ngủ`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Số phòng tắm</Label>
          <Select value={formData.bathrooms} onValueChange={(value) => setFormData({ ...formData, bathrooms: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn số phòng tắm" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} phòng tắm
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxGuests">Số khách tối đa</Label>
          <Select value={formData.maxGuests} onValueChange={(value) => setFormData({ ...formData, maxGuests: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn số khách" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} người
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tiện nghi (có thể chọn nhiều)</Label>
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
        <Label>Nội quy (có thể chọn nhiều)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableRules.map((rule) => (
            <div key={rule} className="flex items-center space-x-2">
              <Checkbox
                id={rule}
                checked={formData.houseRules.includes(rule)}
                onCheckedChange={() => handleRuleToggle(rule)}
              />
              <Label htmlFor={rule} className="text-sm">
                {rule}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="checkIn">Giờ nhận phòng</Label>
          <Input
            id="checkIn"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
            placeholder="Ví dụ: 15:00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkOut">Giờ trả phòng</Label>
          <Input
            id="checkOut"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
            placeholder="Ví dụ: 11:00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cancellationPolicy">Chính sách hủy</Label>
          <Select
            value={formData.cancellationPolicy}
            onValueChange={(value) => setFormData({ ...formData, cancellationPolicy: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn chính sách hủy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flexible">Linh hoạt</SelectItem>
              <SelectItem value="moderate">Trung bình</SelectItem>
              <SelectItem value="strict">Nghiêm ngặt</SelectItem>
            </SelectContent>
          </Select>
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

      <div className="space-y-2">
        <Label htmlFor="image">Hình ảnh chỗ ở</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "Nhấp để tải lên hình ảnh chỗ ở"}</span>
            <span className="text-xs text-gray-500 mt-1">Hỗ trợ định dạng JPG, PNG, kích thước đề xuất 1200x800 pixel</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Thêm chỗ ở"}
        </Button>
      </div>
    </form>
  )
}
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

  const propertyTypes = ["整套房屋", "獨立房間", "共享房間", "工作室", "民宿", "青年旅館", "共享空間"]
  const priceTypes = ["每晚", "每週", "每月", "長期租賃"]
  const availableAmenities = [
    "WiFi網路",
    "空調",
    "暖氣",
    "廚房",
    "洗衣機",
    "烘乾機",
    "停車位",
    "電梯",
    "陽台",
    "花園",
    "游泳池",
    "健身房",
    "24小時門禁",
    "管理員",
    "寵物友善",
    "吸煙區",
  ]
  const availableRules = [
    "禁止吸煙",
    "禁止寵物",
    "禁止聚會",
    "保持安靜",
    "清潔維護",
    "訪客登記",
    "門禁時間",
    "垃圾分類",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "需要會員權限",
        description: "請升級為會員以使用新增出租住宿功能",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.description || !formData.type || !formData.location || !formData.price) {
      toast({
        title: "請填寫必填欄位",
        description: "標題、描述、類型、地點和價格為必填項",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "住宿新增成功！",
        description: `住宿「${formData.title}」已成功提交審核，審核通過後將顯示在平台上`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "新增失敗",
        description: "住宿新增過程中發生錯誤，請稍後再試",
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
          <h2 className="text-2xl font-bold">新增出租住宿</h2>
        </div>
        <p className="text-gray-500 text-sm">
          填寫以下表單，將您的住宿加入我們的平台。新增的住宿將在審核後顯示給用戶。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">住宿標題 *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="請輸入住宿標題"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">住宿類型 *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇住宿類型" />
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
        <Label htmlFor="description">住宿描述 *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="請詳細描述您的住宿環境、設施和特色"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">地區 *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="例：台北市、胡志明市"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">詳細地址</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="請輸入完整地址"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">租金價格 *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="請輸入價格"
            min="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceType">計價方式</Label>
          <Select value={formData.priceType} onValueChange={(value) => setFormData({ ...formData, priceType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇計價方式" />
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
          <Label htmlFor="bedrooms">臥室數量</Label>
          <Select value={formData.bedrooms} onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇臥室數" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num === 0 ? "無獨立臥室" : `${num} 間臥室`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">浴室數量</Label>
          <Select value={formData.bathrooms} onValueChange={(value) => setFormData({ ...formData, bathrooms: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇浴室數" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} 間浴室
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxGuests">最大入住人數</Label>
          <Select value={formData.maxGuests} onValueChange={(value) => setFormData({ ...formData, maxGuests: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇人數" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} 人
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>設施服務 (可多選)</Label>
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
        <Label>住宿規則 (可多選)</Label>
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
          <Label htmlFor="checkIn">入住時間</Label>
          <Input
            id="checkIn"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
            placeholder="例：15:00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkOut">退房時間</Label>
          <Input
            id="checkOut"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
            placeholder="例：11:00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cancellationPolicy">取消政策</Label>
          <Select
            value={formData.cancellationPolicy}
            onValueChange={(value) => setFormData({ ...formData, cancellationPolicy: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇取消政策" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flexible">彈性取消</SelectItem>
              <SelectItem value="moderate">適中取消</SelectItem>
              <SelectItem value="strict">嚴格取消</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">聯絡電話</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="請輸入聯絡電話"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">電子郵件</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="請輸入電子郵件"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">住宿照片</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "點擊上傳住宿照片"}</span>
            <span className="text-xs text-gray-500 mt-1">支援 JPG、PNG 格式，建議尺寸 1200x800 像素</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "處理中..." : "新增住宿"}
        </Button>
      </div>
    </form>
  )
}

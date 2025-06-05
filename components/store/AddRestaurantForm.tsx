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

  const cuisineTypes = ["台灣料理", "越南料理", "中式料理", "日式料理", "韓式料理", "西式料理", "素食料理", "海鮮料理"]
  const priceRanges = [
    "經濟實惠 (NT$100-300)",
    "中等價位 (NT$300-600)",
    "高檔餐廳 (NT$600-1200)",
    "頂級餐廳 (NT$1200+)",
  ]
  const availableSpecialties = [
    "招牌菜",
    "季節限定",
    "手工製作",
    "有機食材",
    "無添加",
    "傳統工藝",
    "創意料理",
    "健康餐點",
  ]
  const availableAmenities = ["免費WiFi", "停車場", "包廂", "外送服務", "預約制", "兒童友善", "寵物友善", "無障礙設施"]
  const availableLanguages = ["中文", "英語", "越南語", "日語", "韓語"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "需要會員權限",
        description: "請升級為會員以使用新增餐廳功能",
        variant: "destructive",
      })
      return
    }

    if (!formData.name || !formData.description || !formData.cuisine || !formData.location) {
      toast({
        title: "請填寫必填欄位",
        description: "餐廳名稱、描述、料理類型和地點為必填項",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "餐廳新增成功！",
        description: `餐廳「${formData.name}」已成功提交審核，審核通過後將顯示在平台上`,
      })

      // 將表單數據傳遞給父組件
      onSuccess(formData)
    } catch (error) {
      toast({
        title: "新增失敗",
        description: "餐廳新增過程中發生錯誤，請稍後再試",
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
          <h2 className="text-2xl font-bold">新增餐廳</h2>
        </div>
        <p className="text-gray-500 text-sm">
          填寫以下表單，將您的餐廳加入我們的平台。新增的餐廳將在審核後顯示給用戶。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">餐廳名稱 *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="請輸入餐廳名稱"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cuisine">料理類型 *</Label>
          <Select value={formData.cuisine} onValueChange={(value) => setFormData({ ...formData, cuisine: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇料理類型" />
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
        <Label htmlFor="description">餐廳描述 *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="請詳細描述您的餐廳特色、環境和服務"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priceRange">價位範圍</Label>
          <Select
            value={formData.priceRange}
            onValueChange={(value) => setFormData({ ...formData, priceRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇價位範圍" />
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
          <Label htmlFor="openingHours">營業時間</Label>
          <Input
            id="openingHours"
            value={formData.openingHours}
            onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
            placeholder="例：週一至週日 11:00-22:00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>餐廳特色 (可多選)</Label>
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
        <Label>服務語言 (可多選)</Label>
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
        <Label htmlFor="image">餐廳照片</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "點擊上傳餐廳照片"}</span>
            <span className="text-xs text-gray-500 mt-1">支援 JPG、PNG 格式，建議尺寸 1200x800 像素</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "處理中..." : "新增餐廳"}
        </Button>
      </div>
    </form>
  )
}

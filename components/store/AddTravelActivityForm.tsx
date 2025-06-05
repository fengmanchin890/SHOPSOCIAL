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

  const categories = ["文化體驗", "美食探索", "攝影之旅", "戶外活動", "城市導覽", "藝術文化", "自然生態", "歷史古蹟"]
  const difficulties = ["輕鬆", "初級", "中級", "進階", "專業"]
  const availableHighlights = [
    "專業導覽",
    "在地體驗",
    "文化交流",
    "美食品嚐",
    "拍照打卡",
    "手作體驗",
    "歷史解說",
    "自然景觀",
    "交通接送",
    "小團體",
    "個人化服務",
    "紀念品",
  ]
  const availableIncludes = [
    "門票",
    "交通",
    "餐食",
    "飲料",
    "導覽服務",
    "器材使用",
    "保險",
    "紀念品",
    "拍照服務",
    "翻譯服務",
    "住宿",
    "接送服務",
  ]
  const availableLanguages = ["中文", "英語", "越南語", "日語", "韓語"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "需要會員權限",
        description: "請升級為會員以使用新增共遊活動功能",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.description || !formData.category || !formData.location || !formData.price) {
      toast({
        title: "請填寫必填欄位",
        description: "活動標題、描述、類別、地點和價格為必填項",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "共遊活動新增成功！",
        description: `活動「${formData.title}」已成功提交審核，審核通過後將顯示在平台上`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "新增失敗",
        description: "活動新增過程中發生錯誤，請稍後再試",
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
          <h2 className="text-2xl font-bold">新增共遊活動</h2>
        </div>
        <p className="text-gray-500 text-sm">填寫以下表單，創建您的共遊活動。新增的活動將在審核後顯示給用戶。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">活動標題 *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="請輸入活動標題"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">活動類別 *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇活動類別" />
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
        <Label htmlFor="description">活動描述 *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="請詳細描述您的活動內容、行程安排和特色"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">活動地點 *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="請輸入活動地點"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organizer">主辦方</Label>
          <Input
            id="organizer"
            value={formData.organizer}
            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
            placeholder="請輸入主辦方名稱"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">活動價格 (NT$) *</Label>
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
          <Label htmlFor="duration">活動時長</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="例：3小時、半天、一日"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxParticipants">最大參與人數</Label>
          <Select
            value={formData.maxParticipants}
            onValueChange={(value) => setFormData({ ...formData, maxParticipants: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇人數" />
            </SelectTrigger>
            <SelectContent>
              {[5, 8, 10, 12, 15, 20, 25, 30, 50].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} 人
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="difficulty">活動難度</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇難度" />
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
          <Label htmlFor="ageRange">適合年齡</Label>
          <Input
            id="ageRange"
            value={formData.ageRange}
            onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
            placeholder="例：18-65歲"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">活動日期</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "選擇日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label>活動亮點 (可多選)</Label>
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
        <Label>費用包含 (可多選)</Label>
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
        <Label htmlFor="requirements">參與要求</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          placeholder="請說明參與活動的特殊要求或注意事項"
          rows={3}
        />
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
        <Label htmlFor="image">活動照片</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "點擊上傳活動照片"}</span>
            <span className="text-xs text-gray-500 mt-1">支援 JPG、PNG 格式，建議尺寸 1200x800 像素</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "處理中..." : "新增活動"}
        </Button>
      </div>
    </form>
  )
}

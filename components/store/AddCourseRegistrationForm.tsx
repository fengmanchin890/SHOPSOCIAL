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

  const categories = ["商業技能", "語言學習", "文化藝術", "科技數位", "專業認證", "生活技能", "創業指導", "職業發展"]
  const formats = ["線上課程", "實體課程", "混合式", "一對一", "小班制", "大班制", "工作坊", "研習營"]
  const levels = ["初級", "中級", "高級", "專業級", "所有級別"]
  const languages = ["中文", "英語", "越南語", "日語", "韓語"]
  const availableTopics = [
    "基礎理論",
    "實務操作",
    "案例分析",
    "專題討論",
    "實作練習",
    "考試準備",
    "認證輔導",
    "職場應用",
    "創新思維",
    "團隊合作",
    "領導管理",
    "溝通技巧",
  ]
  const availableMaterials = [
    "課程講義",
    "教科書",
    "線上資源",
    "實戰案例",
    "工具軟體",
    "認證考題",
    "影音教材",
    "練習題庫",
    "參考資料",
    "證書範本",
    "作業模板",
    "評量工具",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "需要會員權限",
        description: "請升級為會員以使用新增課程報名功能",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.description || !formData.category || !formData.instructor || !formData.price) {
      toast({
        title: "請填寫必填欄位",
        description: "課程標題、描述、類別、講師和價格為必填項",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "課程新增成功！",
        description: `課程「${formData.title}」已成功提交審核，審核通過後將開放報名`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "新增失敗",
        description: "課程新增過程中發生錯誤，請稍後再試",
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
          <h2 className="text-2xl font-bold">新增課程報名</h2>
        </div>
        <p className="text-gray-500 text-sm">填寫以下表單，創建您的專業課程。新增的課程將在審核後開放報名。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">課程標題 *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="請輸入課程標題"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">課程類別 *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇課程類別" />
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
        <Label htmlFor="description">課程描述 *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="請詳細描述您的課程內容、學習目標和特色"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="instructor">授課講師 *</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            placeholder="請輸入講師姓名"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">授課形式</Label>
          <Select value={formData.format} onValueChange={(value) => setFormData({ ...formData, format: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇授課形式" />
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
          <Label htmlFor="duration">課程時長</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="例：8週、40小時"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">課程價格 (NT$) *</Label>
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
          <Label htmlFor="maxStudents">最大學員數</Label>
          <Select
            value={formData.maxStudents}
            onValueChange={(value) => setFormData({ ...formData, maxStudents: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇人數" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20, 25, 30, 50, 100].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} 人
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="level">課程級別</Label>
          <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇級別" />
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
          <Label htmlFor="language">授課語言</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇語言" />
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
          <Label htmlFor="startDate">開課日期</Label>
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
                {selectedStartDate ? format(selectedStartDate, "PPP") : "選擇開課日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedStartDate} onSelect={setSelectedStartDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">結課日期</Label>
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
                {selectedEndDate ? format(selectedEndDate, "PPP") : "選擇結課日期"}
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
          <Label htmlFor="schedule">上課時間</Label>
          <Input
            id="schedule"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            placeholder="例：每週二、四 19:00-21:00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">上課地點</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="請輸入上課地點"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>課程主題 (可多選)</Label>
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
        <Label>教學材料 (可多選)</Label>
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
        <Label htmlFor="requirements">報名要求</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          placeholder="請說明報名的先備條件或特殊要求"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="refundPolicy">退費政策</Label>
        <Textarea
          id="refundPolicy"
          value={formData.refundPolicy}
          onChange={(e) => setFormData({ ...formData, refundPolicy: e.target.value })}
          placeholder="請說明課程的退費規則和政策"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="certificate"
          checked={formData.certificate}
          onCheckedChange={(checked) => setFormData({ ...formData, certificate: checked as boolean })}
        />
        <Label htmlFor="certificate">完成課程可獲得認證證書</Label>
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
        <Label htmlFor="image">課程封面</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "點擊上傳課程封面"}</span>
            <span className="text-xs text-gray-500 mt-1">支援 JPG、PNG 格式，建議尺寸 1200x800 像素</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "處理中..." : "新增課程"}
        </Button>
      </div>
    </form>
  )
}

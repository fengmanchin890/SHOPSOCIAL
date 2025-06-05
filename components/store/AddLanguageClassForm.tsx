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

  const languages = ["中文", "英語", "越南語", "日語", "韓語", "法語", "德語", "西班牙語"]
  const levels = ["初級", "中級", "高級", "商務級", "母語級", "混合級別"]
  const formats = ["實體課程", "線上課程", "一對一教學", "小班制", "大班制", "工作坊", "沉浸式體驗"]
  const availableActivities = [
    "自由對話",
    "主題討論",
    "角色扮演",
    "遊戲互動",
    "文化分享",
    "新聞討論",
    "商務對話",
    "旅遊會話",
    "寫作練習",
    "聽力訓練",
    "發音矯正",
    "語法教學",
  ]
  const availableMaterials = [
    "教科書",
    "講義",
    "音頻資料",
    "視頻教材",
    "練習冊",
    "字典",
    "文化手冊",
    "線上資源",
    "APP使用",
    "遊戲道具",
    "白板",
    "投影設備",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPremiumMember) {
      toast({
        title: "需要會員權限",
        description: "請升級為會員以使用新增語言教室功能",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.description || !formData.language || !formData.level || !formData.price) {
      toast({
        title: "請填寫必填欄位",
        description: "課程標題、描述、語言、級別和價格為必填項",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "語言教室新增成功！",
        description: `課程「${formData.title}」已成功提交審核，審核通過後將顯示在平台上`,
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
          <h2 className="text-2xl font-bold">新增語言教室</h2>
        </div>
        <p className="text-gray-500 text-sm">填寫以下表單，創建您的語言課程。新增的課程將在審核後顯示給用戶。</p>
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
          <Label htmlFor="language">教學語言 *</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger>
              <SelectValue placeholder="選擇教學語言" />
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
        <Label htmlFor="description">課程描述 *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="請詳細描述您的課程內容、教學方法和特色"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="level">課程級別 *</Label>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <Label htmlFor="duration">課程時長</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="例：2小時、8週"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxParticipants">最大學員數</Label>
          <Select
            value={formData.maxParticipants}
            onValueChange={(value) => setFormData({ ...formData, maxParticipants: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇人數" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 4, 6, 8, 10, 12, 15, 20, 25, 30].map((num) => (
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
          <Label htmlFor="instructor">授課老師</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            placeholder="請輸入老師姓名"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule">上課時間</Label>
          <Input
            id="schedule"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            placeholder="例：每週三 19:00-21:00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qualifications">老師資歷</Label>
        <Textarea
          id="qualifications"
          value={formData.qualifications}
          onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
          placeholder="請介紹授課老師的教學經驗和專業資格"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>教學活動 (可多選)</Label>
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
        <Label htmlFor="targetAudience">適合對象</Label>
        <Textarea
          id="targetAudience"
          value={formData.targetAudience}
          onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          placeholder="請說明課程適合的學員類型和學習目標"
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
        <Label htmlFor="image">課程照片</Label>
        <div className="border border-dashed rounded-md p-6 text-center">
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{formData.image ? formData.image.name : "點擊上傳課程照片"}</span>
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

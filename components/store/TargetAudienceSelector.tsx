"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Heart, Briefcase } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

interface TargetAudienceSelectorProps {
  onSelect: (type: "student" | "married" | "worker") => void
  selectedType?: "student" | "married" | "worker" | null
}

export function TargetAudienceSelector({ onSelect, selectedType }: TargetAudienceSelectorProps) {
  const { language } = useI18n()
  
  const getTranslatedContent = () => {
    switch (language) {
      case "zh-TW":
        return {
          title: "請選擇您的身份",
          student: {
            title: "國際學生",
            description: "大學/學院留學生、語言學校學生、交換生"
          },
          married: {
            title: "外籍配偶",
            description: "與台灣公民結婚，需要融合支持，語言和文化適應"
          },
          worker: {
            title: "外籍工作者",
            description: "專業工作者、藍領工人、數位游牧民族"
          }
        }
      case "vi":
        return {
          title: "Vui lòng chọn loại người dùng",
          student: {
            title: "Sinh viên quốc tế",
            description: "Sinh viên đại học/cao đẳng, học viên trường ngôn ngữ, sinh viên trao đổi"
          },
          married: {
            title: "Người nước ngoài kết hôn",
            description: "Kết hôn với công dân Đài Loan, cần hỗ trợ hòa nhập, thích nghi ngôn ngữ và văn hóa"
          },
          worker: {
            title: "Người lao động nước ngoài",
            description: "Lao động chuyên nghiệp, lao động phổ thông, người làm việc tự do"
          }
        }
      default:
        return {
          title: "Please select your user type",
          student: {
            title: "International Student",
            description: "University/college students, language school students, exchange students"
          },
          married: {
            title: "Foreign Spouse",
            description: "Married to Taiwanese citizens, need integration support, language and cultural adaptation"
          },
          worker: {
            title: "Foreign Worker",
            description: "Professional workers, blue-collar workers, digital nomads"
          }
        }
    }
  }
  
  const content = getTranslatedContent()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-center">{content.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={`cursor-pointer hover:shadow-md transition-shadow ${selectedType === "student" ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => onSelect("student")}
        >
          <CardContent className="p-6 text-center">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h4 className="font-semibold text-lg mb-2">{content.student.title}</h4>
            <p className="text-sm text-gray-600">{content.student.description}</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer hover:shadow-md transition-shadow ${selectedType === "married" ? "ring-2 ring-pink-500" : ""}`}
          onClick={() => onSelect("married")}
        >
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-pink-500" />
            <h4 className="font-semibold text-lg mb-2">{content.married.title}</h4>
            <p className="text-sm text-gray-600">{content.married.description}</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer hover:shadow-md transition-shadow ${selectedType === "worker" ? "ring-2 ring-green-500" : ""}`}
          onClick={() => onSelect("worker")}
        >
          <CardContent className="p-6 text-center">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h4 className="font-semibold text-lg mb-2">{content.worker.title}</h4>
            <p className="text-sm text-gray-600">{content.worker.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
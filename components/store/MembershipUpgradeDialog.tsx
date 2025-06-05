"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Crown, Check, Star, Gift } from "lucide-react"
import { useMembership } from "./MembershipProvider"
import { toast } from "@/hooks/use-toast"

interface MembershipUpgradeDialogProps {
  children: React.ReactNode
  requiredFeature?: string
}

export function MembershipUpgradeDialog({ children, requiredFeature }: MembershipUpgradeDialogProps) {
  const { availablePlans, isTrialAvailable, upgradeMembership, isPremiumMember } = useMembership()
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleUpgrade = async (planId: string, isTrial = false) => {
    setIsUpgrading(true)
    setSelectedPlan(planId)

    try {
      const success = await upgradeMembership(planId, isTrial)
      if (success) {
        toast({
          title: isTrial ? "Dùng thử bắt đầu!" : "Nâng cấp thành công!",
          description: isTrial ? "Bạn đã bắt đầu 7 ngày dùng thử miễn phí, hãy trải nghiệm tất cả tính năng!" : "Cảm ơn sự ủng hộ của bạn, tất cả tính năng đã được mở khóa!",
        })
      }
    } catch (error) {
      toast({
        title: "Nâng cấp thất bại",
        description: "Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ",
        variant: "destructive",
      })
    } finally {
      setIsUpgrading(false)
      setSelectedPlan(null)
    }
  }

  if (isPremiumMember) {
    return <>{children}</>
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Nâng cấp thành viên để mở khóa tất cả tính năng
          </DialogTitle>
          <DialogDescription>
            {requiredFeature ? `Để sử dụng tính năng "${requiredFeature}" cần nâng cấp thành viên` : "Nâng cấp thành viên để trải nghiệm đầy đủ nền tảng thương mại đời sống"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tính năng so sánh */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Tính năng thành viên</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Trải nghiệm ẩm thực", "Khám phá nhà ở", "Cùng đi khám phá", "Trao đổi ngôn ngữ", "Khóa học chuyên môn", "Tạo hoạt động mới"].map(
                (feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Gói thành viên */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden ${plan.popular ? "ring-2 ring-blue-500 shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium">
                    Phổ biến nhất
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    {plan.id === "trial" && <Gift className="h-5 w-5 text-green-500" />}
                    {plan.id === "monthly" && <Star className="h-5 w-5 text-blue-500" />}
                    {plan.id === "yearly" && <Crown className="h-5 w-5 text-yellow-500" />}
                    {plan.name}
                  </CardTitle>
                  <CardDescription>
                    <div className="text-3xl font-bold text-gray-900">
                      {plan.price === 0 ? "Miễn phí" : `${plan.price.toLocaleString()}₫`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {plan.duration === 7 ? "7 ngày dùng thử" : plan.duration === 30 ? "mỗi tháng" : "mỗi năm"}
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    disabled={isUpgrading || (plan.id === "trial" && !isTrialAvailable)}
                    onClick={() => handleUpgrade(plan.id, plan.id === "trial")}
                  >
                    {isUpgrading && selectedPlan === plan.id
                      ? "Đang xử lý..."
                      : plan.id === "trial"
                        ? isTrialAvailable
                          ? "Bắt đầu dùng thử miễn phí"
                          : "Đã dùng thử"
                        : "Nâng cấp ngay"}
                  </Button>

                  {plan.id === "yearly" && (
                    <div className="text-center">
                      <Badge variant="secondary" className="text-xs">
                        Tiết kiệm 588.000₫ so với gói tháng
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cam kết */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Cam kết của chúng tôi</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>7 ngày dùng thử miễn phí, không cần thẻ tín dụng</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Hủy bất cứ lúc nào, không phí phạt</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Hỗ trợ khách hàng 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Thanh toán an toàn, bảo mật</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
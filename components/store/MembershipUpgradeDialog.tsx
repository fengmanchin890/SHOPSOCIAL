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
          title: isTrial ? "試用開始！" : "升級成功！",
          description: isTrial ? "您已開始7天免費試用，盡情體驗所有功能！" : "感謝您的支持，所有功能已解鎖！",
        })
      }
    } catch (error) {
      toast({
        title: "升級失敗",
        description: "請稍後再試或聯繫客服",
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
            升級會員解鎖所有功能
          </DialogTitle>
          <DialogDescription>
            {requiredFeature ? `使用「${requiredFeature}」功能需要升級會員` : "升級會員享受完整的生活貿易體驗"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 功能對比 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">會員專享功能</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["體驗美食模組", "探索住宿交換", "搭訕共遊", "參加語言交流", "報名專家課程", "新增活動功能"].map(
                (feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* 會員方案 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden ${plan.popular ? "ring-2 ring-blue-500 shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium">
                    最受歡迎
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
                      {plan.price === 0 ? "免費" : `NT$${plan.price.toLocaleString()}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {plan.duration === 7 ? "7天試用" : plan.duration === 30 ? "每月" : "每年"}
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
                      ? "處理中..."
                      : plan.id === "trial"
                        ? isTrialAvailable
                          ? "開始免費試用"
                          : "試用已使用"
                        : "立即升級"}
                  </Button>

                  {plan.id === "yearly" && (
                    <div className="text-center">
                      <Badge variant="secondary" className="text-xs">
                        相比月費節省 NT$588
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 保證說明 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">升級保證</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>7天免費試用，無需信用卡</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>隨時可以取消，無違約金</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>24/7 客服支援</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>安全加密付款</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

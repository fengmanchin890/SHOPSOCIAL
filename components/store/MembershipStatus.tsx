"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Calendar, Gift } from "lucide-react"
import { useMembership } from "./MembershipProvider"
import { MembershipUpgradeDialog } from "./MembershipUpgradeDialog"

export function MembershipStatus() {
  const { currentMembership, isPremiumMember, daysRemaining, getMembershipStatus, cancelMembership } = useMembership()

  if (!isPremiumMember) {
    return (
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-6 text-center">
          <Crown className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">升級會員解鎖所有功能</h3>
          <p className="text-gray-600 mb-4">體驗美食、住宿交換、共遊活動、語言交流和專家課程</p>
          <MembershipUpgradeDialog>
            <Button className="w-full">
              <Gift className="h-4 w-4 mr-2" />
              開始7天免費試用
            </Button>
          </MembershipUpgradeDialog>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <div>
              <h3 className="font-semibold">{getMembershipStatus()}</h3>
              <p className="text-sm text-gray-600">所有功能已解鎖</p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {daysRemaining} 天
          </Badge>
        </div>

        {currentMembership?.isTrial && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-blue-800">🎉 您正在享受免費試用！試用結束前可隨時升級為正式會員。</p>
          </div>
        )}

        <div className="flex gap-2">
          {currentMembership?.isTrial && (
            <MembershipUpgradeDialog>
              <Button variant="outline" size="sm">
                升級為正式會員
              </Button>
            </MembershipUpgradeDialog>
          )}
          <Button variant="ghost" size="sm" onClick={cancelMembership} className="text-gray-600">
            取消會員
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

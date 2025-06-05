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
          <h3 className="text-lg font-semibold mb-2">Nâng cấp thành viên để mở khóa tất cả tính năng</h3>
          <p className="text-gray-600 mb-4">Trải nghiệm ẩm thực, nhà ở trao đổi, cùng đi khám phá, trao đổi ngôn ngữ và khóa học chuyên môn</p>
          <MembershipUpgradeDialog>
            <Button className="w-full">
              <Gift className="h-4 w-4 mr-2" />
              Bắt đầu 7 ngày dùng thử miễn phí
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
              <p className="text-sm text-gray-600">Tất cả tính năng đã mở khóa</p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {daysRemaining} ngày
          </Badge>
        </div>

        {currentMembership?.isTrial && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-blue-800">🎉 Bạn đang trong thời gian dùng thử miễn phí! Bạn có thể nâng cấp lên thành viên chính thức bất cứ lúc nào trước khi kết thúc thời gian dùng thử.</p>
          </div>
        )}

        <div className="flex gap-2">
          {currentMembership?.isTrial && (
            <MembershipUpgradeDialog>
              <Button variant="outline" size="sm">
                Nâng cấp thành viên chính thức
              </Button>
            </MembershipUpgradeDialog>
          )}
          <Button variant="ghost" size="sm" onClick={cancelMembership} className="text-gray-600">
            Hủy thành viên
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
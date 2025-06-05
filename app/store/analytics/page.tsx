"use client"

import { AdvancedAnalyticsDashboard } from "@/components/store/AdvancedAnalyticsDashboard"
import { MobileAppFeatures } from "@/components/store/MobileAppFeatures"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">數據分析中心</h1>
        <p className="text-gray-600">深入了解用戶行為和業務表現</p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics">分析儀表板</TabsTrigger>
          <TabsTrigger value="mobile">移動應用</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <AdvancedAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="mobile">
          <MobileAppFeatures />
        </TabsContent>
      </Tabs>
    </div>
  )
}

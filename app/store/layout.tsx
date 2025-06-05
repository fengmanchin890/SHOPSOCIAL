import type React from "react"
import { CartProvider } from "@/components/store/CartProvider"
import { WishlistProvider } from "@/components/store/WishlistProvider"
import { CompareProvider } from "@/components/store/CompareProvider"
import { ComparisonAnalyticsProvider } from "@/components/store/ComparisonAnalyticsProvider"
import { AdvancedAnalyticsProvider } from "@/components/store/AdvancedAnalyticsProvider"
import { MachineLearningProvider } from "@/components/store/MachineLearningProvider"
import { VoiceSearchProvider } from "@/components/store/VoiceSearchProvider"
import { MultiLanguageProvider } from "@/components/store/MultiLanguageProvider"
import { MembershipProvider } from "@/components/store/MembershipProvider"
import { Header } from "@/components/store/Header"
import { Footer } from "@/components/store/Footer"
import { ComparisonHistoryProvider } from "@/components/store/ComparisonHistoryProvider"
import { SocialFeaturesProvider } from "@/components/store/SocialFeaturesProvider"
import { CollaborationProvider } from "@/components/store/CollaborationProvider"
import { PriceAlertsProvider } from "@/components/store/PriceAlertsProvider"
import { AIRecommendationsProvider } from "@/components/store/AIRecommendationsProvider"
import { MobileAppProvider } from "@/components/store/MobileAppProvider"
import { B2BProvider } from "@/components/store/B2BProvider"
import { BlockchainProvider } from "@/components/store/BlockchainProvider"
import { ARVRProvider } from "@/components/store/ARVRProvider"

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MembershipProvider>
      <MultiLanguageProvider>
        <AdvancedAnalyticsProvider>
          <MachineLearningProvider>
            <VoiceSearchProvider>
              <MobileAppProvider>
                <CartProvider>
                  <WishlistProvider>
                    <ComparisonAnalyticsProvider>
                      <ComparisonHistoryProvider>
                        <SocialFeaturesProvider>
                          <CollaborationProvider>
                            <PriceAlertsProvider>
                              <AIRecommendationsProvider>
                                <CompareProvider>
                                  <B2BProvider>
                                    <BlockchainProvider>
                                      <ARVRProvider>
                                        <div className="min-h-screen bg-white">
                                          <Header />
                                          <main className="pt-16">{children}</main>
                                          <Footer />
                                        </div>
                                      </ARVRProvider>
                                    </BlockchainProvider>
                                  </B2BProvider>
                                </CompareProvider>
                              </AIRecommendationsProvider>
                            </PriceAlertsProvider>
                          </CollaborationProvider>
                        </SocialFeaturesProvider>
                      </ComparisonHistoryProvider>
                    </ComparisonAnalyticsProvider>
                  </WishlistProvider>
                </CartProvider>
              </MobileAppProvider>
            </VoiceSearchProvider>
          </MachineLearningProvider>
        </AdvancedAnalyticsProvider>
      </MultiLanguageProvider>
    </MembershipProvider>
  )
}
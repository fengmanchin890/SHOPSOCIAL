"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, Heart, Scale, BarChart3, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "./CartProvider"
import { useWishlist } from "./WishlistProvider"
import { useCompare } from "./CompareProvider"
import { VoiceSearchButton } from "./VoiceSearchButton"
import { useAdvancedAnalytics } from "./AdvancedAnalyticsProvider"
import { useMachineLearning } from "./MachineLearningProvider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { items: compareItems } = useCompare()
  const { trackSearchQuery, trackUserAction } = useAdvancedAnalytics()
  const { recordAction } = useMachineLearning()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalWishlistItems = wishlistItems.length
  const totalCompareItems = compareItems.length

  const categories = [
    { name: "男裝", href: "/store/products?category=men" },
    { name: "女裝", href: "/store/products?category=women" },
    { name: "配件", href: "/store/products?category=accessories" },
    { name: "鞋類", href: "/store/products?category=shoes" },
  ]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // 追蹤搜索行為
      trackSearchQuery(searchQuery, 0) // 結果數量會在搜索頁面更新
      recordAction({
        type: "search",
        searchQuery: searchQuery,
      })

      window.location.href = `/store/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleVoiceSearchResult = (query: string) => {
    setSearchQuery(query)
    trackSearchQuery(query, 0)
    recordAction({
      type: "voice_command",
      searchQuery: query,
    })
  }

  const handleNavClick = (page: string) => {
    trackUserAction({
      type: "click",
      target: "navigation",
      metadata: { page },
    })
    recordAction({
      type: "click",
      category: "navigation",
    })
  }

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
        <div className="container mx-auto px-4 py-2 text-center">
          🌟 LiveTrade Connect - 生活貿易一站式平台現已上線！體驗全新的跨國生活服務 🌟
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/store/home" className="text-2xl font-bold text-gray-900" onClick={() => handleNavClick("home")}>
            ShopLogo
          </Link>

          {/* Quick Cart Access */}
          <div className="hidden md:flex items-center ml-4">
            <Button variant="outline" size="sm" asChild className="relative">
              <Link href="/store/cart" onClick={() => handleNavClick("cart")}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                購物車
                {totalItems > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full flex">
              <Input
                type="text"
                placeholder="搜尋商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pr-20"
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <VoiceSearchButton onSearchResult={handleVoiceSearchResult} />
                <Button size="sm" onClick={handleSearch} className="h-8 w-8 p-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Life Trade Platform */}
            <Button variant="ghost" size="sm" asChild className="hidden lg:flex text-blue-600 hover:text-blue-700">
              <Link href="/store/life-trade" onClick={() => handleNavClick("life-trade")}>
                <Globe className="h-5 w-5 mr-1" />
                生活貿易
              </Link>
            </Button>

            {/* Analytics Dashboard */}
            <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
              <Link href="/store/analytics" onClick={() => handleNavClick("analytics")}>
                <BarChart3 className="h-5 w-5" />
              </Link>
            </Button>

            {/* Compare */}
            <Button variant="ghost" size="sm" asChild className="relative">
              <Link href="/store/compare" onClick={() => handleNavClick("compare")}>
                <Scale className="h-5 w-5" />
                {totalCompareItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalCompareItems}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" asChild className="relative">
              <Link href="/store/wishlist" onClick={() => handleNavClick("wishlist")}>
                <Heart className="h-5 w-5" />
                {totalWishlistItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalWishlistItems}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" asChild className="relative">
              <Link href="/store/cart" onClick={() => handleNavClick("cart")}>
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/store/user/profile" onClick={() => handleNavClick("profile")}>
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 py-4 border-t">
          <Link href="/store/home" className="text-gray-700 hover:text-gray-900" onClick={() => handleNavClick("home")}>
            首頁
          </Link>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="text-gray-700 hover:text-gray-900"
              onClick={() => handleNavClick(`category-${category.name}`)}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/store/life-trade"
            className="text-blue-600 hover:text-blue-700 font-medium"
            onClick={() => handleNavClick("life-trade")}
          >
            🌟 生活貿易平台
          </Link>
          <Link
            href="/store/wishlist"
            className="text-gray-700 hover:text-gray-900"
            onClick={() => handleNavClick("wishlist")}
          >
            收藏清單
          </Link>
          <Link
            href="/store/compare"
            className="text-gray-700 hover:text-gray-900"
            onClick={() => handleNavClick("compare")}
          >
            商品比較
          </Link>
          <Link
            href="/store/about"
            className="text-gray-700 hover:text-gray-900"
            onClick={() => handleNavClick("about")}
          >
            關於我們
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative flex">
              <Input
                type="text"
                placeholder="搜尋商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pr-20"
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <VoiceSearchButton onSearchResult={handleVoiceSearchResult} />
                <Button size="sm" onClick={handleSearch} className="h-8 w-8 p-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <Link href="/store/home" className="py-2 text-gray-700" onClick={() => handleNavClick("home")}>
                首頁
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="py-2 text-gray-700"
                  onClick={() => handleNavClick(`category-${category.name}`)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/store/life-trade"
                className="py-2 text-blue-600 font-medium"
                onClick={() => handleNavClick("life-trade")}
              >
                🌟 生活貿易平台
              </Link>
              <Link href="/store/wishlist" className="py-2 text-gray-700" onClick={() => handleNavClick("wishlist")}>
                收藏清單
              </Link>
              <Link href="/store/compare" className="py-2 text-gray-700" onClick={() => handleNavClick("compare")}>
                商品比較
              </Link>
              <Link href="/store/analytics" className="py-2 text-gray-700" onClick={() => handleNavClick("analytics")}>
                數據分析
              </Link>
              <Link href="/store/about" className="py-2 text-gray-700" onClick={() => handleNavClick("about")}>
                關於我們
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

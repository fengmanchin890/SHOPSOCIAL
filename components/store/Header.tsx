"use client"

import { useState, useEffect } from "react"
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
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useI18n } from "@/contexts/i18n-context"
import { LogoutButton } from "./LogoutButton"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { items: compareItems } = useCompare()
  const { trackSearchQuery, trackUserAction } = useAdvancedAnalytics()
  const { recordAction } = useMachineLearning()
  const { t } = useI18n()

  // Prevent hydration mismatch by only rendering after client mount
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Check login status
  useEffect(() => {
    if (!hasMounted) return
    
    const authStatus = localStorage.getItem("lifeTradeAuth")
    if (authStatus === "authenticated") {
      setIsLoggedIn(true)
    }
  }, [hasMounted])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalWishlistItems = wishlistItems.length
  const totalCompareItems = compareItems.length

  const categories = [
    { name: t("nav.products"), href: "/store/products?category=men" },
    { name: t("nav.b2b"), href: "/store/b2b" },
    { name: t("nav.lifeServices"), href: "/store/life-trade" }
  ]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Track search behavior
      trackSearchQuery(searchQuery, 0) // Number of results will be updated on search page
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
          🌟 {t("platform.name")} - {t("platform.description")} {t("platform.slogan")} 🌟
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/store/home" className="text-2xl font-bold text-gray-900" onClick={() => handleNavClick("home")}>
            {t("platform.name")}
          </Link>

          {/* Quick Cart Access */}
          <div className="hidden md:flex items-center ml-4">
            <Button variant="outline" size="sm" asChild className="relative">
              <Link href="/store/cart" onClick={() => handleNavClick("cart")}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t("nav.products")}
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
                placeholder={t("search.placeholder") || "Search products..."}
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
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Life Trade Platform */}
            <Button variant="ghost" size="sm" asChild className="hidden lg:flex text-blue-600 hover:text-blue-700">
              <Link href="/store/life-trade" onClick={() => handleNavClick("life-trade")}>
                <Globe className="h-5 w-5 mr-1" />
                {t("nav.lifeServices")}
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

            {/* User / Login */}
            {hasMounted && (
              isLoggedIn ? (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/store/user/profile" onClick={() => handleNavClick("profile")}>
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/store/login">
                    Đăng nhập
                  </Link>
                </Button>
              )
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 py-4 border-t">
          <Link href="/store/home" className="text-gray-700 hover:text-gray-900" onClick={() => handleNavClick("home")}>
            {t("nav.home")}
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
                placeholder={t("search.placeholder") || "Search products..."}
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
                {t("nav.home")}
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
              
              {hasMounted && !isLoggedIn && (
                <div className="pt-4 border-t">
                  <Button asChild className="w-full">
                    <Link href="/store/login">Đăng nhập</Link>
                  </Button>
                  <div className="mt-2">
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/store/register">Đăng ký</Link>
                    </Button>
                  </div>
                </div>
              )}
              
              {hasMounted && isLoggedIn && (
                <div className="pt-4 border-t">
                  <Button asChild className="w-full">
                    <Link href="/store/user/profile">Tài khoản của tôi</Link>
                  </Button>
                  <div className="mt-2">
                    <LogoutButton variant="outline" className="w-full" />
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
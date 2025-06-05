"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl: boolean
}

interface Currency {
  code: string
  symbol: string
  name: string
  rate: number
}

interface Region {
  code: string
  name: string
  currency: string
  languages: string[]
  timezone: string
  dateFormat: string
  numberFormat: string
}

interface Translation {
  [key: string]: string | Translation
}

interface MultiLanguageContextType {
  currentLanguage: Language
  currentCurrency: Currency
  currentRegion: Region
  availableLanguages: Language[]
  availableCurrencies: Currency[]
  availableRegions: Region[]
  translations: Translation
  changeLanguage: (languageCode: string) => void
  changeCurrency: (currencyCode: string) => void
  changeRegion: (regionCode: string) => void
  t: (key: string, params?: Record<string, string>) => string
  formatPrice: (amount: number, currency?: string) => string
  formatDate: (date: Date) => string
  formatNumber: (number: number) => string
  detectUserPreferences: () => void
}

const MultiLanguageContext = createContext<MultiLanguageContextType | undefined>(undefined)

const languages: Language[] = [
  { code: "zh-TW", name: "Traditional Chinese", nativeName: "繁體中文", flag: "🇹🇼", rtl: false },
  { code: "zh-CN", name: "Simplified Chinese", nativeName: "简体中文", flag: "🇨🇳", rtl: false },
  { code: "en-US", name: "English", nativeName: "English", flag: "🇺🇸", rtl: false },
  { code: "ja-JP", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", rtl: false },
  { code: "ko-KR", name: "Korean", nativeName: "한국어", flag: "🇰🇷", rtl: false },
  { code: "es-ES", name: "Spanish", nativeName: "Español", flag: "🇪🇸", rtl: false },
  { code: "fr-FR", name: "French", nativeName: "Français", flag: "🇫🇷", rtl: false },
  { code: "de-DE", name: "German", nativeName: "Deutsch", flag: "🇩🇪", rtl: false },
  { code: "ar-SA", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", rtl: true },
]

const currencies: Currency[] = [
  { code: "TWD", symbol: "NT$", name: "Taiwan Dollar", rate: 1 },
  { code: "USD", symbol: "$", name: "US Dollar", rate: 0.032 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.029 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 4.8 },
  { code: "KRW", symbol: "₩", name: "Korean Won", rate: 42.5 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 0.23 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.025 },
]

const regions: Region[] = [
  {
    code: "TW",
    name: "Taiwan",
    currency: "TWD",
    languages: ["zh-TW"],
    timezone: "Asia/Taipei",
    dateFormat: "YYYY/MM/DD",
    numberFormat: "1,234.56",
  },
  {
    code: "CN",
    name: "China",
    currency: "CNY",
    languages: ["zh-CN"],
    timezone: "Asia/Shanghai",
    dateFormat: "YYYY年MM月DD日",
    numberFormat: "1,234.56",
  },
  {
    code: "US",
    name: "United States",
    currency: "USD",
    languages: ["en-US"],
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    numberFormat: "1,234.56",
  },
  {
    code: "JP",
    name: "Japan",
    currency: "JPY",
    languages: ["ja-JP"],
    timezone: "Asia/Tokyo",
    dateFormat: "YYYY年MM月DD日",
    numberFormat: "1,234",
  },
  {
    code: "KR",
    name: "South Korea",
    currency: "KRW",
    languages: ["ko-KR"],
    timezone: "Asia/Seoul",
    dateFormat: "YYYY.MM.DD",
    numberFormat: "1,234",
  },
]

const translations: Record<string, Translation> = {
  "zh-TW": {
    "nav.home": "首頁",
    "nav.products": "商品",
    "nav.cart": "購物車",
    "nav.wishlist": "收藏清單",
    "nav.compare": "比較",
    "nav.profile": "個人資料",
    "product.addToCart": "加入購物車",
    "product.addToWishlist": "加入收藏",
    "product.outOfStock": "缺貨中",
    "product.inStock": "現貨供應",
    "cart.total": "總計",
    "cart.checkout": "結帳",
    "cart.empty": "購物車是空的",
    "search.placeholder": "搜尋商品...",
    "currency.symbol": "NT$",
  },
  "zh-CN": {
    "nav.home": "首页",
    "nav.products": "商品",
    "nav.cart": "购物车",
    "nav.wishlist": "收藏夹",
    "nav.compare": "比较",
    "nav.profile": "个人资料",
    "product.addToCart": "加入购物车",
    "product.addToWishlist": "加入收藏",
    "product.outOfStock": "缺货中",
    "product.inStock": "现货供应",
    "cart.total": "总计",
    "cart.checkout": "结账",
    "cart.empty": "购物车是空的",
    "search.placeholder": "搜索商品...",
    "currency.symbol": "¥",
  },
  "en-US": {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.cart": "Cart",
    "nav.wishlist": "Wishlist",
    "nav.compare": "Compare",
    "nav.profile": "Profile",
    "product.addToCart": "Add to Cart",
    "product.addToWishlist": "Add to Wishlist",
    "product.outOfStock": "Out of Stock",
    "product.inStock": "In Stock",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.empty": "Cart is empty",
    "search.placeholder": "Search products...",
    "currency.symbol": "$",
  },
  "ja-JP": {
    "nav.home": "ホーム",
    "nav.products": "商品",
    "nav.cart": "カート",
    "nav.wishlist": "ウィッシュリスト",
    "nav.compare": "比較",
    "nav.profile": "プロフィール",
    "product.addToCart": "カートに追加",
    "product.addToWishlist": "ウィッシュリストに追加",
    "product.outOfStock": "在庫切れ",
    "product.inStock": "在庫あり",
    "cart.total": "合計",
    "cart.checkout": "チェックアウト",
    "cart.empty": "カートは空です",
    "search.placeholder": "商品を検索...",
    "currency.symbol": "¥",
  },
  "ko-KR": {
    "nav.home": "홈",
    "nav.products": "상품",
    "nav.cart": "장바구니",
    "nav.wishlist": "위시리스트",
    "nav.compare": "비교",
    "nav.profile": "프로필",
    "product.addToCart": "장바구니에 추가",
    "product.addToWishlist": "위시리스트에 추가",
    "product.outOfStock": "품절",
    "product.inStock": "재고 있음",
    "cart.total": "총계",
    "cart.checkout": "결제",
    "cart.empty": "장바구니가 비어있습니다",
    "search.placeholder": "상품 검색...",
    "currency.symbol": "₩",
  },
}

export function MultiLanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(currencies[0])
  const [currentRegion, setCurrentRegion] = useState<Region>(regions[0])

  useEffect(() => {
    detectUserPreferences()
  }, [])

  const detectUserPreferences = () => {
    // 檢測瀏覽器語言
    const browserLang = navigator.language || navigator.languages?.[0]
    const detectedLang = languages.find(
      (lang) => lang.code === browserLang || lang.code.split("-")[0] === browserLang?.split("-")[0],
    )

    if (detectedLang) {
      setCurrentLanguage(detectedLang)
    }

    // 檢測地區
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const detectedRegion = regions.find((region) => region.timezone === timezone)

    if (detectedRegion) {
      setCurrentRegion(detectedRegion)
      const regionCurrency = currencies.find((curr) => curr.code === detectedRegion.currency)
      if (regionCurrency) {
        setCurrentCurrency(regionCurrency)
      }
    }
  }

  const changeLanguage = (languageCode: string) => {
    const language = languages.find((lang) => lang.code === languageCode)
    if (language) {
      setCurrentLanguage(language)

      // 更新 HTML 屬性
      document.documentElement.lang = language.code
      document.documentElement.dir = language.rtl ? "rtl" : "ltr"

      // 儲存偏好設定
      localStorage.setItem("preferred-language", languageCode)
    }
  }

  const changeCurrency = (currencyCode: string) => {
    const currency = currencies.find((curr) => curr.code === currencyCode)
    if (currency) {
      setCurrentCurrency(currency)
      localStorage.setItem("preferred-currency", currencyCode)
    }
  }

  const changeRegion = (regionCode: string) => {
    const region = regions.find((reg) => reg.code === regionCode)
    if (region) {
      setCurrentRegion(region)

      // 自動更新貨幣
      const regionCurrency = currencies.find((curr) => curr.code === region.currency)
      if (regionCurrency) {
        setCurrentCurrency(regionCurrency)
      }

      localStorage.setItem("preferred-region", regionCode)
    }
  }

  const t = (key: string, params?: Record<string, string>): string => {
    const langTranslations = translations[currentLanguage.code] || translations["zh-TW"]

    const getValue = (obj: Translation, path: string): string => {
      const keys = path.split(".")
      let current: any = obj

      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = current[k]
        } else {
          return key // 返回原始 key 如果找不到翻譯
        }
      }

      return typeof current === "string" ? current : key
    }

    let translation = getValue(langTranslations, key)

    // 參數替換
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, value)
      })
    }

    return translation
  }

  const formatPrice = (amount: number, currency?: string): string => {
    const curr = currency ? currencies.find((c) => c.code === currency) || currentCurrency : currentCurrency
    const convertedAmount = amount * curr.rate

    try {
      return new Intl.NumberFormat(currentLanguage.code, {
        style: "currency",
        currency: curr.code,
        minimumFractionDigits: curr.code === "JPY" || curr.code === "KRW" ? 0 : 2,
      }).format(convertedAmount)
    } catch {
      return `${curr.symbol}${convertedAmount.toLocaleString()}`
    }
  }

  const formatDate = (date: Date): string => {
    try {
      return new Intl.DateTimeFormat(currentLanguage.code, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch {
      return date.toLocaleDateString()
    }
  }

  const formatNumber = (number: number): string => {
    try {
      return new Intl.NumberFormat(currentLanguage.code).format(number)
    } catch {
      return number.toLocaleString()
    }
  }

  return (
    <MultiLanguageContext.Provider
      value={{
        currentLanguage,
        currentCurrency,
        currentRegion,
        availableLanguages: languages,
        availableCurrencies: currencies,
        availableRegions: regions,
        translations: translations[currentLanguage.code] || translations["zh-TW"],
        changeLanguage,
        changeCurrency,
        changeRegion,
        t,
        formatPrice,
        formatDate,
        formatNumber,
        detectUserPreferences,
      }}
    >
      {children}
    </MultiLanguageContext.Provider>
  )
}

export function useMultiLanguage() {
  const context = useContext(MultiLanguageContext)
  if (context === undefined) {
    throw new Error("useMultiLanguage must be used within a MultiLanguageProvider")
  }
  return context
}

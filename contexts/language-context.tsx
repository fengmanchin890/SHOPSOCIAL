"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const translations = {
  en: {
    products: "Products",
    orders: "Orders",
    customers: "Customers",
    suppliers: "Suppliers",
    quotes: "Quotes",
    payments: "Payments",
    analytics: "Analytics",
    settings: "Settings",
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    save: "Save",
    cancel: "Cancel",
    search: "Search",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    actions: "Actions",
  },
  zh: {
    products: "產品",
    orders: "訂單",
    customers: "客戶",
    suppliers: "供應商",
    quotes: "報價",
    payments: "付款",
    analytics: "分析",
    settings: "設置",
    add: "添加",
    edit: "編輯",
    delete: "刪除",
    view: "查看",
    save: "保存",
    cancel: "取消",
    search: "搜索",
    status: "狀態",
    active: "活躍",
    inactive: "非活躍",
    actions: "操作",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")

  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

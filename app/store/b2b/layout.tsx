"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/contexts/i18n-context"

export default function B2BLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { t } = useI18n()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // The correct password - in a real app, this would be stored securely
  const correctPassword = "b2badmin"

  useEffect(() => {
    // Check if user is already authorized
    const authorized = localStorage.getItem("b2bAuthorized") === "true"
    setIsAuthorized(authorized)
    setIsLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === correctPassword) {
      localStorage.setItem("b2bAuthorized", "true")
      setIsAuthorized(true)
      setError("")
    } else {
      setError("密碼不正確。請重試。")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{t("b2b.dashboard")} - 訪問受限</h1>
            <p className="mt-2 text-gray-600">請輸入密碼以訪問 B2B 平台</p>
          </div>
          
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                密碼
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="輸入訪問密碼"
              />
            </div>
            
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
                {error}
              </div>
            )}
            
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                登入
              </button>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/store/home")}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                返回主頁
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
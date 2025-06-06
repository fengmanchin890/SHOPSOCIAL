import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Đăng nhập/Đăng ký | Nền tảng thương mại đời sống",
  description: "Đăng nhập hoặc đăng ký tài khoản để truy cập nền tảng thương mại đời sống",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
    </>
  )
}
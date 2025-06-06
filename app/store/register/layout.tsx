import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Đăng ký | Nền tảng thương mại đời sống",
  description: "Đăng ký tài khoản để truy cập nền tảng thương mại đời sống",
}

export default function RegisterLayout({
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
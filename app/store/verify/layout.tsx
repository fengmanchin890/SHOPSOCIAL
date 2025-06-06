import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Xác minh | Nền tảng thương mại đời sống",
  description: "Xác minh số điện thoại để hoàn tất đăng ký hoặc đăng nhập",
}

export default function VerifyLayout({
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
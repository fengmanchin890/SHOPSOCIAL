import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Đăng nhập | Nền tảng thương mại đời sống",
  description: "Đăng nhập để truy cập nền tảng thương mại đời sống",
}

export default function LoginLayout({
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
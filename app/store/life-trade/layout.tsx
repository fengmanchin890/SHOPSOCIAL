import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nền tảng thương mại đời sống | LiveTrade Connect",
  description: "Kết nối cộng đồng người Việt tại nước ngoài và người nước ngoài tại Việt Nam",
}

export default function LifeTradeLayout({
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
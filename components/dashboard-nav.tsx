"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Package,
  ShoppingCart,
  Users,
  Building2,
  FileText,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  Home,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "@/contexts/i18n-context"

export function DashboardNav() {
  const pathname = usePathname()
  const { t } = useI18n()

  const navigation = [
    { name: t("b2b.dashboard"), href: "/store/b2b", icon: Home },
    { name: t("b2b.products"), href: "/store/b2b/products", icon: Package },
    { name: t("b2b.orders"), href: "/store/b2b/orders", icon: ShoppingCart },
    { name: t("b2b.customers"), href: "/store/b2b/customers", icon: Users },
    { name: t("b2b.suppliers"), href: "/store/b2b/suppliers", icon: Building2 },
    { name: t("b2b.quotes"), href: "/store/b2b/quotes", icon: FileText },
    { name: t("b2b.rfq"), href: "/store/b2b/rfq", icon: MessageSquare },
    { name: t("b2b.payments"), href: "/store/b2b/payments", icon: CreditCard },
    { name: t("b2b.analytics"), href: "/store/analytics", icon: BarChart3 },
    { name: t("b2b.settings"), href: "/store/b2b/settings", icon: Settings },
  ]

  return (
    <nav className="w-64 border-r bg-white">
      <div className="space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn("w-full justify-start", isActive && "bg-primary text-primary-foreground")}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
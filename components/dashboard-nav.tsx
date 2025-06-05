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

const navigation = [
  { name: "Dashboard", href: "/store/b2b", icon: Home },
  { name: "Products", href: "/store/b2b/products", icon: Package },
  { name: "Orders", href: "/store/b2b/orders", icon: ShoppingCart },
  { name: "Customers", href: "/store/b2b/customers", icon: Users },
  { name: "Suppliers", href: "/store/b2b/suppliers", icon: Building2 },
  { name: "Quotes", href: "/store/b2b/quotes", icon: FileText },
  { name: "RFQ", href: "/store/b2b/rfq", icon: MessageSquare },
  { name: "Payments", href: "/store/b2b/payments", icon: CreditCard },
  { name: "Analytics", href: "/store/analytics", icon: BarChart3 },
  { name: "Settings", href: "/store/b2b/settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()

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

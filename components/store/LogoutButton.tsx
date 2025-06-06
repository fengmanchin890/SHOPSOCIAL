"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LogOut } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useI18n } from "@/contexts/i18n-context"

interface LogoutButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function LogoutButton({ 
  className, 
  variant = "destructive",
  size = "default"
}: LogoutButtonProps) {
  const router = useRouter()
  const { language } = useI18n()
  const [open, setOpen] = useState(false)
  
  const getLocalizedText = () => {
    switch (language) {
      case "zh-TW":
        return {
          logout: "登出",
          confirmTitle: "確認登出",
          confirmMessage: "您確定要登出帳戶嗎？",
          cancel: "取消",
          confirm: "確認登出",
          successTitle: "登出成功",
          successMessage: "您已成功登出帳戶"
        }
      case "vi":
        return {
          logout: "Đăng xuất",
          confirmTitle: "Xác nhận đăng xuất",
          confirmMessage: "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?",
          cancel: "Hủy",
          confirm: "Xác nhận đăng xuất",
          successTitle: "Đăng xuất thành công",
          successMessage: "Bạn đã đăng xuất khỏi tài khoản"
        }
      default:
        return {
          logout: "Logout",
          confirmTitle: "Confirm Logout",
          confirmMessage: "Are you sure you want to log out of your account?",
          cancel: "Cancel",
          confirm: "Confirm Logout",
          successTitle: "Logout Successful",
          successMessage: "You have been logged out of your account"
        }
    }
  }
  
  const texts = getLocalizedText()
  
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("lifeTradeAuth")
    localStorage.removeItem("lifeTradeUserType")
    localStorage.removeItem("lifeTradeUser")
    
    toast({
      title: texts.successTitle,
      description: texts.successMessage,
    })
    
    setOpen(false)
    
    // Redirect to login page
    router.push("/store/login")
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className={`${className} flex items-center gap-2`}
        >
          <LogOut className="h-4 w-4" />
          <span>{texts.logout}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{texts.confirmTitle}</DialogTitle>
          <DialogDescription>
            {texts.confirmMessage}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {texts.cancel}
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            {texts.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
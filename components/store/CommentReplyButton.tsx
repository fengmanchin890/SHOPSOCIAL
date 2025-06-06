"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Reply } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useI18n } from "@/contexts/i18n-context"

interface CommentReplyButtonProps {
  postTitle: string
  authorName: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function CommentReplyButton({ 
  postTitle, 
  authorName,
  className,
  variant = "ghost",
  size = "sm"
}: CommentReplyButtonProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const { language } = useI18n()

  const getLocalizedText = () => {
    switch (language) {
      case "zh-TW":
        return {
          reply: "回覆",
          title: "回覆",
          description: "回覆此貼文",
          yourReply: "您的回覆",
          placeholder: "輸入您的回覆...",
          cancel: "取消",
          submit: "發送回覆",
          processing: "發送中...",
          successTitle: "回覆已發送",
          successMessage: "您的回覆已成功發送",
          errorTitle: "發送失敗",
          errorMessage: "發送回覆時出現問題，請稍後再試"
        }
      case "vi":
        return {
          reply: "Trả lời",
          title: "Trả lời",
          description: "Trả lời bài đăng này",
          yourReply: "Trả lời của bạn",
          placeholder: "Nhập câu trả lời của bạn...",
          cancel: "Hủy",
          submit: "Gửi trả lời",
          processing: "Đang gửi...",
          successTitle: "Đã gửi trả lời",
          successMessage: "Trả lời của bạn đã được gửi thành công",
          errorTitle: "Gửi thất bại",
          errorMessage: "Đã xảy ra lỗi khi gửi trả lời của bạn. Vui lòng thử lại sau."
        }
      default:
        return {
          reply: "Reply",
          title: "Reply",
          description: "Reply to this post",
          yourReply: "Your reply",
          placeholder: "Type your reply...",
          cancel: "Cancel",
          submit: "Send Reply",
          processing: "Sending...",
          successTitle: "Reply Sent",
          successMessage: "Your reply has been sent successfully",
          errorTitle: "Sending Failed",
          errorMessage: "There was a problem sending your reply. Please try again later."
        }
    }
  }

  const texts = getLocalizedText()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!replyContent.trim()) {
      toast({
        title: language === "zh-TW" ? "回覆不能為空" : 
               language === "vi" ? "Trả lời không thể trống" : 
               "Reply cannot be empty",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: texts.successTitle,
        description: texts.successMessage,
      })
      
      setOpen(false)
      setReplyContent("")
    } catch (error) {
      toast({
        title: texts.errorTitle,
        description: texts.errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className={className}
        variant={variant}
        size={size}
      >
        <Reply className="h-4 w-4 mr-1" />
        {texts.reply}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{texts.title}</DialogTitle>
              <DialogDescription>
                {language === "zh-TW" 
                  ? `回覆 "${postTitle}" (由 ${authorName} 發布)` 
                  : language === "vi" 
                    ? `Trả lời "${postTitle}" (đăng bởi ${authorName})` 
                    : `Reply to "${postTitle}" (posted by ${authorName})`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40&text=You" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium">{texts.yourReply}</label>
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={texts.placeholder}
                    rows={5}
                    required
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {texts.cancel}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? texts.processing : texts.submit}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
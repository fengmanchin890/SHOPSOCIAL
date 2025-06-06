"use client"

import { useState, useRef, useEffect } from "react"
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Send, 
  Paperclip, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Users, 
  Calendar,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Filter,
  Star,
  Trash2,
  Archive,
  Flag,
  Download,
  Smile,
  Image,
  FileText,
  Link2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"

// Mock conversation data
const mockConversations = [
  {
    id: "conv-001",
    participants: ["user-middleman-1", "user-customer-1"],
    title: "Import Solutions Inc",
    lastMessage: {
      id: "msg-005",
      senderId: "user-customer-1",
      text: "Thanks for the update on the order. When can we expect the shipping documents?",
      timestamp: new Date("2024-07-01T14:30:00").getTime(),
      read: false,
    },
    messages: [
      {
        id: "msg-001",
        senderId: "user-middleman-1",
        text: "Hello, I wanted to follow up on the recent order #ORD-001. Is everything proceeding as expected?",
        timestamp: new Date("2024-07-01T10:00:00").getTime(),
        read: true,
      },
      {
        id: "msg-002",
        senderId: "user-customer-1",
        text: "Hi there! Yes, everything looks good so far. We're just waiting for the shipping confirmation.",
        timestamp: new Date("2024-07-01T10:15:00").getTime(),
        read: true,
      },
      {
        id: "msg-003",
        senderId: "user-middleman-1",
        text: "Great to hear! I've checked with the logistics team, and they've confirmed that the order has been processed and is being prepared for shipping.",
        timestamp: new Date("2024-07-01T10:30:00").getTime(),
        read: true,
      },
      {
        id: "msg-004",
        senderId: "user-middleman-1",
        text: "You should receive a shipping notification within the next 24-48 hours with tracking information.",
        timestamp: new Date("2024-07-01T10:32:00").getTime(),
        read: true,
      },
      {
        id: "msg-005",
        senderId: "user-customer-1",
        text: "Thanks for the update on the order. When can we expect the shipping documents?",
        timestamp: new Date("2024-07-01T14:30:00").getTime(),
        read: false,
      },
    ],
    unreadCount: 1,
    pinned: true,
  },
  {
    id: "conv-002",
    participants: ["user-middleman-1", "user-customer-2"],
    title: "European Distributors",
    lastMessage: {
      id: "msg-008",
      senderId: "user-middleman-1",
      text: "I've just sent over the updated quote with the volume discount applied. Let me know if you have any questions!",
      timestamp: new Date("2024-06-30T16:45:00").getTime(),
      read: true,
    },
    messages: [
      {
        id: "msg-006",
        senderId: "user-customer-2",
        text: "Hello, we're interested in increasing our order volume for the next quarter. Can you provide updated pricing for larger quantities?",
        timestamp: new Date("2024-06-30T15:00:00").getTime(),
        read: true,
      },
      {
        id: "msg-007",
        senderId: "user-middleman-1",
        text: "Hi! I'd be happy to work on a volume discount for you. Could you specify the approximate quantities you're considering?",
        timestamp: new Date("2024-06-30T15:20:00").getTime(),
        read: true,
      },
      {
        id: "msg-008",
        senderId: "user-middleman-1",
        text: "I've just sent over the updated quote with the volume discount applied. Let me know if you have any questions!",
        timestamp: new Date("2024-06-30T16:45:00").getTime(),
        read: true,
      },
    ],
    unreadCount: 0,
    pinned: false,
  },
  {
    id: "conv-003",
    participants: ["user-middleman-1", "user-supplier-1"],
    title: "Global Manufacturing Co",
    lastMessage: {
      id: "msg-010",
      senderId: "user-supplier-1",
      text: "We can definitely expedite production for this order. I'll send you the revised timeline shortly.",
      timestamp: new Date("2024-06-29T11:30:00").getTime(),
      read: true,
    },
    messages: [
      {
        id: "msg-009",
        senderId: "user-middleman-1",
        text: "We have an urgent order from a key client. Is it possible to expedite production for order #ORD-001?",
        timestamp: new Date("2024-06-29T11:00:00").getTime(),
        read: true,
      },
      {
        id: "msg-010",
        senderId: "user-supplier-1",
        text: "We can definitely expedite production for this order. I'll send you the revised timeline shortly.",
        timestamp: new Date("2024-06-29T11:30:00").getTime(),
        read: true,
      },
    ],
    unreadCount: 0,
    pinned: false,
  },
]

// Mock email data
const mockEmails = [
  {
    id: "email-001",
    from: {
      name: "John Smith",
      email: "john@importsolutions.com",
      company: "Import Solutions Inc",
    },
    to: "admin@tradingsolutions.com",
    subject: "Re: Product Catalog Request",
    body: "Thank you for sending over the updated product catalog. We're particularly interested in the new wireless headphones and smart watches. Could you provide more detailed specifications and bulk pricing for these items?",
    timestamp: new Date("2024-07-01T09:15:00").getTime(),
    read: false,
    starred: true,
    attachments: [],
    labels: ["client", "important"],
  },
  {
    id: "email-002",
    from: {
      name: "Maria Schmidt",
      email: "maria@eudist.com",
      company: "European Distributors",
    },
    to: "admin@tradingsolutions.com",
    subject: "Quarterly Business Review",
    body: "I'd like to schedule our quarterly business review for next week. We should discuss our current order volumes, any supply chain issues, and plans for the upcoming quarter. Would Tuesday at 2 PM CET work for you?",
    timestamp: new Date("2024-06-30T14:20:00").getTime(),
    read: true,
    starred: false,
    attachments: [],
    labels: ["client", "meeting"],
  },
  {
    id: "email-003",
    from: {
      name: "Wei Zhang",
      email: "wei@globalmanuf.com",
      company: "Global Manufacturing Co",
    },
    to: "admin@tradingsolutions.com",
    subject: "Production Schedule Update",
    body: "Please find attached the updated production schedule for your current orders. We've managed to move up the timeline for order #ORD-001 as requested. Let me know if you have any questions or concerns.",
    timestamp: new Date("2024-06-29T16:45:00").getTime(),
    read: true,
    starred: false,
    attachments: [
      { name: "Production_Schedule_July_2024.pdf", size: "1.2 MB" }
    ],
    labels: ["supplier"],
  },
  {
    id: "email-004",
    from: {
      name: "Shipping Department",
      email: "shipping@globalmanuf.com",
      company: "Global Manufacturing Co",
    },
    to: "admin@tradingsolutions.com",
    subject: "Shipping Confirmation - Order #ORD-001",
    body: "This is to confirm that order #ORD-001 has been shipped via FedEx International Priority. The tracking number is FX123456789. Estimated delivery date is July 5, 2024. Please find attached the shipping documents and commercial invoice.",
    timestamp: new Date("2024-06-28T11:30:00").getTime(),
    read: true,
    starred: true,
    attachments: [
      { name: "Shipping_Documents_ORD-001.pdf", size: "2.4 MB" },
      { name: "Commercial_Invoice_ORD-001.pdf", size: "1.1 MB" }
    ],
    labels: ["supplier", "shipping"],
  },
]

// Mock meeting data
const mockMeetings = [
  {
    id: "meeting-001",
    title: "Quarterly Business Review - European Distributors",
    date: new Date("2024-07-05T14:00:00").getTime(),
    endDate: new Date("2024-07-05T15:30:00").getTime(),
    location: "Zoom Video Conference",
    participants: ["user-middleman-1", "user-customer-2"],
    description: "Review Q2 performance and discuss plans for Q3.",
    status: "scheduled",
    notes: "",
  },
  {
    id: "meeting-002",
    title: "New Product Introduction - Import Solutions Inc",
    date: new Date("2024-07-08T10:00:00").getTime(),
    endDate: new Date("2024-07-08T11:00:00").getTime(),
    location: "Conference Room A",
    participants: ["user-middleman-1", "user-customer-1"],
    description: "Present new product lineup and discuss potential orders.",
    status: "scheduled",
    notes: "Prepare product samples and pricing sheets.",
  },
  {
    id: "meeting-003",
    title: "Supplier Negotiation - Global Manufacturing Co",
    date: new Date("2024-07-12T09:00:00").getTime(),
    endDate: new Date("2024-07-12T10:30:00").getTime(),
    location: "Zoom Video Conference",
    participants: ["user-middleman-1", "user-supplier-1"],
    description: "Negotiate pricing and terms for upcoming large orders.",
    status: "scheduled",
    notes: "Review cost analysis before meeting.",
  },
]

export default function CommunicationPage() {
  const { users } = useB2B()
  const [searchQuery, setSearchQuery] = useState("")
  const [conversations, setConversations] = useState(mockConversations)
  const [emails, setEmails] = useState(mockEmails)
  const [meetings, setMeetings] = useState(mockMeetings)
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [selectedEmail, setSelectedEmail] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("messages")
  const [showComposeDialog, setShowComposeDialog] = useState(false)
  const [showNewMeetingDialog, setShowNewMeetingDialog] = useState(false)
  const [emailFilter, setEmailFilter] = useState("inbox")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Form state for new email
  const [newEmail, setNewEmail] = useState({
    to: "",
    subject: "",
    body: "",
    attachments: [] as File[],
  })
  
  // Form state for new meeting
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    participants: [] as string[],
    description: "",
  })
  
  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedConversation])
  
  // Filter conversations based on search
  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })
  
  // Filter emails based on search and filter
  const filteredEmails = emails.filter(email => {
    const matchesSearch = 
      email.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Apply inbox/starred filter
    if (emailFilter === "starred") {
      return matchesSearch && email.starred
    }
    
    return matchesSearch
  })
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return
    
    // Create new message
    const message = {
      id: `msg-${Date.now()}`,
      senderId: "user-middleman-1",
      text: newMessage,
      timestamp: Date.now(),
      read: true,
    }
    
    // Update conversation
    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === selectedConversation.id) {
        return {
          ...conversation,
          lastMessage: message,
          messages: [...conversation.messages, message],
        }
      }
      return conversation
    })
    
    setConversations(updatedConversations)
    
    // Update selected conversation
    setSelectedConversation({
      ...selectedConversation,
      lastMessage: message,
      messages: [...selectedConversation.messages, message],
    })
    
    // Clear input
    setNewMessage("")
  }
  
  const handleSendEmail = () => {
    // Validate form
    if (!newEmail.to || !newEmail.subject || !newEmail.body) {
      alert("Please fill in all required fields")
      return
    }
    
    // Create new email (in a real app, this would send the email)
    console.log("Sending email:", newEmail)
    
    // Reset form and close dialog
    setNewEmail({
      to: "",
      subject: "",
      body: "",
      attachments: [],
    })
    setShowComposeDialog(false)
  }
  
  const handleCreateMeeting = () => {
    // Validate form
    if (!newMeeting.title || !newMeeting.date || !newMeeting.startTime || !newMeeting.endTime || newMeeting.participants.length === 0) {
      alert("Please fill in all required fields")
      return
    }
    
    // Create start and end dates
    const startDate = new Date(`${newMeeting.date}T${newMeeting.startTime}:00`)
    const endDate = new Date(`${newMeeting.date}T${newMeeting.endTime}:00`)
    
    // Create new meeting
    const meeting = {
      id: `meeting-${Date.now().toString().slice(-3)}`,
      title: newMeeting.title,
      date: startDate.getTime(),
      endDate: endDate.getTime(),
      location: newMeeting.location,
      participants: newMeeting.participants,
      description: newMeeting.description,
      status: "scheduled",
      notes: "",
    }
    
    // Add meeting to list
    setMeetings([...meetings, meeting])
    
    // Reset form and close dialog
    setNewMeeting({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      participants: [],
      description: "",
    })
    setShowNewMeetingDialog(false)
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewEmail({
        ...newEmail,
        attachments: Array.from(e.target.files),
      })
    }
  }
  
  const handleSelectConversation = (conversation: any) => {
    // Mark all messages as read
    const updatedConversation = {
      ...conversation,
      messages: conversation.messages.map((message: any) => ({
        ...message,
        read: true,
      })),
      unreadCount: 0,
    }
    
    // Update conversations
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return updatedConversation
      }
      return conv
    })
    
    setConversations(updatedConversations)
    setSelectedConversation(updatedConversation)
  }
  
  const handleSelectEmail = (email: any) => {
    // Mark email as read
    const updatedEmail = {
      ...email,
      read: true,
    }
    
    // Update emails
    const updatedEmails = emails.map(e => {
      if (e.id === email.id) {
        return updatedEmail
      }
      return e
    })
    
    setEmails(updatedEmails)
    setSelectedEmail(updatedEmail)
  }
  
  const handleToggleStarEmail = (emailId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }
    
    // Toggle star status
    const updatedEmails = emails.map(email => {
      if (email.id === emailId) {
        return {
          ...email,
          starred: !email.starred,
        }
      }
      return email
    })
    
    setEmails(updatedEmails)
    
    // Update selected email if it's the one being starred
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail({
        ...selectedEmail,
        starred: !selectedEmail.starred,
      })
    }
  }
  
  const handleTogglePinConversation = (conversationId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }
    
    // Toggle pin status
    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          pinned: !conversation.pinned,
        }
      }
      return conversation
    })
    
    // Sort conversations with pinned ones first
    updatedConversations.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return 0
    })
    
    setConversations(updatedConversations)
    
    // Update selected conversation if it's the one being pinned
    if (selectedConversation && selectedConversation.id === conversationId) {
      setSelectedConversation({
        ...selectedConversation,
        pinned: !selectedConversation.pinned,
      })
    }
  }
  
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }
  
  const formatDateTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }
  
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId)
    return user ? user.name : "Unknown User"
  }
  
  const getUserInitials = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user || !user.name) return "??"
    
    const nameParts = user.name.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`
    }
    return nameParts[0].substring(0, 2)
  }
  
  const getParticipantName = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId)
    if (!conversation) return "Unknown"
    
    const otherParticipantId = conversation.participants.find(p => p !== "user-middleman-1")
    return getUserName(otherParticipantId || "")
  }
  
  const isToday = (timestamp: number) => {
    const today = new Date()
    const date = new Date(timestamp)
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }
  
  const isUpcoming = (timestamp: number) => {
    const now = new Date().getTime()
    return timestamp > now
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 flex flex-col">
          <div className="border-b p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                </TabsList>
                
                <div>
                  {activeTab === "messages" && (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Conversation
                    </Button>
                  )}
                  
                  {activeTab === "email" && (
                    <Button size="sm" onClick={() => setShowComposeDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Compose
                    </Button>
                  )}
                  
                  {activeTab === "meetings" && (
                    <Button size="sm" onClick={() => setShowNewMeetingDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Meeting
                    </Button>
                  )}
                </div>
              </div>
            </Tabs>
          </div>
          
          <div className="flex-1 flex">
            <TabsContent value="messages" className="flex-1 flex">
              {/* Conversations List */}
              <div className="w-80 border-r flex flex-col">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search messages..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedConversation?.id === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${getUserInitials(conversation.participants.find(p => p !== "user-middleman-1") || "")}`} />
                              <AvatarFallback>{getUserInitials(conversation.participants.find(p => p !== "user-middleman-1") || "")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{conversation.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {getParticipantName(conversation.id)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => handleTogglePinConversation(conversation.id, e)}
                            >
                              <Star className={`h-4 w-4 ${conversation.pinned ? "fill-yellow-400 text-yellow-400" : ""}`} />
                            </Button>
                            {conversation.unreadCount > 0 && (
                              <Badge className="mt-1">{conversation.unreadCount}</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm truncate max-w-[180px]">
                            {conversation.lastMessage.senderId === "user-middleman-1" ? "You: " : ""}
                            {conversation.lastMessage.text}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {isToday(conversation.lastMessage.timestamp) 
                              ? formatTime(conversation.lastMessage.timestamp) 
                              : formatDate(conversation.lastMessage.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>No conversations found</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Conversation Detail */}
              {selectedConversation ? (
                <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${getUserInitials(selectedConversation.participants.find(p => p !== "user-middleman-1") || "")}`} />
                        <AvatarFallback>{getUserInitials(selectedConversation.participants.find(p => p !== "user-middleman-1") || "")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedConversation.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {getParticipantName(selectedConversation.id)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Contact</DropdownMenuItem>
                          <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete Conversation</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation.messages.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "user-middleman-1" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex items-start max-w-[70%] ${message.senderId === "user-middleman-1" ? "flex-row-reverse" : ""}`}>
                          {message.senderId !== "user-middleman-1" && (
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${getUserInitials(message.senderId)}`} />
                              <AvatarFallback>{getUserInitials(message.senderId)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.senderId === "user-middleman-1"
                                ? "bg-primary text-primary-foreground ml-2"
                                : "bg-muted mr-2"
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${message.senderId === "user-middleman-1" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                    <p className="text-muted-foreground">Select a conversation from the list to view messages</p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="email" className="flex-1 flex">
              {/* Email List */}
              <div className="w-80 border-r flex flex-col">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search emails..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="p-2 border-b">
                  <Tabs value={emailFilter} onValueChange={setEmailFilter}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="inbox">Inbox</TabsTrigger>
                      <TabsTrigger value="starred">Starred</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {filteredEmails.length > 0 ? (
                    filteredEmails.map((email) => (
                      <div
                        key={email.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedEmail?.id === email.id ? "bg-muted" : ""
                        } ${!email.read ? "bg-blue-50" : ""}`}
                        onClick={() => handleSelectEmail(email)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${email.from.name.split(" ").map(n => n[0]).join("")}`} />
                              <AvatarFallback>{email.from.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className={`font-medium text-sm ${!email.read ? "font-bold" : ""}`}>{email.from.name}</p>
                              <p className="text-xs text-muted-foreground">{email.from.company}</p>
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => handleToggleStarEmail(email.id, e)}
                            >
                              <Star className={`h-4 w-4 ${email.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                            </Button>
                          </div>
                        </div>
                        <p className={`text-sm font-medium mb-1 ${!email.read ? "font-bold" : ""}`}>{email.subject}</p>
                        <p className="text-xs text-muted-foreground truncate">{email.body.substring(0, 60)}...</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            {email.attachments.length > 0 && (
                              <Paperclip className="h-3 w-3 text-muted-foreground mr-1" />
                            )}
                            {email.labels.map((label) => (
                              <Badge key={label} variant="outline" className="text-xs mr-1">
                                {label}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {isToday(email.timestamp) 
                              ? formatTime(email.timestamp) 
                              : formatDate(email.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>No emails found</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Email Detail */}
              {selectedEmail ? (
                <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
                      <p className="text-sm text-muted-foreground">
                        {formatDateTime(selectedEmail.timestamp)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleToggleStarEmail(selectedEmail.id)}>
                        <Star className={`h-4 w-4 ${selectedEmail.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                          <DropdownMenuItem>Forward</DropdownMenuItem>
                          <DropdownMenuItem>Print</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Flag className="h-4 w-4 mr-2" />
                            Flag as Important
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${selectedEmail.from.name.split(" ").map(n => n[0]).join("")}`} />
                          <AvatarFallback>{selectedEmail.from.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedEmail.from.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedEmail.from.email} • {selectedEmail.from.company}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="prose max-w-none">
                      <p>{selectedEmail.body}</p>
                    </div>
                    
                    {selectedEmail.attachments.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-2">Attachments ({selectedEmail.attachments.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {selectedEmail.attachments.map((attachment: any, index: number) => (
                            <div key={index} className="flex items-center p-3 border rounded-lg">
                              <FileText className="h-8 w-8 text-blue-500 mr-3" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">{attachment.size}</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No email selected</h3>
                    <p className="text-muted-foreground">Select an email from the list to view its contents</p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="meetings" className="flex-1 p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Meetings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {meetings.filter(meeting => isUpcoming(meeting.date)).length > 0 ? (
                      <div className="space-y-4">
                        {meetings
                          .filter(meeting => isUpcoming(meeting.date))
                          .sort((a, b) => a.date - b.date)
                          .map((meeting) => (
                            <div key={meeting.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex flex-col items-center justify-center mr-4 flex-shrink-0">
                                <span className="text-xs font-medium">{new Date(meeting.date).toLocaleDateString([], { month: 'short' })}</span>
                                <span className="text-lg font-bold">{new Date(meeting.date).getDate()}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{meeting.title}</h4>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>
                                    {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                                    {new Date(meeting.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span>{meeting.participants.length} participants</span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="flex-shrink-0">
                                Join
                              </Button>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                        <p>No upcoming meetings</p>
                        <Button variant="outline" className="mt-4" onClick={() => setShowNewMeetingDialog(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Schedule Meeting
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Past Meetings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {meetings.filter(meeting => !isUpcoming(meeting.date)).length > 0 ? (
                      <div className="space-y-4">
                        {meetings
                          .filter(meeting => !isUpcoming(meeting.date))
                          .sort((a, b) => b.date - a.date)
                          .map((meeting) => (
                            <div key={meeting.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                              <div className="w-12 h-12 rounded-lg bg-muted text-muted-foreground flex flex-col items-center justify-center mr-4 flex-shrink-0">
                                <span className="text-xs font-medium">{new Date(meeting.date).toLocaleDateString([], { month: 'short' })}</span>
                                <span className="text-lg font-bold">{new Date(meeting.date).getDate()}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{meeting.title}</h4>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>
                                    {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                                    {new Date(meeting.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span>{meeting.participants.length} participants</span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="flex-shrink-0">
                                View Notes
                              </Button>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No past meetings</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Meeting Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 flex items-center justify-center border rounded-lg">
                      <div className="text-center">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Calendar view will be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
          
          {/* Compose Email Dialog */}
          <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Compose Email</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="to">To *</Label>
                  <Select 
                    value={newEmail.to}
                    onValueChange={(value) => setNewEmail({...newEmail, to: value})}
                  >
                    <SelectTrigger id="to">
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      {users
                        .filter(user => user.role !== "middleman")
                        .map(user => (
                          <SelectItem key={user.id} value={user.email || ""}>
                            {user.name} ({user.company})
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input 
                    id="subject" 
                    value={newEmail.subject}
                    onChange={(e) => setNewEmail({...newEmail, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="body">Message *</Label>
                  <Textarea 
                    id="body" 
                    value={newEmail.body}
                    onChange={(e) => setNewEmail({...newEmail, body: e.target.value})}
                    placeholder="Type your message here..."
                    rows={8}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments</Label>
                  <Input 
                    id="attachments" 
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                  {newEmail.attachments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Selected files:</p>
                      <ul className="text-sm">
                        {newEmail.attachments.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => setShowComposeDialog(false)}>Cancel</Button>
                  <Button onClick={handleSendEmail}>Send Email</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* New Meeting Dialog */}
          <Dialog open={showNewMeetingDialog} onOpenChange={setShowNewMeetingDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Meeting</DialogTitle>
                <DialogDescription>
                  Fill in the details to schedule a new meeting with clients or suppliers.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title *</Label>
                  <Input 
                    id="title" 
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={newMeeting.date}
                      onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input 
                      id="startTime" 
                      type="time"
                      value={newMeeting.startTime}
                      onChange={(e) => setNewMeeting({...newMeeting, startTime: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input 
                      id="endTime" 
                      type="time"
                      value={newMeeting.endTime}
                      onChange={(e) => setNewMeeting({...newMeeting, endTime: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={newMeeting.location}
                    onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
                    placeholder="Office, Zoom, Google Meet, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="participants">Participants *</Label>
                  <Select 
                    value={newMeeting.participants[0] || ""}
                    onValueChange={(value) => setNewMeeting({...newMeeting, participants: [value]})}
                  >
                    <SelectTrigger id="participants">
                      <SelectValue placeholder="Select participants" />
                    </SelectTrigger>
                    <SelectContent>
                      {users
                        .filter(user => user.role !== "middleman")
                        .map(user => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name} ({user.company})
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={newMeeting.description}
                    onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                    placeholder="Enter meeting agenda or description"
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewMeetingDialog(false)}>Cancel</Button>
                <Button onClick={handleCreateMeeting}>Schedule Meeting</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}
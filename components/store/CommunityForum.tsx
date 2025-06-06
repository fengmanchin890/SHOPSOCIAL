"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, Reply, Flag, Search, Plus, Filter, Globe, Tag, ShoppingBag, Briefcase, Users, BookOpen, Eye } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    nationality: string
  }
  category: string
  tags: string[]
  likes: number
  replies: number
  views: number
  timestamp: Date
  isLiked: boolean
}

export function CommunityForum() {
  const { language } = useI18n()
  const [activeTab, setActiveTab] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
    tags: ""
  })

  // Sample forum posts
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: "post-1",
      title: "Recommended Chinese language schools in Taipei?",
      content: "I'm moving to Taipei next month and want to start learning Chinese. Can anyone recommend good language schools that offer flexible schedules and have English-speaking staff?",
      author: {
        id: "user-1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
        nationality: "USA"
      },
      category: "language",
      tags: ["chinese", "language school", "taipei"],
      likes: 12,
      replies: 8,
      views: 156,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isLiked: false
    },
    {
      id: "post-2",
      title: "Looking for roommate in Taichung",
      content: "I'm a graduate student from Vietnam looking for a roommate to share a 2-bedroom apartment near Feng Chia University. Rent is NT$12,000/month including utilities. Available from September.",
      author: {
        id: "user-2",
        name: "Nguyen Minh",
        avatar: "/placeholder.svg?height=40&width=40&text=NM",
        nationality: "Vietnam"
      },
      category: "accommodation",
      tags: ["roommate", "taichung", "student"],
      likes: 5,
      replies: 3,
      views: 89,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      isLiked: true
    },
    {
      id: "post-3",
      title: "ARC renewal process - what documents are needed?",
      content: "My ARC is expiring next month and I need to renew it. This is my first time renewing, can someone explain the process and what documents I need to prepare? I'm working as an English teacher.",
      author: {
        id: "user-3",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40&text=EW",
        nationality: "UK"
      },
      category: "legal",
      tags: ["ARC", "visa", "documents"],
      likes: 24,
      replies: 15,
      views: 230,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isLiked: false
    },
    {
      id: "post-4",
      title: "Weekend hiking group for foreigners",
      content: "I'm organizing a hiking group for foreigners in Taiwan. We plan to explore different trails every weekend. All levels welcome! First hike will be to Elephant Mountain this Saturday.",
      author: {
        id: "user-4",
        name: "Carlos Mendez",
        avatar: "/placeholder.svg?height=40&width=40&text=CM",
        nationality: "Spain"
      },
      category: "social",
      tags: ["hiking", "outdoors", "weekend", "activity"],
      likes: 18,
      replies: 12,
      views: 145,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isLiked: false
    },
    {
      id: "post-5",
      title: "Selling furniture - moving back home",
      content: "I'm moving back to Thailand next month and selling all my furniture. Items include: IKEA bed frame (queen), desk, bookshelf, dining table with 4 chairs. All in good condition. Located in Xinyi District.",
      author: {
        id: "user-5",
        name: "Somchai T.",
        avatar: "/placeholder.svg?height=40&width=40&text=ST",
        nationality: "Thailand"
      },
      category: "marketplace",
      tags: ["furniture", "selling", "moving"],
      likes: 3,
      replies: 7,
      views: 112,
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      isLiked: false
    },
    {
      id: "post-6",
      title: "Job opportunity: English teacher needed",
      content: "Our language school in Kaohsiung is looking for a native English teacher. Requirements: Bachelor's degree, TEFL certificate, and at least 1 year of teaching experience. Competitive salary and benefits.",
      author: {
        id: "user-6",
        name: "Lin Wei-Ting",
        avatar: "/placeholder.svg?height=40&width=40&text=LW",
        nationality: "Taiwan"
      },
      category: "jobs",
      tags: ["job", "english", "teaching", "kaohsiung"],
      likes: 9,
      replies: 4,
      views: 201,
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      isLiked: false
    }
  ])

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        }
      }
      return post
    }))
  }

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newPost.title || !newPost.content) return
    
    const newForumPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      author: {
        id: "current-user",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40&text=You",
        nationality: "Your Country"
      },
      category: newPost.category,
      tags: newPost.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      likes: 0,
      replies: 0,
      views: 0,
      timestamp: new Date(),
      isLiked: false
    }
    
    setPosts([newForumPost, ...posts])
    setNewPost({
      title: "",
      content: "",
      category: "general",
      tags: ""
    })
    setShowNewPostForm(false)
  }

  const filteredPosts = posts.filter(post => {
    if (activeTab !== "all" && post.category !== activeTab) return false
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  const getLocalizedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      forumTitle: {
        "zh-TW": "社區論壇",
        "vi": "Diễn đàn cộng đồng",
        "en": "Community Forum"
      },
      newPost: {
        "zh-TW": "發布新帖子",
        "vi": "Đăng bài mới",
        "en": "New Post"
      },
      search: {
        "zh-TW": "搜索帖子...",
        "vi": "Tìm kiếm bài viết...",
        "en": "Search posts..."
      },
      categories: {
        "zh-TW": "類別",
        "vi": "Danh mục",
        "en": "Categories"
      },
      all: {
        "zh-TW": "全部",
        "vi": "Tất cả",
        "en": "All"
      },
      general: {
        "zh-TW": "一般",
        "vi": "Chung",
        "en": "General"
      },
      language: {
        "zh-TW": "語言",
        "vi": "Ngôn ngữ",
        "en": "Language"
      },
      accommodation: {
        "zh-TW": "住宿",
        "vi": "Chỗ ở",
        "en": "Accommodation"
      },
      legal: {
        "zh-TW": "法律",
        "vi": "Pháp lý",
        "en": "Legal"
      },
      social: {
        "zh-TW": "社交",
        "vi": "Xã hội",
        "en": "Social"
      },
      marketplace: {
        "zh-TW": "市場",
        "vi": "Chợ",
        "en": "Marketplace"
      },
      jobs: {
        "zh-TW": "工作",
        "vi": "Việc làm",
        "en": "Jobs"
      },
      postTitle: {
        "zh-TW": "標題",
        "vi": "Tiêu đề",
        "en": "Title"
      },
      postContent: {
        "zh-TW": "內容",
        "vi": "Nội dung",
        "en": "Content"
      },
      postCategory: {
        "zh-TW": "類別",
        "vi": "Danh mục",
        "en": "Category"
      },
      postTags: {
        "zh-TW": "標籤（用逗號分隔）",
        "vi": "Thẻ (phân cách bằng dấu phẩy)",
        "en": "Tags (comma separated)"
      },
      cancel: {
        "zh-TW": "取消",
        "vi": "Hủy",
        "en": "Cancel"
      },
      submit: {
        "zh-TW": "發布",
        "vi": "Đăng",
        "en": "Submit"
      },
      likes: {
        "zh-TW": "喜歡",
        "vi": "Thích",
        "en": "Likes"
      },
      replies: {
        "zh-TW": "回覆",
        "vi": "Trả lời",
        "en": "Replies"
      },
      views: {
        "zh-TW": "查看",
        "vi": "Lượt xem",
        "en": "Views"
      }
    }
    
    return translations[key][language] || translations[key]["en"]
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return <MessageSquare className="h-4 w-4" />
      case "language":
        return <Globe className="h-4 w-4" />
      case "accommodation":
        return <Users className="h-4 w-4" />
      case "legal":
        return <BookOpen className="h-4 w-4" />
      case "social":
        return <Users className="h-4 w-4" />
      case "marketplace":
        return <ShoppingBag className="h-4 w-4" />
      case "jobs":
        return <Briefcase className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
            {getLocalizedText("forumTitle")}
          </CardTitle>
          <Button onClick={() => setShowNewPostForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {getLocalizedText("newPost")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={getLocalizedText("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full overflow-x-auto flex-nowrap justify-start h-auto p-1">
            <TabsTrigger value="all" className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              {getLocalizedText("all")}
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {getLocalizedText("general")}
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              {getLocalizedText("language")}
            </TabsTrigger>
            <TabsTrigger value="accommodation" className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {getLocalizedText("accommodation")}
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              {getLocalizedText("legal")}
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {getLocalizedText("social")}
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center">
              <ShoppingBag className="h-4 w-4 mr-1" />
              {getLocalizedText("marketplace")}
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1" />
              {getLocalizedText("jobs")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {showNewPostForm ? (
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmitPost} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{getLocalizedText("postTitle")}</label>
                      <Input 
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{getLocalizedText("postContent")}</label>
                      <Textarea 
                        value={newPost.content}
                        onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                        rows={5}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">{getLocalizedText("postCategory")}</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={newPost.category}
                          onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                        >
                          <option value="general">{getLocalizedText("general")}</option>
                          <option value="language">{getLocalizedText("language")}</option>
                          <option value="accommodation">{getLocalizedText("accommodation")}</option>
                          <option value="legal">{getLocalizedText("legal")}</option>
                          <option value="social">{getLocalizedText("social")}</option>
                          <option value="marketplace">{getLocalizedText("marketplace")}</option>
                          <option value="jobs">{getLocalizedText("jobs")}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{getLocalizedText("postTags")}</label>
                        <Input 
                          value={newPost.tags}
                          onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                          placeholder="tag1, tag2, tag3"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowNewPostForm(false)}>
                        {getLocalizedText("cancel")}
                      </Button>
                      <Button type="submit">
                        {getLocalizedText("submit")}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-lg">{post.title}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span className="mr-2">{post.author.name}</span>
                                <Badge variant="outline" className="text-xs mr-2">{post.author.nationality}</Badge>
                                <span>{post.timestamp.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="flex items-center space-x-1">
                            {getCategoryIcon(post.category)}
                            <span className="capitalize">{post.category}</span>
                          </Badge>
                        </div>
                        
                        <p className="mt-3 text-gray-700">{post.content}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-1">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex space-x-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`flex items-center ${post.isLiked ? 'text-red-500' : ''}`}
                              onClick={() => handleLikePost(post.id)}
                            >
                              <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-red-500' : ''}`} />
                              <span>{post.likes} {getLocalizedText("likes")}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center">
                              <Reply className="h-4 w-4 mr-1" />
                              <span>{post.replies} {getLocalizedText("replies")}</span>
                            </Button>
                            <div className="flex items-center text-sm text-gray-500">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{post.views} {getLocalizedText("views")}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Flag className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No posts found matching your criteria</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
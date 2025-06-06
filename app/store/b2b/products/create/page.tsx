"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Plus, Trash, Upload } from "lucide-react"
import Link from "next/link"

export default function CreateProductPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { addProduct } = useB2B()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    specifications: {} as Record<string, string>,
    moq: 1,
    leadTime: 7,
    supplierId: "user-supplier-1", // Default supplier ID
  })
  
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")
  const [specs, setSpecs] = useState<Array<{key: string, value: string}>>([])
  
  const categories = [
    "Electronics", 
    "Apparel", 
    "Home & Garden", 
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Automotive",
    "Industrial & Scientific",
    "Office Products"
  ]
  
  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setSpecs([...specs, {key: newSpecKey, value: newSpecValue}])
      setNewSpecKey("")
      setNewSpecValue("")
    }
  }
  
  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.category || !formData.description) {
      toast({
        title: "缺少必填欄位",
        description: "請填寫所有必填欄位",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Convert specs array to object
      const specifications = specs.reduce((obj, spec) => {
        obj[spec.key] = spec.value
        return obj
      }, {} as Record<string, string>)
      
      // Add product
      const productId = addProduct({
        ...formData,
        specifications,
        moq: Number(formData.moq),
        leadTime: Number(formData.leadTime),
        image: formData.image || "/placeholder.svg?height=300&width=300"
      })
      
      toast({
        title: "產品新增成功",
        description: `產品 "${formData.name}" 已成功新增`,
      })
      
      // Redirect to product list
      router.push("/store/b2b/products")
    } catch (error) {
      toast({
        title: "產品新增失敗",
        description: "新增產品時發生錯誤，請稍後再試",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/store/b2b/products">
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">新增產品</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>基本資訊</CardTitle>
                    <CardDescription>填寫產品的基本資訊</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">產品名稱 *</Label>
                      <Input 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="輸入產品名稱"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">產品類別 *</Label>
                      <Select 
                        value={formData.category}
                        onValueChange={(value) => setFormData({...formData, category: value})}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="選擇產品類別" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">產品描述 *</Label>
                      <Textarea 
                        id="description" 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="詳細描述產品特性、用途和優勢"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">產品圖片 URL</Label>
                      <Input 
                        id="image" 
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        placeholder="輸入產品圖片 URL"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>產品規格</CardTitle>
                    <CardDescription>添加產品的詳細規格</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="specKey">規格名稱</Label>
                        <Input 
                          id="specKey" 
                          value={newSpecKey}
                          onChange={(e) => setNewSpecKey(e.target.value)}
                          placeholder="例如：尺寸、重量、材質"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specValue">規格值</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="specValue" 
                            value={newSpecValue}
                            onChange={(e) => setNewSpecValue(e.target.value)}
                            placeholder="例如：10cm、500g、不鏽鋼"
                            className="flex-1"
                          />
                          <Button 
                            type="button" 
                            onClick={handleAddSpecification}
                            disabled={!newSpecKey.trim() || !newSpecValue.trim()}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {specs.length > 0 && (
                      <div className="border rounded-md p-4 mt-4">
                        <h4 className="font-medium mb-2">已添加規格</h4>
                        <div className="space-y-2">
                          {specs.map((spec, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div>
                                <span className="font-medium">{spec.key}:</span> {spec.value}
                              </div>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveSpec(index)}
                              >
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>供應資訊</CardTitle>
                    <CardDescription>設定產品的供應相關資訊</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="moq">最小訂購量 (MOQ) *</Label>
                      <Input 
                        id="moq" 
                        type="number"
                        value={formData.moq}
                        onChange={(e) => setFormData({...formData, moq: parseInt(e.target.value) || 1})}
                        min="1"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="leadTime">生產前置時間 (天) *</Label>
                      <Input 
                        id="leadTime" 
                        type="number"
                        value={formData.leadTime}
                        onChange={(e) => setFormData({...formData, leadTime: parseInt(e.target.value) || 1})}
                        min="1"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supplier">供應商 *</Label>
                      <Select 
                        value={formData.supplierId}
                        onValueChange={(value) => setFormData({...formData, supplierId: value})}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="選擇供應商" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user-supplier-1">Global Manufacturing Co</SelectItem>
                          <SelectItem value="user-supplier-2">Tech Components Ltd</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>發布設定</CardTitle>
                    <CardDescription>設定產品的發布狀態</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="published" defaultChecked />
                      <Label htmlFor="published">立即發布</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" />
                      <Label htmlFor="featured">設為精選產品</Label>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "處理中..." : "新增產品"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
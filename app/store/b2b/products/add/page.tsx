"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Package, 
  Save, 
  X, 
  Plus, 
  Trash, 
  Upload,
  Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { useB2B } from "@/components/store/B2BProvider"
import { useI18n } from "@/contexts/i18n-context"

export default function AddProductPage() {
  const router = useRouter()
  const { addProduct, users } = useB2B()
  const { t } = useI18n()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [productImage, setProductImage] = useState<File | null>(null)
  
  // Product form state
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    moq: 0, // Minimum Order Quantity
    leadTime: 0, // days
    supplierId: "",
    specifications: {} as Record<string, string>,
  })
  
  // Specifications state
  const [specifications, setSpecifications] = useState<Array<{key: string, value: string}>>([
    { key: "", value: "" }
  ])
  
  // Get suppliers from users
  const suppliers = users.filter(user => user.role === "supplier")
  
  const handleAddSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }])
  }
  
  const handleRemoveSpecification = (index: number) => {
    const newSpecifications = [...specifications]
    newSpecifications.splice(index, 1)
    setSpecifications(newSpecifications)
  }
  
  const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecifications = [...specifications]
    newSpecifications[index][field] = value
    setSpecifications(newSpecifications)
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0])
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Convert specifications array to object
    const specsObject: Record<string, string> = {}
    specifications.forEach(spec => {
      if (spec.key && spec.value) {
        specsObject[spec.key] = spec.value
      }
    })
    
    // Create product object
    const newProduct = {
      ...product,
      specifications: specsObject,
      image: productImage ? URL.createObjectURL(productImage) : "/placeholder.svg?height=300&width=300",
    }
    
    try {
      // Add product
      addProduct(newProduct)
      
      // Show success message
      alert("Product added successfully!")
      
      // Redirect to products page
      router.push("/store/b2b/products")
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Failed to add product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{t("add")} {t("products")}</h1>
              <p className="text-gray-500">Add a new product to your catalog</p>
            </div>
            <Button variant="outline" onClick={() => router.push("/store/b2b/products")}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input 
                        id="name" 
                        value={product.name}
                        onChange={(e) => setProduct({...product, name: e.target.value})}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={product.category}
                        onValueChange={(value) => setProduct({...product, category: value})}
                        required
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Office">Office</SelectItem>
                          <SelectItem value="Textiles">Textiles</SelectItem>
                          <SelectItem value="Packaging">Packaging</SelectItem>
                          <SelectItem value="Home">Home & Kitchen</SelectItem>
                          <SelectItem value="Beauty">Beauty & Personal Care</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea 
                      id="description" 
                      value={product.description}
                      onChange={(e) => setProduct({...product, description: e.target.value})}
                      placeholder="Enter product description"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="moq">Minimum Order Quantity *</Label>
                      <Input 
                        id="moq" 
                        type="number"
                        value={product.moq || ""}
                        onChange={(e) => setProduct({...product, moq: parseInt(e.target.value) || 0})}
                        placeholder="Enter MOQ"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="leadTime">Lead Time (days) *</Label>
                      <Input 
                        id="leadTime" 
                        type="number"
                        value={product.leadTime || ""}
                        onChange={(e) => setProduct({...product, leadTime: parseInt(e.target.value) || 0})}
                        placeholder="Enter lead time in days"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Supplier *</Label>
                      <Select 
                        value={product.supplierId}
                        onValueChange={(value) => setProduct({...product, supplierId: value})}
                        required
                      >
                        <SelectTrigger id="supplier">
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers.map(supplier => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.company}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex items-end gap-4">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`spec-key-${index}`}>Specification</Label>
                        <Input 
                          id={`spec-key-${index}`} 
                          value={spec.key}
                          onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                          placeholder="e.g., Weight, Dimensions, Color"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`spec-value-${index}`}>Value</Label>
                        <Input 
                          id={`spec-value-${index}`} 
                          value={spec.value}
                          onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                          placeholder="e.g., 250g, 10x15x5 cm, Black"
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveSpecification(index)}
                        disabled={specifications.length === 1}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddSpecification}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Specification
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Product Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="w-40 h-40 border rounded-md flex items-center justify-center overflow-hidden">
                      {productImage ? (
                        <img 
                          src={URL.createObjectURL(productImage)} 
                          alt="Product preview" 
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <Package className="h-16 w-16 text-gray-300" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="space-y-2">
                        <Label htmlFor="product-image">Upload Image</Label>
                        <Input 
                          id="product-image" 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <p className="text-xs text-gray-500">
                          Recommended size: 800x800px. Max file size: 5MB. Supported formats: JPG, PNG, GIF.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/store/b2b/products")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Product
                  </>
                )}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
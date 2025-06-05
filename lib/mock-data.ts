export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  description: string
  features: string[]
  inStock: boolean
  rating: number
  reviewCount: number
  sizes?: string[]
  colors?: string[]
  tags: string[]
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "經典牛仔外套",
    price: 2980,
    originalPrice: 3980,
    image: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "men",
    description: "經典設計的牛仔外套，採用優質丹寧布料製作，版型修身舒適，適合各種場合穿搭。",
    features: ["100% 純棉丹寧布料", "經典修身版型", "金屬鈕扣設計", "多個實用口袋", "可機洗"],
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    sizes: ["S", "M", "L", "XL"],
    colors: ["深藍", "淺藍", "黑色"],
    tags: ["熱門", "新品"],
  },
  {
    id: "2",
    name: "優雅連身洋裝",
    price: 1680,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "women",
    description: "優雅的連身洋裝，適合正式場合或約會穿著，舒適的面料和精緻的剪裁。",
    features: ["高品質聚酯纖維", "A字版型設計", "隱形拉鍊", "內襯設計", "乾洗建議"],
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
    sizes: ["XS", "S", "M", "L"],
    colors: ["黑色", "深藍", "酒紅"],
    tags: ["推薦"],
  },
  {
    id: "3",
    name: "運動休閒鞋",
    price: 3200,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "shoes",
    description: "舒適的運動休閒鞋，適合日常穿著和輕度運動，透氣性佳。",
    features: ["透氣網布材質", "緩震中底設計", "防滑橡膠大底", "輕量化設計", "多色可選"],
    inStock: true,
    rating: 4.3,
    reviewCount: 156,
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["白色", "黑色", "灰色"],
    tags: ["運動"],
  },
  {
    id: "4",
    name: "真皮手提包",
    price: 4500,
    originalPrice: 5500,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "accessories",
    description: "精選真皮製作的手提包，工藝精緻，容量適中，是日常搭配的完美選擇。",
    features: ["頂級真皮材質", "手工縫製", "多層收納設計", "可調節肩帶", "金屬五金配件"],
    inStock: true,
    rating: 4.7,
    reviewCount: 67,
    colors: ["棕色", "黑色", "米色"],
    tags: ["精品", "限量"],
  },
  {
    id: "5",
    name: "舒適棉質T恤",
    price: 680,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "men",
    description: "100%純棉製作的基本款T恤，舒適透氣，是衣櫃必備的基本單品。",
    features: ["100% 純棉材質", "圓領設計", "標準版型", "多色選擇", "易於保養"],
    inStock: true,
    rating: 4.2,
    reviewCount: 234,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["白色", "黑色", "灰色", "海軍藍"],
    tags: ["基本款"],
  },
  {
    id: "6",
    name: "時尚太陽眼鏡",
    price: 1200,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "accessories",
    description: "時尚的太陽眼鏡，提供UV400防護，鏡框輕盈舒適。",
    features: ["UV400防護", "偏光鏡片", "輕量鏡框", "防刮塗層", "附贈眼鏡盒"],
    inStock: false,
    rating: 4.4,
    reviewCount: 92,
    colors: ["黑色", "棕色", "金色"],
    tags: ["時尚"],
  },
]

export const categories = [
  { id: "men", name: "男裝", image: "/placeholder.svg?height=300&width=300" },
  { id: "women", name: "女裝", image: "/placeholder.svg?height=300&width=300" },
  { id: "shoes", name: "鞋類", image: "/placeholder.svg?height=300&width=300" },
  { id: "accessories", name: "配件", image: "/placeholder.svg?height=300&width=300" },
]

export const banners = [
  {
    id: "1",
    title: "春季新品上市",
    subtitle: "全新春季系列，讓你煥然一新",
    image: "/placeholder.svg?height=500&width=1200",
    link: "/store/products?category=new",
  },
  {
    id: "2",
    title: "限時特價優惠",
    subtitle: "精選商品最高5折優惠",
    image: "/placeholder.svg?height=500&width=1200",
    link: "/store/products?sale=true",
  },
  {
    id: "3",
    title: "免運費活動",
    subtitle: "滿千免運，全台配送",
    image: "/placeholder.svg?height=500&width=1200",
    link: "/store/products",
  },
]

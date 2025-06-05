// Mock data for the store

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  description: string
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  features: string[]
  sizes?: string[]
  colors?: string[]
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  image: string
}

export interface Banner {
  id: string
  title: string
  subtitle: string
  image: string
  link: string
}

export const categories: Category[] = [
  {
    id: "men",
    name: "Thời trang nam",
    image: "/placeholder.svg?height=300&width=300&text=Thời+trang+nam",
  },
  {
    id: "women",
    name: "Thời trang nữ",
    image: "/placeholder.svg?height=300&width=300&text=Thời+trang+nữ",
  },
  {
    id: "accessories",
    name: "Phụ kiện",
    image: "/placeholder.svg?height=300&width=300&text=Phụ+kiện",
  },
  {
    id: "shoes",
    name: "Giày dép",
    image: "/placeholder.svg?height=300&width=300&text=Giày+dép",
  },
]

export const banners: Banner[] = [
  {
    id: "summer-sale",
    title: "Khuyến mãi mùa hè",
    subtitle: "Giảm giá lên đến 50% cho các sản phẩm mùa hè",
    image: "/placeholder.svg?height=500&width=1200&text=Khuyến+mãi+mùa+hè",
    link: "/store/products?category=summer",
  },
  {
    id: "new-arrivals",
    title: "Sản phẩm mới",
    subtitle: "Khám phá bộ sưu tập mới nhất của chúng tôi",
    image: "/placeholder.svg?height=500&width=1200&text=Sản+phẩm+mới",
    link: "/store/products?category=new",
  },
]

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Áo khoác jean cổ điển",
    price: 2980,
    originalPrice: 3500,
    image: "/placeholder.svg?height=400&width=400&text=Áo+khoác+jean",
    images: [
      "/placeholder.svg?height=600&width=600&text=Áo+khoác+jean+1",
      "/placeholder.svg?height=600&width=600&text=Áo+khoác+jean+2",
      "/placeholder.svg?height=600&width=600&text=Áo+khoác+jean+3",
      "/placeholder.svg?height=600&width=600&text=Áo+khoác+jean+4",
    ],
    description:
      "Áo khoác jean cổ điển với thiết kế hiện đại, phù hợp cho cả nam và nữ. Chất liệu jean cao cấp, bền đẹp theo thời gian.",
    category: "men",
    tags: ["Phổ biến", "Bán chạy", "Mùa thu"],
    rating: 4.8,
    reviewCount: 125,
    features: [
      "Chất liệu jean cao cấp",
      "Thiết kế cổ điển",
      "Túi đa năng",
      "Cúc kim loại bền đẹp",
      "Phù hợp cho nhiều dịp",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Xanh đậm", "Xanh nhạt", "Đen"],
    inStock: true,
  },
  {
    id: "2",
    name: "Đầm dài thanh lịch",
    price: 1680,
    originalPrice: 2100,
    image: "/placeholder.svg?height=400&width=400&text=Đầm+dài",
    images: [
      "/placeholder.svg?height=600&width=600&text=Đầm+dài+1",
      "/placeholder.svg?height=600&width=600&text=Đầm+dài+2",
      "/placeholder.svg?height=600&width=600&text=Đầm+dài+3",
    ],
    description:
      "Đầm dài thanh lịch, phù hợp cho các sự kiện trang trọng. Thiết kế ôm nhẹ tôn dáng, chất liệu vải cao cấp.",
    category: "women",
    tags: ["Phổ biến", "Sự kiện", "Thanh lịch"],
    rating: 4.7,
    reviewCount: 98,
    features: [
      "Chất liệu vải cao cấp",
      "Thiết kế ôm nhẹ tôn dáng",
      "Phù hợp cho sự kiện trang trọng",
      "Dễ kết hợp phụ kiện",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Đen", "Đỏ", "Xanh navy"],
    inStock: true,
  },
  {
    id: "3",
    name: "Áo thun cotton thoáng mát",
    price: 680,
    originalPrice: 800,
    image: "/placeholder.svg?height=400&width=400&text=Áo+thun",
    images: [
      "/placeholder.svg?height=600&width=600&text=Áo+thun+1",
      "/placeholder.svg?height=600&width=600&text=Áo+thun+2",
      "/placeholder.svg?height=600&width=600&text=Áo+thun+3",
    ],
    description:
      "Áo thun cotton 100% thoáng mát, thiết kế đơn giản nhưng tinh tế. Phù hợp cho cả nam và nữ, dễ dàng kết hợp với nhiều trang phục khác.",
    category: "men",
    tags: ["Phổ biến", "Hàng ngày", "Thoải mái"],
    rating: 4.5,
    reviewCount: 210,
    features: [
      "Cotton 100% thoáng mát",
      "Thiết kế đơn giản tinh tế",
      "Dễ kết hợp trang phục",
      "Bền màu, không co rút",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Trắng", "Đen", "Xám", "Xanh dương"],
    inStock: true,
  },
  {
    id: "4",
    name: "Túi xách da thật",
    price: 4500,
    originalPrice: 5200,
    image: "/placeholder.svg?height=400&width=400&text=Túi+xách",
    images: [
      "/placeholder.svg?height=600&width=600&text=Túi+xách+1",
      "/placeholder.svg?height=600&width=600&text=Túi+xách+2",
    ],
    description:
      "Túi xách da thật cao cấp, thiết kế sang trọng và hiện đại. Nhiều ngăn tiện lợi, phù hợp cho công việc và các sự kiện quan trọng.",
    category: "accessories",
    tags: ["Cao cấp", "Sang trọng", "Da thật"],
    rating: 4.9,
    reviewCount: 75,
    features: [
      "Da bò thật 100%",
      "Khóa kim loại cao cấp",
      "Nhiều ngăn tiện lợi",
      "Thiết kế sang trọng",
      "Lót vải cao cấp",
    ],
    colors: ["Đen", "Nâu", "Đỏ đô"],
    inStock: true,
  },
  {
    id: "5",
    name: "Giày thể thao đa năng",
    price: 1850,
    originalPrice: 2200,
    image: "/placeholder.svg?height=400&width=400&text=Giày+thể+thao",
    images: [
      "/placeholder.svg?height=600&width=600&text=Giày+thể+thao+1",
      "/placeholder.svg?height=600&width=600&text=Giày+thể+thao+2",
      "/placeholder.svg?height=600&width=600&text=Giày+thể+thao+3",
    ],
    description:
      "Giày thể thao đa năng, phù hợp cho nhiều hoạt động khác nhau. Đế giày êm ái, thiết kế thời trang và năng động.",
    category: "shoes",
    tags: ["Phổ biến", "Thể thao", "Thoải mái"],
    rating: 4.6,
    reviewCount: 182,
    features: [
      "Đế giày êm ái",
      "Thiết kế thời trang",
      "Phù hợp nhiều hoạt động",
      "Dễ vệ sinh",
      "Bền bỉ theo thời gian",
    ],
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Trắng", "Đen", "Xám", "Xanh navy"],
    inStock: true,
  },
  {
    id: "6",
    name: "Kính mát thời trang",
    price: 980,
    originalPrice: 1200,
    image: "/placeholder.svg?height=400&width=400&text=Kính+mát",
    images: [
      "/placeholder.svg?height=600&width=600&text=Kính+mát+1",
      "/placeholder.svg?height=600&width=600&text=Kính+mát+2",
    ],
    description:
      "Kính mát thời trang với thiết kế hiện đại, chống tia UV hiệu quả. Gọng kính nhẹ, thoải mái khi đeo trong thời gian dài.",
    category: "accessories",
    tags: ["Mùa hè", "Thời trang", "Chống UV"],
    rating: 4.4,
    reviewCount: 95,
    features: [
      "Chống tia UV 400",
      "Gọng kính nhẹ",
      "Thiết kế thời trang",
      "Tròng kính chống trầy",
    ],
    colors: ["Đen", "Nâu", "Xanh"],
    inStock: true,
  },
  {
    id: "7",
    name: "Quần jean slim fit",
    price: 1280,
    originalPrice: 1500,
    image: "/placeholder.svg?height=400&width=400&text=Quần+jean",
    images: [
      "/placeholder.svg?height=600&width=600&text=Quần+jean+1",
      "/placeholder.svg?height=600&width=600&text=Quần+jean+2",
      "/placeholder.svg?height=600&width=600&text=Quần+jean+3",
    ],
    description:
      "Quần jean slim fit với chất liệu co giãn thoải mái. Thiết kế hiện đại, dễ dàng kết hợp với nhiều loại áo khác nhau.",
    category: "men",
    tags: ["Phổ biến", "Hàng ngày", "Thoải mái"],
    rating: 4.5,
    reviewCount: 156,
    features: [
      "Chất liệu jean co giãn",
      "Thiết kế slim fit",
      "Bền màu, không phai",
      "Dễ kết hợp trang phục",
    ],
    sizes: ["28", "29", "30", "31", "32", "33", "34"],
    colors: ["Xanh đậm", "Xanh nhạt", "Đen"],
    inStock: true,
  },
  {
    id: "8",
    name: "Áo sơ mi công sở",
    price: 890,
    originalPrice: 1050,
    image: "/placeholder.svg?height=400&width=400&text=Áo+sơ+mi",
    images: [
      "/placeholder.svg?height=600&width=600&text=Áo+sơ+mi+1",
      "/placeholder.svg?height=600&width=600&text=Áo+sơ+mi+2",
    ],
    description:
      "Áo sơ mi công sở với chất liệu cotton pha polyester, ít nhăn và dễ ủi. Thiết kế thanh lịch, phù hợp cho môi trường làm việc chuyên nghiệp.",
    category: "men",
    tags: ["Công sở", "Thanh lịch", "Chuyên nghiệp"],
    rating: 4.6,
    reviewCount: 112,
    features: [
      "Chất liệu cotton pha polyester",
      "Ít nhăn, dễ ủi",
      "Thiết kế thanh lịch",
      "Phù hợp môi trường công sở",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Trắng", "Xanh nhạt", "Xám nhạt", "Hồng nhạt"],
    inStock: true,
  },
  {
    id: "9",
    name: "Váy liền thân công sở",
    price: 1580,
    originalPrice: 1800,
    image: "/placeholder.svg?height=400&width=400&text=Váy+liền+thân",
    images: [
      "/placeholder.svg?height=600&width=600&text=Váy+liền+thân+1",
      "/placeholder.svg?height=600&width=600&text=Váy+liền+thân+2",
    ],
    description:
      "Váy liền thân công sở với thiết kế thanh lịch và chuyên nghiệp. Chất liệu cao cấp, thoáng mát và ít nhăn, phù hợp cho môi trường làm việc.",
    category: "women",
    tags: ["Công sở", "Thanh lịch", "Chuyên nghiệp"],
    rating: 4.7,
    reviewCount: 89,
    features: [
      "Chất liệu cao cấp",
      "Thiết kế thanh lịch",
      "Ít nhăn, dễ ủi",
      "Phù hợp môi trường công sở",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Đen", "Xanh navy", "Xám"],
    inStock: true,
  },
  {
    id: "10",
    name: "Giày cao gót thanh lịch",
    price: 1350,
    originalPrice: 1600,
    image: "/placeholder.svg?height=400&width=400&text=Giày+cao+gót",
    images: [
      "/placeholder.svg?height=600&width=600&text=Giày+cao+gót+1",
      "/placeholder.svg?height=600&width=600&text=Giày+cao+gót+2",
    ],
    description:
      "Giày cao gót thanh lịch với thiết kế hiện đại, gót cao 7cm thoải mái khi đi. Phù hợp cho công sở và các sự kiện trang trọng.",
    category: "shoes",
    tags: ["Thanh lịch", "Công sở", "Sự kiện"],
    rating: 4.5,
    reviewCount: 76,
    features: [
      "Gót cao 7cm thoải mái",
      "Thiết kế thanh lịch",
      "Đế giày êm ái",
      "Phù hợp nhiều dịp",
    ],
    sizes: ["35", "36", "37", "38", "39"],
    colors: ["Đen", "Be", "Đỏ"],
    inStock: true,
  },
  {
    id: "11",
    name: "Đồng hồ thông minh",
    price: 2450,
    originalPrice: 2800,
    image: "/placeholder.svg?height=400&width=400&text=Đồng+hồ+thông+minh",
    images: [
      "/placeholder.svg?height=600&width=600&text=Đồng+hồ+thông+minh+1",
      "/placeholder.svg?height=600&width=600&text=Đồng+hồ+thông+minh+2",
    ],
    description:
      "Đồng hồ thông minh với nhiều tính năng hiện đại: theo dõi sức khỏe, thông báo tin nhắn, cuộc gọi và nhiều ứng dụng khác.",
    category: "accessories",
    tags: ["Phổ biến", "Công nghệ", "Thể thao"],
    rating: 4.8,
    reviewCount: 134,
    features: [
      "Theo dõi sức khỏe",
      "Thông báo tin nhắn, cuộc gọi",
      "Chống nước IP68",
      "Pin dùng 5-7 ngày",
      "Nhiều mặt đồng hồ tùy chỉnh",
    ],
    colors: ["Đen", "Bạc", "Hồng"],
    inStock: true,
  },
  {
    id: "12",
    name: "Áo khoác mùa đông",
    price: 3200,
    originalPrice: 3800,
    image: "/placeholder.svg?height=400&width=400&text=Áo+khoác+mùa+đông",
    images: [
      "/placeholder.svg?height=600&width=600&text=Áo+khoác+mùa+đông+1",
      "/placeholder.svg?height=600&width=600&text=Áo+khoác+mùa+đông+2",
    ],
    description:
      "Áo khoác mùa đông giữ ấm hiệu quả với lớp lót dày, chống thấm nước. Thiết kế hiện đại, phù hợp cho cả nam và nữ.",
    category: "men",
    tags: ["Mùa đông", "Giữ ấm", "Thời trang"],
    rating: 4.9,
    reviewCount: 87,
    features: [
      "Chống thấm nước",
      "Lớp lót dày giữ ấm",
      "Nhiều túi tiện lợi",
      "Mũ có thể tháo rời",
      "Phù hợp thời tiết lạnh",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Đen", "Xanh navy", "Xám"],
    inStock: false,
  },
]
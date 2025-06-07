"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react"
import i18n from "i18next"
import { initReactI18next, useTranslation } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Define available languages
export const languages = [
  { code: "zh-TW", name: "Traditional Chinese", nativeName: "繁體中文", flag: "🇹🇼", rtl: false },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", rtl: false },
  { code: "th", name: "Thai", nativeName: "ภาษาไทย", flag: "🇹🇭", rtl: false },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", rtl: false },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", rtl: false },
]

// Define translations
const resources = {
  "zh-TW": {
    translation: {
      // Common
      "platform.name": "LiveTrade Connect",
      "platform.description": "一站式貿易平台",
      "platform.slogan": "連接電子商務、B2B交易和生活服務",
      
      // Navigation
      "nav.home": "首頁",
      "nav.products": "產品",
      "nav.b2b": "B2B平台",
      "nav.lifeServices": "生活服務平台",
      
      // B2B Platform
      "b2b.dashboard": "B2B 儀表板",
      "b2b.products": "產品管理",
      "b2b.orders": "訂單管理",
      "b2b.customers": "客戶管理",
      "b2b.suppliers": "供應商管理",
      "b2b.quotes": "報價管理",
      "b2b.rfq": "詢價請求",
      "b2b.payments": "付款管理",
      "b2b.analytics": "數據分析",
      "b2b.settings": "系統設置",
      "b2b.logout": "登出系統",
      
      // Life Trade Platform
      "lifeTrade.title": "生活服務平台",
      "lifeTrade.description": "連接在國外的台灣人和在台灣的外國人社區",
      "lifeTrade.overview": "概覽",
      "lifeTrade.food": "美食",
      "lifeTrade.accommodation": "住宿",
      "lifeTrade.travel": "一起探索",
      "lifeTrade.language": "語言交流",
      "lifeTrade.culture": "多元文化",
      
      // Target Users
      "targetUsers.title": "目標用戶群體",
      "targetUsers.students": "國際學生",
      "targetUsers.students.desc": "不熟悉語言，想交朋友，想體驗當地文化和美食",
      "targetUsers.married": "國際婚姻和定居者",
      "targetUsers.married.desc": "想融入當地生活，參與社區活動",
      "targetUsers.workers": "外籍工作者",
      "targetUsers.workers.desc": "專業人士、藍領工人和數位遊牧者",
      
      // Features
      "features.title": "主要功能",
      "features.food": "美食體驗",
      "features.food.desc": "探索當地美食",
      "features.accommodation": "住宿交換",
      "features.accommodation.desc": "尋找或交換住處",
      "features.travel": "一起探索",
      "features.travel.desc": "尋找旅伴",
      "features.language": "語言交流",
      "features.language.desc": "學習和教授語言",
      "features.culture": "多元文化中心",
      "features.culture.desc": "融入資源",
      
      // Recent Activities
      "recentActivities.title": "最近活動",
      "recentActivities.cookingClass": "台灣料理烹飪課",
      "recentActivities.cookingClass.desc": "學習製作牛肉麵和傳統菜餚",
      "recentActivities.languageExchange": "中文-英語交流",
      "recentActivities.languageExchange.desc": "每週在咖啡廳見面",
      "recentActivities.marketTour": "夜市探索之旅",
      "recentActivities.marketTour.desc": "探索傳統市場的美食和文化",
      
      // Food Section
      "food.title": "美食探索 (Eat & Meet)",
      "food.addExperience": "添加體驗",
      "food.smartDiscovery": "智能美食發現系統",
      "food.locationBased": "基於位置的推薦",
      "food.locationBased.desc": "自動推薦5-10公里範圍內的台灣餐廳和當地菜餚",
      "food.tasteProfile": "口味檔案匹配",
      "food.tasteProfile.desc": "創建口味檔案（辣度、甜度偏好、飲食限制）獲取個性化推薦",
      "food.homesickMode": "思鄉模式",
      "food.homesickMode.desc": "尋找最接近台灣特定地區菜餚的美食（北部、中部、南部風格）",
      
      // Accommodation Section
      "accommodation.title": "住宿交換 (Live & Help)",
      "accommodation.addListing": "添加住處",
      
      // Travel Section
      "travel.title": "一起探索 (Explore Together)",
      "travel.addActivity": "添加活動",
      
      // Language Section
      "language.title": "語言交流 (Language Swap)",
      "language.addClass": "添加課程",
      
      // Culture Section
      "culture.title": "多元文化中心 (Multicultural Hub)",
      "culture.addResource": "添加資源",
      
      // Buttons
      "button.viewMore": "查看更多",
      "button.register": "報名",
      "button.join": "參加",
      "button.contact": "聯繫",
      "button.cancel": "取消",
      "button.save": "保存",
      "button.back": "返回",
      "button.add": "添加",
      "button.processing": "處理中...",
      
      // Search
      "search.placeholder": "搜尋...",
      
      // Products
      "products": "產品",
      "products.all": "所有產品",
      "products.featured": "精選產品",
      "products.popular": "熱門產品",
      "products.new": "新品",
      "products.sale": "特價商品",
      
      // User Profile
      "profile.title": "會員中心",
      "profile.info": "個人資料",
      "profile.orders": "訂單歷史",
      "profile.settings": "帳戶設置",
      "profile.basicInfo": "基本資料",
      "profile.name": "姓名",
      "profile.email": "電子郵件",
      "profile.phone": "電話號碼",
      "profile.address": "地址",
      "profile.joinDate": "加入日期",
      "profile.edit": "編輯",
      "profile.save": "保存",
      "profile.cancel": "取消",
      "profile.stats": "會員統計",
      "profile.totalOrders": "訂單總數",
      "profile.totalSpent": "消費總額",
      
      // Cart
      "cart.title": "購物車",
      "cart.empty": "購物車是空的",
      "cart.emptyMessage": "您的購物車中沒有商品",
      "cart.startShopping": "開始購物",
      "cart.summary": "訂單摘要",
      "cart.subtotal": "商品總額",
      "cart.shipping": "運費",
      "cart.freeShipping": "免運費",
      "cart.total": "總計",
      "cart.checkout": "結帳",
      "cart.continueShopping": "繼續購物",
      "cart.clearCart": "清空購物車",
      "cart.shippingInfo": "• 訂單滿$1,000免運費",
      "cart.deliveryInfo": "• 預計2-3個工作日送達",
      "cart.returnInfo": "• 7天無理由退換貨",
      
      // Wishlist
      "wishlist.title": "收藏清單",
      "wishlist.empty": "收藏清單是空的",
      "wishlist.emptyMessage": "您的收藏清單中沒有商品",
      "wishlist.startShopping": "開始購物",
      "wishlist.viewCompare": "查看比較",
      "wishlist.clearWishlist": "清空收藏清單",
      "wishlist.addToCart": "加入購物車",
      "wishlist.addToCompare": "加入比較",
      
      // Compare
      "compare.title": "商品比較",
      "compare.empty": "比較清單是空的",
      "compare.emptyMessage": "從收藏清單或商品頁面添加商品進行比較",
      "compare.viewProducts": "瀏覽商品",
      "compare.viewWishlist": "查看收藏清單",
      "compare.social": "社交",
      "compare.collaborate": "協作",
      "compare.priceAlert": "價格提醒",
      "compare.filter": "篩選",
      "compare.save": "保存",
      "compare.history": "歷史記錄",
      "compare.share": "分享",
      "compare.export": "導出",
      "compare.clearCompare": "清空比較清單",
      "compare.addToCart": "加入購物車",
      "compare.viewDetails": "查看詳情",
    }
  },
  vi: {
    translation: {
      // Common
      "platform.name": "LiveTrade Connect",
      "platform.description": "Nền tảng thương mại một cửa",
      "platform.slogan": "Kết nối thương mại điện tử, giao dịch B2B và dịch vụ đời sống",
      
      // Navigation
      "nav.home": "Trang chủ",
      "nav.products": "Sản phẩm",
      "nav.b2b": "Nền tảng B2B",
      "nav.lifeServices": "Nền tảng thương mại đời sống",
      
      // B2B Platform
      "b2b.dashboard": "Bảng điều khiển B2B",
      "b2b.products": "Quản lý sản phẩm",
      "b2b.orders": "Quản lý đơn hàng",
      "b2b.customers": "Quản lý khách hàng",
      "b2b.suppliers": "Quản lý nhà cung cấp",
      "b2b.quotes": "Quản lý báo giá",
      "b2b.rfq": "Yêu cầu báo giá",
      "b2b.payments": "Quản lý thanh toán",
      "b2b.analytics": "Phân tích dữ liệu",
      "b2b.settings": "Cài đặt hệ thống",
      "b2b.logout": "Đăng xuất",
      
      // Life Trade Platform
      "lifeTrade.title": "Nền tảng thương mại đời sống",
      "lifeTrade.description": "Kết nối cộng đồng người Việt tại nước ngoài và người nước ngoài tại Việt Nam",
      "lifeTrade.overview": "Tổng quan",
      "lifeTrade.food": "Ẩm thực",
      "lifeTrade.accommodation": "Nhà ở",
      "lifeTrade.travel": "Cùng đi",
      "lifeTrade.language": "Ngôn ngữ",
      "lifeTrade.culture": "Đa văn hóa",
      
      // Target Users
      "targetUsers.title": "Nhóm người dùng mục tiêu",
      "targetUsers.students": "Sinh viên quốc tế",
      "targetUsers.students.desc": "Chưa quen ngôn ngữ, muốn kết bạn, muốn trải nghiệm văn hóa và ẩm thực địa phương",
      "targetUsers.married": "Người nước ngoài kết hôn và định cư",
      "targetUsers.married.desc": "Muốn hòa nhập cuộc sống địa phương, tham gia hoạt động cộng đồng",
      "targetUsers.workers": "Người lao động nước ngoài",
      "targetUsers.workers.desc": "Chuyên gia, lao động phổ thông và người làm việc từ xa",
      
      // Features
      "features.title": "Các tính năng chính",
      "features.food": "Trải nghiệm ẩm thực",
      "features.food.desc": "Khám phá ẩm thực địa phương",
      "features.accommodation": "Trao đổi nhà ở",
      "features.accommodation.desc": "Tìm chỗ ở hoặc trao đổi",
      "features.travel": "Cùng đi khám phá",
      "features.travel.desc": "Tìm bạn đồng hành",
      "features.language": "Trao đổi ngôn ngữ",
      "features.language.desc": "Học và dạy ngôn ngữ",
      "features.culture": "Trung tâm đa văn hóa",
      "features.culture.desc": "Tài nguyên hòa nhập",
      
      // Recent Activities
      "recentActivities.title": "Hoạt động gần đây",
      "recentActivities.cookingClass": "Lớp nấu ăn món Việt",
      "recentActivities.cookingClass.desc": "Hướng dẫn nấu phở và các món truyền thống",
      "recentActivities.languageExchange": "Trao đổi tiếng Việt - tiếng Anh",
      "recentActivities.languageExchange.desc": "Gặp gỡ hàng tuần tại quán cà phê",
      "recentActivities.marketTour": "Tour khám phá chợ Bến Thành",
      "recentActivities.marketTour.desc": "Khám phá ẩm thực và văn hóa chợ truyền thống",
      
      // Food Section
      "food.title": "Khám phá ẩm thực (Eat & Meet)",
      "food.addExperience": "Thêm trải nghiệm",
      "food.smartDiscovery": "Hệ thống khám phá ẩm thực thông minh",
      "food.locationBased": "Đề xuất dựa trên vị trí",
      "food.locationBased.desc": "Tự động gợi ý nhà hàng Việt và món ăn địa phương trong bán kính 5-10km",
      "food.tasteProfile": "Hồ sơ khẩu vị cá nhân",
      "food.tasteProfile.desc": "Tạo hồ sơ hương vị (mức độ cay, sở thích ngọt, hạn chế ăn uống) để nhận đề xuất cá nhân hóa",
      "food.homesickMode": "Chế độ \"Nhớ nhà\"",
      "food.homesickMode.desc": "Tìm món ăn có hương vị gần giống với ẩm thực vùng miền Việt Nam (Bắc, Trung, Nam)",
      
      // Accommodation Section
      "accommodation.title": "Trao đổi nhà ở (Live & Help)",
      "accommodation.addListing": "Thêm chỗ ở",
      
      // Travel Section
      "travel.title": "Cùng đi khám phá (Explore Together)",
      "travel.addActivity": "Thêm hoạt động",
      
      // Language Section
      "language.title": "Trao đổi ngôn ngữ (Language Swap)",
      "language.addClass": "Thêm lớp học",
      
      // Culture Section
      "culture.title": "Trung tâm đa văn hóa (Multicultural Hub)",
      "culture.addResource": "Thêm tài nguyên",
      
      // Buttons
      "button.viewMore": "Xem thêm",
      "button.register": "Đăng ký",
      "button.join": "Tham gia",
      "button.contact": "Liên hệ",
      "button.cancel": "Hủy",
      "button.save": "Lưu",
      "button.back": "Quay lại",
      "button.add": "Thêm",
      "button.processing": "Đang xử lý...",
      
      // Search
      "search.placeholder": "Tìm kiếm...",
      
      // Products
      "products": "Sản phẩm",
      "products.all": "Tất cả sản phẩm",
      "products.featured": "Sản phẩm nổi bật",
      "products.popular": "Sản phẩm phổ biến",
      "products.new": "Sản phẩm mới",
      "products.sale": "Sản phẩm giảm giá",
      
      // User Profile
      "profile.title": "Trung tâm thành viên",
      "profile.info": "Thông tin cá nhân",
      "profile.orders": "Lịch sử đơn hàng",
      "profile.settings": "Cài đặt tài khoản",
      "profile.basicInfo": "Thông tin cơ bản",
      "profile.name": "Họ tên",
      "profile.email": "Email",
      "profile.phone": "Số điện thoại",
      "profile.address": "Địa chỉ",
      "profile.joinDate": "Ngày tham gia",
      "profile.edit": "Chỉnh sửa",
      "profile.save": "Lưu",
      "profile.cancel": "Hủy",
      "profile.stats": "Thống kê thành viên",
      "profile.totalOrders": "Tổng số đơn hàng",
      "profile.totalSpent": "Tổng chi tiêu",
      
      // Cart
      "cart.title": "Giỏ hàng",
      "cart.empty": "Giỏ hàng trống",
      "cart.emptyMessage": "Chưa có sản phẩm nào trong giỏ hàng",
      "cart.startShopping": "Bắt đầu mua sắm",
      "cart.summary": "Tóm tắt đơn hàng",
      "cart.subtotal": "Tổng tiền sản phẩm",
      "cart.shipping": "Phí vận chuyển",
      "cart.freeShipping": "Miễn phí",
      "cart.total": "Tổng cộng",
      "cart.checkout": "Tiến hành thanh toán",
      "cart.continueShopping": "Tiếp tục mua sắm",
      "cart.clearCart": "Xóa giỏ hàng",
      "cart.shippingInfo": "• Miễn phí vận chuyển cho đơn hàng từ $1,000",
      "cart.deliveryInfo": "• Dự kiến giao hàng trong 2-3 ngày làm việc",
      "cart.returnInfo": "• Hỗ trợ đổi trả trong 7 ngày không cần lý do",
      
      // Wishlist
      "wishlist.title": "Danh sách yêu thích",
      "wishlist.empty": "Danh sách yêu thích trống",
      "wishlist.emptyMessage": "Chưa có sản phẩm nào trong danh sách yêu thích",
      "wishlist.startShopping": "Bắt đầu mua sắm",
      "wishlist.viewCompare": "Xem so sánh",
      "wishlist.clearWishlist": "Xóa danh sách yêu thích",
      "wishlist.addToCart": "Thêm vào giỏ hàng",
      "wishlist.addToCompare": "Thêm vào so sánh",
      
      // Compare
      "compare.title": "So sánh sản phẩm",
      "compare.empty": "Danh sách so sánh trống",
      "compare.emptyMessage": "Thêm sản phẩm từ danh sách yêu thích hoặc trang sản phẩm để so sánh",
      "compare.viewProducts": "Xem sản phẩm",
      "compare.viewWishlist": "Xem danh sách yêu thích",
      "compare.social": "Xã hội",
      "compare.collaborate": "Hợp tác",
      "compare.priceAlert": "Cảnh báo giá",
      "compare.filter": "Lọc",
      "compare.save": "Lưu",
      "compare.history": "Lịch sử",
      "compare.share": "Chia sẻ",
      "compare.export": "Xuất",
      "compare.clearCompare": "Xóa danh sách so sánh",
      "compare.addToCart": "Thêm vào giỏ hàng",
      "compare.viewDetails": "Xem chi tiết",
    }
  },
  en: {
    translation: {
      // Common
      "platform.name": "LiveTrade Connect",
      "platform.description": "One-stop trading platform",
      "platform.slogan": "Connecting e-commerce, B2B trading and lifestyle services",
      
      // Navigation
      "nav.home": "Home",
      "nav.products": "Products",
      "nav.b2b": "B2B Platform",
      "nav.lifeServices": "Life Services Platform",
      
      // B2B Platform
      "b2b.dashboard": "B2B Dashboard",
      "b2b.products": "Products",
      "b2b.orders": "Orders",
      "b2b.customers": "Customers",
      "b2b.suppliers": "Suppliers",
      "b2b.quotes": "Quotes",
      "b2b.rfq": "RFQ",
      "b2b.payments": "Payments",
      "b2b.analytics": "Analytics",
      "b2b.settings": "Settings",
      "b2b.logout": "Logout",
      
      // Life Trade Platform
      "lifeTrade.title": "Life Services Platform",
      "lifeTrade.description": "Connecting international communities abroad and foreigners in the local country",
      "lifeTrade.overview": "Overview",
      "lifeTrade.food": "Food",
      "lifeTrade.accommodation": "Accommodation",
      "lifeTrade.travel": "Travel Together",
      "lifeTrade.language": "Language",
      "lifeTrade.culture": "Multicultural",
      
      // Target Users
      "targetUsers.title": "Target User Groups",
      "targetUsers.students": "International Students",
      "targetUsers.students.desc": "Unfamiliar with language, want to make friends, want to experience local culture and cuisine",
      "targetUsers.married": "Foreigners married and settled",
      "targetUsers.married.desc": "Want to integrate into local life, participate in community activities",
      "targetUsers.workers": "Foreign Workers",
      "targetUsers.workers.desc": "Professionals, blue-collar workers, and digital nomads",
      
      // Features
      "features.title": "Main Features",
      "features.food": "Food Experience",
      "features.food.desc": "Explore local cuisine",
      "features.accommodation": "Housing Exchange",
      "features.accommodation.desc": "Find or exchange accommodation",
      "features.travel": "Explore Together",
      "features.travel.desc": "Find travel companions",
      "features.language": "Language Exchange",
      "features.language.desc": "Learn and teach languages",
      "features.culture": "Multicultural Center",
      "features.culture.desc": "Integration resources",
      
      // Recent Activities
      "recentActivities.title": "Recent Activities",
      "recentActivities.cookingClass": "Local Cooking Class",
      "recentActivities.cookingClass.desc": "Learn to make local dishes and traditional cuisine",
      "recentActivities.languageExchange": "Language Exchange Meetup",
      "recentActivities.languageExchange.desc": "Weekly meetings at coffee shop",
      "recentActivities.marketTour": "Local Market Tour",
      "recentActivities.marketTour.desc": "Explore food and culture of traditional market",
      
      // Food Section
      "food.title": "Food Discovery (Eat & Meet)",
      "food.addExperience": "Add Experience",
      "food.smartDiscovery": "Smart Food Discovery System",
      "food.locationBased": "Location-based recommendations",
      "food.locationBased.desc": "Automatically suggests local restaurants and dishes within 5-10km radius",
      "food.tasteProfile": "Taste profile matching",
      "food.tasteProfile.desc": "Create flavor profiles (spicy level, sweetness preference, dietary restrictions) to get personalized recommendations",
      "food.homesickMode": "Homesick Mode",
      "food.homesickMode.desc": "Find dishes that taste closest to specific regional cuisines from your home country",
      
      // Accommodation Section
      "accommodation.title": "Housing Exchange (Live & Help)",
      "accommodation.addListing": "Add Accommodation",
      
      // Travel Section
      "travel.title": "Explore Together (Explore Together)",
      "travel.addActivity": "Add Activity",
      
      // Language Section
      "language.title": "Language Exchange (Language Swap)",
      "language.addClass": "Add Class",
      
      // Culture Section
      "culture.title": "Multicultural Center (Multicultural Hub)",
      "culture.addResource": "Add Resource",
      
      // Buttons
      "button.viewMore": "View More",
      "button.register": "Register",
      "button.join": "Join",
      "button.contact": "Contact",
      "button.cancel": "Cancel",
      "button.save": "Save",
      "button.back": "Back",
      "button.add": "Add",
      "button.processing": "Processing...",
      
      // Search
      "search.placeholder": "Search...",
      
      // Products
      "products": "Products",
      "products.all": "All Products",
      "products.featured": "Featured Products",
      "products.popular": "Popular Products",
      "products.new": "New Products",
      "products.sale": "Sale Products",
      
      // User Profile
      "profile.title": "Member Center",
      "profile.info": "Personal Information",
      "profile.orders": "Order History",
      "profile.settings": "Account Settings",
      "profile.basicInfo": "Basic Information",
      "profile.name": "Name",
      "profile.email": "Email",
      "profile.phone": "Phone Number",
      "profile.address": "Address",
      "profile.joinDate": "Join Date",
      "profile.edit": "Edit",
      "profile.save": "Save",
      "profile.cancel": "Cancel",
      "profile.stats": "Member Statistics",
      "profile.totalOrders": "Total Orders",
      "profile.totalSpent": "Total Spent",
      
      // Cart
      "cart.title": "Shopping Cart",
      "cart.empty": "Your cart is empty",
      "cart.emptyMessage": "There are no items in your cart",
      "cart.startShopping": "Start Shopping",
      "cart.summary": "Order Summary",
      "cart.subtotal": "Subtotal",
      "cart.shipping": "Shipping",
      "cart.freeShipping": "Free",
      "cart.total": "Total",
      "cart.checkout": "Checkout",
      "cart.continueShopping": "Continue Shopping",
      "cart.clearCart": "Clear Cart",
      "cart.shippingInfo": "• Free shipping for orders over $1,000",
      "cart.deliveryInfo": "• Estimated delivery in 2-3 business days",
      "cart.returnInfo": "• 7-day return policy with no questions asked",
      
      // Wishlist
      "wishlist.title": "Wishlist",
      "wishlist.empty": "Your wishlist is empty",
      "wishlist.emptyMessage": "There are no items in your wishlist",
      "wishlist.startShopping": "Start Shopping",
      "wishlist.viewCompare": "View Compare",
      "wishlist.clearWishlist": "Clear Wishlist",
      "wishlist.addToCart": "Add to Cart",
      "wishlist.addToCompare": "Add to Compare",
      
      // Compare
      "compare.title": "Compare Products",
      "compare.empty": "Your compare list is empty",
      "compare.emptyMessage": "Add products from your wishlist or product pages to compare",
      "compare.viewProducts": "View Products",
      "compare.viewWishlist": "View Wishlist",
      "compare.social": "Social",
      "compare.collaborate": "Collaborate",
      "compare.priceAlert": "Price Alert",
      "compare.filter": "Filter",
      "compare.save": "Save",
      "compare.history": "History",
      "compare.share": "Share",
      "compare.export": "Export",
      "compare.clearCompare": "Clear Compare List",
      "compare.addToCart": "Add to Cart",
      "compare.viewDetails": "View Details",
    }
  }
}

// Create context
interface I18nContextType {
  language: string
  changeLanguage: (lang: string) => void
  t: (key: string) => string
  languages: typeof languages
}

const I18nContext = createContext<I18nContextType | null>(null)

// Initialize i18next only once with proper environment detection
let isInitialized = false

const initializeI18n = () => {
  if (isInitialized) return
  
  const isClient = typeof window !== 'undefined'
  
  if (isClient) {
    // Client-side initialization with language detector
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: "en",
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
        },
      })
  } else {
    // Server-side initialization without language detector
    i18n
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: "en",
        lng: "en", // Set default language for SSR
        interpolation: {
          escapeValue: false,
        },
      })
  }
  
  isInitialized = true
}

// Initialize i18n
initializeI18n()

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en') // Start with fallback language
  const [hasMounted, setHasMounted] = useState(false)
  
  // Define the translation function
  const { t } = useTranslation()
  
  // Set mounted state after hydration
  useEffect(() => {
    setHasMounted(true)
  }, [])
  
  // Define changeLanguage callback
  const changeLanguage = useMemo(() => {
    return (lang: string) => {
      i18n.changeLanguage(lang);
      setLanguage(lang);
      
      // Set HTML lang attribute and direction
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    };
  }, []);

  // Listen for language changes and detect language on client side only
  useEffect(() => {
    if (!hasMounted) return;
    
    const handleLanguageChanged = () => {
      setLanguage(i18n.language);
    };

    // Set initial language from i18n after hydration
    if (typeof window !== 'undefined') {
      setLanguage(i18n.language);
    }

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [hasMounted]);

  // Create context value with useMemo to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    changeLanguage,
    t,
    languages
  }), [language, changeLanguage, t]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
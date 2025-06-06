"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import i18n from "i18next"
import { initReactI18next, useTranslation } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Define available languages
export const languages = [
  { code: "zh-TW", name: "Traditional Chinese", nativeName: "繁體中文", flag: "🇹🇼" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "Thai", nativeName: "ภาษาไทย", flag: "🇹🇭" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
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
      
      // Life Trade Platform
      "lifeTrade.title": "生活服務平台",
      "lifeTrade.description": "連接在國外的越南人和在越南的外國人社區",
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
      "recentActivities.cookingClass": "越南料理烹飪課",
      "recentActivities.cookingClass.desc": "學習製作河粉和傳統菜餚",
      "recentActivities.languageExchange": "越南語-英語交流",
      "recentActivities.languageExchange.desc": "每週在咖啡廳見面",
      "recentActivities.marketTour": "濱城市場探索之旅",
      "recentActivities.marketTour.desc": "探索傳統市場的美食和文化",
      
      // Food Section
      "food.title": "美食探索 (Eat & Meet)",
      "food.addExperience": "添加體驗",
      "food.smartDiscovery": "智能美食發現系統",
      "food.locationBased": "基於位置的推薦",
      "food.locationBased.desc": "自動推薦5-10公里範圍內的越南餐廳和當地菜餚",
      "food.tasteProfile": "口味檔案匹配",
      "food.tasteProfile.desc": "創建口味檔案（辣度、甜度偏好、飲食限制）獲取個性化推薦",
      "food.homesickMode": "思鄉模式",
      "food.homesickMode.desc": "尋找最接近越南特定地區菜餚的美食（北部、中部、南部風格）",
      
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
      "search.placeholder": "搜尋商品...",
      
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
      "search.placeholder": "Tìm kiếm sản phẩm...",
      
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
  th: {
    translation: {
      // Common
      "platform.name": "LiveTrade Connect",
      "platform.description": "แพลตฟอร์มการค้าแบบครบวงจร",
      "platform.slogan": "เชื่อมต่อการพาณิชย์อิเล็กทรอนิกส์ การซื้อขาย B2B และบริการไลฟ์สไตล์",
      
      // Navigation
      "nav.home": "หน้าแรก",
      "nav.products": "สินค้า",
      "nav.b2b": "แพลตฟอร์ม B2B",
      "nav.lifeServices": "แพลตฟอร์มบริการไลฟ์สไตล์",
      
      // Life Trade Platform
      "lifeTrade.title": "แพลตฟอร์มบริการไลฟ์สไตล์",
      "lifeTrade.description": "เชื่อมต่อชุมชนชาวเวียดนามในต่างประเทศและชาวต่างชาติในเวียดนาม",
      "lifeTrade.overview": "ภาพรวม",
      "lifeTrade.food": "อาหาร",
      "lifeTrade.accommodation": "ที่พัก",
      "lifeTrade.travel": "ท่องเที่ยวด้วยกัน",
      "lifeTrade.language": "ภาษา",
      "lifeTrade.culture": "หลากวัฒนธรรม",
      
      // Target Users
      "targetUsers.title": "กลุ่มผู้ใช้เป้าหมาย",
      "targetUsers.students": "นักเรียนต่างชาติ",
      "targetUsers.students.desc": "ไม่คุ้นเคยกับภาษา ต้องการหาเพื่อน ต้องการสัมผัสวัฒนธรรมและอาหารท้องถิ่น",
      "targetUsers.married": "ชาวต่างชาติที่แต่งงานและตั้งถิ่นฐาน",
      "targetUsers.married.desc": "ต้องการปรับตัวเข้ากับชีวิตท้องถิ่น เข้าร่วมกิจกรรมชุมชน",
      
      // Features
      "features.title": "คุณสมบัติหลัก",
      "features.food": "ประสบการณ์อาหาร",
      "features.food.desc": "สำรวจอาหารท้องถิ่น",
      "features.accommodation": "แลกเปลี่ยนที่พัก",
      "features.accommodation.desc": "หาหรือแลกเปลี่ยนที่พัก",
      "features.travel": "ท่องเที่ยวด้วยกัน",
      "features.travel.desc": "หาเพื่อนร่วมเดินทาง",
      "features.language": "แลกเปลี่ยนภาษา",
      "features.language.desc": "เรียนและสอนภาษา",
      "features.culture": "ศูนย์หลากวัฒนธรรม",
      "features.culture.desc": "ทรัพยากรการปรับตัว",
      
      // Recent Activities
      "recentActivities.title": "กิจกรรมล่าสุด",
      "recentActivities.cookingClass": "คลาสทำอาหารเวียดนาม",
      "recentActivities.cookingClass.desc": "เรียนรู้วิธีทำก๋วยเตี๋ยวและอาหารดั้งเดิม",
      "recentActivities.languageExchange": "แลกเปลี่ยนภาษาเวียดนาม-อังกฤษ",
      "recentActivities.languageExchange.desc": "พบปะกันทุกสัปดาห์ที่ร้านกาแฟ",
      "recentActivities.marketTour": "ทัวร์ตลาดเบนถั่น",
      "recentActivities.marketTour.desc": "สำรวจอาหารและวัฒนธรรมของตลาดดั้งเดิม",
      
      // Food Section
      "food.title": "สำรวจอาหาร (Eat & Meet)",
      "food.addExperience": "เพิ่มประสบการณ์",
      "food.smartDiscovery": "ระบบค้นพบอาหารอัจฉริยะ",
      "food.locationBased": "คำแนะนำตามตำแหน่ง",
      "food.locationBased.desc": "แนะนำร้านอาหารเวียดนามและอาหารท้องถิ่นในรัศมี 5-10 กม. โดยอัตโนมัติ",
      "food.tasteProfile": "โปรไฟล์รสชาติส่วนตัว",
      "food.tasteProfile.desc": "สร้างโปรไฟล์รสชาติ (ระดับความเผ็ด ความชอบความหวาน ข้อจำกัดด้านอาหาร) เพื่อรับคำแนะนำส่วนบุคคล",
      "food.homesickMode": "โหมดคิดถึงบ้าน",
      "food.homesickMode.desc": "หาอาหารที่มีรสชาติใกล้เคียงกับอาหารเวียดนามเฉพาะภูมิภาค (สไตล์เหนือ กลาง ใต้)",
      
      // Accommodation Section
      "accommodation.title": "แลกเปลี่ยนที่พัก (Live & Help)",
      "accommodation.addListing": "เพิ่มที่พัก",
      
      // Travel Section
      "travel.title": "ท่องเที่ยวด้วยกัน (Explore Together)",
      "travel.addActivity": "เพิ่มกิจกรรม",
      
      // Language Section
      "language.title": "แลกเปลี่ยนภาษา (Language Swap)",
      "language.addClass": "เพิ่มคลาสเรียน",
      
      // Culture Section
      "culture.title": "ศูนย์หลากวัฒนธรรม (Multicultural Hub)",
      "culture.addResource": "เพิ่มทรัพยากร",
      
      // Buttons
      "button.viewMore": "ดูเพิ่มเติม",
      "button.register": "ลงทะเบียน",
      "button.join": "เข้าร่วม",
      "button.contact": "ติดต่อ",
      "button.cancel": "ยกเลิก",
      "button.save": "บันทึก",
      "button.back": "กลับ",
      "button.add": "เพิ่ม",
      "button.processing": "กำลังประมวลผล...",
      
      // Search
      "search.placeholder": "ค้นหาสินค้า...",
      
      // Products
      "products": "สินค้า",
      "products.all": "สินค้าทั้งหมด",
      "products.featured": "สินค้าแนะนำ",
      "products.popular": "สินค้ายอดนิยม",
      "products.new": "สินค้าใหม่",
      "products.sale": "สินค้าลดราคา",
      
      // User Profile
      "profile.title": "ศูนย์สมาชิก",
      "profile.info": "ข้อมูลส่วนตัว",
      "profile.orders": "ประวัติการสั่งซื้อ",
      "profile.settings": "ตั้งค่าบัญชี",
      "profile.basicInfo": "ข้อมูลพื้นฐาน",
      "profile.name": "ชื่อ-นามสกุล",
      "profile.email": "อีเมล",
      "profile.phone": "เบอร์โทรศัพท์",
      "profile.address": "ที่อยู่",
      "profile.joinDate": "วันที่สมัคร",
      "profile.edit": "แก้ไข",
      "profile.save": "บันทึก",
      "profile.cancel": "ยกเลิก",
      "profile.stats": "สถิติสมาชิก",
      "profile.totalOrders": "จำนวนคำสั่งซื้อทั้งหมด",
      "profile.totalSpent": "ยอดใช้จ่ายทั้งหมด",
      
      // Cart
      "cart.title": "ตะกร้าสินค้า",
      "cart.empty": "ตะกร้าสินค้าว่างเปล่า",
      "cart.emptyMessage": "ไม่มีสินค้าในตะกร้าของคุณ",
      "cart.startShopping": "เริ่มช้อปปิ้ง",
      "cart.summary": "สรุปคำสั่งซื้อ",
      "cart.subtotal": "ยอดรวมสินค้า",
      "cart.shipping": "ค่าจัดส่ง",
      "cart.freeShipping": "ฟรี",
      "cart.total": "ยอดรวมทั้งหมด",
      "cart.checkout": "ชำระเงิน",
      "cart.continueShopping": "ช้อปปิ้งต่อ",
      "cart.clearCart": "ล้างตะกร้า",
      "cart.shippingInfo": "• จัดส่งฟรีสำหรับคำสั่งซื้อ $1,000 ขึ้นไป",
      "cart.deliveryInfo": "• จัดส่งภายใน 2-3 วันทำการ",
      "cart.returnInfo": "• รับคืนสินค้าภายใน 7 วันโดยไม่มีเงื่อนไข",
      
      // Wishlist
      "wishlist.title": "รายการโปรด",
      "wishlist.empty": "รายการโปรดว่างเปล่า",
      "wishlist.emptyMessage": "ไม่มีสินค้าในรายการโปรดของคุณ",
      "wishlist.startShopping": "เริ่มช้อปปิ้ง",
      "wishlist.viewCompare": "ดูการเปรียบเทียบ",
      "wishlist.clearWishlist": "ล้างรายการโปรด",
      "wishlist.addToCart": "เพิ่มลงตะกร้า",
      "wishlist.addToCompare": "เพิ่มในการเปรียบเทียบ",
      
      // Compare
      "compare.title": "เปรียบเทียบสินค้า",
      "compare.empty": "รายการเปรียบเทียบว่างเปล่า",
      "compare.emptyMessage": "เพิ่มสินค้าจากรายการโปรดหรือหน้าสินค้าเพื่อเปรียบเทียบ",
      "compare.viewProducts": "ดูสินค้า",
      "compare.viewWishlist": "ดูรายการโปรด",
      "compare.social": "โซเชียล",
      "compare.collaborate": "ร่วมมือ",
      "compare.priceAlert": "แจ้งเตือนราคา",
      "compare.filter": "กรอง",
      "compare.save": "บันทึก",
      "compare.history": "ประวัติ",
      "compare.share": "แชร์",
      "compare.export": "ส่งออก",
      "compare.clearCompare": "ล้างรายการเปรียบเทียบ",
      "compare.addToCart": "เพิ่มลงตะกร้า",
      "compare.viewDetails": "ดูรายละเอียด",
    }
  },
  hi: {
    translation: {
      // Common
      "platform.name": "LiveTrade Connect",
      "platform.description": "एकीकृत व्यापार मंच",
      "platform.slogan": "ई-कॉमर्स, B2B व्यापार और जीवनशैली सेवाओं को जोड़ना",
      
      // Navigation
      "nav.home": "होम",
      "nav.products": "उत्पाद",
      "nav.b2b": "B2B प्लेटफॉर्म",
      "nav.lifeServices": "जीवनशैली व्यापार मंच",
      
      // Life Trade Platform
      "lifeTrade.title": "जीवनशैली व्यापार मंच",
      "lifeTrade.description": "विदेश में वियतनामी समुदाय और वियतनाम में विदेशियों को जोड़ना",
      "lifeTrade.overview": "अवलोकन",
      "lifeTrade.food": "भोजन",
      "lifeTrade.accommodation": "आवास",
      "lifeTrade.travel": "एक साथ यात्रा",
      "lifeTrade.language": "भाषा",
      "lifeTrade.culture": "बहुसांस्कृतिक",
      
      // Target Users
      "targetUsers.title": "लक्षित उपयोगकर्ता समूह",
      "targetUsers.students": "अंतर्राष्ट्रीय छात्र",
      "targetUsers.students.desc": "भाषा से अपरिचित, दोस्त बनाना चाहते हैं, स्थानीय संस्कृति और भोजन का अनुभव करना चाहते हैं",
      "targetUsers.married": "विदेशी विवाहित और बसे हुए",
      "targetUsers.married.desc": "स्थानीय जीवन में घुलना-मिलना चाहते हैं, सामुदायिक गतिविधियों में भाग लेना चाहते हैं",
      
      // Features
      "features.title": "मुख्य विशेषताएँ",
      "features.food": "भोजन अनुभव",
      "features.food.desc": "स्थानीय व्यंजनों की खोज",
      "features.accommodation": "आवास विनिमय",
      "features.accommodation.desc": "आवास खोजें या विनिमय करें",
      "features.travel": "एक साथ खोज",
      "features.travel.desc": "यात्रा साथी खोजें",
      "features.language": "भाषा विनिमय",
      "features.language.desc": "भाषा सीखें और सिखाएँ",
      "features.culture": "बहुसांस्कृतिक केंद्र",
      "features.culture.desc": "एकीकरण संसाधन",
      
      // Recent Activities
      "recentActivities.title": "हाल की गतिविधियाँ",
      "recentActivities.cookingClass": "वियतनामी खाना पकाने की कक्षा",
      "recentActivities.cookingClass.desc": "फो और पारंपरिक व्यंजन बनाना सीखें",
      "recentActivities.languageExchange": "वियतनामी-अंग्रेजी विनिमय",
      "recentActivities.languageExchange.desc": "कॉफी शॉप में साप्ताहिक मुलाकात",
      "recentActivities.marketTour": "बेन थान मार्केट टूर",
      "recentActivities.marketTour.desc": "पारंपरिक बाजार के भोजन और संस्कृति की खोज",
      
      // Food Section
      "food.title": "भोजन खोज (Eat & Meet)",
      "food.addExperience": "अनुभव जोड़ें",
      "food.smartDiscovery": "स्मार्ट फूड डिस्कवरी सिस्टम",
      "food.locationBased": "स्थान-आधारित सिफारिशें",
      "food.locationBased.desc": "5-10 किमी के दायरे में वियतनामी रेस्तरां और स्थानीय व्यंजनों की स्वचालित सिफारिशें",
      "food.tasteProfile": "स्वाद प्रोफाइल मिलान",
      "food.tasteProfile.desc": "व्यक्तिगत सिफारिशें प्राप्त करने के लिए स्वाद प्रोफाइल (मसालेदार स्तर, मिठास पसंद, आहार प्रतिबंध) बनाएँ",
      "food.homesickMode": "होमसिक मोड",
      "food.homesickMode.desc": "विशिष्ट वियतनामी क्षेत्रीय व्यंजनों (उत्तरी, मध्य, दक्षिणी शैलियों) के सबसे करीबी स्वाद वाले व्यंजन खोजें",
      
      // Accommodation Section
      "accommodation.title": "आवास विनिमय (Live & Help)",
      "accommodation.addListing": "आवास जोड़ें",
      
      // Travel Section
      "travel.title": "एक साथ खोज (Explore Together)",
      "travel.addActivity": "गतिविधि जोड़ें",
      
      // Language Section
      "language.title": "भाषा विनिमय (Language Swap)",
      "language.addClass": "कक्षा जोड़ें",
      
      // Culture Section
      "culture.title": "बहुसांस्कृतिक केंद्र (Multicultural Hub)",
      "culture.addResource": "संसाधन जोड़ें",
      
      // Buttons
      "button.viewMore": "और देखें",
      "button.register": "पंजीकरण",
      "button.join": "शामिल हों",
      "button.contact": "संपर्क करें",
      "button.cancel": "रद्द करें",
      "button.save": "सहेजें",
      "button.back": "वापस",
      "button.add": "जोड़ें",
      "button.processing": "प्रोसेसिंग...",
      
      // Search
      "search.placeholder": "उत्पाद खोजें...",
      
      // Products
      "products": "उत्पाद",
      "products.all": "सभी उत्पाद",
      "products.featured": "विशेष उत्पाद",
      "products.popular": "लोकप्रिय उत्पाद",
      "products.new": "नए उत्पाद",
      "products.sale": "बिक्री पर उत्पाद",
      
      // User Profile
      "profile.title": "सदस्य केंद्र",
      "profile.info": "व्यक्तिगत जानकारी",
      "profile.orders": "ऑर्डर इतिहास",
      "profile.settings": "खाता सेटिंग्स",
      "profile.basicInfo": "बुनियादी जानकारी",
      "profile.name": "नाम",
      "profile.email": "ईमेल",
      "profile.phone": "फोन नंबर",
      "profile.address": "पता",
      "profile.joinDate": "शामिल होने की तिथि",
      "profile.edit": "संपादित करें",
      "profile.save": "सहेजें",
      "profile.cancel": "रद्द करें",
      "profile.stats": "सदस्य आंकड़े",
      "profile.totalOrders": "कुल ऑर्डर",
      "profile.totalSpent": "कुल खर्च",
      
      // Cart
      "cart.title": "शॉपिंग कार्ट",
      "cart.empty": "आपका कार्ट खाली है",
      "cart.emptyMessage": "आपके कार्ट में कोई आइटम नहीं है",
      "cart.startShopping": "शॉपिंग शुरू करें",
      "cart.summary": "ऑर्डर सारांश",
      "cart.subtotal": "उप-योग",
      "cart.shipping": "शिपिंग",
      "cart.freeShipping": "मुफ्त",
      "cart.total": "कुल",
      "cart.checkout": "चेकआउट",
      "cart.continueShopping": "शॉपिंग जारी रखें",
      "cart.clearCart": "कार्ट खाली करें",
      "cart.shippingInfo": "• $1,000 से अधिक के ऑर्डर पर मुफ्त शिपिंग",
      "cart.deliveryInfo": "• 2-3 कार्य दिवसों में डिलीवरी",
      "cart.returnInfo": "• 7 दिनों के भीतर बिना कारण बताए वापसी",
      
      // Wishlist
      "wishlist.title": "इच्छा-सूची",
      "wishlist.empty": "आपकी इच्छा-सूची खाली है",
      "wishlist.emptyMessage": "आपकी इच्छा-सूची में कोई आइटम नहीं है",
      "wishlist.startShopping": "शॉपिंग शुरू करें",
      "wishlist.viewCompare": "तुलना देखें",
      "wishlist.clearWishlist": "इच्छा-सूची खाली करें",
      "wishlist.addToCart": "कार्ट में जोड़ें",
      "wishlist.addToCompare": "तुलना में जोड़ें",
      
      // Compare
      "compare.title": "उत्पाद तुलना",
      "compare.empty": "तुलना सूची खाली है",
      "compare.emptyMessage": "तुलना करने के लिए इच्छा-सूची या उत्पाद पृष्ठ से उत्पाद जोड़ें",
      "compare.viewProducts": "उत्पाद देखें",
      "compare.viewWishlist": "इच्छा-सूची देखें",
      "compare.social": "सामाजिक",
      "compare.collaborate": "सहयोग",
      "compare.priceAlert": "मूल्य अलर्ट",
      "compare.filter": "फ़िल्टर",
      "compare.save": "सहेजें",
      "compare.history": "इतिहास",
      "compare.share": "साझा करें",
      "compare.export": "निर्यात",
      "compare.clearCompare": "तुलना सूची साफ़ करें",
      "compare.addToCart": "कार्ट में जोड़ें",
      "compare.viewDetails": "विवरण देखें",
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
      
      // Life Trade Platform
      "lifeTrade.title": "Life Services Platform",
      "lifeTrade.description": "Connecting Vietnamese communities abroad and foreigners in Vietnam",
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
      "recentActivities.cookingClass": "Vietnamese Cooking Class",
      "recentActivities.cookingClass.desc": "Learn to make pho and traditional dishes",
      "recentActivities.languageExchange": "Vietnamese-English Exchange",
      "recentActivities.languageExchange.desc": "Weekly meetings at coffee shop",
      "recentActivities.marketTour": "Ben Thanh Market Tour",
      "recentActivities.marketTour.desc": "Explore food and culture of traditional market",
      
      // Food Section
      "food.title": "Food Discovery (Eat & Meet)",
      "food.addExperience": "Add Experience",
      "food.smartDiscovery": "Smart Food Discovery System",
      "food.locationBased": "Location-based recommendations",
      "food.locationBased.desc": "Automatically suggests Vietnamese restaurants and local dishes within 5-10km radius",
      "food.tasteProfile": "Taste profile matching",
      "food.tasteProfile.desc": "Create flavor profiles (spicy level, sweetness preference, dietary restrictions) to get personalized recommendations",
      "food.homesickMode": "Homesick Mode",
      "food.homesickMode.desc": "Find dishes that taste closest to specific Vietnamese regional cuisines (Northern, Central, Southern styles)",
      
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
      "search.placeholder": "Search products...",
      
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

// Initialize i18next
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

// Create context
interface I18nContextType {
  language: string
  changeLanguage: (lang: string) => void
  t: (key: string) => string
  languages: typeof languages
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const [language, setLanguage] = useState(i18n.language)

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setLanguage(lang)
    
    // Set HTML lang attribute and direction
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChanged = () => {
      setLanguage(i18n.language)
    }

    i18n.on('languageChanged', handleLanguageChanged)
    return () => {
      i18n.off('languageChanged', handleLanguageChanged)
    }
  }, [])

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
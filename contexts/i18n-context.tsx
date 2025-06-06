"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react"
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
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", rtl: false },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", rtl: false },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", rtl: false },
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
      "targetUsers.workers": "外籍工作者",
      "targetUsers.workers.desc": "專業人士、藍領工人和數位遊牧民族",
      
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
      "features.legal": "法律與文件",
      "features.legal.desc": "簽證和許可證支持",
      "features.healthcare": "醫療保健",
      "features.healthcare.desc": "醫院和保險指南",
      "features.financial": "金融服務",
      "features.financial.desc": "銀行和匯款",
      "features.transportation": "交通",
      "features.transportation.desc": "公共交通和租車",
      "features.daily": "日常生活",
      "features.daily.desc": "購物和服務",
      "features.community": "社區",
      "features.community.desc": "社交網絡和活動",
      
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
      "targetUsers.workers": "Người lao động nước ngoài",
      "targetUsers.workers.desc": "Lao động chuyên nghiệp, lao động phổ thông và người làm việc tự do kỹ thuật số",
      
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
      "features.legal": "Pháp lý & Giấy tờ",
      "features.legal.desc": "Hỗ trợ visa và giấy phép",
      "features.healthcare": "Y tế",
      "features.healthcare.desc": "Hướng dẫn bệnh viện và bảo hiểm",
      "features.financial": "Dịch vụ tài chính",
      "features.financial.desc": "Ngân hàng và chuyển tiền",
      "features.transportation": "Giao thông",
      "features.transportation.desc": "Phương tiện công cộng và thuê xe",
      "features.daily": "Đời sống hàng ngày",
      "features.daily.desc": "Mua sắm và dịch vụ",
      "features.community": "Cộng đồng",
      "features.community.desc": "Mạng lưới xã hội và sự kiện",
      
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
      "targetUsers.workers": "แรงงานต่างชาติ",
      "targetUsers.workers.desc": "ผู้เชี่ยวชาญ แรงงานทั่วไป และนักท่องเที่ยวดิจิทัล",
      
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
      "features.legal": "กฎหมายและเอกสาร",
      "features.legal.desc": "สนับสนุนวีซ่าและใบอนุญาต",
      "features.healthcare": "การดูแลสุขภาพ",
      "features.healthcare.desc": "โรงพยาบาลและคู่มือประกัน",
      "features.financial": "บริการทางการเงิน",
      "features.financial.desc": "ธนาคารและการโอนเงิน",
      "features.transportation": "การขนส่ง",
      "features.transportation.desc": "ขนส่งสาธารณะและเช่ารถ",
      "features.daily": "ชีวิตประจำวัน",
      "features.daily.desc": "ช้อปปิ้งและบริการ",
      "features.community": "ชุมชน",
      "features.community.desc": "เครือข่ายสังคมและกิจกรรม",
      
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
      "targetUsers.workers": "विदेशी कर्मचारी",
      "targetUsers.workers.desc": "पेशेवर कर्मचारी, सामान्य श्रमिक और डिजिटल नोमैड",
      
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
      "features.legal": "कानूनी और दस्तावेज़",
      "features.legal.desc": "वीज़ा और परमिट सहायता",
      "features.healthcare": "स्वास्थ्य देखभाल",
      "features.healthcare.desc": "अस्पताल और बीमा गाइड",
      "features.financial": "वित्तीय सेवाएँ",
      "features.financial.desc": "बैंकिंग और धन हस्तांतरण",
      "features.transportation": "परिवहन",
      "features.transportation.desc": "सार्वजनिक परिवहन और कार रेंटल",
      "features.daily": "दैनिक जीवन",
      "features.daily.desc": "खरीदारी और सेवाएँ",
      "features.community": "समुदाय",
      "features.community.desc": "सोशल नेटवर्क और इवेंट्स",
      
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
      "targetUsers.workers": "Foreign Workers",
      "targetUsers.workers.desc": "Professional workers, blue-collar workers, and digital nomads",
      
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
      "features.legal": "Legal & Documentation",
      "features.legal.desc": "Visa and permit support",
      "features.healthcare": "Healthcare",
      "features.healthcare.desc": "Hospital and insurance guides",
      "features.financial": "Financial Services",
      "features.financial.desc": "Banking and money transfers",
      "features.transportation": "Transportation",
      "features.transportation.desc": "Public transit and car rentals",
      "features.daily": "Daily Life",
      "features.daily.desc": "Shopping and services",
      "features.community": "Community",
      "features.community.desc": "Social networks and events",
      
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
  },
  ja: {
    translation: {
      // Common
      "platform.name": "LiveTrade Connect",
      "platform.description": "ワンストップ取引プラットフォーム",
      "platform.slogan": "Eコマース、B2B取引、ライフスタイルサービスを繋ぐ",
      
      // Navigation
      "nav.home": "ホーム",
      "nav.products": "商品",
      "nav.b2b": "B2Bプラットフォーム",
      "nav.lifeServices": "ライフサービスプラットフォーム",
      
      // Life Trade Platform
      "lifeTrade.title": "ライフサービスプラットフォーム",
      "lifeTrade.description": "海外のベトナム人コミュニティとベトナムの外国人を繋ぐ",
      "lifeTrade.overview": "概要",
      "lifeTrade.food": "食事",
      "lifeTrade.accommodation": "宿泊",
      "lifeTrade.travel": "一緒に探検",
      "lifeTrade.language": "言語",
      "lifeTrade.culture": "多文化",
      
      // Target Users
      "targetUsers.title": "ターゲットユーザーグループ",
      "targetUsers.students": "留学生",
      "targetUsers.students.desc": "言語に不慣れ、友達を作りたい、地元の文化や料理を体験したい",
      "targetUsers.married": "結婚して定住した外国人",
      "targetUsers.married.desc": "地元の生活に溶け込みたい、コミュニティ活動に参加したい",
      "targetUsers.workers": "外国人労働者",
      "targetUsers.workers.desc": "専門職、ブルーカラー労働者、デジタルノマド",
      
      // Features
      "features.title": "主な機能",
      "features.food": "食体験",
      "features.food.desc": "地元料理を探索",
      "features.accommodation": "住居交換",
      "features.accommodation.desc": "宿泊施設を見つけるまたは交換",
      "features.travel": "一緒に探検",
      "features.travel.desc": "旅行仲間を見つける",
      "features.language": "言語交換",
      "features.language.desc": "言語を学び教える",
      "features.culture": "多文化センター",
      "features.culture.desc": "統合リソース",
      "features.legal": "法律と書類",
      "features.legal.desc": "ビザと許可証のサポート",
      "features.healthcare": "ヘルスケア",
      "features.healthcare.desc": "病院と保険ガイド",
      "features.financial": "金融サービス",
      "features.financial.desc": "銀行と送金",
      "features.transportation": "交通",
      "features.transportation.desc": "公共交通機関とレンタカー",
      "features.daily": "日常生活",
      "features.daily.desc": "ショッピングとサービス",
      "features.community": "コミュニティ",
      "features.community.desc": "ソーシャルネットワークとイベント",
      
      // Recent Activities
      "recentActivities.title": "最近のアクティビティ",
      "recentActivities.cookingClass": "ベトナム料理教室",
      "recentActivities.cookingClass.desc": "フォーと伝統料理の作り方を学ぶ",
      "recentActivities.languageExchange": "ベトナム語-英語交換",
      "recentActivities.languageExchange.desc": "カフェでの週次ミーティング",
      "recentActivities.marketTour": "ベンタイン市場ツアー",
      "recentActivities.marketTour.desc": "伝統市場の食べ物と文化を探索",
      
      // Food Section
      "food.title": "食の発見 (Eat & Meet)",
      "food.addExperience": "体験を追加",
      "food.smartDiscovery": "スマートフード発見システム",
      "food.locationBased": "位置ベースのおすすめ",
      "food.locationBased.desc": "5-10km圏内のベトナムレストランと地元料理を自動的に提案",
      "food.tasteProfile": "味プロファイルマッチング",
      "food.tasteProfile.desc": "味プロファイル（辛さレベル、甘さの好み、食事制限）を作成してパーソナライズされたおすすめを取得",
      "food.homesickMode": "ホームシックモード",
      "food.homesickMode.desc": "特定のベトナム地域料理（北部、中部、南部スタイル）に最も近い味の料理を見つける",
      
      // Accommodation Section
      "accommodation.title": "住居交換 (Live & Help)",
      "accommodation.addListing": "宿泊施設を追加",
      
      // Travel Section
      "travel.title": "一緒に探検 (Explore Together)",
      "travel.addActivity": "アクティビティを追加",
      
      // Language Section
      "language.title": "言語交換 (Language Swap)",
      "language.addClass": "クラスを追加",
      
      // Culture Section
      "culture.title": "多文化センター (Multicultural Hub)",
      "culture.addResource": "リソースを追加",
      
      // Buttons
      "button.viewMore": "もっと見る",
      "button.register": "登録",
      "button.join": "参加",
      "button.contact": "連絡",
      "button.cancel": "キャンセル",
      "button.save": "保存",
      "button.back": "戻る",
      "button.add": "追加",
      "button.processing": "処理中...",
      
      // Search
      "search.placeholder": "商品を検索...",
      
      // Products
      "products": "商品",
      "products.all": "すべての商品",
      "products.featured": "おすすめ商品",
      "products.popular": "人気商品",
      "products.new": "新商品",
      "products.sale": "セール商品",
      
      // User Profile
      "profile.title": "メンバーセンター",
      "profile.info": "個人情報",
      "profile.orders": "注文履歴",
      "profile.settings": "アカウント設定",
      "profile.basicInfo": "基本情報",
      "profile.name": "名前",
      "profile.email": "メール",
      "profile.phone": "電話番号",
      "profile.address": "住所",
      "profile.joinDate": "登録日",
      "profile.edit": "編集",
      "profile.save": "保存",
      "profile.cancel": "キャンセル",
      "profile.stats": "メンバー統計",
      "profile.totalOrders": "総注文数",
      "profile.totalSpent": "総支出",
      
      // Cart
      "cart.title": "ショッピングカート",
      "cart.empty": "カートは空です",
      "cart.emptyMessage": "カートに商品がありません",
      "cart.startShopping": "ショッピングを開始",
      "cart.summary": "注文概要",
      "cart.subtotal": "小計",
      "cart.shipping": "配送料",
      "cart.freeShipping": "無料",
      "cart.total": "合計",
      "cart.checkout": "チェックアウト",
      "cart.continueShopping": "ショッピングを続ける",
      "cart.clearCart": "カートを空にする",
      "cart.shippingInfo": "• $1,000以上の注文で送料無料",
      "cart.deliveryInfo": "• 2-3営業日以内にお届け",
      "cart.returnInfo": "• 7日間の返品ポリシー（理由不要）",
      
      // Wishlist
      "wishlist.title": "ウィッシュリスト",
      "wishlist.empty": "ウィッシュリストは空です",
      "wishlist.emptyMessage": "ウィッシュリストに商品がありません",
      "wishlist.startShopping": "ショッピングを開始",
      "wishlist.viewCompare": "比較を見る",
      "wishlist.clearWishlist": "ウィッシュリストをクリア",
      "wishlist.addToCart": "カートに追加",
      "wishlist.addToCompare": "比較に追加",
      
      // Compare
      "compare.title": "商品比較",
      "compare.empty": "比較リストは空です",
      "compare.emptyMessage": "ウィッシュリストまたは商品ページから商品を追加して比較",
      "compare.viewProducts": "商品を見る",
      "compare.viewWishlist": "ウィッシュリストを見る",
      "compare.social": "ソーシャル",
      "compare.collaborate": "コラボレーション",
      "compare.priceAlert": "価格アラート",
      "compare.filter": "フィルター",
      "compare.save": "保存",
      "compare.history": "履歴",
      "compare.share": "共有",
      "compare.export": "エクスポート",
      "compare.clearCompare": "比較リストをクリア",
      "compare.addToCart": "カートに追加",
      "compare.viewDetails": "詳細を見る",
    }
  },
  ko: {
    translation: {
      // Common
      "platform.name": "LiveTrade Connect",
      "platform.description": "원스톱 거래 플랫폼",
      "platform.slogan": "전자상거래, B2B 거래 및 라이프스타일 서비스 연결",
      
      // Navigation
      "nav.home": "홈",
      "nav.products": "제품",
      "nav.b2b": "B2B 플랫폼",
      "nav.lifeServices": "라이프스타일 서비스 플랫폼",
      
      // Life Trade Platform
      "lifeTrade.title": "라이프스타일 서비스 플랫폼",
      "lifeTrade.description": "해외 베트남 커뮤니티와 베트남의 외국인 연결",
      "lifeTrade.overview": "개요",
      "lifeTrade.food": "음식",
      "lifeTrade.accommodation": "숙박",
      "lifeTrade.travel": "함께 탐험",
      "lifeTrade.language": "언어",
      "lifeTrade.culture": "다문화",
      
      // Target Users
      "targetUsers.title": "대상 사용자 그룹",
      "targetUsers.students": "유학생",
      "targetUsers.students.desc": "언어에 익숙하지 않고, 친구를 사귀고 싶고, 현지 문화와 요리를 경험하고 싶은 사람",
      "targetUsers.married": "결혼하고 정착한 외국인",
      "targetUsers.married.desc": "현지 생활에 통합되고 커뮤니티 활동에 참여하고 싶은 사람",
      "targetUsers.workers": "외국인 근로자",
      "targetUsers.workers.desc": "전문직, 블루칼라 근로자, 디지털 노마드",
      
      // Features
      "features.title": "주요 기능",
      "features.food": "음식 경험",
      "features.food.desc": "현지 요리 탐색",
      "features.accommodation": "주택 교환",
      "features.accommodation.desc": "숙소 찾기 또는 교환",
      "features.travel": "함께 탐험",
      "features.travel.desc": "여행 동반자 찾기",
      "features.language": "언어 교환",
      "features.language.desc": "언어 배우기 및 가르치기",
      "features.culture": "다문화 센터",
      "features.culture.desc": "통합 리소스",
      "features.legal": "법률 및 문서",
      "features.legal.desc": "비자 및 허가 지원",
      "features.healthcare": "의료",
      "features.healthcare.desc": "병원 및 보험 가이드",
      "features.financial": "금융 서비스",
      "features.financial.desc": "은행 및 송금",
      "features.transportation": "교통",
      "features.transportation.desc": "대중교통 및 렌터카",
      "features.daily": "일상 생활",
      "features.daily.desc": "쇼핑 및 서비스",
      "features.community": "커뮤니티",
      "features.community.desc": "소셜 네트워크 및 이벤트",
      
      // Recent Activities
      "recentActivities.title": "최근 활동",
      "recentActivities.cookingClass": "베트남 요리 수업",
      "recentActivities.cookingClass.desc": "쌀국수와 전통 요리 만들기 배우기",
      "recentActivities.languageExchange": "베트남어-영어 교환",
      "recentActivities.languageExchange.desc": "카페에서 매주 만남",
      "recentActivities.marketTour": "벤탄 시장 투어",
      "recentActivities.marketTour.desc": "전통 시장의 음식과 문화 탐험",
      
      // Food Section
      "food.title": "음식 발견 (Eat & Meet)",
      "food.addExperience": "경험 추가",
      "food.smartDiscovery": "스마트 음식 발견 시스템",
      "food.locationBased": "위치 기반 추천",
      "food.locationBased.desc": "5-10km 반경 내의 베트남 레스토랑과 현지 요리를 자동으로 제안",
      "food.tasteProfile": "맛 프로필 매칭",
      "food.tasteProfile.desc": "맛 프로필(매운 정도, 단맛 선호도, 식이 제한)을 만들어 개인화된 추천 받기",
      "food.homesickMode": "향수병 모드",
      "food.homesickMode.desc": "특정 베트남 지역 요리(북부, 중부, 남부 스타일)와 가장 비슷한 맛의 요리 찾기",
      
      // Accommodation Section
      "accommodation.title": "주택 교환 (Live & Help)",
      "accommodation.addListing": "숙소 추가",
      
      // Travel Section
      "travel.title": "함께 탐험 (Explore Together)",
      "travel.addActivity": "활동 추가",
      
      // Language Section
      "language.title": "언어 교환 (Language Swap)",
      "language.addClass": "수업 추가",
      
      // Culture Section
      "culture.title": "다문화 센터 (Multicultural Hub)",
      "culture.addResource": "리소스 추가",
      
      // Buttons
      "button.viewMore": "더 보기",
      "button.register": "등록",
      "button.join": "참여",
      "button.contact": "연락",
      "button.cancel": "취소",
      "button.save": "저장",
      "button.back": "뒤로",
      "button.add": "추가",
      "button.processing": "처리 중...",
      
      // Search
      "search.placeholder": "제품 검색...",
      
      // Products
      "products": "제품",
      "products.all": "모든 제품",
      "products.featured": "추천 제품",
      "products.popular": "인기 제품",
      "products.new": "신제품",
      "products.sale": "할인 제품",
      
      // User Profile
      "profile.title": "회원 센터",
      "profile.info": "개인 정보",
      "profile.orders": "주문 내역",
      "profile.settings": "계정 설정",
      "profile.basicInfo": "기본 정보",
      "profile.name": "이름",
      "profile.email": "이메일",
      "profile.phone": "전화번호",
      "profile.address": "주소",
      "profile.joinDate": "가입일",
      "profile.edit": "편집",
      "profile.save": "저장",
      "profile.cancel": "취소",
      "profile.stats": "회원 통계",
      "profile.totalOrders": "총 주문",
      "profile.totalSpent": "총 지출",
      
      // Cart
      "cart.title": "장바구니",
      "cart.empty": "장바구니가 비어있습니다",
      "cart.emptyMessage": "장바구니에 상품이 없습니다",
      "cart.startShopping": "쇼핑 시작",
      "cart.summary": "주문 요약",
      "cart.subtotal": "소계",
      "cart.shipping": "배송",
      "cart.freeShipping": "무료",
      "cart.total": "합계",
      "cart.checkout": "결제",
      "cart.continueShopping": "쇼핑 계속",
      "cart.clearCart": "장바구니 비우기",
      "cart.shippingInfo": "• $1,000 이상 주문 시 무료 배송",
      "cart.deliveryInfo": "• 2-3 영업일 내 배송 예정",
      "cart.returnInfo": "• 7일 이내 무조건 반품 가능",
      
      // Wishlist
      "wishlist.title": "위시리스트",
      "wishlist.empty": "위시리스트가 비어있습니다",
      "wishlist.emptyMessage": "위시리스트에 상품이 없습니다",
      "wishlist.startShopping": "쇼핑 시작",
      "wishlist.viewCompare": "비교 보기",
      "wishlist.clearWishlist": "위시리스트 비우기",
      "wishlist.addToCart": "장바구니에 추가",
      "wishlist.addToCompare": "비교에 추가",
      
      // Compare
      "compare.title": "제품 비교",
      "compare.empty": "비교 목록이 비어있습니다",
      "compare.emptyMessage": "위시리스트나 제품 페이지에서 제품을 추가하여 비교하세요",
      "compare.viewProducts": "제품 보기",
      "compare.viewWishlist": "위시리스트 보기",
      "compare.social": "소셜",
      "compare.collaborate": "협업",
      "compare.priceAlert": "가격 알림",
      "compare.filter": "필터",
      "compare.save": "저장",
      "compare.history": "기록",
      "compare.share": "공유",
      "compare.export": "내보내기",
      "compare.clearCompare": "비교 목록 지우기",
      "compare.addToCart": "장바구니에 추가",
      "compare.viewDetails": "세부 정보 보기",
    }
  },
  id: {
    translation: {
      // Common
      "platform.name": "LiveTrade Connect",
      "platform.description": "Platform perdagangan satu atap",
      "platform.slogan": "Menghubungkan e-commerce, perdagangan B2B dan layanan gaya hidup",
      
      // Navigation
      "nav.home": "Beranda",
      "nav.products": "Produk",
      "nav.b2b": "Platform B2B",
      "nav.lifeServices": "Platform Layanan Kehidupan",
      
      // Life Trade Platform
      "lifeTrade.title": "Platform Layanan Kehidupan",
      "lifeTrade.description": "Menghubungkan komunitas Vietnam di luar negeri dan orang asing di Vietnam",
      "lifeTrade.overview": "Ikhtisar",
      "lifeTrade.food": "Makanan",
      "lifeTrade.accommodation": "Akomodasi",
      "lifeTrade.travel": "Jelajahi Bersama",
      "lifeTrade.language": "Bahasa",
      "lifeTrade.culture": "Multikultural",
      
      // Target Users
      "targetUsers.title": "Kelompok Pengguna Target",
      "targetUsers.students": "Mahasiswa Internasional",
      "targetUsers.students.desc": "Tidak familiar dengan bahasa, ingin berteman, ingin mengalami budaya dan masakan lokal",
      "targetUsers.married": "Orang asing yang menikah dan menetap",
      "targetUsers.married.desc": "Ingin berintegrasi ke dalam kehidupan lokal, berpartisipasi dalam kegiatan komunitas",
      "targetUsers.workers": "Pekerja Asing",
      "targetUsers.workers.desc": "Pekerja profesional, pekerja kerah biru, dan digital nomad",
      
      // Features
      "features.title": "Fitur Utama",
      "features.food": "Pengalaman Makanan",
      "features.food.desc": "Jelajahi masakan lokal",
      "features.accommodation": "Pertukaran Perumahan",
      "features.accommodation.desc": "Temukan atau tukar akomodasi",
      "features.travel": "Jelajahi Bersama",
      "features.travel.desc": "Temukan teman perjalanan",
      "features.language": "Pertukaran Bahasa",
      "features.language.desc": "Belajar dan mengajar bahasa",
      "features.culture": "Pusat Multikultural",
      "features.culture.desc": "Sumber daya integrasi",
      "features.legal": "Hukum & Dokumentasi",
      "features.legal.desc": "Dukungan visa dan izin",
      "features.healthcare": "Kesehatan",
      "features.healthcare.desc": "Panduan rumah sakit dan asuransi",
      "features.financial": "Layanan Keuangan",
      "features.financial.desc": "Perbankan dan transfer uang",
      "features.transportation": "Transportasi",
      "features.transportation.desc": "Transportasi umum dan rental mobil",
      "features.daily": "Kehidupan Sehari-hari",
      "features.daily.desc": "Belanja dan layanan",
      "features.community": "Komunitas",
      "features.community.desc": "Jaringan sosial dan acara",
      
      // Recent Activities
      "recentActivities.title": "Aktivitas Terbaru",
      "recentActivities.cookingClass": "Kelas Memasak Vietnam",
      "recentActivities.cookingClass.desc": "Belajar membuat pho dan hidangan tradisional",
      "recentActivities.languageExchange": "Pertukaran Vietnam-Inggris",
      "recentActivities.languageExchange.desc": "Pertemuan mingguan di kedai kopi",
      "recentActivities.marketTour": "Tur Pasar Ben Thanh",
      "recentActivities.marketTour.desc": "Jelajahi makanan dan budaya pasar tradisional",
      
      // Food Section
      "food.title": "Penemuan Makanan (Eat & Meet)",
      "food.addExperience": "Tambah Pengalaman",
      "food.smartDiscovery": "Sistem Penemuan Makanan Pintar",
      "food.locationBased": "Rekomendasi berbasis lokasi",
      "food.locationBased.desc": "Secara otomatis menyarankan restoran Vietnam dan hidangan lokal dalam radius 5-10km",
      "food.tasteProfile": "Pencocokan profil rasa",
      "food.tasteProfile.desc": "Buat profil rasa (tingkat pedas, preferensi manis, pembatasan makanan) untuk mendapatkan rekomendasi yang dipersonalisasi",
      "food.homesickMode": "Mode Rindu Kampung",
      "food.homesickMode.desc": "Temukan hidangan yang rasanya paling mirip dengan masakan regional Vietnam tertentu (gaya Utara, Tengah, Selatan)",
      
      // Accommodation Section
      "accommodation.title": "Pertukaran Perumahan (Live & Help)",
      "accommodation.addListing": "Tambah Akomodasi",
      
      // Travel Section
      "travel.title": "Jelajahi Bersama (Explore Together)",
      "travel.addActivity": "Tambah Aktivitas",
      
      // Language Section
      "language.title": "Pertukaran Bahasa (Language Swap)",
      "language.addClass": "Tambah Kelas",
      
      // Culture Section
      "culture.title": "Pusat Multikultural (Multicultural Hub)",
      "culture.addResource": "Tambah Sumber Daya",
      
      // Buttons
      "button.viewMore": "Lihat Lebih Banyak",
      "button.register": "Daftar",
      "button.join": "Bergabung",
      "button.contact": "Kontak",
      "button.cancel": "Batal",
      "button.save": "Simpan",
      "button.back": "Kembali",
      "button.add": "Tambah",
      "button.processing": "Memproses...",
      
      // Search
      "search.placeholder": "Cari produk...",
      
      // Products
      "products": "Produk",
      "products.all": "Semua Produk",
      "products.featured": "Produk Unggulan",
      "products.popular": "Produk Populer",
      "products.new": "Produk Baru",
      "products.sale": "Produk Diskon",
      
      // User Profile
      "profile.title": "Pusat Anggota",
      "profile.info": "Informasi Pribadi",
      "profile.orders": "Riwayat Pesanan",
      "profile.settings": "Pengaturan Akun",
      "profile.basicInfo": "Informasi Dasar",
      "profile.name": "Nama",
      "profile.email": "Email",
      "profile.phone": "Nomor Telepon",
      "profile.address": "Alamat",
      "profile.joinDate": "Tanggal Bergabung",
      "profile.edit": "Edit",
      "profile.save": "Simpan",
      "profile.cancel": "Batal",
      "profile.stats": "Statistik Anggota",
      "profile.totalOrders": "Total Pesanan",
      "profile.totalSpent": "Total Pengeluaran",
      
      // Cart
      "cart.title": "Keranjang Belanja",
      "cart.empty": "Keranjang Anda kosong",
      "cart.emptyMessage": "Tidak ada barang di keranjang Anda",
      "cart.startShopping": "Mulai Belanja",
      "cart.summary": "Ringkasan Pesanan",
      "cart.subtotal": "Subtotal",
      "cart.shipping": "Pengiriman",
      "cart.freeShipping": "Gratis",
      "cart.total": "Total",
      "cart.checkout": "Checkout",
      "cart.continueShopping": "Lanjutkan Belanja",
      "cart.clearCart": "Kosongkan Keranjang",
      "cart.shippingInfo": "• Pengiriman gratis untuk pesanan di atas $1,000",
      "cart.deliveryInfo": "• Perkiraan pengiriman dalam 2-3 hari kerja",
      "cart.returnInfo": "• Kebijakan pengembalian 7 hari tanpa pertanyaan",
      
      // Wishlist
      "wishlist.title": "Wishlist",
      "wishlist.empty": "Wishlist Anda kosong",
      "wishlist.emptyMessage": "Tidak ada barang di wishlist Anda",
      "wishlist.startShopping": "Mulai Belanja",
      "wishlist.viewCompare": "Lihat Perbandingan",
      "wishlist.clearWishlist": "Kosongkan Wishlist",
      "wishlist.addToCart": "Tambahkan ke Keranjang",
      "wishlist.addToCompare": "Tambahkan ke Perbandingan",
      
      // Compare
      "compare.title": "Bandingkan Produk",
      "compare.empty": "Daftar perbandingan Anda kosong",
      "compare.emptyMessage": "Tambahkan produk dari wishlist atau halaman produk untuk membandingkan",
      "compare.viewProducts": "Lihat Produk",
      "compare.viewWishlist": "Lihat Wishlist",
      "compare.social": "Sosial",
      "compare.collaborate": "Kolaborasi",
      "compare.priceAlert": "Peringatan Harga",
      "compare.filter": "Filter",
      "compare.save": "Simpan",
      "compare.history": "Riwayat",
      "compare.share": "Bagikan",
      "compare.export": "Ekspor",
      "compare.clearCompare": "Kosongkan Daftar Perbandingan",
      "compare.addToCart": "Tambahkan ke Keranjang",
      "compare.viewDetails": "Lihat Detail",
    }
  }
}

// Initialize i18next on the client-side only
if (typeof window !== 'undefined') {
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
    });
}

// Create context
interface I18nContextType {
  language: string
  changeLanguage: (lang: string) => void
  t: (key: string) => string
  languages: typeof languages
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  // Define all state hooks at the top level
  const [language, setLanguage] = useState(i18n.language || 'en')
  
  // Use the useTranslation hook
  const { t } = useTranslation()
  
  // Define changeLanguage with useCallback
  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    
    // Set HTML lang attribute and direction
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, []);

  // Listen for language changes with useEffect
  useEffect(() => {
    const handleLanguageChanged = () => {
      setLanguage(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Create context value with useMemo
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
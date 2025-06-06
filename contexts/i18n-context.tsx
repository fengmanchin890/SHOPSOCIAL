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
      "nav.features": "進階功能",
      "nav.about": "關於我們",
      
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
      
      // About
      "about.title": "關於我們",
      "about.story": "我們的故事",
      "about.values": "核心價值",
      "about.team": "團隊成員",
      "about.contact": "聯繫我們",
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
      "nav.features": "Tính năng nâng cao",
      "nav.about": "Về chúng tôi",
      
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
      
      // About
      "about.title": "Về chúng tôi",
      "about.story": "Câu chuyện của chúng tôi",
      "about.values": "Giá trị cốt lõi",
      "about.team": "Đội ngũ của chúng tôi",
      "about.contact": "Liên hệ với chúng tôi",
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
      "nav.features": "คุณสมบัติขั้นสูง",
      "nav.about": "เกี่ยวกับเรา",
      
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
      
      // About
      "about.title": "เกี่ยวกับเรา",
      "about.story": "เรื่องราวของเรา",
      "about.values": "ค่านิยมหลัก",
      "about.team": "ทีมงานของเรา",
      "about.contact": "ติดต่อเรา",
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
      "nav.features": "उन्नत सुविधाएँ",
      "nav.about": "हमारे बारे में",
      
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
      
      // About
      "about.title": "हमारे बारे में",
      "about.story": "हमारी कहानी",
      "about.values": "मुख्य मूल्य",
      "about.team": "हमारी टीम",
      "about.contact": "संपर्क करें",
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
      "nav.features": "Advanced Features",
      "nav.about": "About Us",
      
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
      
      // About
      "about.title": "About Us",
      "about.story": "Our Story",
      "about.values": "Core Values",
      "about.team": "Our Team",
      "about.contact": "Contact Us",
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
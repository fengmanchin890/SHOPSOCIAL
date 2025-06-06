# LiveTrade Connect

LiveTrade Connect is a comprehensive platform that integrates e-commerce, B2B trading, and lifestyle services into a single, unified experience. The platform leverages cutting-edge technologies and AI to provide a seamless user experience across different business models.

## Core Technologies

### Frontend
- **Next.js 15** - React framework with server-side rendering and routing
- **TypeScript** - Type-safe JavaScript for improved developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Reusable UI components built with Radix UI and Tailwind
- **i18next** - Internationalization framework for multilingual support
- **React Context API** - For global state management across the application

### State Management
- **Custom Providers** - Specialized context providers for different features:
  - CartProvider - Shopping cart management
  - WishlistProvider - Saved items management
  - CompareProvider - Product comparison functionality
  - MembershipProvider - User subscription management
  - MultiLanguageProvider - Language and localization

### Data Visualization
- **Recharts** - Composable charting library for analytics dashboards

## AI and Advanced Features

### AI-Powered Features
- **Personalized Recommendations** - AI-driven product suggestions based on user behavior
  - Collaborative filtering for similar user preferences
  - Content-based filtering for product similarity
  - Hybrid recommendation algorithms
  
- **Voice Search & Commands** - Natural language processing for voice interactions
  - Voice-to-text conversion
  - Intent recognition for commands
  - Multilingual voice support
  
- **Intelligent Price Alerts** - Smart monitoring of price changes with notifications
  - Price trend analysis
  - Personalized threshold recommendations
  - Predictive price drop alerts
  
- **Smart Matching Systems** - AI-powered matching for various platform features:
  - Language exchange partner matching
  - Travel companion compatibility
  - Accommodation preferences matching

### E-Commerce Innovations
- **Product Comparison** - Advanced comparison tools with AI recommendations
- **Multi-language Support** - Automatic translation and localization
- **Multi-currency Support** - Currency conversion and regional pricing
- **Social Features** - Collaborative shopping and social sharing

### B2B Trading Platform
- **Quote Management** - Streamlined RFQ (Request for Quotation) process
- **Order Tracking** - End-to-end visibility of the order lifecycle
- **Document Generation** - Automated creation of trade documents
- **Supplier Management** - Comprehensive supplier database and relationship tools

### Life Services Platform
- **Food Experience Module** - Discover local cuisine and cooking classes
- **Accommodation Exchange** - Find and exchange housing options
- **Travel Together** - Connect with travel companions
- **Language Exchange** - Learn and teach languages
- **Cultural Resources** - Integration assistance and cultural guidance

## Minimum Viable Product (MVP)

For the initial MVP release, we're focusing on the following core components:

### E-Commerce MVP
- Product browsing and search functionality
- Shopping cart and checkout process
- User account management
- Basic product comparison
- Wishlist functionality
- Multi-language support (Chinese, Vietnamese, English)

### B2B Platform MVP
- Supplier and customer management
- Quote creation and management
- Order processing
- Basic analytics dashboard
- Document generation

### Life Services Platform MVP
- Activity listing and discovery
- Registration system for activities
- Basic user profiles
- Language switching
- Contact functionality

### Technical MVP Requirements
- Responsive design for mobile and desktop
- Core state management for cart, wishlist, and user preferences
- Basic localization support for key markets
- Simplified checkout process
- Essential B2B document generation
- Activity registration forms

## Future Enhancements

Post-MVP, we plan to implement:

- **AR/VR Experiences** - Virtual try-on and immersive shopping
- **Blockchain Integration** - Secure payments and NFT marketplace
- **IoT Connectivity** - Smart device integration for automated shopping
- **Advanced Analytics** - Deep insights with machine learning
- **Collaborative Shopping** - Real-time shared shopping experiences
- **Mobile App** - Native mobile experience with offline capabilities
- **Advanced AI Features**:
  - Sentiment analysis for reviews
  - Visual search capabilities
  - Chatbot customer service
  - Predictive inventory management
  - Fraud detection systems

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

- `/app` - Next.js application routes and pages
- `/components` - Reusable UI components
- `/components/store` - Store-specific components and providers
- `/components/ui` - Base UI components from shadcn/ui
- `/contexts` - Global context providers
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared logic
- `/public` - Static assets

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.



請接續優化下列功能：
- 1️⃣ 增加 Firebase / Supabase 手機驗證 API 整合
- 2️⃣ 抽離 OTP、倒數計時為獨立 reusable component
- 3️⃣ 加入 JWT / Token 驗證邏輯（非僅 localStorage）
- 4️⃣ 支援登入狀態快取檢查，防止未登入者進入 `/profile`
- 5️⃣ 擴充登入方式：Apple / Google 登入
- 6️⃣ 使用 Zustand 或 Context 管理使用者狀態（替代單純 localStorage）

檔案結構與 UI 已就緒，請專注於後端驗證與安全性優化。
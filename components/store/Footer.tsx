import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopLogo</h3>
            <p className="text-gray-400 mb-4">提供優質商品與服務，讓購物成為一種享受。</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/store/home" className="hover:text-white">
                  首頁
                </Link>
              </li>
              <li>
                <Link href="/store/products" className="hover:text-white">
                  所有商品
                </Link>
              </li>
              <li>
                <Link href="/store/about" className="hover:text-white">
                  關於我們
                </Link>
              </li>
              <li>
                <Link href="/store/user/profile" className="hover:text-white">
                  會員中心
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">商品分類</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/store/products?category=men" className="hover:text-white">
                  男裝
                </Link>
              </li>
              <li>
                <Link href="/store/products?category=women" className="hover:text-white">
                  女裝
                </Link>
              </li>
              <li>
                <Link href="/store/products?category=accessories" className="hover:text-white">
                  配件
                </Link>
              </li>
              <li>
                <Link href="/store/products?category=shoes" className="hover:text-white">
                  鞋類
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">聯絡我們</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>02-1234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>service@shop.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>台北市信義區信義路五段7號</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ShopLogo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

export function Footer() {
  const { t } = useI18n()
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("platform.name")}</h3>
            <p className="text-gray-400 mb-4">{t("platform.description")}</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("nav.home")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/store/home" className="hover:text-white">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/store/products" className="hover:text-white">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link href="/store/user/profile" className="hover:text-white">
                  {t("nav.lifeServices")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("nav.products")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/store/products?category=men" className="hover:text-white">
                  Thời trang nam
                </Link>
              </li>
              <li>
                <Link href="/store/products?category=women" className="hover:text-white">
                  Thời trang nữ
                </Link>
              </li>
              <li>
                <Link href="/store/products?category=accessories" className="hover:text-white">
                  Phụ kiện
                </Link>
              </li>
              <li>
                <Link href="/store/products?category=shoes" className="hover:text-white">
                  Giày dép
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>028-1234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>service@shop.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {t("platform.name")}. Đã đăng ký bản quyền.</p>
        </div>
      </div>
    </footer>
  )
}
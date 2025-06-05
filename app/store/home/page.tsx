import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, Shield, Headphones, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/store/ProductCard"
import { mockProducts, categories, banners } from "@/lib/mock-data"

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4)
  const popularProducts = mockProducts.filter((p) => p.tags.includes("熱門")).slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Banner Carousel */}
      <section className="relative">
        <div className="aspect-[3/1] md:aspect-[4/1] overflow-hidden">
          <Image
            src={banners[0].image || "/placeholder.svg"}
            alt={banners[0].title}
            width={1200}
            height={500}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{banners[0].title}</h1>
              <p className="text-lg md:text-xl mb-8">{banners[0].subtitle}</p>
              <Button size="lg" asChild>
                <Link href={banners[0].link}>
                  立即購買 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">商品分類</h2>
            <p className="text-gray-600">探索我們精心挑選的各類商品</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/store/products?category=${category.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">精選商品</h2>
              <p className="text-gray-600">為您精心挑選的優質商品</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/store/products">
                查看全部 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      {popularProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">熱門商品</h2>
              <p className="text-gray-600">最受歡迎的商品推薦</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">免費配送</h3>
              <p className="text-gray-600 text-sm">滿千免運，全台配送</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">品質保證</h3>
              <p className="text-gray-600 text-sm">嚴選商品，品質保證</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">客服支援</h3>
              <p className="text-gray-600 text-sm">24/7 客服服務</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">退換貨</h3>
              <p className="text-gray-600 text-sm">7天無條件退換貨</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// app/layout.jsx
import "./globals.css"
import { Inter } from 'next/font/google'
import Link from "next/link"
import { ShoppingBag, Search, User, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Nike Clone - Next.js",
  description: "A Nike website clone built with Next.js, Tailwind CSS, and Strapi",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className={inter. className}>
        <header  className="sticky top-0 z-40 w-full bg-white border-b">
          <div  className="container mx-auto px-4">
            <div  className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/"  className="text-2xl font-bold">
                NIKE
              </Link>

              {/* Desktop Navigation */}
              <nav  className="hidden md:flex items-center space-x-8">
                <Link href="/products"  className="text-sm font-medium hover:text-black">
                  All Products
                </Link>
                <Link href="/products?category=Running"  className="text-sm font-medium hover:text-black">
                  Running
                </Link>
                <Link href="/products?category=Lifestyle"  className="text-sm font-medium hover:text-black">
                  Lifestyle
                </Link>
                <Link href="/products?category=Basketball"  className="text-sm font-medium hover:text-black">
                  Basketball
                </Link>
              </nav>

              {/* Desktop Actions */}
              <div  className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Search  className="h-5 w-5" />
                  <span  className="sr-only">Search</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <User  className="h-5 w-5" />
                  <span  className="sr-only">Account</span>
                </Button>
                <Button variant="ghost" size="icon"  className="relative">
                  <ShoppingBag  className="h-5 w-5" />
                  <span  className="sr-only">Cart</span>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon"  className="md:hidden">
                <Menu  className="h-5 w-5" />
                <span  className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer  className="bg-black text-white py-12">
          <div  className="container mx-auto px-4">
            <div  className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3  className="font-bold mb-4">PRODUCTS</h3>
                <ul  className="space-y-2">
                  <li>
                    <Link href="/products?category=Running"  className="text-gray-400 hover:text-white text-sm">
                      Running
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=Basketball"  className="text-gray-400 hover:text-white text-sm">
                      Basketball
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=Soccer"  className="text-gray-400 hover:text-white text-sm">
                      Soccer
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3  className="font-bold mb-4">SUPPORT</h3>
                <ul  className="space-y-2">
                  <li>
                    <Link href="#"  className="text-gray-400 hover:text-white text-sm">
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link href="#"  className="text-gray-400 hover:text-white text-sm">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link href="#"  className="text-gray-400 hover:text-white text-sm">
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3  className="font-bold mb-4">COMPANY</h3>
                <ul  className="space-y-2">
                  <li>
                    <Link href="#"  className="text-gray-400 hover:text-white text-sm">
                      About Nike
                    </Link>
                  </li>
                  <li>
                    <Link href="#"  className="text-gray-400 hover:text-white text-sm">
                      News
                    </Link>
                  </li>
                  <li>
                    <Link href="#"  className="text-gray-400 hover:text-white text-sm">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3  className="font-bold mb-4">LEGAL</h3>
                <ul  className="space-y-2">
                  <li>
                    <Link href="#"  className="text-gray-400 hover:text-white text-sm">
                      Terms of Sale
                    </Link>
                  </li>
                  <li>
                    <Link href="#"  className="text-gray-400 hover:text-white text-sm">
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link href="#"  className="text-gray-400 hover:text-white text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div  className="mt-8 pt-8 border-t border-gray-800 text-gray-400 text-sm">
              <p>© 2025 Nike, Inc. All Rights Reserved</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
// app/page.jsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Just Do It with Nike</h1>
          <p className="text-xl text-gray-600">
            Explore our collection of premium athletic footwear designed for performance and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/products">
                Shop All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/products?category=Running">Shop Running</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
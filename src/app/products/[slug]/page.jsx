// app/products/[slug]/page.jsx
import { notFound } from "next/navigation"
import Image from "next/image"
import { getProductBySlug } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Heart, Star, ChevronRight, Check, AlertCircle } from 'lucide-react'

export default async function ProductDetailPage({ params }) {
  try {
    // Await params to fix the async issue
    const resolvedParams = await params
    const product = await getProductBySlug(resolvedParams.slug)

    if (!product) {
      notFound()
    }

    const { Name, Description, Price, OriginalPrice, Category, Brand, Sizes, Color, Instock, Images } = product

    const isDiscounted = OriginalPrice && OriginalPrice > Price

    // Get the main image URL if available
    const mainImageUrl = Images && Images.length > 0 
      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Images[0].url}`
      : `/placeholder.svg?height=600&width=600&text=${Name}`;

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-gray-800">
            Home
          </a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <a href="/products" className="hover:text-gray-800">
            Products
          </a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <a href={`/products?category=${Category}`} className="hover:text-gray-800">
            {Category}
          </a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-800">{Name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={mainImageUrl || "/placeholder.svg"}
                alt={Name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
                priority
                unoptimized // Add this to bypass Next.js image optimization temporarily
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Images && Images.length > 0 ? (
                Images.map((image, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`}
                      alt={`${Name} thumbnail ${i + 1}`}
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                      unoptimized // Add this to bypass Next.js image optimization temporarily
                    />
                  </div>
                ))
              ) : (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={`/placeholder.svg?height=150&width=150&text=${i + 1}`}
                      alt={`${Name} thumbnail ${i + 1}`}
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{Name}</h1>
              <p className="text-lg text-gray-500 mt-1">{Category}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500">4.0 (24 reviews)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">${Price.toFixed(2)}</span>
              {isDiscounted && <span className="text-lg text-gray-500 line-through">${OriginalPrice.toFixed(2)}</span>}
              {isDiscounted && (
                <Badge className="bg-red-600">{Math.round(((OriginalPrice - Price) / OriginalPrice) * 100)}% OFF</Badge>
              )}
            </div>

            <Separator />

            {/* Size Selection */}
            <div className="space-y-2">
              <h3 className="font-medium">Select Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {Sizes.map((size) => (
                  <Button key={size} variant="outline" className="text-center py-2">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <h3 className="font-medium">Select Color</h3>
              <div className="flex flex-wrap gap-2">
                {Color.map((color) => {
                  const colorClass =
                    color === "White"
                      ? "bg-white border border-gray-300"
                      : color === "Black"
                        ? "bg-black"
                        : color === "Red"
                          ? "bg-red-600"
                          : color === "Green"
                            ? "bg-green-600"
                            : "bg-gray-500"

                  return (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}
                      title={color}
                    >
                      {color === "White" && <Check className="h-4 w-4 text-black" />}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="flex-1" disabled={!Instock}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                {Instock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Product Description</h3>
              <p className="text-gray-600">{Description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900">Features</h4>
                  <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                    <li>Premium materials</li>
                    <li>Durable construction</li>
                    <li>Comfortable fit</li>
                    <li>Stylish design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Details</h4>
                  <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                    <li>Brand: {Brand}</li>
                    <li>Category: {Category}</li>
                    <li>Available Colors: {Color.join(", ")}</li>
                    <li>Available Sizes: {Sizes.join(", ")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in ProductDetailPage:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Product</h2>
          <p className="text-red-600 mb-4">
            We're having trouble loading this product. Please check your Strapi connection.
          </p>
          <p className="text-sm text-gray-600">Error details: {error.message}</p>
          <Button asChild className="mt-4">
            <a href="/products">Back to Products</a>
          </Button>
        </div>
      </div>
    )
  }
}
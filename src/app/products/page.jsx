// app/products/page.jsx
import Link from "next/link"
import Image from "next/image"
import { getProducts, getCategories } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, ChevronDown, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default async function ProductsPage({ searchParams }) {
  try {
    // Await searchParams to fix the async issue
    const resolvedSearchParams = await searchParams
    
    // Fetch products and categories
    const productsData = await getProducts()
    const categoriesData = await getCategories()

    // Get category filter from URL if present
    const categoryFilter = resolvedSearchParams?.category || null

    // Filter products by category if needed
    let filteredProducts = productsData.data || []
    if (categoryFilter && filteredProducts.length > 0) {
      filteredProducts = filteredProducts.filter((product) => 
        product && product.Category === categoryFilter
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">{categoryFilter ? `${categoryFilter} Products` : "All Products"}</h1>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categories
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 hidden group-hover:block">
                <Link href="/products" className="block px-4 py-2 hover:bg-gray-100">
                  All Products
                </Link>
                {categoriesData.data && categoriesData.data.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.Name}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {category.Name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              if (!product) {
                return null;
              }
              
              const isDiscounted = product.OriginalPrice && product.OriginalPrice > product.Price

              // Get the first image URL if available
              const imageUrl = product.Images[0].url

              return (
                <Link key={product.id} href={`/products/${product.Slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={product.Name}
                        fill
                        className="object-cover"
                        unoptimized // Add this to bypass Next.js image optimization temporarily
                      />
                      {isDiscounted && (
                        <Badge className="absolute top-2 right-2 bg-red-600">
                          {Math.round(((product.OriginalPrice - product.Price) / product.OriginalPrice) * 100)}%
                          OFF
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h2 className="font-semibold text-lg line-clamp-1">{product.Name}</h2>
                      <p className="text-sm text-gray-500 mb-2">{product.Category}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">${product.Price.toFixed(2)}</span>
                        {isDiscounted && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.OriginalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in ProductsPage:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Products</h2>
          <p className="text-red-600 mb-4">
            We're having trouble connecting to the product database. Please check your Strapi connection.
          </p>
          <p className="text-sm text-gray-600">Error details: {error.message}</p>
        </div>
      </div>
    )
  }
}
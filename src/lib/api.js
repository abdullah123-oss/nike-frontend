// lib/api.js
// API service to fetch data from Strapi

export const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"

// Fetch all products
export async function getProducts() {
  try {
    console.log("Fetching products from:", `${STRAPI_API_URL}/api/products?populate=*`);
    
    const response = await fetch(`${STRAPI_API_URL}/api/products?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Products data received:", data);
    
    // Check if data has the expected structure
    if (!data || !data.data) {
      console.error("Unexpected data structure:", data);
      return { data: [] };
    }
    
    return data
  } catch (error) {
    console.error("Error fetching products:", error)
    return { data: [] } // Return empty array to prevent undefined errors
  }
}

// Fetch a single product by slug
export async function getProductBySlug(slug) {
  try {
    console.log("Fetching product with slug:", slug);
    
    const response = await fetch(`${STRAPI_API_URL}/api/products?filters[Slug][$eq]=${slug}&populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Product data received:", data);
    
    if (!data || !data.data || !data.data[0]) {
      console.error("Product not found or unexpected data structure:", data);
      return null;
    }
    
    // Return the product data directly, not nested in attributes
    return data.data[0]
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

// Fetch categories
export async function getCategories() {
  try {
    console.log("Fetching categories from:", `${STRAPI_API_URL}/api/categories?populate=*`);
    
    const response = await fetch(`${STRAPI_API_URL}/api/categories?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Categories data received:", data);
    
    if (!data || !data.data) {
      console.error("Unexpected categories data structure:", data);
      return { data: [] };
    }
    
    return data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return { data: [] }
  }
}
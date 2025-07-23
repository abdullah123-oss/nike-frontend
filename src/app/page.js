"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

// Hero images from public folder
const heroImages = [
  {
    id: 1,
    src: "/hero-1.avif", // This will look for hero-1.jpg in public folder
    title: "Nike Air Max",
    subtitle: "Step into the future",
    description: "Experience the ultimate comfort and style with our latest Air Max collection.",
    cta: "Shop Air Max",
    link: "/products?category=Running",
  },
  {
    id: 2,
    src: "/hero-2.avif", // This will look for hero-2.jpg in public folder
    title: "Basketball Collection",
    subtitle: "Dominate the court",
    description: "Elevate your game with performance basketball shoes designed for champions.",
    cta: "Shop Basketball",
    link: "/products?category=Basketball",
  },
  {
    id: 3,
    src: "/hero-3.avif", // This will look for hero-3.jpg in public folder
    title: "Lifestyle Series",
    subtitle: "Style meets comfort",
    description: "Perfect for everyday wear, combining iconic design with modern comfort.",
    cta: "Shop Lifestyle",
    link: "/products?category=Lifestyle",
  },
]

// Category images from public folder
const featuredCategories = [
  {
    name: "Running",
    image: "/category-running.avif", // This will look for category-running.jpg in public folder
    link: "/products?category=Running",
  },
  {
    name: "Basketball",
    image: "/category-basketball.avif",
    link: "/products?category=Basketball",
  },
  {
    name: "Lifestyle",
    image: "/category-lifestyle.avif",
    link: "/products?category=Lifestyle",
  },
  {
    name: "Soccer",
    image: "/category-soccer.avif",
    link: "/products?category=Soccer",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <main  className="flex flex-col min-h-screen">
      {/* Hero Section with Animated Background */}
      <section
         className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Background Images */}
        <div  className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image.id}
               className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                fill
                 className="object-cover"
                priority={index === 0}
                sizes="100vw"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  console.log(`Failed to load image: ${image.src}`)
                  e.target.src = `/placeholder.svg?height=800&width=1200&text=${encodeURIComponent(image.title)}`
                }}
              />
              {/* Overlay */}
              <div  className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div  className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div  className="animate-fade-in-up">
            <h1  className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">{heroImages[currentSlide].title}</h1>
            <p  className="text-xl md:text-2xl mb-2 font-light">{heroImages[currentSlide].subtitle}</p>
            <p  className="text-lg mb-8 max-w-2xl mx-auto opacity-90">{heroImages[currentSlide].description}</p>
            <div  className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg"  className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-100">
                <Link href={heroImages[currentSlide].link}>
                  {heroImages[currentSlide].cta}
                  <ArrowRight  className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                 className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-black"
              >
                <Link href="/products?category=New%20Arrivals">Shop New Arrivals</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
           className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronLeft  className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
           className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronRight  className="h-6 w-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
               className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories Section */}
      <section  className="py-16 bg-gray-50">
        <div  className="container mx-auto px-4">
          <div  className="text-center mb-12">
            <h2  className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p  className="text-xl text-gray-600">Find the perfect shoes for every activity</p>
          </div>

          <div  className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.name}
                href={category.link}
                 className="group relative overflow-hidden rounded-lg aspect-square hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                   className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    console.log(`Failed to load category image: ${category.image}`)
                    e.target.src = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(category.name)}`
                  }}
                />
                <div  className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div  className="absolute inset-0 flex items-center justify-center">
                  <h3  className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section  className="py-16 bg-black text-white">
        <div  className="container mx-auto px-4 text-center">
          <h2  className="text-4xl md:text-6xl font-bold mb-6">Just Do It</h2>
          <p  className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the latest innovations in athletic footwear and gear. Push your limits with Nike's cutting-edge
            technology.
          </p>
          <Button asChild size="lg"  className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-100">
            <Link href="/products">
              Explore Collection
              <ArrowRight  className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

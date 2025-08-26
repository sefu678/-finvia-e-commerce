"use client"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingCart, Heart, Menu, Star, UserCircle2, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"
import { useState, useEffect } from "react"
import { SearchDialog } from "./search-dialog"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useToast } from "./ui/use-toast"
import { CurrencySelector } from "./currency-selector"

const categories = [
  { name: "Casual Kurtas", href: "/category/casual-kurtas", icon: UserCircle2 },
  { name: "Festive Collection", href: "/category/festive-collection", icon: Sparkles },
  { name: "Bridal Sets", href: "/category/bridal-sets", icon: Crown },
  {
    name: "Gift Sets",
    href: "/category/gift-sets",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="m12 8-1-4h2l-1 4" />
        <path d="M12 12v9" />
      </svg>
    ),
  },
  { name: "Bestsellers", href: "/category/bestsellers", icon: Star },
]

export function SiteHeader() {
  const { cartItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    const session = getCurrentSession()
    setIsLoggedIn(!!session?.user)
  }, [])

  const handleNavigation = (href: string) => {
    try {
      router.push(href)
    } catch (error) {
      console.error("Navigation error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to navigate. Please try again.",
      })
    }
  }

  const isLinkActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>NOORAURA Menu</SheetTitle>
              <SheetDescription>Browse our kurta collections</SheetDescription>
            </SheetHeader>
            <nav className="mt-6">
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold">Collections</h3>
                <div className="grid gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.href}
                        onClick={() => {
                          handleNavigation(category.href)
                          setMobileMenuOpen(false)
                        }}
                        className={cn(
                          "flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md",
                          isLinkActive(category.href) && "bg-muted font-medium",
                        )}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {category.name}
                      </button>
                    )
                  })}
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <button
                  onClick={() => {
                    handleNavigation(isLoggedIn ? "/account" : "/auth/login")
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md"
                >
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  {isLoggedIn ? "My Account" : "Login / Register"}
                </button>
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      handleNavigation("/admin")
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md text-amber-600"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    handleNavigation("/cart")
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart {cartItems.length > 0 && `(${cartItems.length})`}
                </button>
                <button
                  onClick={() => {
                    handleNavigation("/wishlist")
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Button
          variant="ghost"
          className="mr-6 px-0 font-bold text-xl text-amber-600 font-playfair"
          onClick={() => handleNavigation("/")}
        >
          NOORAURA
        </Button>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.href}
                onClick={() => handleNavigation(category.href)}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-amber-600",
                  isLinkActive(category.href) && "text-amber-600",
                )}
              >
                <Icon className="mr-1 h-4 w-4" />
                {category.name}
              </button>
            )
          })}
        </div>

        <div className="flex flex-1 items-center space-x-2 sm:space-x-4 justify-end">
          <CurrencySelector />
          <div
            className={cn(
              "w-full max-w-lg hidden md:flex transition-all duration-200",
              isSearchExpanded ? "max-w-2xl" : "max-w-lg",
            )}
          >
            <SearchDialog
              onMouseEnter={() => setIsSearchExpanded(true)}
              onMouseLeave={() => setIsSearchExpanded(false)}
            />
          </div>
          <nav className="flex items-center space-x-2">
            <div className="md:hidden">
              <SearchDialog />
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleNavigation(isLoggedIn ? "/account" : "/auth/login")}
              aria-label={isLoggedIn ? "My Account" : "Login"}
            >
              <UserCircle2 className="h-5 w-5" />
            </Button>
            {isLoggedIn && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleNavigation("/admin")}
                aria-label="Admin Dashboard"
                className="text-amber-600 hover:text-amber-700"
              >
                <Crown className="h-5 w-5" />
              </Button>
            )}
            <Button size="icon" variant="ghost" onClick={() => handleNavigation("/wishlist")} aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleNavigation("/cart")}
              className="relative"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-600 text-xs text-white flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </nav>
        </div>
      </div>
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 text-center text-sm font-medium">
        ✨ New Collection Launch! Free shipping on orders over ₹2,999 | Premium Kurta Sets
      </div>
    </header>
  )
}

// Mock getCurrentSession function for demonstration purposes
const getCurrentSession = () => {
  return null // Or return a mock session object
}

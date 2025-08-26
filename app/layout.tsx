import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/components/cart-provider"
import { WishlistProvider } from "@/components/wishlist-provider"
import { CurrencyProvider } from "@/components/currency-selector"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "NOORAURA - Premium Women's Kurta Sets",
  description:
    "Discover elegant and traditional women's kurta sets at NOORAURA. Premium quality ethnic wear for every occasion.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={playfair.variable}>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <Toaster />
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

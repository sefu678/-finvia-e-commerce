"use client"

import type React from "react"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { useCurrency } from "./currency-selector"
import { convertPrice, formatPrice } from "@/lib/currency"

interface WhatsAppOrderButtonProps {
  product: Product
  variant?: "default" | "outline" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function WhatsAppOrderButton({
  product,
  variant = "default",
  size = "sm",
  className,
}: WhatsAppOrderButtonProps) {
  const { currency } = useCurrency()
  const displayPrice = convertPrice(product.price, "USD", currency)
  const formattedPrice = formatPrice(displayPrice, currency)

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when clicking WhatsApp button

    const message = `Hi! I'm interested in ordering this kurta set from NOORAURA:

*${product.name}*
Price: ${formattedPrice}

Could you please provide information about:
- Available sizes and colors
- Delivery time
- Payment options

Thank you!`

    const phoneNumber = "918780813692" // +91 8780813692 without + and spaces
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleWhatsAppOrder}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      Order on WhatsApp
    </Button>
  )
}

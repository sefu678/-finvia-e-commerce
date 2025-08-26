"use client"

import { SiteHeader } from "@/components/site-header"
import { products } from "@/lib/products"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCurrency } from "@/components/currency-selector"
import { convertPrice, formatPrice } from "@/lib/currency"
import { useState } from "react"
import { Rating } from "@/components/rating"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = products.find((p) => p.id === params.id)
  const { currency } = useCurrency()
  const [userRating, setUserRating] = useState<number | null>(null)

  if (!product) {
    notFound()
  }

  const displayPrice = convertPrice(product.price, "USD", currency)
  const displayOriginalPrice = product.originalPrice ? convertPrice(product.originalPrice, "USD", currency) : null

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
              {product.isSale && (
                <Badge variant="destructive" className="absolute left-4 top-4">
                  Sale
                </Badge>
              )}
              {product.isTopSeller && (
                <Badge variant="secondary" className="absolute left-4 top-14">
                  Top Seller
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-lg text-muted-foreground mt-2">{product.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">{formatPrice(displayPrice, currency)}</div>
                {displayOriginalPrice && (
                  <div className="text-lg text-muted-foreground line-through">
                    {formatPrice(displayOriginalPrice, currency)}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Rating value={4} onChange={setUserRating} />
                  <span className="text-muted-foreground">(124 reviews)</span>
                </div>
                {userRating && <p className="text-sm text-muted-foreground">Thank you for rating this product!</p>}
              </div>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <Button size="lg" className="flex-1 bg-amber-600 hover:bg-amber-700">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline">
                    <Heart className="w-5 h-5" />
                    <span className="sr-only">Add to Wishlist</span>
                  </Button>
                </div>
                <WhatsAppOrderButton product={product} size="lg" className="w-full" />
              </div>

              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Product Details</h3>
                        <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                          <li>Premium quality fabric</li>
                          <li>Traditional ethnic design</li>
                          <li>Perfect for festive occasions</li>
                          <li>Available in multiple sizes</li>
                          <li>Comfortable fit for all-day wear</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="shipping">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Shipping Information</h3>
                        <p className="text-muted-foreground">
                          Free shipping on orders over ₹2,999. Standard delivery 3-5 business days. Express delivery
                          available at checkout.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="returns">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Returns Policy</h3>
                        <p className="text-muted-foreground">
                          Easy returns within 7 days of delivery. Items must be unused and in original packaging.
                        </p>
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Return Requirements:</h4>
                          <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                            <li>Original packaging and tags intact</li>
                            <li>Return request within 7 days of delivery</li>
                            <li>Product must be unused</li>
                            <li>Quality guarantee on all kurta sets</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

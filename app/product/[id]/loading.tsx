import { LoadingSpinner } from "@/components/loading-spinner"

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-amber-100 rounded-lg animate-pulse" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-amber-100 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Product details skeleton */}
        <div className="space-y-6">
          <div className="text-center">
            <LoadingSpinner size="md" />
            <p className="mt-2 text-amber-600">Loading product details...</p>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-amber-100 rounded animate-pulse" />
            <div className="h-6 bg-amber-100 rounded w-3/4 animate-pulse" />
            <div className="h-10 bg-amber-100 rounded w-1/2 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-amber-100 rounded animate-pulse" />
              <div className="h-4 bg-amber-100 rounded animate-pulse" />
              <div className="h-4 bg-amber-100 rounded w-2/3 animate-pulse" />
            </div>
            <div className="flex gap-4">
              <div className="h-12 bg-amber-100 rounded flex-1 animate-pulse" />
              <div className="h-12 bg-amber-100 rounded flex-1 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

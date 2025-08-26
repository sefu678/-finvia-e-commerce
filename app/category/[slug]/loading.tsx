import { LoadingSpinner } from "@/components/loading-spinner"

export default function CategoryLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-amber-600">Loading kurta collection...</p>
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-amber-100 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-amber-100 rounded animate-pulse" />
                <div className="h-4 bg-amber-100 rounded w-3/4 animate-pulse" />
                <div className="h-6 bg-amber-100 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

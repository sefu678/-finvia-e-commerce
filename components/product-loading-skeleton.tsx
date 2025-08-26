export function ProductCardSkeleton() {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="aspect-square bg-amber-100 rounded-lg animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-amber-100 rounded animate-pulse" />
        <div className="h-4 bg-amber-100 rounded w-3/4 animate-pulse" />
        <div className="h-6 bg-amber-100 rounded w-1/2 animate-pulse" />
      </div>
      <div className="flex gap-2">
        <div className="h-10 bg-amber-100 rounded flex-1 animate-pulse" />
        <div className="h-10 bg-amber-100 rounded w-10 animate-pulse" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-amber-200 border-t-amber-600",
        sizeClasses[size],
        className,
      )}
    />
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="text-center space-y-6">
        <div className="relative">
          <LoadingSpinner size="lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-amber-600 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-playfair font-bold text-amber-800">NOORAURA</h2>
          <p className="text-amber-600 animate-pulse">Loading your premium kurta collection...</p>
        </div>
      </div>
    </div>
  )
}

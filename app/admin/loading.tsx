import { LoadingSpinner } from "@/components/loading-spinner"

export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-amber-800">Admin Dashboard</h3>
          <p className="text-amber-600">Loading admin controls...</p>
        </div>
      </div>
    </div>
  )
}

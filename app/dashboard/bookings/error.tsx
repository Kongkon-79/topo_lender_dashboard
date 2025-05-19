"use client"

import { useEffect } from "react"
import { Layout } from "@/components/layout"

export default function BookingsErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Bookings page error:", error)
  }, [error])

  return (
    <Layout>
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Something went wrong!</h2>
          <p className="text-red-600 mb-6">
            We encountered an error while loading the bookings page. Please try again later.
          </p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-[#8c1c3a] text-white rounded-md hover:bg-[#732032] transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </Layout>
  )
}

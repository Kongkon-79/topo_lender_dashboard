import { Layout } from "@/components/layout"

export default function AccountSettingsLoadingPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="h-7 w-48 bg-gray-300 rounded animate-pulse mb-8"></div>

        <div className="space-y-8">
          {/* Business Information Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-5 w-48 bg-gray-300 rounded mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 w-full bg-gray-100 rounded-md"></div>
              </div>
              <div>
                <div className="h-4 w-48 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 w-full bg-gray-100 rounded-md"></div>
              </div>
              <div className="md:col-span-2">
                <div className="h-4 w-36 bg-gray-200 rounded mb-1"></div>
                <div className="h-24 w-full bg-gray-100 rounded-md"></div>
              </div>
              <div className="md:col-span-2">
                <div className="h-4 w-36 bg-gray-200 rounded mb-1"></div>
                <div className="h-24 w-full bg-gray-100 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Contact Information Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-5 w-48 bg-gray-300 rounded mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                  <div className="h-10 w-full bg-gray-100 rounded-md"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Bank Information Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-5 w-36 bg-gray-300 rounded mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                  <div className="h-10 w-full bg-gray-100 rounded-md"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Password & Security Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-5 w-48 bg-gray-300 rounded mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-40 bg-gray-200 rounded mb-1"></div>
                  <div className="h-10 w-full bg-gray-100 rounded-md"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Preferences Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-5 w-56 bg-gray-300 rounded mb-4"></div>

            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-4 w-4 bg-gray-300 rounded mr-2"></div>
                  <div className="h-4 w-64 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-5 w-24 bg-gray-300 rounded mb-4"></div>

            <div className="flex justify-between items-center">
              <div className="h-10 w-40 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

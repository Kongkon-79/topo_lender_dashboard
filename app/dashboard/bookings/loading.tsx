import { Layout } from "@/components/layout"

export default function BookingsLoadingPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-7 w-36 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-36 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="h-5 w-24 bg-gray-300 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-5 w-10 mx-auto bg-gray-300 rounded mb-4"></div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-sm"></div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
          <div className="h-10 w-full bg-gray-200 rounded-md mb-4"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 w-full bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

import { Layout } from "@/components/layout"
import { SkeletonAvatar } from "@/components/ui/skeletons"

export default function ChatsLoadingPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="h-7 w-24 bg-gray-300 rounded animate-pulse mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Chat list skeleton */}
          <div className="border-r">
            <div className="p-4 animate-pulse">
              <div className="h-10 w-full bg-gray-200 rounded-md"></div>
            </div>

            <div className="divide-y">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start p-4 animate-pulse">
                  <SkeletonAvatar />
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <div className="h-4 w-28 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 w-12 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-3 w-48 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat messages skeleton */}
          <div className="col-span-2 flex flex-col h-[calc(100vh-240px)]">
            <div className="p-4 border-b animate-pulse">
              <div className="h-5 w-40 bg-gray-300 rounded"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Message bubbles skeleton */}
              <div className="flex justify-end animate-pulse">
                <div className="w-2/3 h-12 bg-gray-300 rounded-lg"></div>
              </div>
              <div className="flex justify-start animate-pulse">
                <div className="w-1/2 h-10 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="flex justify-end animate-pulse">
                <div className="w-3/5 h-14 bg-gray-300 rounded-lg"></div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2 animate-pulse">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-10 w-48 bg-gray-200 rounded-lg"></div>
                ))}
              </div>

              <div className="flex items-center animate-pulse">
                <div className="flex-1 h-10 bg-gray-200 rounded-l-lg"></div>
                <div className="h-10 w-10 bg-gray-300"></div>
                <div className="h-10 w-10 bg-gray-400 rounded-r-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

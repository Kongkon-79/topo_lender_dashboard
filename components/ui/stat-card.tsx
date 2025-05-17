import { memo } from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  className?: string
}

// Memoize the StatCard component to prevent re-renders if props don't change
export const StatCard = memo(function StatCard({ title, value, className }: StatCardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-md shadow-sm", className)}>
      <h3 className="text-sm font-medium text-black mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
})

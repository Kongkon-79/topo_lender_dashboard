"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalResults: number
  resultsPerPage: number
  onPageChange: (page: number) => void
  showPageNumbers?: boolean
}

export function Pagination({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange,
  showPageNumbers = true,
}: PaginationProps) {
  // Handle edge cases
  const safeCurrentPage = Math.max(1, currentPage || 1)
  const safeTotalResults = Math.max(0, totalResults || 0)
  const safeResultsPerPage = Math.max(1, resultsPerPage || 10)

  const totalPages = Math.ceil(safeTotalResults / safeResultsPerPage)
  const startResult = safeTotalResults === 0 ? 0 : (safeCurrentPage - 1) * safeResultsPerPage + 1
  const endResult = Math.min(safeCurrentPage * safeResultsPerPage, safeTotalResults)

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Handle cases with more than 5 pages
    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, 5]
    }

    if (safeCurrentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [safeCurrentPage - 2, safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, safeCurrentPage + 2]
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-between w-full px-[26px] py-[13px] border-t border-[#E5E7EB]">
      <div className="font-avenirNormal text-base font-normal text-[#374151] traclomg-[0%] leading-[15px]">
        Showing <span className="font-medium">{startResult}</span> to <span className="font-medium">{endResult}</span>{" "}
        of <span className="font-medium">{totalResults}</span> results
      </div>

      {showPageNumbers && totalPages > 1 && (
        <div className="flex items-center border border-[#E5E7EB] rounded-[7px]">
          <button
            onClick={() => safeCurrentPage > 1 && onPageChange(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            className={cn(
              "py-[13px] px-[10px] border-r",
              safeCurrentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100",
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-[46px] h-[42px] text-base text-[#374151] font-medium leading-[120%] tracking-[0%] border-r border-[#D1D5DB]",
                safeCurrentPage === page ? "bg-[#FADADD] text-[#891D33]" : "hover:bg-gray-100",
              )}
              aria-label={`Page ${page}`}
              aria-current={safeCurrentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => safeCurrentPage < totalPages && onPageChange(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
            className={cn(
              "py-[13px] px-[10px]",
              safeCurrentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100",
            )}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export const PaginationContent = () => null
export const PaginationItem = () => null
export const PaginationLink = () => null
export const PaginationEllipsis = () => null
export const PaginationPrevious = () => null
export const PaginationNext = () => null

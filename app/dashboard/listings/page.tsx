"use client";

import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { StatusModal } from "@/components/status-modal";
import {
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Dress } from "@/types/listings";
import {
  getAllDresses,
  updateDressStatus,
  getMostPopularDress,
  getListingsCounts,
} from "@/services/listings-service";

export default function ListingsPage() {
  // State for dresses and filters
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [deliveryFilter, setDeliveryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sortField, setSortField] = useState<keyof Dress | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // State for stats
  const [mostPopularDress, setMostPopularDress] = useState<Dress | null>(null);
  const [totalListings, setTotalListings] = useState(0);
  const [activeListings, setActiveListings] = useState(0);

  // State for status modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [newStatus, setNewStatus] = useState(false);

  const itemsPerPage = 3;

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Load dresses
        const dressesData = await getAllDresses();
        setDresses(dressesData);

        // Load most popular dress
        const popularDress = await getMostPopularDress();
        setMostPopularDress(popularDress);

        // Load counts
        const counts = await getListingsCounts();
        setTotalListings(counts.total);
        setActiveListings(counts.active);

        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load listings")
        );
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle status toggle
  const handleStatusToggle = (dress: Dress, newStatus: boolean) => {
    setSelectedDress(dress);
    setNewStatus(newStatus);
    setShowStatusModal(true);
  };

  // Confirm status change
  const confirmStatusChange = async () => {
    if (!selectedDress) return;

    try {
      const updatedDress = await updateDressStatus(selectedDress.id, newStatus);

      // Update dresses list
      setDresses((prevDresses) =>
        prevDresses.map((dress) =>
          dress.id === updatedDress.id ? updatedDress : dress
        )
      );

      // Update active count
      setActiveListings((prev) => (newStatus ? prev + 1 : prev - 1));

      setShowStatusModal(false);
    } catch (err) {
      console.error("Error updating status:", err);
      // Show error message
    }
  };

  // Filter and sort dresses
  const filteredDresses = useMemo(() => {
    return dresses
      .filter((dress) => {
        // Search term filter
        const matchesSearch =
          searchTerm === "" ||
          dress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dress.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dress.brand.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus =
          statusFilter === "All" ||
          (statusFilter === "Active" && dress.status) ||
          (statusFilter === "Inactive" && !dress.status);

        // Size filter
        const matchesSize = sizeFilter === "All" || dress.size === sizeFilter;

        // Condition filter
        const matchesCondition =
          conditionFilter === "All" || dress.condition === conditionFilter;

        // Delivery method filter
        const matchesDelivery =
          deliveryFilter === "All" ||
          dress.deliveryMethod === deliveryFilter ||
          (deliveryFilter === "Both" && dress.deliveryMethod === "Both");

        return (
          matchesSearch &&
          matchesStatus &&
          matchesSize &&
          matchesCondition &&
          matchesDelivery
        );
      })
      .sort((a, b) => {
        if (!sortField) return 0;

        // Handle different field types
        if (sortField === "price") {
          return sortDirection === "asc"
            ? a.numericPrice - b.numericPrice
            : b.numericPrice - a.numericPrice;
        }

        if (sortField === "dateAdded" || sortField === "lastUpdated") {
          const dateA = new Date(a[sortField]).getTime();
          const dateB = new Date(b[sortField]).getTime();
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        }

        // Default string comparison
        const valueA = String(a[sortField]);
        const valueB = String(b[sortField]);

        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
  }, [
    dresses,
    searchTerm,
    statusFilter,
    sizeFilter,
    conditionFilter,
    deliveryFilter,
    sortField,
    sortDirection,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredDresses.length / itemsPerPage);
  const paginatedDresses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDresses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDresses, currentPage, itemsPerPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sizeFilter, conditionFilter, deliveryFilter]);

  // Handle sorting
  const handleSort = (field: keyof Dress) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setSizeFilter("All");
    setConditionFilter("All");
    setDeliveryFilter("All");
    setSortField(null);
  };

  // Handle error state
  if (error) {
    return (
      <Layout>
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Something went wrong!
            </h2>
            <p className="text-red-600 mb-6">
              We encountered an error while loading the listings. Please try
              again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#891d33] text-white rounded-md hover:bg-[#732032] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 bg-[#fefaf6]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium uppercase tracking-[0.5rem]">
            MANAGE LISTINGS
          </h2>
          <div className="flex space-x-4">
            <div className="relative">
              <button className="px-4 py-2 bg-[#891d33] text-white rounded-md flex items-center">
                This Month
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
            <Link href="/listings/new">
              <button className="px-4 py-2 bg-[#891d33] text-white rounded-md flex items-center">
                 <span className="mr-2">Add New Listing</span> <Plus className="mr-2 h-4 w-4 text-white" />
              </button>
            </Link>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#891d33] h-[150px] rounded-md shadow-sm text-white">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Most Popular Listing
            </h3>
            <p className="text-2xl font-bold">
              {isLoading
                ? "Loading..."
                : mostPopularDress?.name || "No listings"}
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Listings
            </h3>
            <p className="text-2xl font-bold">
              {isLoading ? "Loading..." : totalListings}
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Active Listings
            </h3>
            <p className="text-2xl font-bold">
              {isLoading ? "Loading..." : activeListings}
            </p>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#891d33] h-[150px] rounded-md text-white flex flex-col items-start justify-center p-6 shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-sm font-medium text-white/80 mb-6 text-start">
              Most Popular Listing
            </h3>
            <p className="text-2xl text-white font-medium text-center">
              {isLoading
                ? "Loading..."
                : mostPopularDress?.name || "No listings"}
            </p>
          </div>

          <div className="bg-white p-6 rounded-md flex flex-col items-start justify-center h-[150px] shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-sm font-medium text-gray-600 mb-6 text-center">
              Total Listings
            </h3>
            <p className="text-[38px] text-black font-bold text-center">
              {isLoading ? "Loading..." : totalListings}
            </p>
          </div>

          <div className="bg-white p-6 rounded-md flex flex-col items-start justify-center h-[150px] shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-sm font-medium text-gray-600 mb-6 text-center">
              Active Listings
            </h3>
            <p className="text-[38px] text-black font-bold text-center">
              {isLoading ? "Loading..." : activeListings}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg  mb-8 shadow-[0px_4px_10px_0px_#0000001A]">
          <div className="flex justify-between flex-wrap gap-4">
            <div className="">
              <div className="relative w-[500px]">
                <input
                  type="text"
                  placeholder="Search....."
                  className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#891d33]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-[200px]">
              <select
                className="h-10 w-full pl-4 pr-8 text-[#595959] rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#891d33] appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative w-[200px]">
              <select
                className="h-10 w-full pl-4 pr-8 text-[#595959] rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#891d33] appearance-none"
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
              >
                <option value="All">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative w-[200px]">
              <select
                className="h-10 w-full pl-4 pr-8 text-[#595959] rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#891d33] appearance-none"
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
              >
                <option value="All">Select Condition</option>
                <option value="New">New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative w-[200px]">
              <select
                className="h-10 w-full pl-4 pr-8 text-[#595959] rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#891d33] appearance-none"
                value={deliveryFilter}
                onChange={(e) => setDeliveryFilter(e.target.value)}
              >
                <option value="All">Delivery Method</option>
                <option value="Pickup">Pickup</option>
                <option value="Shipping">Shipping</option>
                <option value="Both">Both</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <button
              className="p-2.5 border rounded-full hover:bg-gray-50"
              onClick={clearFilters}
              title="Clear filters"
            >
              <Filter className="h-5 w-5 text-red-800" />
            </button>
          </div>

          {filteredDresses.length === 0 && !isLoading && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-center">
              <p className="text-yellow-800">
                No listings match your filters. Try adjusting your search
                criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 text-[#891d33] underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-[0px_4px_10px_0px_#0000001A]">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#891d33]"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="">
                      <th
                        className="text-left py-3 text-[#6B7280] font-medium cursor-pointer hover:text-[#891d33]"
                        onClick={() => handleSort("id")}
                      >
                        Dress ID
                        {sortField === "id" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th className="text-left py-3 font-medium text-[#6B7280]">Thumbnails</th>
                      <th
                        className="text-left py-3 text-[#6B7280] font-medium cursor-pointer hover:text-[#891d33]"
                        onClick={() => handleSort("name")}
                      >
                        Dress Name
                        {sortField === "name" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th
                        className="text-left py-3 text-[#6B7280] font-medium cursor-pointer hover:text-[#891d33]"
                        onClick={() => handleSort("price")}
                      >
                        Price
                        {sortField === "price" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th
                        className="text-left py-3 text-[#6B7280] font-medium cursor-pointer hover:text-[#891d33]"
                        onClick={() => handleSort("size")}
                      >
                        Size
                        {sortField === "size" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th
                        className="text-left py-3 text-[#6B7280] font-medium cursor-pointer hover:text-[#891d33]"
                        onClick={() => handleSort("condition")}
                      >
                        Condition
                        {sortField === "condition" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th className="text-left py-3 font-medium text-[#6B7280]">Status</th>
                      <th className="text-left py-3 font-medium text-[#6B7280]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDresses.map((dress) => (
                      <tr key={dress.id} className=" hover:bg-gray-50">
                        <td className="py-4">{dress.id}</td>
                        <td className="py-4">
                          <div className="w-12 h-16 overflow-hidden relative">
                            <Image
                              src={dress.image || "/placeholder.svg"}
                              alt={dress.name}
                              width={60}
                              height={80}
                              className="object-cover w-full h-full rounded-sm"
                            />
                          </div>
                        </td>
                        <td className="py-4">{dress.name}</td>
                        <td className="py-4">{dress.price}</td>
                        <td className="py-4">{dress.size}</td>
                        <td className="py-4">{dress.condition}</td>
                        <td className="py-4">
                          <ToggleSwitch
                            initialState={dress.status}
                            onChange={(newStatus) =>
                              handleStatusToggle(dress, newStatus)
                            }
                          />
                        </td>
                        <td className="py-4">
                          <Link href={`/listings/${dress.id}`}>
                            <span className="px-3 py-1 text-xs bg-[#891d33] text-white rounded-md shadow-sm hover:bg-[#732032] transition-colors inline-block">
                              View
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <hr />

              {filteredDresses.length > 0 && (
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredDresses.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredDresses.length} results
                    </span>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded-md ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "border hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from({ length: Math.min(totalPages, 5) }).map(
                      (_, index) => {
                        // Calculate page number logic for when there are more than 5 pages
                        let pageNumber = index + 1;
                        if (totalPages > 5) {
                          if (currentPage <= 3) {
                            pageNumber = index + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + index;
                          } else {
                            pageNumber = currentPage - 2 + index;
                          }
                        }

                        return (
                          <button
                            key={pageNumber}
                            className={`w-8 h-8 flex items-center justify-center rounded-md ${
                              currentPage === pageNumber
                                ? "bg-rose-100 text-rose-800"
                                : "border hover:bg-gray-50"
                            }`}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                    )}

                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded-md ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "border hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Status Modal */}
      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onConfirm={confirmStatusChange}
        dress={selectedDress}
        newStatus={newStatus}
      />
    </Layout>
  );
}

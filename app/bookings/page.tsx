"use client";

import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout";
import { SearchInput } from "@/components/ui/search-input";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import {
  GoogleStyleCalendar,
  type CalendarEvent,
} from "@/components/ui/google-style-calendar";
import { Pagination } from "@/components/ui/pagination";
import { BookingModal } from "@/components/booking-modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SkeletonTable } from "@/components/ui/skeletons";

// Sample bookings data
const allBookingsData = [
  {
    id: "#####",
    dressId: "#####",
    dressName: "Emerald Evening Gown",
    customer: "Emma Thompson",
    customerId: "CUST001",
    price: "$89.99",
    rentalPeriod: "May 12 - May 15, 2025",
    deliveryType: "Pickup",
    status: "Picked up",
    bookingDate: "2025-04-01",
  },
  {
    id: "#####",
    dressId: "#####",
    dressName: "Sunshine Maxi Dress",
    customer: "Olivia Wilson",
    customerId: "CUST002",
    price: "$65.70",
    rentalPeriod: "May 18 - May 21, 2025",
    deliveryType: "Shipping",
    status: "Shipped",
    bookingDate: "2025-04-05",
  },
  {
    id: "#####",
    dressId: "#####",
    dressName: "Classic Black Cocktail",
    customer: "Sophia Martinez",
    customerId: "CUST003",
    price: "$74.50",
    rentalPeriod: "May 25 - May 28, 2025",
    deliveryType: "Pickup",
    status: "Completed",
    bookingDate: "2025-04-10",
  },
  {
    id: "#####",
    dressId: "#####",
    dressName: "Emerald Evening Gown",
    customer: "Emma Thompson",
    customerId: "CUST001",
    price: "$89.99",
    rentalPeriod: "May 2 - May 5, 2025",
    deliveryType: "Pickup",
    status: "Picked up",
    bookingDate: "2025-04-01",
  },
  {
    id: "#####",
    dressId: "#####",
    dressName: "Sunshine Maxi Dress",
    customer: "Olivia Wilson",
    customerId: "CUST002",
    price: "$65.70",
    rentalPeriod: "May 8 - May 10, 2025",
    deliveryType: "Shipping",
    status: "Shipped",
    bookingDate: "2025-04-05",
  },
  {
    id: "#####",
    dressId: "#####",
    dressName: "Classic Black Cocktail",
    customer: "Sophia Martinez",
    customerId: "CUST003",
    price: "$74.50",
    rentalPeriod: "May 11 - May 12, 2025",
    deliveryType: "Pickup",
    status: "Completed",
    bookingDate: "2025-04-10",
  },
];

// Sample dresses data for the booking modal
const dressesData = [
  {
    id: "DRESS001",
    name: "Emerald Evening Gown",
    brand: "Vera Wang",
    price: "$89.99",
    image: "/elegant-green-dress.png",
  },
  {
    id: "DRESS002",
    name: "Sunshine Maxi Dress",
    brand: "Zimmermann",
    price: "$65.70",
    image: "/flowing-yellow-dress.png",
  },
  {
    id: "DRESS003",
    name: "Classic Black Cocktail",
    brand: "Dior",
    price: "$74.50",
    image: "/elegant-black-dress.png",
  },
  {
    id: "DRESS004",
    name: "Ruby Gala Gown",
    brand: "Valentino",
    price: "$120.00",
    image: "/woman-in-red-dress.png",
  },
  {
    id: "DRESS005",
    name: "Midnight Formal Dress",
    brand: "Chanel",
    price: "$95.25",
    image: "/woman-black-dress.png",
  },
];

export default function BookingsPage() {
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState("Delivery Type");
  const [statusFilter, setStatusFilter] = useState("Status");
  const [dateFilter, setDateFilter] = useState("Date");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [bookings, setBookings] = useState(allBookingsData);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const itemsPerPage = 3;

  // Convert bookings to calendar events for the calendar
  const calendarEvents = useMemo(() => {
    return bookings.map((booking) => {
      // Parse the rental period
      const [startStr, endStr] = booking.rentalPeriod.split(" - ");

      // Parse dates (assuming format like "May 12, 2025")
      const startParts = startStr.split(" ");
      const endParts = endStr.split(",")[0].split(" ");

      const startMonth = startParts[0];
      const startDay = Number.parseInt(startParts[1]);
      const endMonth = endParts[0];
      const endDay = Number.parseInt(endParts[1]);
      const year = Number.parseInt(endStr.split(", ")[1]);

      // Convert month names to numbers
      const monthMap: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };

      const start = new Date(year, monthMap[startMonth], startDay);
      const end = new Date(year, monthMap[endMonth], endDay);

      // Add color based on status
      let color = "bg-blue-100 text-blue-800";
      if (booking.status === "Shipped") color = "bg-purple-100 text-purple-800";
      else if (booking.status === "Completed")
        color = "bg-green-100 text-green-800";
      else if (booking.status === "Pending")
        color = "bg-yellow-100 text-yellow-800";

      return {
        id: booking.id,
        title: `${booking.dressName} (${booking.customer})`,
        start,
        end,
        color,
        description: `Booking ID: ${booking.id}\nDress: ${booking.dressName}\nCustomer: ${booking.customer}\nPrice: ${booking.price}\nDelivery: ${booking.deliveryType}\nStatus: ${booking.status}`,
      };
    });
  }, [bookings]);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBookings(allBookingsData);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load bookings")
        );
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle booking creation
  const handleCreateBooking = (bookingData: any) => {
    // Generate a new booking ID
    const newId = `BK${10000 + bookings.length + 1}`;

    // Create new booking object
    const newBooking = {
      id: newId,
      dressId: bookingData.dressId,
      dressName:
        dressesData.find((d) => d.id === bookingData.dressId)?.name ||
        "Unknown Dress",
      customer: "New Customer",
      customerId: `CUST${1000 + bookings.length + 1}`,
      price:
        dressesData.find((d) => d.id === bookingData.dressId)?.price || "$0.00",
      rentalPeriod: `${new Date(bookingData.startDate).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" }
      )} - ${new Date(bookingData.endDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`,
      deliveryType: "Pickup",
      status: bookingData.status || "Confirmed",
      bookingDate: new Date().toISOString().split("T")[0],
    };

    // Add to bookings
    setBookings((prev) => [newBooking, ...prev]);

    // Close modal
    setShowBookingModal(false);
  };

  // Handle calendar event click
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);

    // Find the booking that corresponds to this event
    const booking = bookings.find((b) => b.id === event.id);
    if (booking) {
      // Filter the table to show only this booking
      setSearchTerm(booking.id);
    }
  };

  // Handle calendar date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);

    // In a real app, you would filter bookings by this date
    setDateFilter("Custom");
  };

  // Handle adding a new event from the calendar
  const handleAddEvent = (start: Date, end: Date) => {
    setShowBookingModal(true);
    // Pre-fill the booking modal with these dates
  };

  // Filter and sort bookings
  const filteredBookings = useMemo(() => {
    return bookings
      .filter((booking) => {
        // Search term filter
        const matchesSearch =
          searchTerm === "" ||
          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.dressId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.dressName.toLowerCase().includes(searchTerm.toLowerCase());

        // Delivery type filter
        const matchesDeliveryType =
          deliveryTypeFilter === "All" ||
          booking.deliveryType === deliveryTypeFilter;

        // Status filter
        const matchesStatus =
          statusFilter === "All" || booking.status === statusFilter;

        // Date filter (simplified for demo)
        const matchesDate =
          dateFilter === "All" ||
          (dateFilter === "This Month" &&
            booking.bookingDate.startsWith("2025-04")) ||
          (dateFilter === "Next Month" &&
            booking.bookingDate.startsWith("2025-05"));

        return (
          matchesSearch && matchesDeliveryType && matchesStatus && matchesDate
        );
      })
      .sort((a, b) => {
        if (!sortField) return 0;

        // Handle different field types
        if (sortField === "price") {
          const priceA = Number.parseFloat(a.price.replace("$", ""));
          const priceB = Number.parseFloat(b.price.replace("$", ""));
          return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
        }

        if (sortField === "bookingDate") {
          const dateA = new Date(a.bookingDate).getTime();
          const dateB = new Date(b.bookingDate).getTime();
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        }

        // Default string comparison
        const valueA = a[sortField as keyof typeof a];
        const valueB = b[sortField as keyof typeof b];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return 0;
      });
  }, [
    bookings,
    searchTerm,
    deliveryTypeFilter,
    statusFilter,
    dateFilter,
    sortField,
    sortDirection,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBookings, currentPage, itemsPerPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deliveryTypeFilter, statusFilter, dateFilter]);

  // Handle sorting
  const handleSort = (field: string) => {
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
    setDeliveryTypeFilter("All");
    setStatusFilter("All");
    setDateFilter("All");
    setSortField(null);
  };

  // Get status class for styling
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-[#F7E39F] text-[#6F6648]";
      case "shipped":
        return "bg-[#9FCCF7] text-[#2D26FD]";
      case "completed":
        return "bg-[#B3E9C9] text-[#033618]";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
              We encountered an error while loading the bookings. Please try
              again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#8c1c3a] text-white rounded-md hover:bg-[#732032] transition-colors"
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
      <div className="pt-[40px] md:pt-[60px] lg:pt-[81px] px-[40px] md:px-[60px] lg:px-[80px] pb-[50px] md:pb-[75px] lg:pb-[100px]">
        <div className="flex justify-between items-center mb-[60px]">
          <h2 className="font-avenirNormal text-2xl md:text-[28px] lg:text-[32px] text-black font-normal tracking-[0.2em] leading-[36px] md:leading-[42px] lg:leading-[48px] uppercase">
            Bookings
          </h2>
          <Button
            className="font-avenirNormal h-[51px] text-base font-light text-white leading-[120%] tracking-[0%] bg-[#891D33] rounded-[8px] px-8 "
            onClick={() => setShowBookingModal(true)}
          >
            Manual Booking
          </Button>
        </div>

        <div className="bg-white py-[25px] px-[30px] rounded-[15px] shadow-sm mb-[60px]">
          <div className="flex items-center gap-[30px]">
            <SearchInput
              placeholder="Search ......"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="font-avenirNormal h-[49px] w-[264px] border-[#E6E6E6] bg-white rounded-[8px] text-base font-normal leading-[120%] tracking-[0%] text-[#595959] placeholder:text-[#595959] placeholder:font-normal placeholder:leading-[120%] placeholder:tracking-[0%]"
            />
            <SelectDropdown
              label="Delivery Type" // this will act as the placeholder
              value={deliveryTypeFilter}
              options={["All", "Pickup", "Shipping"]}
              onChange={setDeliveryTypeFilter}
              className="font-avenirNormal h-[49px] w-[200px] p-[15px] bg-white border border-[#E6E6E6] rounded-[8px] text-base font-normal leading-[120%] tracking-[0%] text-[#595959] placeholder:text-[#595959] placeholder:font-normal placeholder:leading-[120%] placeholder:tracking-[0%]"
            />

            <SelectDropdown
              label="Status"
              value={statusFilter}
              options={["All", "Pending", "Confirmed", "Shipped", "Completed"]}
              onChange={setStatusFilter}
              className="font-avenirNormal h-[49px] w-[200px] p-[15px] bg-white border border-[#E6E6E6] rounded-[8px] text-base font-normal leading-[120%] tracking-[0%] text-[#595959] placeholder:text-[#595959] placeholder:font-normal placeholder:leading-[120%] placeholder:tracking-[0%]"
            />
            <SelectDropdown
              label="Date"
              value={dateFilter}
              options={["All", "This Month", "Next Month", "Custom"]}
              onChange={setDateFilter}
              className="font-avenirNormal h-[49px] w-[200px] p-[15px] bg-white border border-[#E6E6E6] rounded-[8px] text-base font-normal leading-[120%] tracking-[0%] text-[#595959] placeholder:text-[#595959] placeholder:font-normal placeholder:leading-[120%] placeholder:tracking-[0%]"
            />
          </div>

          {/* {filteredBookings.length === 0 && !isLoading && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-center">
              <p className="text-yellow-800">
                No bookings match your filters. Try adjusting your search
                criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 text-primary underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          )} */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <h3 className="font-avenirNormal text-2xl font-normal text-black tracking-[15%] leading-[28px]">Calendar</h3>
            {isLoading ? (
              <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
            ) : (
              <GoogleStyleCalendar
                events={calendarEvents}
                onEventClick={handleEventClick}
                onDateClick={handleDateClick}
                onAddEvent={handleAddEvent}
                className="min-h-[600px]"
              />
            )}
          </div>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Recent Bookings</h3>
              <Link href="/bookings">
                <span className="text-sm text-primary hover:underline">
                  View All
                </span>
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded-md"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <Link href={`/bookings/${booking.id}`} key={booking.id}>
                    <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{booking.dressName}</p>
                          <p className="text-sm text-gray-500">
                            Booking ID: {booking.id}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.rentalPeriod}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div> */}

        <div className="bg-white rounded-lg shadow-sm mt-[60px] ">
          {isLoading ? (
            <SkeletonTable rows={3} columns={8} />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="">
                      <th
                        className="font-avenirNormal text-sm font-normal text-[#6B7280] leading-[120%] tracking-[0%] px-[47.5px] py-[21px]"
                        // onClick={() => handleSort("id")}
                      >
                        Order ID
                        {/* {sortField === "id" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )} */}
                      </th>
                      <th
                        className="font-avenirNormal text-sm font-normal text-[#6B7280] leading-[120%] tracking-[0%] px-[48.5px] py-[21px]"
                      >
                        Dress ID
                      </th>
                      <th
                        className="font-avenirNormal text-sm font-normal text-[#6B7280] leading-[120%] tracking-[0%] px-[73.75px] py-[21px]"
                      >
                        Customer
                      </th>
                      <th
                        className="font-avenirNormal text-sm font-normal text-[#6B7280] leading-[120%] tracking-[0%] px-[47px] py-[21px]"
                      >
                        Price
                      </th>
                      <th className="font-avenirNormal text-sm font-normal text-[#6B7280] leading-[120%] tracking-[0%] px-[47.25px] py-[21px]">
                        Rental Period
                      </th>
                      <th
                        className="font-avenirNormal text-sm font-normal text-[#6B7280] leading-[120%] tracking-[0%] px-[47.25px] py-[21px]"
                      >
                        Delivery Type
                      </th>
                      <th
                        className="font-avenirNormal text-sm font-normal text-[#6B7280] leading-[120%] tracking-[0%] px-[30.25px] py-[21px]"
                      >
                        Status
                      </th>
                      <th className="font-avenirNormal text-sm font-normal text-[#6B7280] leading-[120%] tracking-[0%] px-[39.5px] py-[21px]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 3).map((booking, index) => (
                      <tr
                        key={index}
                        className=" hover:bg-gray-50"
                      >
                        <td className="font-avenirNormal py-[45px] px-[49.5px] text-lg font-normal text-black leading-[120%] tracking-[0%] text-center">{booking.id}</td>
                        <td className="font-avenirNormal py-[45px] px-[49.5px] text-lg font-normal text-black leading-[120%] tracking-[0%] text-center">{booking.dressId}</td>
                        <td className="font-avenirNormal py-[45px] px-[13px] text-lg font-normal text-black leading-[120%] tracking-[0%] text-center">{booking.customer}</td>
                        <td className="font-avenirNormal py-[45px] px-[49.5px] text-lg font-normal text-black leading-[120%] tracking-[0%] text-center">{booking.price}</td>
                        <td className="font-avenirNormal py-[45px] px-[49.5px] text-lg font-normal text-black leading-[120%] tracking-[0%] text-center">{booking.rentalPeriod}</td>
                        <td className="font-avenirNormal py-[45px] px-[49.5px] text-lg font-normal text-black leading-[120%] tracking-[0%] text-center">{booking.deliveryType}</td>
                        <td className="font-avenirNormal py-[45px] px-[49.5px] text-lg font-normal text-black leading-[120%] tracking-[0%] text-center">
                          <span
                            className={`px-2 py-[3px] rounded-full text-sm ${getStatusClass(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="h-full flex items-center justify-center py-[45px] px-[37px] ">
                          <Link href={`/bookings/${booking.id}`}>
                            <span className="font-avenirNormal text-xs font-normal text-white leading-[120%] tracking-[0%] bg-[#891D33] rounded-[8px] py-[5px] px-[10px]">
                              View
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {bookings.length > 0 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalResults={bookings.length}
                    resultsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onSave={handleCreateBooking}
        dresses={dressesData}
      />
    </Layout>
  );
}

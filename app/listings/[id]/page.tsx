"use client";

import { useState, useEffect, use } from "react";
import { Layout } from "@/components/layout";
import { StatusModal } from "@/components/status-modal";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getDressById,
  getConditionReports,
  getAuditLog,
  getBookingsForDress,
  updateDressStatus,
} from "@/services/listings-service";
import type {
  Dress,
  ConditionReport,
  AuditLogEntry,
  Booking,
} from "@/types/listings";

export default function ListingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const router = useRouter();
  const [dress, setDress] = useState<Dress | null>(null);
  const [conditionReports, setConditionReports] = useState<ConditionReport[]>(
    []
  );
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Status modal state
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState(false);

  // Calendar data
  const calendarData = [
    { day: "Sun", dates: [28, 5, 12, 19, 26] },
    { day: "Mon", dates: [29, 6, 13, 20, 27] },
    { day: "Tue", dates: [30, 7, 14, 21, 28] },
    { day: "Wed", dates: [1, 8, 15, 22, 29] },
    { day: "Thu", dates: [2, 9, 16, 23, 30] },
    { day: "Fri", dates: [3, 10, 17, 24, 1] },
    { day: "Sat", dates: [4, 11, 18, 25, 2] },
  ];

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Load dress details
        const dressData = await getDressById(id);
        if (!dressData) {
          throw new Error(`Dress with ID ${id} not found`);
        }
        setDress(dressData);

        // Load condition reports
        const reportsData = await getConditionReports(id);
        setConditionReports(reportsData);

        // Load audit log
        const logData = await getAuditLog(id);
        setAuditLog(logData);

        // Load bookings
        const bookingsData = await getBookingsForDress(id);
        setBookings(bookingsData);

        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to load listing details")
        );
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Handle status toggle
  const handleStatusToggle = (newStatus: boolean) => {
    if (!dress) return;

    setNewStatus(newStatus);
    setShowStatusModal(true);
  };

  // Confirm status change
  const confirmStatusChange = async () => {
    if (!dress) return;

    try {
      const updatedDress = await updateDressStatus(dress.id, newStatus);
      setDress(updatedDress);
      setShowStatusModal(false);
    } catch (err) {
      console.error("Error updating status:", err);
      // Show error message
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
              We encountered an error while loading the listing details. Please
              try again later.
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

  // Handle loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="p-8 flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#891d33]"></div>
        </div>
      </Layout>
    );
  }

  if (!dress) {
    return (
      <Layout>
        <div className="p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">
              Listing Not Found
            </h2>
            <p className="text-yellow-600 mb-6">
              The listing you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/listings">
              <button className="px-4 py-2 bg-[#891d33] text-white rounded-md hover:bg-[#732032] transition-colors">
                Back to Listings
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 bg-[#fefaf6]">
        <h2 className="text-2xl font-bold uppercase mb-8">LISTINGS DETAILS</h2>

        {bookings.length > 0 && (
          <div className="bg-rose-100 text-[#891d33] rounded-lg p-4 mb-8">
            <p>
              New booking #{bookings[0].id} for {bookings[0].date}.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="relative w-full h-[400px]">
              <Image
                src={dress.image || "/placeholder.svg"}
                alt={dress.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">
                  {dress.brand} - {dress.name}
                </h3>
                <p className="text-sm text-gray-500">Product ID: {dress.id}</p>
              </div>
              <div className="flex space-x-3">
                <ToggleSwitch
                  initialState={dress.status}
                  onChange={handleStatusToggle}
                />
                <Link href={`/listings/${dress.id}/edit`}>
                  <button className="px-4 py-2 bg-[#891d33] text-white rounded-md">
                    Edit Details
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm">
                  <span className="font-medium">Size:</span> {dress.size}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Color:</span> {dress.color}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Condition:</span>{" "}
                  {dress.condition}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Rental Price:</span>{" "}
                  {dress.price} / 4 days
                </p>
                <p className="text-sm">
                  <span className="font-medium">Last Updated:</span>{" "}
                  {dress.lastUpdated}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span>{" "}
                  {dress.status ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Description & Details</h3>

            <div className="space-y-3">
              <p className="text-sm">
                <span className="font-medium">Description:</span>{" "}
                {dress.description}
              </p>
              <p className="text-sm">
                <span className="font-medium">Materials:</span>{" "}
                {dress.materials}
              </p>
              <p className="text-sm">
                <span className="font-medium">Size Chart:</span> Fits AU{" "}
                {dress.size}
              </p>
              <p className="text-sm">
                <span className="font-medium">Care Instructions:</span>{" "}
                {dress.careInstructions}
              </p>
              <p className="text-sm">
                <span className="font-medium">Tags:</span>{" "}
                {dress.tags.join(", ")}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Upcoming Orders</h3>

            <div className="space-y-4">
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">BOOKING ID: {booking.id}</p>
                      <p className="text-xs text-gray-500">{booking.date}</p>
                      <p className="text-xs text-gray-500">
                        Customer: {booking.customer}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {booking.deliveryType}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No upcoming bookings for this dress.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Availability Calendar</h3>

            <div className="grid grid-cols-7 gap-2">
              {calendarData.map((col, colIndex) => (
                <div key={colIndex}>
                  <div className="text-center font-medium mb-4">{col.day}</div>
                  <div className="space-y-2">
                    {col.dates.map((date, dateIndex) => (
                      <div
                        key={dateIndex}
                        className={`p-2 text-center rounded-sm ${
                          date === 2 || date === 12 || date === 24
                            ? "bg-green-100"
                            : date === 10 || date === 4
                            ? "bg-rose-100"
                            : date === 30
                            ? "bg-yellow-100"
                            : ""
                        }`}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-start mt-4 space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 rounded-full mr-1"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-rose-100 rounded-full mr-1"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-100 rounded-full mr-1"></div>
                <span>Shipping</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Condition Reports</h3>

              <div className="space-y-3">
                {conditionReports.length > 0 ? (
                  conditionReports.map((report, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{report.date}:</span>{" "}
                      {report.report}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No condition reports available.
                  </p>
                )}
              </div>

              <button className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Upload Image
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Audit Log</h3>

              <div className="space-y-3">
                {auditLog.length > 0 ? (
                  auditLog.map((log, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{log.date}:</span>{" "}
                      {log.action}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No audit log entries available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-medium mb-4">Actions</h3>

          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Export Listing Data
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Escalate to Support
            </button>
            <Link href="/listings">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Back to Listings
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Status Modal */}
      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onConfirm={confirmStatusChange}
        dress={dress}
        newStatus={newStatus}
      />
    </Layout>
  );
}

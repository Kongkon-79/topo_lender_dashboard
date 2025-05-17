"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { StatCard } from "@/components/ui/stat-card";
import { SearchInput } from "@/components/ui/search-input";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import { Pagination } from "@/components/ui/pagination";
import { X, Download } from "lucide-react";
import modalImage from "../../public/mIcon.png";
import Image from "next/image";

// Sample payments data
const paymentsData = [
  {
    date: "April 2025",
    payoutId: "#####",
    dressName: "#####",
    amount: "$8.99",
    status: "Paid",
  },
  {
    date: "May 2025",
    payoutId: "#####",
    dressName: "#####",
    amount: "$11.70",
    status: "Paid",
  },
  {
    date: "June 2025",
    payoutId: "#####",
    dressName: "#####",
    amount: "$14.81",
    status: "Pending",
  },
];

// Payment details data
const paymentDetailsData = [
  {
    bookingId: "#####",
    customerId: "#####",
    rentalDates: "May ## - ##, 2025",
    amount: "$8.99",
  },
  {
    bookingId: "#####",
    customerId: "#####",
    rentalDates: "May ## - ##, 2025",
    amount: "$11.70",
  },
  {
    bookingId: "#####",
    customerId: "#####",
    rentalDates: "May ## - ##, 2025",
    amount: "$14.81",
  },
];

export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPayoutDetails, setShowPayoutDetails] = useState(false);

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold uppercase">Payments</h2>
          <div className="flex space-x-4">
            <SelectDropdown
              label="Time Filter"
              value="This Month"
              className="bg-[#8c1c3a] text-white border-[#8c1c3a]"
            />
            <button className="px-4 py-2 bg-[#8c1c3a] text-white rounded-md flex items-center">
              <Download className="mr-2 h-4 w-4" /> Download Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Revenue"
            value="$#,###"
            className="bg-[#8c1c3a] text-white"
          />
          <StatCard title="Subscription" value="Subscription Plan" />
          <StatCard title="Next Payout" value="$### on May 28, 2025" />
        </div>

        <div className="bg-white p-6 rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <SearchInput placeholder="Search ......" />
            <SelectDropdown label="Type Filter" value="Select Type" />
            <SelectDropdown label="Date Filter" value="Select date" />
            <SelectDropdown label="Dress Filter" value="Dress Name" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="">
                  <th className="text-left text-[#6B7280] py-3 font-medium">
                    Date
                  </th>
                  <th className="text-left py-3 text-[#6B7280] font-medium">
                    Payout ID
                  </th>
                  <th className="text-left py-3 text-[#6B7280] font-medium">
                    Dress Name
                  </th>
                  <th className="text-left py-3 text-[#6B7280] font-medium">
                    Amount
                  </th>
                  <th className="text-left py-3 text-[#6B7280] font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 text-[#6B7280] font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentsData.map((payment, index) => (
                  <tr key={index} className="">
                    <td className="py-4">{payment.date}</td>
                    <td className="py-4">{payment.payoutId}</td>
                    <td className="py-4">{payment.dressName}</td>
                    <td className="py-4">{payment.amount}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        className="px-3 py-1 text-xs bg-[#8c1c3a] text-white rounded-md shadow-sm hover:bg-[#732032] transition-colors"
                        onClick={() => setShowPayoutDetails(true)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalResults={paymentsData.length}
              resultsPerPage={3}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Payout Details Modal */}
      {showPayoutDetails && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="w-full">
                  <div className="flex justify-center mb-2">
                    <Image
                      src={modalImage}
                      alt="Logo"
                      width={220}
                      height={220}
                      className="w-[70px] h-[60px] object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-normal">Payout Details</h2>
                  <div className="mt-4 space-y-1">
                    <p className="text-sm">Month: April 2025</p>
                    <p className="text-sm">Revenue Earned: $800</p>
                    <p className="text-sm">Payout Status: Completed</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowPayoutDetails(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="overflow-x-auto mb-6">
                <div className="border border-gray-200 rounded-[8px] overflow-hidden">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-50">
                      <tr className="border-b border-gray-200">
                        <th className="text-left px-4 py-3 font-medium text-sm">
                          Booking ID
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-sm">
                          Customer ID
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-sm">
                          Rental Dates
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-sm">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentDetailsData.map((item, index) => (
                        <tr key={index} className=" border-gray-200">
                          <td className="px-4 py-4">{item.bookingId}</td>
                          <td className="px-4 py-4">{item.customerId}</td>
                          <td className="px-4 py-4">{item.rentalDates}</td>
                          <td className="px-4 py-4">{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm">Payout Method: Bank Transfer</p>
                <p className="text-sm">Transaction ID: TXN-123456</p>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowPayoutDetails(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-[#8c1c3a] text-white rounded-md text-sm">
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

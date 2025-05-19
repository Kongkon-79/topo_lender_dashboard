"use client";

import { Layout } from "@/components/layout";
import { StatCard } from "@/components/ui/stat-card";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

// Sample dress data
const dressData = [
  {
    id: "MG-XXXXXX",
    brand: "XXXXXX",
    price: "$XX",
    image: "/woman-white-dress.png",
  },
  {
    id: "MG-XXXXXX",
    brand: "XXXXXX",
    price: "$XX",
    image: "/woman-in-red-dress.png",
  },
  {
    id: "MG-XXXXXX",
    brand: "XXXXXX",
    price: "$XX",
    image: "/woman-orange-dress.png",
  },
  {
    id: "MG-XXXXXX",
    brand: "XXXXXX",
    price: "$XX",
    image: "/woman-green-dress.png",
  },
  {
    id: "MG-XXXXXX",
    brand: "XXXXXX",
    price: "$XX",
    image: "/elegant-woman-black-dress.png",
  },
  {
    id: "MG-XXXXXX",
    brand: "XXXXXX",
    price: "$XX",
    image: "/woman-black-dress.png",
  },
];

// Sample booking data
const bookingData = [
  {
    id: "########",
    dressId: "MG-XXXXXX",
    date: "Sep 5-7, 2023",
    customer: "XXXXXXX",
    image: "/woman-orange-dress.png",
  },
  {
    id: "########",
    dressId: "MG-XXXXXX",
    date: "Sep 5-7, 2023",
    customer: "XXXXXXX",
    image: "/two-women-dresses.png",
  },
  {
    id: "########",
    dressId: "MG-XXXXXX",
    date: "Sep 5-7, 2023",
    customer: "XXXXXXX",
    image: "/woman-yellow-dress.png",
  },
];

export default function OverviewPage() {
  return (
    <Layout>
      <div className="p-8 bg-[#fefaf6]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold uppercase">OVERVIEW</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <button className="px-4 py-2 bg-[#891d33] text-white rounded-md flex items-center">
                Monthly
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Revenue"
            value="$#,###"
            className="bg-[#891d33] text-white"
          />
          <StatCard title="Total Rental" value="##" />
          <StatCard title="Active Booking" value="#" />
        </div>

        {/* Live Listings Section */}
        <div className="bg-white p-7 rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A] mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Live Listings</h3>
            <Link
              href="/listings"
              className="text-sm text-gray-500 hover:underline"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dressData.map((dress, index) => (
              <div key={index} className="flex">
                <div className="w-20 h-24 overflow-hidden">
                  <Image
                    src={dress.image || "/placeholder.svg"}
                    alt={`Dress ${index + 1}`}
                    width={80}
                    height={96}
                    className="object-cover w-full h-full rounded-l-[8px]"
                  />
                </div>
                <div className="bg-[#FEFAF6] px-4 pt-2 rounded-r-[8px]">
                  <p className="text-sm font-medium">DRESS ID : {dress.id}</p>
                  <p className="text-xs text-gray-500">Brand: {dress.brand}</p>
                  <p className="text-xs text-gray-500">Price: {dress.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Calendar</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-[#891d33] text-white rounded-md flex items-center">
                  Dress ID
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <button className="px-4 py-2 bg-[#891d33] text-white rounded-md flex items-center">
                  Month
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <button className="px-4 py-2 bg-[#891d33] text-white rounded-md flex items-center">
                  Year
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-medium mb-4">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {[
                { day: 28, month: "prev" },
                { day: 29, month: "prev" },
                { day: 30, month: "prev" },
                { day: 1, month: "current", booking: null },
                { day: 2, month: "current", booking: null },
                { day: 3, month: "current", booking: null },
                { day: 4, month: "current", booking: null },
                { day: 5, month: "current", booking: null },
                { day: 6, month: "current", booking: null },
                { day: 7, month: "current", booking: null },
                { day: 8, month: "current", booking: null },
                { day: 9, month: "current", booking: null },
                { day: 10, month: "current", booking: null },
                { day: 11, month: "current", booking: null },
                { day: 12, month: "current", booking: null },
                { day: 13, month: "current", booking: null },
                { day: 14, month: "current", booking: null },
                { day: 15, month: "current", booking: null },
                { day: 16, month: "current", booking: null },
                { day: 17, month: "current", booking: null },
                { day: 18, month: "current", booking: null },
                { day: 19, month: "current", booking: null },
                { day: 20, month: "current", booking: null },
                { day: 21, month: "current", booking: null },
                { day: 22, month: "current", booking: null },
                { day: 23, month: "current", booking: null },
                { day: 24, month: "current", booking: null },
                { day: 25, month: "current", booking: null },
                { day: 26, month: "current", booking: null },
                { day: 27, month: "current", booking: null },
                { day: 28, month: "current", booking: null },
                { day: 29, month: "current", booking: null },
                { day: 30, month: "current", booking: null },
                { day: 1, month: "next", booking: null },
                { day: 2, month: "next", booking: null },
              ].map((date, index) => (
                <div
                  key={index}
                  className={`p-2 text-center rounded-sm ${
                    date.month !== "current" ? "text-gray-400" : ""
                  } relative`}
                >
                  {date.day}
                  {date.day === 1 && date.month === "current" && (
                    <div className="absolute left-0 right-0 mt-1 mx-auto bg-[#891d33] text-white text-xs py-1 px-2 rounded-sm">
                      Booking ID: #####
                    </div>
                  )}
                  {date.day === 12 && date.month === "current" && (
                    <div className="absolute left-0 right-0 mt-1 mx-auto bg-[#891d33] text-white text-xs py-1 px-2 rounded-sm">
                      Booking ID: #####
                    </div>
                  )}
                  {date.day === 24 && date.month === "current" && (
                    <div className="absolute left-0 right-0 mt-1 mx-auto bg-[#891d33] text-white text-xs py-1 px-2 rounded-sm">
                      Booking ID: #####
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Orders Section */}
          <div className="bg-white p-6 rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-medium">Upcoming Orders</h3>
              <Link
                href="/bookings"
                className="text-sm text-gray-500 hover:underline"
              >
                VIEW ALL
              </Link>
            </div>

            <div className="space-y-6 ">
              {bookingData.map((booking, index) => (
                <div key={index} className="flex space-x-4 bg-[#FEFAF6]">
                  <div className="w-20 h-24 overflow-hidden">
                    <Image
                      src={booking.image || "/placeholder.svg"}
                      alt={`Booking ${index + 1}`}
                      width={80}
                      height={96}
                      className="object-cover w-full h-full rounded-l-[8px]"
                    />
                  </div>
                  <div className="rounded-r-[8px] p-2">
                    <p className="text-sm font-medium">
                      BOOKING ID: {booking.id}
                    </p>
                    <p className="text-xs text-gray-500">
                      Dress Id : {booking.dressId}
                    </p>
                    <p className="text-xs text-gray-500">{booking.date}</p>
                    <p className="text-xs text-gray-500">
                      Customer: {booking.customer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

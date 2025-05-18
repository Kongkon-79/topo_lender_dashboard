"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <div>
        <div className="flex min-h-screen ">
          {/* Sidebar */}
          <div className="fixed left-0 top-0 bottom-0 w-[208px] bg-[#891d33] text-white flex flex-col z-10">
            <div className="p-8 flex justify-center">
              <div className="text-white text-7xl font-serif italic">𝓜</div>
            </div>

            <nav className="flex flex-col px-6 py-4 space-y-1">
              <Link
                href="/"
                className={`py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  isActive("/") ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                Overview
              </Link>
              <Link
                href="/bookings"
                className={`py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  isActive("/bookings") ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                Bookings
              </Link>
              <Link
                href="/listings"
                className={`py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  isActive("/listings") ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                Listings
              </Link>
              <Link
                href="/payments"
                className={`py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  isActive("/payments") ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                Payments
              </Link>
              <Link
                href="/disputes"
                className={`py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  isActive("/disputes") ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                Disputes
              </Link>
              <Link
                href="/chats"
                className={`py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  isActive("/chats") ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                Chats
              </Link>
              <Link
                href="/help-center"
                className={`py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  isActive("/help-center") ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                Help Center
              </Link>
              <Link
                href="/account-settings"
                className={`py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                  isActive("/account-settings")
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                Account Settings
              </Link>
            </nav>

            <div className="mt-auto p-6">
              <button className="text-xs uppercase tracking-wider border-t border-white/30 pt-4 w-full text-left font-medium">
                SIGN OUT
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-h-screen ml-[208px]">
            {/* Header */}
            <header className="h-[70px] border-b flex items-center px-6 justify-between bg-white sticky top-0 z-10">
              <div>
                <h1 className="text-xl font-medium">Lenders Name</h1>
                <p className="text-sm text-gray-500">Lenders Dashboard</p>
              </div>
              <div className="flex items-center">
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Main content */}
            <main className="flex-1 bg-[#fefaf6] overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
        {/* Footer */}
        {/* <footer className="h-[120px] py-[50px] bg-white border-t border-[#B0B0B0]">
          <div className="flex items-center justify-center gap-[15px]">
            <p className="text-base font-normal text-black uppercase tracking-[20%] leading-[20px] ">
              © 2025 MUSE GALA ALL RIGHTS RESERVED{" "}
              <span className="mx-2">•</span>
            </p>
            <Link href="/privacy-policy" className="hover:underline">
              <span className="text-base font-normal text-black uppercase tracking-[20%] leading-[20px]">
                PRIVACY POLICY
              </span>
            </Link>{" "}
            <span className="mx-2">•</span>
            <Link href="/terms" className="hover:underline">
              <span className="text-base font-normal text-black uppercase tracking-[20%] leading-[20px]">
                TERMS & CONDITION
              </span>
            </Link>
          </div>
        </footer> */}
      </div>
    </>
  );
}

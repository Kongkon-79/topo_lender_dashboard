"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ListingsNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] bg-[#fefaf6] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/woman-in-red-dress.png"
            alt="Woman in red dress"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-bold text-[#891d33]/10">404</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#891d33] mb-4">
          Listing Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          We couldn't find the dress listing you're looking for. It may have
          been removed, rented out, or the URL might be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-[#891d33] text-[#891d33] hover:bg-[#891d33]/10"
          >
            Go Back
          </Button>

          <Button
            onClick={() => router.push("/listings")}
            className="bg-[#891d33] hover:bg-[#691526] text-white"
          >
            Browse All Listings
          </Button>
        </div>
      </div>
    </div>
  );
}

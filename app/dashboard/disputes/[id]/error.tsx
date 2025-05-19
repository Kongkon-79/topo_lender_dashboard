"use client";

import { Layout } from "@/components/layout";
import Link from "next/link";

export default function DisputeDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">DISPUTE DETAILS</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Error loading dispute details
          </h3>
          <p className="mb-4">
            {error.message ||
              "There was a problem loading the dispute details."}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={reset}
              className="px-4 py-2 bg-[#8c1c3a] text-white rounded-md hover:bg-[#7a1832]"
            >
              Try again
            </button>
            <Link href="/disputes">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Return to Disputes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

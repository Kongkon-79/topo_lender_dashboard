"use client";

import { use } from "react";
import { Layout } from "@/components/layout";
import { BookingDetails } from "@/components/booking-details";

export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Layout>
      <BookingDetails bookingId={params.id} />
    </Layout>
  );
}

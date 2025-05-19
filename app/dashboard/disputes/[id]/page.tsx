"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout";
import {
  getDisputeById,
  sendSupportMessage,
} from "@/services/disputes-service";
import type { DisputeEvidence, Dispute as DisputeType } from "@/types/disputes";
import Image from "next/image";
import Link from "next/link";

export default function DisputeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [dispute, setDispute] = useState<DisputeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDispute = async () => {
      try {
        const data = await getDisputeById(params.id);
        if (data) {
          setDispute(data);
        } else {
          console.error("Dispute not found");
        }
      } catch (error) {
        console.error("Error fetching dispute:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDispute();
  }, [params.id]);

  const handleSendMessage = async () => {
    if (!message.trim() || !dispute) return;

    setSending(true);
    try {
      await sendSupportMessage(dispute.id, message);
      setMessage("");
      // Refresh dispute data to show updated timeline
      const updatedDispute = await getDisputeById(params.id);
      if (updatedDispute) {
        setDispute(updatedDispute);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">DISPUTE DETAILS</h2>
          </div>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80 bg-gray-200 rounded"></div>
              <div className="h-80 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!dispute) {
    return (
      <Layout>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">DISPUTE DETAILS</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p>Dispute not found</p>
            <Link
              href="/disputes"
              className="text-[#8c1c3a] hover:underline mt-4 inline-block"
            >
              Return to Disputes
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-[80px] bg-[#FEFAF6]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[32px] font-normal">DISPUTE DETAILS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-6">
          {/* Dispute Summary */}
          <div className="shadow-[0px_4px_10px_0px_#0000001A] p-6 rounded-lg bg-white">
            <div className="flex items-center justify-between ">
              <h3 className="text-[28px] font-normal mb-[30px]">Dispute Summary</h3>
              <span className="px-3 py-1 rounded-full text-xs bg-[#B2DBC3] text-[#023015]">
                {dispute.status === "Pending" ? "Confirmed" : dispute.status}
              </span>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-normal">Dispute ID:</span> {dispute.id}
              </p>
              <p>
                <span className="font-normal">Booking ID:</span>{" "}
                {dispute.bookingId}
              </p>
              <p>
                <span className="font-normal">Customer ID:</span>{" "}
                {dispute.customerId}
              </p>
              <p>
                <span className="font-normal">Customer Name:</span>{" "}
                {dispute.customerName}
              </p>
              <p>
                <span className="font-normal">Order Date:</span>{" "}
                {dispute.dateSubmitted}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-[24px] font-normal mb-4">Order Items</h3>
            <div className="flex space-x-4 items-center bg-[#FEFAF6]">
              <div className="w-[150px] h-[176px] relative flex-shrink-0">
                <Image
                  src="/image.jpg"
                  alt="Dress"
                  fill
                  className="object-cover  rounded-md"
                />
              </div>
              <div>
                <p className="font-semibold mb-1">
                  DRESS ID : {dispute.dressId}
                </p>
                <p className="text-sm mb-1">ID: XXXXXX</p>
                <p className="text-sm mb-1">Brand: XXXXXX</p>
                <p className="text-sm mb-1">Price: $XX</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Dispute Reason */}
          <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-[24px] font-normal mb-[30px]">Dispute Reason</h3>
            <p className="text-[16px]">{dispute.reason}</p>
          </div>

          {/* Description */}
          <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-[24px] font-normal mb-[30px]">Description</h3>
            <p className="text-[16px]">{dispute.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Media & Evidence */}
          <div className="bg-white p-6 rounded-lg shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-[24px] font-normal mb-[30px]">Media & Evidence</h3>
            <div className="grid grid-cols-3 gap-4">
              {dispute.evidence && dispute.evidence.length > 0 ? (
                dispute.evidence.map((evidence: DisputeEvidence) => (
                  <div key={evidence.id} className="relative w-[80px] h-[80px]">
                    <Image
                      src={ "/image.jpg"}
                      alt={evidence.filename}
                      fill
                      className="object-cover  rounded-md"
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-gray-500">No evidence uploaded</p>
              )}
            </div>
          </div>

          {/* Time Line */}
          <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-[24px] font-normal mb-[30px]">Time Line</h3>
            <div className="space-y-2">
              {dispute.timeline && dispute.timeline.length > 0 ? (
                dispute.timeline.map((event, index) => (
                  <div key={index} className="flex gap-[15px]">
                    <p>
                      <span className="font-normal text-[16px]">{event.date}:</span>{" "}
                      {event.action}
                      {event.details && ` - ${event.details}`}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No timeline events</p>
              )}
            </div>
          </div>
        </div>

        {/* Reply to Support */}
        <div className="bg-white p-[30px]  rounded-lg shadow-[0px_4px_10px_0px_#0000001A] mb-6">
          <h3 className="text-[24px] font-normal mb-[30px]">Reply to Support</h3>
          <div className="mb-4">
            <label className="block text-[18px] font-medium text-[#891D33] mb-[15px]">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-[#E6E6E6] rounded-md"
              rows={4}
              placeholder="Describe your issue or question in detail"
            ></textarea>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={sending || !message.trim()}
            className="px-4 py-2 bg-[#8c1c3a] text-[16px] text-white rounded-md hover:bg-[#7a1832] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </div>

        {/* Actions */}
        <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A]">
          <h3 className="text-[24px] font-normal mb-[30px]">Actions</h3>
          <div className="flex space-x-[30px]">
            <Link href={`/disputes/${dispute.id}/escalate`}>
              <button className="px-[16px] py-[10px] bg-[#8c1c3a] text-white rounded-md hover:bg-[#7a1832]">
                Escalate Dispute
              </button>
            </Link>
            <button className="px-[20px] py-[11px] border border-[#891D33] text-[#891D33] rounded-md hover:bg-gray-50">
              Download Report
            </button>
            <button
              onClick={() => router.push("/disputes")}
              className="px-[20px] py-[11px] border border-[#891D33] text-[#891D33] rounded-md hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

"use client";

import type React from "react";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout";
import { FileUpload } from "@/components/file-upload";
import {
  getDisputeById,
  escalateDispute,
  getEscalationReasons,
} from "@/services/disputes-service";
import type {
  EscalationFormData,
  Dispute,
  ReasonOption,
} from "@/types/disputes";
// import Link from "next/link";

export default function EscalateDisputePage({
  params,
}: {
  params: { id: string };
}) {
  // Access params directly
  const { id } = params;
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reasons, setReasons] = useState<ReasonOption[]>([]);
  const [reasonDropdownOpen, setReasonDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<EscalationFormData>({
    reason: "",
    description: "",
    additionalEvidence: [],
    priorityLevel: "Standard",
    contactInfo: "",
    password: "",
    understand: false,
    scheduleFollowUp: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof EscalationFormData, string>>
  >({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disputeData = await getDisputeById(id);
        if (disputeData) {
          setDispute(disputeData);
        } else {
          console.error("Dispute not found");
        }
        setReasons(getEscalationReasons());
      } catch (error) {
        console.error("Error fetching dispute:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof EscalationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (value: "Standard" | "High") => {
    setFormData((prev) => ({ ...prev, priorityLevel: value }));
  };

  const handleFileChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, additionalEvidence: files }));
  };

  const handleSubmit = async () => {
    // Validate form
    const newErrors: Partial<Record<keyof EscalationFormData, string>> = {};

    if (!formData.reason) {
      newErrors.reason = "Reason is required";
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
    }

    if (!formData.contactInfo) {
      newErrors.contactInfo = "Email or phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!dispute) return;

    setSubmitting(true);
    try {
      await escalateDispute(dispute.id, formData);
      router.push(`/disputes/${dispute.id}`);
    } catch (error) {
      console.error("Error escalating dispute:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-8">ESCALATE DISPUTE</h2>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-6"></div>
            <div className="h-80 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!dispute) {
    return (
      <Layout>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-8">ESCALATE DISPUTE</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p>Dispute not found</p>
            <button
              onClick={() => router.push("/disputes")}
              className="text-[#8c1c3a] hover:underline mt-4 inline-block"
            >
              Return to Disputes
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-[80px] bg-[#faf9f7]">
        <h2 className="text-[32px] font-normal mb-[60px]">ESCALATE DISPUTE</h2>

        {/* Dispute Summary */}
        <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A] mb-6">
          <div className="flex items-center justify-between mb-[30.5px]">
            <h3 className="text-[28px] font-normal">Dispute Summary</h3>
            <span className="px-[16px] py-[8px] rounded-full text-xs bg-[#9FCCF7] text-[#2D26FD]">
              In Progress
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-[15px]">
              <p>
                <span className="font-normal text-[16px]">Dispute ID:</span>{" "}
                {dispute.id}
              </p>
              <p>
                <span className="font-normal text-[16px]">Booking ID:</span>{" "}
                {dispute.bookingId}
              </p>
              <p>
                <span className="font-normal text-[16px]">Customer ID:</span>{" "}
                {dispute.customerId}
              </p>
              <p>
                <span className="font-normal text-[16px]">Dress ID:</span>{" "}
                {dispute.dressId}
              </p>
              <p>
                <span className="font-normal text-[16px]">Customer Name:</span>{" "}
                {dispute.customerName}
              </p>
              <p>
                <span className="font-normal text-[16px]">Dress Name:</span>{" "}
                {dispute.dressName || "Zimmermann Silk Gown"}
              </p>
              <p>
                <span className="font-normal text-[16px] text-[#891D33]">
                  Original Reason:
                </span>{" "}
                <span className="text-[#891D33]">Not Returned</span>
              </p>
            </div>
          </div>
        </div>

        {/* Escalation Details */}
        <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A] mb-6">
          <h3 className="text-[24px] font-normal mb-[30px]">
            Escalation Details
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block mb-[15px] text-[18px] font-normal text-[#891D33]">
                Reason for Escalation <span>*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  className={`w-full text-left p-[15px] text-[#595959]  border border-[#E6E6E6] rounded-lg ${
                    errors.reason ? "border-red-500" : "border-gray-300"
                  } flex justify-between items-center`}
                  onClick={() => setReasonDropdownOpen(!reasonDropdownOpen)}
                >
                  <span>
                    {formData.reason ? formData.reason : "Select Reason"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      reasonDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {reasonDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul className="py-1 max-h-60 overflow-auto">
                      {reasons.map((reason) => (
                        <li
                          key={reason.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              reason: reason.label,
                            }));
                            setReasonDropdownOpen(false);
                            if (errors.reason) {
                              setErrors((prev) => ({ ...prev, reason: "" }));
                            }
                          }}
                        >
                          {reason.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {errors.reason && (
                <p className="mt-1 text-sm text-red-500">{errors.reason}</p>
              )}
            </div>

            <div>
              <label className="block mb-[15px] text-[18px] font-normal text-[#891D33]">
                Description <span>*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border rounded-lg ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
                placeholder="Describe your issue or question in detail"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-[15px] text-[18px] font-normal text-[#891D33]">
                Additional Evidence <span className="text-red-500">*</span>
              </label>
              <FileUpload
                onFileChange={handleFileChange}
                buttonText="Upload File"
                placeholder="File name"
                files={formData.additionalEvidence}
              />
            </div>

            <div>
              <label className="block mb-[15px] text-[18px] font-normal text-[#891D33]">
                Priority Level <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="standard"
                    name="priorityLevel"
                    checked={formData.priorityLevel === "Standard"}
                    onChange={() => handleRadioChange("Standard")}
                    className="h-4 w-4 mr-[15px] bg-[#891D33] text-[#8c1c3a] border-gray-300 focus:ring-[#8c1c3a]"
                  />
                  <label htmlFor="standard" className="ml-2 text-[20px]">
                    Standard
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="high"
                    name="priorityLevel"
                    checked={formData.priorityLevel === "High"}
                    onChange={() => handleRadioChange("High")}
                    className="mr-[15px] bg-[#891D33] h-4 w-4 text-[#8c1c3a] border-gray-300 focus:ring-[#8c1c3a]"
                  />
                  <label htmlFor="high" className="ml-2 text-[20px]">
                    High
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Escalation */}
        <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A] mb-6">
          <h3 className="text-[24px] font-normal mb-[30px]">
            Confirm Escalation
          </h3>

          <div className="space-y-[15px]">
            <div>
              <label className="block mb-[15px] text-[18px ] text-[#891D33] font-normal">
                Enter Email / Phone Number{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleInputChange}
                placeholder="e.g., ##"
                className={`w-full  p-[15px] border rounded-lg ${
                  errors.contactInfo ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contactInfo && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.contactInfo}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-[18px] text-[#891D33] font-normal">
                Enter Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="e.g., ##"
                className={`w-full p-[15px] border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A] mb-6">
          <h3 className="text-[24px] font-normal mb-[30px]">
            Additional Options
          </h3>

          <div className="space-y-[33px]">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="understand"
                name="understand"
                checked={formData.understand}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-[#8c1c3a] border-gray-300 rounded focus:ring-[#8c1c3a]"
              />
              <label htmlFor="understand" className="ml-[30px] text-[16px]">
                I understand that escalation may take up to 5 business days and
                cannot be undone.
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="scheduleFollowUp"
                name="scheduleFollowUp"
                checked={formData.scheduleFollowUp}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-[#8c1c3a] border-gray-300 rounded focus:ring-[#8c1c3a]"
              />
              <label
                htmlFor="scheduleFollowUp"
                className="ml-[30px] text-[16px]"
              >
                Schedule a follow-up call with support
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white p-[30px] rounded-lg shadow-[0px_4px_10px_0px_#0000001A]">
          <h3 className="text-[24px] font-normal mb-[30px]">Actions</h3>
          <div className="flex space-x-[30px]">
            {/* <Link href={`/disputes/${dispute.id}/escalate`}> */}
              <button className="px-[16px] py-[10px] bg-[#8c1c3a] text-white rounded-md hover:bg-[#7a1832]">
                Escalate Dispute
              </button>
            {/* </Link> */}
            <button className="px-[20px] py-[11px] border border-[#891D33] text-[#891D33] rounded-md hover:bg-gray-50">
             Contact Support
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

"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import Link from "next/link";

// Form sections for account settings
const accountSections = [
  {
    title: "Business Information",
    fields: [
      {
        label: "Business Name",
        type: "text",
        placeholder: "Enter Business name",
        value: "",
      },
      {
        label: "ABN / Business Number",
        type: "text",
        placeholder: "Enter ABN / Business Number",
        value: "",
      },
      {
        label: "Business Address",
        type: "textarea",
        placeholder: "e.g., ### Fashion Ln, Sydney NSW ####",
        value: "e.g., ### Fashion Ln, Sydney NSW ####",
      },
      {
        label: "Pickup Address",
        type: "textarea",
        placeholder: "e.g., ### Fashion Ln, Sydney NSW ####",
        value:
          "e.g., ### Fashion Ln, Sydney NSW ####\ne.g., ### Fashion Ln, Sydney NSW ####",
      },
    ],
  },
  {
    title: "Contact Information",
    fields: [
      {
        label: "Full Name",
        type: "text",
        placeholder: "e.g., ##",
        value: "e.g., ##",
      },
      {
        label: "Email",
        type: "email",
        placeholder: "e.g., ##",
        value: "e.g., ##",
      },
      {
        label: "Phone Number",
        type: "text",
        placeholder: "e.g., ##",
        value: "e.g., ##",
      },
    ],
  },
  {
    title: "Bank Information",
    fields: [
      {
        label: "Account Name",
        type: "text",
        placeholder: "e.g., ##",
        value: "e.g., ##",
      },
      {
        label: "Account Number",
        type: "text",
        placeholder: "e.g., ##",
        value: "e.g., ##",
      },
      {
        label: "BSB",
        type: "text",
        placeholder: "e.g., ##",
        value: "e.g., ##",
      },
    ],
  },
  {
    title: "Password & Security",
    fields: [
      {
        label: "Current Password",
        type: "password",
        placeholder: "e.g., ##",
        value: "e.g., ##",
      },
      {
        label: "New Password",
        type: "password",
        placeholder: "e.g., ##",
        value: "e.g., ##",
      },
      {
        label: "Confirm New Password",
        type: "password",
        placeholder: "e.g., ##",
        value: "e.g., ##",
      },
    ],
  },
];

const SelectDropdown = ({ label, placeholder }: any) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#8c1c3a] mb-1">
        {label}
      </label>
      <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
        <option value="">{placeholder}</option>
        <option value="reason1">Reason 1</option>
        <option value="reason2">Reason 2</option>
        <option value="reason3">Reason 3</option>
      </select>
    </div>
  );
};

export default function AccountSettingsPage() {
  const [showDeactivate, setShowDeactivate] = useState(false);

  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold uppercase mb-8">Account Settings</h2>

        <div className="space-y-8">
          {/* Business Information */}
          {accountSections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A] p-6"
            >
              <h3 className="font-semibold text-2xl mb-4">{section.title}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field, index) => (
                  <div
                    key={index}
                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    <label className="block text-base font-normal text-[#8c1c3a] mb-3">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder={field.placeholder}
                        defaultValue={field.value}
                        rows={3}
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder={field.placeholder}
                        defaultValue={field.value}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Notification Preferences */}
          <div className="bg-white rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A] p-6">
            <h3 className="font-semibold mb-4">Notification Preferences</h3>

            {/* <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailAlerts"
                  className="h-4 w-4 text-[#8c1c3a] border-gray-300 rounded focus:ring-[#8c1c3a]"
                  defaultChecked
                />
                <label htmlFor="emailAlerts" className="ml-2 text-base text-gray-700">
                  Receive email alerts for new orders
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reminderAlerts"
                  className="h-4 w-4 text-[#8c1c3a] border-gray-300 rounded focus:ring-[#8c1c3a]"
                />
                <label htmlFor="reminderAlerts" className="ml-2 text-sm text-gray-700">
                  Send reminders for return deadlines
                </label>
              </div>
            </div> */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailAlerts"
                  className="h-4 w-4 accent-[#891D33] text-white border-gray-300 rounded focus:ring-[#891D33]"
                  defaultChecked
                />
                <label
                  htmlFor="emailAlerts"
                  className="ml-2 text-base text-gray-700"
                >
                  Receive email alerts for new orders
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reminderAlerts"
                  className="h-4 w-4 accent-[#891D33] text-white border-gray-300 rounded focus:ring-[#891D33]"
                />
                <label
                  htmlFor="reminderAlerts"
                  className="ml-2 text-sm text-gray-700"
                >
                  Send reminders for return deadlines
                </label>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A] p-6">
            <h3 className="font-semibold text-2xl mb-4">Actions</h3>

            <div className="flex justify-between items-center">
              <Link
              href='/account-settings/deactive'
                className="px-4 py-2 bg-[#8c1c3a] text-white rounded-md"
                // onClick={() => setShowDeactivate(true)}
              >
                Deactivate Account
              </Link>

              {/* <button className="px-4 py-2 border border-gray-300 rounded-md">
                Save Changes
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Deactivate Account Modal */}
      {/* {showDeactivate && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold uppercase mb-8">
              Deactivate Your Account
            </h2>

            <div className="bg-[#8c1c3a]/10 border border-[#8c1c3a]/20 rounded-md p-4 mb-6 text-[#8c1c3a]">
              <p>
                Deactivating your account will pause all listings and prevent
                new bookings. This action can be undone within 24 hours by
                contacting support.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Account Status</h3>
              <div className="space-y-1 text-sm">
                <p>Active Listings: 5</p>
                <p>Pending Bookings: 2</p>
                <p className="text-[#8c1c3a]">
                  Upcoming Payout: $960 scheduled for May 28, 2025 (must be
                  resolved before deactivation)
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">
                Reason for Deactivation{" "}
                <span className="text-[#8c1c3a]">*</span>
              </h3>
              <SelectDropdown
                label="Deactivation Reason"
                placeholder="Select Reason"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Additional Feedback (Optional)
                </label>
                <textarea
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g.,"
                  rows={4}
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Confirm Deactivation</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Enter Email / Phone Number{" "}
                    <span className="text-[#8c1c3a]">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g., ##"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Enter Password <span className="text-[#8c1c3a]">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g., ##"
                  />
                </div>

                <button className="px-4 py-2 bg-[#8c1c3a] text-white rounded-md w-full">
                  Send Verification Code
                </button>

                <p className="text-xs text-gray-500">
                  Receive a code via email/SMS for added security.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Verification</h3>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Enter Verification Code{" "}
                  <span className="text-[#8c1c3a]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g., ##"
                />
              </div>

              <button className="mt-2 px-4 py-2 bg-[#8c1c3a] text-white rounded-md">
                Enter Verification Code
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Additional Confirmation</h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="exportData"
                    className="h-4 w-4 text-[#8c1c3a] border-gray-300 rounded focus:ring-[#8c1c3a]"
                  />
                  <label
                    htmlFor="exportData"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Export my account data (listings, bookings, payouts) before
                    deactivation
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="permanentDeactivation"
                    className="h-4 w-4 text-[#8c1c3a] border-gray-300 rounded focus:ring-[#8c1c3a]"
                    defaultChecked
                  />
                  <label
                    htmlFor="permanentDeactivation"
                    className="ml-2 text-sm text-gray-700"
                  >
                    I understand that deactivation is permanent and will pause
                    all listings and bookings.
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-[#8c1c3a] text-white rounded-md"
                onClick={() => setShowDeactivate(false)}
              >
                Confirm Deactivation
              </button>

              <button
                className="px-4 py-2 border border-gray-300 rounded-md"
                onClick={() => setShowDeactivate(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
    </Layout>
  );
}

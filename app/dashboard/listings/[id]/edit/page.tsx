"use client";

import type React from "react";

import { useState, useEffect, use } from "react";
import { Layout } from "@/components/layout";
import { useRouter } from "next/navigation";
import { getDressById, updateDress } from "@/services/listings-service";
import type { Dress, DressFormData } from "@/types/listings";
import { Trash2, Plus, Trash } from "lucide-react";
import { DragDropUpload } from "@/components/drag-drop-upload";
import { SelectDropdown } from "@/components/ui/select-dropdown";

export default function EditListingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const router = useRouter();
  const [dress, setDress] = useState<Dress | null>(null);
  const [formData, setFormData] = useState<DressFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pickupAddresses, setPickupAddresses] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Load dress data
  useEffect(() => {
    const loadDress = async () => {
      try {
        setIsLoading(true);
        const dressData = await getDressById(id);

        if (!dressData) {
          throw new Error(`Dress with ID ${id} not found`);
        }

        setDress(dressData);
        setFormData(dressData);
        setPickupAddresses(dressData.pickupAddresses || []);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load dress details")
        );
        setIsLoading(false);
      }
    };

    loadDress();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    if (!formData) return;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file changes
  const handleFileChange = (files: File[]) => {
    setUploadedFiles(files);
  };

  // Add pickup address
  const addPickupAddress = () => {
    setPickupAddresses([...pickupAddresses, ""]);
  };

  // Remove pickup address
  const removePickupAddress = (index: number) => {
    const newAddresses = [...pickupAddresses];
    newAddresses.splice(index, 1);
    setPickupAddresses(newAddresses);
  };

  // Update pickup address
  const updatePickupAddress = (index: number, value: string) => {
    const newAddresses = [...pickupAddresses];
    newAddresses[index] = value;
    setPickupAddresses(newAddresses);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData || !dress) return;

    try {
      setIsSaving(true);

      // Update form data with pickup addresses
      const updatedFormData = {
        ...formData,
        pickupAddresses: pickupAddresses.filter((addr) => addr.trim() !== ""),
      };

      await updateDress(dress.id, updatedFormData);

      setIsSaving(false);
      router.push(`/listings/${id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to update dress")
      );
      setIsSaving(false);
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
              {error.message ||
                "We encountered an error while loading the listing. Please try again later."}
            </p>
            <button
              onClick={() => router.push("/listings")}
              className="px-4 py-2 bg-[#891d33] text-white rounded-md hover:bg-[#732032] transition-colors"
            >
              Back to Listings
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle loading state
  if (isLoading || !formData) {
    return (
      <Layout>
        <div className="p-8 flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#891d33]"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 bg-[#fefaf6]">
        <h2 className="text-[32px] font-normal tracking-[0.5rem] mb-8">
          EDIT DRESS LISTING
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Basic Details */}
          <div className="bg-white p-6 rounded-[15px] mb-8 shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-2xl font-normal mb-6">Basic Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[18px] font-medium text-[#891d33] mb-3">
                  Dress Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Dress name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
                />
              </div>
              <div>
                <label className="block font-medium text-[#891d33] text-[18px] mb-3">
                  Brand <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Enter Brand Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[18px] font-medium text-[#891d33] mb-3">
                  Size <span className="text-red-500">*</span>
                </label>
                <SelectDropdown
                  label="Select Size"
                  options={["XS", "S", "M", "L", "XL"]}
                  value={formData.size}
                  onChange={(value) => handleSelectChange("size", value)}
                  placeholder="Select Size "
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#891d33] mb-3">
                  Color <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Enter color"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[18px] font-medium text-[#891d33] mb-3">
                  Condition <span className="text-red-500">*</span>
                </label>
                <SelectDropdown
                  label="Select Condition"
                  options={["New", "Excellent", "Good", "Fair"]}
                  value={formData.condition}
                  onChange={(value) => handleSelectChange("condition", value)}
                  placeholder="Select Condition "
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#891d33] mb-3">
                  Category <span className="text-red-500">*</span>
                </label>
                <SelectDropdown
                  label="Select Category"
                  options={[
                    "Formal",
                    "Cocktail",
                    "Evening",
                    "Casual",
                    "Wedding",
                  ]}
                  value={formData.category}
                  onChange={(value) => handleSelectChange("category", value)}
                  placeholder="Select Category "
                />
              </div>
            </div>
          </div>

          {/* Location available */}
          <div className="bg-white p-6 rounded-[15px] shadow-sm mb-8">
            <h3 className="text-2xl font-normal mb-6">Location available</h3>

            <div className="mb-4">
              <label className="block text-base font-medium text-[#891d33] mb-3">
                Pickup Address
              </label>

              {pickupAddresses.map((address, index) => (
                <div key={index} className="mb-2">
                  <div className="flex items-center ">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) =>
                        updatePickupAddress(index, e.target.value)
                      }
                      placeholder="e.g., ### Fashion Ln, Sydney NSW ####"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
                    />
                    <button
                      type="button"
                      onClick={() => removePickupAddress(index)}
                      className="ml-2 p-2 text-white bg-[#891d33] rounded-md hover:bg-[#732032]"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center mt-3">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) =>
                        updatePickupAddress(index, e.target.value)
                      }
                      placeholder="e.g., ### Fashion Ln, Sydney NSW ####"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
                    />
                    <button
                      type="button"
                      onClick={() => removePickupAddress(index)}
                      className="ml-2 p-2 text-white bg-[#891d33] rounded-md hover:bg-[#732032]"
                    >
                      <Plus   className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* <button
                type="button"
                onClick={addPickupAddress}
                className="mt-2 flex items-center justify-center p-2 text-white bg-[#891d33] rounded-md hover:bg-[#732032]"
              >
                <Plus className="h-5 w-5" />
              </button> */}
            </div>
          </div>

          {/* Media */}
          <div className="bg-white p-6 rounded-[15px] mb-8 shadow-[0px_4px_10px_0px_#0000001A]">
            <h3 className="text-2xl font-normal mb-6">Media</h3>

            <div className="mb-4">
              <label className="block text-base font-medium text-[#891d33] mb-3">
                Images <span className="text-red-500">*</span>
              </label>
              
              <DragDropUpload onFileChange={handleFileChange} />
            </div>
          </div>

          {/* Pricing & Fees */}
          <div className="bg-white p-6 rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A] mb-8">
            <h3 className="text-2xl font-normal mb-6">Pricing & Fees</h3>

            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label className="block text-base font-normal text-[#891d33] mb-3">
                  Rental Price ($ / 4 days){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price.replace("$", "")}
                  onChange={handleInputChange}
                  placeholder="e.g., ##"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
                />
              </div>
              <div>
                <label className="block text-base font-normal text-[#891d33] mb-3">
                  Rental Price ($ / 8 days)
                </label>
                <input
                  type="text"
                  placeholder="e.g., ##"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
                />
              </div>
            </div>
          </div>

          {/* Description & Details */}
          <div className="bg-white p-6 rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A] mb-8">
            <h3 className="text-2xl font-normal mb-6">Description & Details</h3>

            <div className="mb-4">
              <label className="block text-base font-normal text-[#891d33] mb-3">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="e.g., ##"
                rows={1}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-base font-normal text-[#891d33] mb-3">
                Materials <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="materials"
                value={formData.materials}
                onChange={handleInputChange}
                placeholder="e.g., ##"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
              />
            </div>

            <div>
              <label className="block text-base font-normal text-[#891d33] mb-3">
                Care Instructions <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="careInstructions"
                value={formData.careInstructions}
                onChange={handleInputChange}
                placeholder="e.g., ##"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#891d33]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-[15px] shadow-[0px_4px_10px_0px_#0000001A] mb-8">
            <h3 className="text-lg font-medium mb-6">Actions</h3>

            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#891d33] text-white rounded-md hover:bg-[#732032]"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Change"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

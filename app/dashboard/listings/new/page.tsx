"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout";
import { createDress } from "@/services/listings-service";
import {
  BulkListingForm,
  type FormData as BulkFormData,
} from "@/components/bulk-listing-form";
import { BulkImportButton } from "@/components/bulk-import-button";
import { toast } from "sonner";

export default function AddNewListingPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Handle bulk form submission
  const handleBulkSubmit = async (forms: BulkFormData[]) => {
    setIsSaving(true);

    try {
      // In a real app, we would send these to an API
      // For demo purposes, we'll just process them sequentially
      const createdListings = [];

      for (const form of forms) {
        const dressData = {
          name: form.dressName,
          brand: form.brand,
          price: `$${form.rentalPrice4}`,
          numericPrice: Number.parseFloat(form.rentalPrice4),
          size: form.size,
          color: form.color,
          condition: form.condition,
          status: true,
          image: form.images.length
            ? "/placeholder.svg?key=9n3vh"
            : "/placeholder.svg?key=9n3vh",
          description: form.description,
          materials: form.materials,
          careInstructions: form.careInstructions,
          category: form.category,
          deliveryMethod: "Both" as "Pickup" | "Shipping" | "Both",
          tags: [form.category],
          pickupAddresses: form.pickupAddresses.filter(
            (addr) => addr.trim() !== ""
          ),
          rentalPeriods: [
            { days: 4, price: Number.parseFloat(form.rentalPrice4) || 0 },
            { days: 8, price: Number.parseFloat(form.rentalPrice8) || 0 },
          ],
        };

        // Create the listing
        const newDress = await createDress(dressData);
        createdListings.push(newDress);
      }

      toast.success(`Successfully created ${createdListings.length} listings`);
      router.push("/listings");
    } catch (error) {
      console.error("Error creating listings:", error);
      toast.error("Failed to create listings");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle save draft
  const handleSaveDraft = async (forms: BulkFormData[]) => {
    toast.success("Drafts saved successfully");
    // In a real application, we would save these to an API or localStorage
    return Promise.resolve();
  };

  // Handle CSV import
  const handleCSVImport = (csvData: any[]) => {
    // Convert CSV data to our form format
    let counter = 0;
    const formattedData: BulkFormData[] = csvData.map((row) => ({
      id: `import_${Date.now()}_${++counter}`,
      dressName: row["Dress Name"] || "",
      brand: row["Brand"] || "",
      size: row["Size"] || "",
      color: row["Color"] || "",
      condition: row["Condition"] || "",
      category: row["Category"] || "",
      pickupAddresses: row["Pickup Address"] ? [row["Pickup Address"]] : [""],
      images: [],
      rentalPrice4: row["Rental Price (4 days)"] || "",
      rentalPrice8: row["Rental Price (8 days)"] || "",
      description: row["Description"] || "",
      materials: row["Materials"] || "",
      careInstructions: row["Care Instructions"] || "",
    }));

    // Handle the imported data (in a real app, you might want to show a preview)
    handleBulkSubmit(formattedData);
  };

  return (
    <Layout>
      <div className="p-8 bg-[#fefaf6]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium tracking-[0.5rem] uppercase">
            ADD NEW DRESS LISTING
          </h2>
          <BulkImportButton onImport={handleCSVImport} />
        </div>

        <BulkListingForm
          onSubmit={handleBulkSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    </Layout>
  );
}

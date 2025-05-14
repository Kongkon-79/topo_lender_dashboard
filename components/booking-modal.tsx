"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface Dress {
  id: string
  name?: string
  brand: string
  price: string
  image: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (bookingData: any) => void
  dresses: Dress[]
}

export function BookingModal({ isOpen, onClose, onSave, dresses }: BookingModalProps) {
  const [selectedDressId, setSelectedDressId] = useState<string | null>(null)
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null)
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [status, setStatus] = useState<string>("Confirmed")
  const [description, setDescription] = useState<string>("")
  const [showDressDetails, setShowDressDetails] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    try {
      if (selectedDressId) {
        const dress = dresses.find((d) => d.id === selectedDressId)
        if (dress) {
          setSelectedDress(dress)
          setShowDressDetails(true)
        } else {
          setSelectedDress(null)
          setShowDressDetails(false)
        }
      } else {
        setSelectedDress(null)
        setShowDressDetails(false)
      }
    } catch (err) {
      console.error("Error selecting dress:", err)
      setSelectedDress(null)
      setShowDressDetails(false)
    }
  }, [selectedDressId, dresses])

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDressId(null)
      setStartDate("")
      setEndDate("")
      setStatus("Confirmed")
      setDescription("")
      setErrors({})
    }
  }, [isOpen])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!selectedDressId) {
      newErrors.dress = "Please select a dress"
    }

    if (!startDate) {
      newErrors.startDate = "Please select a start date"
    }

    if (!endDate) {
      newErrors.endDate = "Please select an end date"
    } else if (startDate && new Date(endDate) <= new Date(startDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    try {
      if (!validateForm()) {
        return
      }

      onSave({
        dressId: selectedDressId,
        startDate,
        endDate,
        status,
        description,
      })

      // Reset the form
      setSelectedDressId(null)
      setStartDate("")
      setEndDate("")
      setStatus("Confirmed")
      setDescription("")

      onClose()
    } catch (err) {
      console.error("Error submitting booking:", err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-medium">Manual Booking</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Select Dress <span className="text-[#8c1c3a]">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedDressId || ""}
                onChange={(e) => setSelectedDressId(e.target.value)}
                className={cn(
                  "w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#8c1c3a]",
                  errors.dress && "border-red-500",
                )}
                required
              >
                <option value="">Select One</option>
                {dresses.map((dress) => (
                  <option key={dress.id} value={dress.id}>
                    {dress.name || dress.id} - {dress.brand}
                  </option>
                ))}
              </select>
              {errors.dress && <p className="text-red-500 text-xs mt-1">{errors.dress}</p>}
            </div>
          </div>

          {showDressDetails && selectedDress && (
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="flex space-x-4">
                <div className="w-32 h-40 overflow-hidden">
                  <Image
                    src={selectedDress.image || "/placeholder.svg"}
                    alt={selectedDress.name || selectedDress.id}
                    width={128}
                    height={160}
                    className="object-cover w-full h-full rounded-sm"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-lg font-medium">{selectedDress.name || `DRESS ID: ${selectedDress.id}`}</p>
                  <p className="text-sm text-gray-600">Brand: {selectedDress.brand}</p>
                  <p className="text-sm text-gray-600">Price: {selectedDress.price}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Start Date <span className="text-[#8c1c3a]">*</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={cn(
                  "w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#8c1c3a]",
                  errors.startDate && "border-red-500",
                )}
                min={new Date().toISOString().split("T")[0]}
                required
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                End Date <span className="text-[#8c1c3a]">*</span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={cn(
                  "w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#8c1c3a]",
                  errors.endDate && "border-red-500",
                )}
                min={startDate || new Date().toISOString().split("T")[0]}
                required
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Status <span className="text-[#8c1c3a]">*</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#8c1c3a]"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#8c1c3a]"
              placeholder="Add any special notes or requirements for this booking..."
            />
          </div>
        </div>

        <div className="p-6 border-t flex justify-between items-center">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#8c1c3a] text-white rounded-md shadow hover:bg-[#7a1832] transition-colors"
          >
            Create Booking
          </button>
        </div>
      </div>
    </div>
  )
}

// Helper function for class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

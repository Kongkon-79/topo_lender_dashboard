"use client";

import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthHeader from "@/components/shared/Auth/AuthHeader";
import { toast } from "sonner";

export default function OtpForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only take the first character

    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys for navigation
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a valid 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("OTP resent successfully!");

      // Clear the current OTP
      setOtp(Array(6).fill(""));

      // Focus the first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");

    // Check if OTP is complete
    if (otpValue.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP.");
      return;
    }

    setLoading(true);

    console.log("OTP Verified:", otpValue);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <AuthHeader
        title1="Enter"
        title2="OTP"
        desc="Enter your email to receive the OTP"
      />

      <div className="py-6 md:py-7 lg:py-8 px-4 md:px-5 lg:px-6 w-full">
        {/* OTP Input Fields */}
        <div className="flex gap-[18px] w-full justify-center">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={`font-poppins w-[52px] h-[58px] bg-white text-[#999999] text-center text-lg font-medium leading-[120%] border rounded-md focus:outline-none ${
                digit ? "border-[#891D33]" : "border-[#595959]"
              }`}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Resend OTP */}
        <div className="text-center my-6">
          <span className="font-poppins text-xl font-normal leading-[120%] text-[#ACACAC] tracking-[0%]">Didn't Receive OTP? </span>
          <button
            onClick={handleResendOtp}
            disabled={loading}
            className="font-poppins text-xl font-normal leading-[120%] text-black tracking-[0%] hover:underline"
          >
            RESEND OTP
          </button>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={loading}
          className="font-poppins h-[52px] w-full bg-black text-lg font-semibold leading-[120%] tracking-[0%] rounded-[8px] text-[#F4F4F4] py-[15px]"
        >
          {loading ? "Verifying..." : "Verify Now"}
        </Button>
      </div>
    </div>
  );
}

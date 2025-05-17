"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import AuthHeader from "@/components/shared/Auth/AuthHeader";

// Define form schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  // Initialize form with React Hook Form and Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form submission handler
  function onSubmit(values: FormValues) {
    console.log(values);
    // Handle login logic here
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <AuthHeader
        title1="Reset"
        title2="Password"
        desc="Enter your email to receive the OTP"
      />

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-4"
        >
          {/* Email Field */}
          <div className="mb-[15px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Mail className="w-6 h-6 text-[#999999]" />
                      </div>
                      <Input
                        placeholder="Enter your email"
                        className="font-poppins w-full md:w-[415px] h-[50px] bg-white border border-black text-base placeholder:text-base placeholder:text-[#999999] placeholder:leading-[120%] placeholder:font-normal pl-[52px] pr-4 py-[15px] rounded-[8px]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="font-poppins h-[52px] w-full bg-black text-lg font-semibold leading-[120%] tracking-[0%] rounded-[8px] text-[#F4F4F4] py-[15px]"
          >
            Send OTP
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
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
        title1="Welcome"
        title2="Back"
        desc="Please enter your credentials to continue"
      />

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full py-6 md:py-7 lg:py-8 px-4 md:px-5 lg:px-6"
        >
          {/* Email Field */}
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
                      className="font-poppins w-full md:w-[400px] h-[50px] bg-white border border-black text-base placeholder:text-base placeholder:text-[#999999] placeholder:leading-[120%] placeholder:font-normal pl-[52px] pr-4 py-[15px] rounded-[8px]"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <div className="mt-6 mb-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        className="font-poppins w-full md:w-[400px] h-[50px] bg-white border border-black text-base placeholder:text-base placeholder:text-[#999999] placeholder:leading-[120%] placeholder:font-normal pl-[42px] pr-4 py-[15px] rounded-[8px]"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-6 md:mb-7 lg:mb-8">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      className="w-4 h-4 border border-black rounded-[2px]"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="rememberMe"
                    />
                  </FormControl>
                  <Label
                    htmlFor="rememberMe"
                    className="font-poppins text-xm font-normal text-black leading-[120%] tracking-[0%] cursor-pointer"
                  >
                    Remember me
                  </Label>
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="font-poppins text-xs text-[#891D33] font-normal leading-[120%] tracking-[0%] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="font-poppins h-[52px] w-full bg-black text-lg font-semibold leading-[120%] tracking-[0%] rounded-[8px] text-[#F4F4F4] py-[15px]"
          >
            Sign In
          </Button>

          {/* Sign Up Link */}
          <div className="text-center text-sm mt-4 md:mt-5 lg:mt-6">
            <span className="font-poppins text-[#891D33] text-xs font-normal leading-[120%] tracking-[0%]">
              New To our Platform?
            </span>{" "}
            <Link
              href="/signup"
              className="font-poppins text-black text-xs leading-[120%] font-medium hover:underline"
            >
              Sign Up Here
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

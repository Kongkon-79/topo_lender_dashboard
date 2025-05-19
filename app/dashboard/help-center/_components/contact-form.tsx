"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  fileName: z.string().optional(),
})

export default function ContactForm() {
  const [fileName, setFileName] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      message: "",
      fileName: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // You can add additional logic here
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      form.setValue("fileName", file.name)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="mb-0">
              <FormLabel className="text-lg font-normal text-[#891D33] tracking-[0%] font-avenirNormal leading-[120%]">
                Subject
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="mt-[15px] w-full h-[49px] placeholder:text-[#595959] text-[#595959] text-base tracking-[0%] leading-[120%] font-avenirNormal p-[15px] border border-[#E6E6E6] bg-white rounded-[8px] focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Subject of the Message"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="py-[30px]">
              <FormLabel className="text-lg font-normal text-[#891D33] tracking-[0%] font-avenirNormal leading-[120%]">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="mt-[15px] w-full h-[150px] placeholder:text-[#595959] text-[#595959] text-base tracking-[0%] leading-[120%] font-avenirNormal p-[15px] border border-[#E6E6E6] bg-white rounded-[8px] focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Describe your issue or question in detail!"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <FormLabel className="text-lg font-normal text-[#891D33] tracking-[0%] font-avenirNormal leading-[120%]">
            Attach File (optional)
          </FormLabel>
          <div className="relative">
            <Input
              type="text"
              className="mt-[15px] w-full h-[69px] placeholder:text-[#595959] text-[#595959] text-base tracking-[0%] leading-[120%] font-avenirNormal p-[15px] border border-[#E6E6E6] bg-white rounded-[8px] focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="File name"
              value={fileName}
              readOnly
            />
            <Button
              type="button"
              className="absolute right-[15px] top-[15px] font-avenirNormal text-white text-base leading-[120%] tracking-[0%] font-normal py-[10px] px-[16px] bg-[#891D33] rounded-[8px] hover:bg-[#791D2E]"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Upload File
            </Button>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
          </div>
        </div>

        <div className="mt-[30px]">
          <Button
            type="submit"
            className="font-avenirNormal text-base font-normal leading-[120%] tracking-[0%] text-white py-[10px] px-[16px] bg-[#891D33] rounded-[8px] hover:bg-[#791D2E]"
          >
            Submit Request
          </Button>
        </div>
      </form>
    </Form>
  )
}

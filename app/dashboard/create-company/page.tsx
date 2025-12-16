"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import SectionCardWrapper from "@/components/common/section-card-wrapper";
import { FormSuccess } from "@/components/form-success";
import { useState } from "react";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";

export const RegisterCompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  postcode: z.string().min(1, "Address Line 2 is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
  oldSsmNo: z.string().min(1, "Old SSM No is required"),
  newSsmNo: z.string().min(1, "New SSM No is required"),
  tinNo: z.string().optional(),
});

const CreateCompanyPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterCompanySchema>>({
    resolver: zodResolver(RegisterCompanySchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      postcode: "",
      city: "",
      province: "",
      country: "",
      oldSsmNo: "",
      newSsmNo: "",
      tinNo: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterCompanySchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/companies/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          postcode: values.postcode,
          city: values.city,
          province: values.province,
          country: values.country,
          oldSsmNo: values.oldSsmNo,
          newSsmNo: values.newSsmNo,
          tinNo: values.tinNo,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      console.log(res.body);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCardWrapper headerLabel="Company Registration">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-0.5 my-4 mt-0">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Company Name</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="ABC Sdn Bhd" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Address Line 1</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="P.O. Box 1234" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Address Line 2</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="Off ABC Road" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Postcode</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="123456" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">City</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="Some city" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">State</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="Some state" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Country</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="Malaysia" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oldSsmNo"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Old SSM No</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="1234567-Z" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newSsmNo"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">New SSM No</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="1234567891012" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tinNo"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">TIN No</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="1234567891012" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            type="submit"
            className="bg-brand-500 hover:bg-brand-400 w-full"
            disabled={loading}
          >
            {loading ? "Registering in process" : "REGISTER"}
          </Button>
        </form>
      </Form>
    </SectionCardWrapper>
  );
};

export default CreateCompanyPage;

"use client";

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormSuccess } from "../form-success";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message"); // ✅ ambil query param
  if (!message) return null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      setSuccess("Login successful");

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <CardWrapper
      headerLabel="Login to proceed"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={false}
    >
      <Form {...form}>
        {message && (
          <div className="text-white mb-4 text-sm bg-green-500 text-center rounded-sm">
            {message}
          </div>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-0.5 my-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4">
                  <FormLabel className="">Email</FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      {...field}
                      placeholder="mail@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3 mb-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4">
                  <FormLabel className="">Password</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3 mb-2" />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            type="submit"
            className="bg-[#0088de] w-full"
            disabled={loading}
          >
            {loading ? "Login in process" : "LOGIN"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;

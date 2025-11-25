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
import { LoginSchema } from "@/shemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    console.log("from login");
    setError("");
  };
  return (
    <CardWrapper
      headerLabel="Login to proceed"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={false}
    >
      <Form {...form}>
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
          <FormError message={error} />
          <Button type="submit" className="bg-[#0088de] w-full">
            LOGIN
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;

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
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { registerAdmin } from "@/redux/admin/adminSlice";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    try {
      await dispatch(
        registerAdmin({
          email: values.email,
          username: values.username,
          password: values.password,
        })
      ).unwrap();
      setSuccess("Registration successful");
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-0.5 my-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Username</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="user" type="text" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Email</FormLabel>
                  <FormControl className="col-span-4">
                    <Input
                      {...field}
                      placeholder="mail@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Password</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6">
                  <FormLabel className="col-span-2">Re-Password</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage className="col-start-3 col-span-4 mb-2" />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="bg-[#0088de] w-full">
            REGISTER
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;

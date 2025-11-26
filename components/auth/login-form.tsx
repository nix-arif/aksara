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
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginAdmin } from "@/redux/admin/adminSlice";
import { FormSuccess } from "../form-success";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.admin);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

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
    try {
      await dispatch(
        loginAdmin({ email: values.email, password: values.password })
      ).unwrap();
      setSuccess("Login successful");
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
          <Button type="submit" className="bg-[#0088de] w-full">
            LOGIN
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;

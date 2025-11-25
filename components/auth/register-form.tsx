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
import { RegisterSchema } from "@/shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    console.log("form register");
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
            {" "}
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
          <Button type="submit" className="bg-[#0088de] w-full">
            REGISTER
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;

"use client";

import React, { FormEvent } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import axios from "@/lib/axios";
import { LoginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

type Props = {};

type FormData = z.infer<typeof LoginSchema>;

export default function LoginForm({}: Props) {
  const router = useRouter();
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      email: "gurungebraj22@gmail.com",
      password: "Test@1234",
    },
    resolver: zodResolver(LoginSchema),
  });

  const handleLoginSubmit = async (data: FieldValues) => {
    toast("Logging in...", {
      id: "login",
    });
    try {
      const response = await axios.post("http://127.0.0.1:8080/auth/login", {
        username: data.email,
        password: data.password,
        withCredentials: true,
      });

      setCookie("token", response.data.access_token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      toast.success("Logged in successfully!", {
        id: "login",
      });
      router.push("/dashboard");
    } catch (error: any) {
      if (error && error.response) {
        toast.error(error.response.data.msg, {
          id: "login",
        });
      } else {
        toast.error("An error occurred. Please try again later.", {
          id: "login",
        });
      }
    } finally {
      reset();
    }
  };
  return (
    <div className="sm:max-w-[460px] shadow-sm mx-auto bg-white p-5 border rounded-md">
      <h2 className="text-2xl font-bold pb-5 text-center underline">Login</h2>
      <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-md border outline-none"
            autoComplete="off"
            {...register("email")}
          />
          <span className="inline-block text-sm text-red-500">
            {errors.email && errors.email.message}
          </span>
        </div>
        <div className="space-y-2">
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-md border outline-none"
            autoComplete="off"
            {...register("password")}
          />
          <span className="inline-block text-sm text-red-500">
            {errors.password && errors.password.message}
          </span>
        </div>
        <Button className="w-full" size={"lg"}>
          Login
        </Button>
      </form>
    </div>
  );
}

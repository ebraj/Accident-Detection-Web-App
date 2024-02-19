"use client";

import React, { FormEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../reusables/cva-button";
import axios from "@/lib/axios";

type Props = {};

export type InputTypes = {
  email: string;
  password: string;
  confirmPassword: string;
};
export default function LoginForm({}: Props) {
  const { register, watch, formState, handleSubmit } = useForm<InputTypes>();

  const handleLoginSubmit: SubmitHandler<InputTypes> = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/register",
        {
          username: data.email,
          password: data.password,
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[500px] shadow-sm mx-auto bg-white p-5 border rounded-md">
      <h2 className="text-2xl font-bold pb-5 text-center underline">Login</h2>
      <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="w-full px-4 py-4 rounded-md border outline-none"
            autoComplete="off"
            {...register("email")}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full px-4 py-4 rounded-md border outline-none"
            autoComplete="off"
            {...register("password")}
          />
        </div>
        <Button variant={"defaultDark"} size={"md"}>
          Login
        </Button>
      </form>
    </div>
  );
}

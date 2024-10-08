"use client";
import React, { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import axios from "axios";

interface ISignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>();
  console.log(watch("email"));
  console.log(watch("password"));

  const onSubmit: SubmitHandler<ISignupForm> = (data: ISignupForm) => {
    console.log("data: ", data);
    console.log(data);
  };

  const testingApi = async () => {
    try {
      const res = await axios.get(
        // "https://int-next-youtube.netlify.app/.netlify/functions/api/test"
        "https://next-youtube-backend.netlify.app/.netlify/functions/api/users"
      );

      console.log("res: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    void testingApi();
  }, []);
  return (
    <div className="bg-primary text-primary-foreground w-full h-screen m-auto flex flex-col gap-4 p-4">
      <div className="m-auto w-full lg:w-1/2 flex flex-col gap-10 border p-10 rounded-md bg-card">
        <h1 className="text-center text-4xl font-medium border-b pb-4">
          Signup <br />{" "}
          <span className="text-destructive text-xl">
            (Currently Signup Api is in under development)
          </span>
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5 place-items-center"
        >
          <Input placeholder="Name" {...register("name")} />
          <Input placeholder="Email" {...register("email")} />
          <Input placeholder="Password" {...register("password")} />
          <Input
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <div className="flex items-center  gap-2 w-full">
            <hr className="h-0.5 w-full bg-primary" />
            <p className="">or</p>
            <hr className="h-0.5 w-full bg-primary" />
          </div>
          <div className="text-sm font-normal space-x-2">
            <span>Already have an account?</span>
            <a href="/auth/login">Login</a>{" "}
          </div>
          <button
            type="button"
            className="w-full bg-secondary h-12 rounded-md text-lg font-medium"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

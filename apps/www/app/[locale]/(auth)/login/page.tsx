"use client";

import NextLink from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import TextField from "components/form/text-field";
import ButtonBlueFilled from "components/button/button-blue-filled";
import Spinner from "components/common/spinner";

type LoginProps = {
  params: {
    locale: string;
  };
};

export default function Login(props: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form action={onSubmit} className={twMerge("flex flex-col gap-6", isLoading && "pointer-events-none")}>
      <TextField label="E-mail" name="email" placeholder="Enter your email" required type="email" />
      <TextField label="Password" name="password" placeholder="••••••••" required type="password" />
      <div className="mb-4 flex justify-between">
        <label className="flex gap-2">
          <input name="remember" type="checkbox" />
          Remember for 30 days
        </label>
        <NextLink className="text-blue-300 hover:underline" href={`/${props.params.locale}/forgot`}>
          Forgot password
        </NextLink>
      </div>
      <ButtonBlueFilled type="submit">Sign in</ButtonBlueFilled>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex bg-gray-900/75">
          <Spinner label="Loading" />
        </div>
      )}
    </form>
  );

  function onSubmit() {
    setIsLoading(true);
    setIsLoading(false);
  }
}

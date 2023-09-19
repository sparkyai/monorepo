"use client";

import { useState } from "react";
import TextField from "components/form/text-field";
import ButtonBlueFilled from "components/button/button-blue-filled";
import Spinner from "components/common/spinner";

export default function Reset() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form action={onSubmit} className="flex flex-col gap-6">
      <TextField label="Password" name="password" placeholder="••••••••" type="password" />
      <TextField label="Repeat Password" name="_password" placeholder="••••••••" type="password" />
      <ButtonBlueFilled type="submit">Reset password</ButtonBlueFilled>
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

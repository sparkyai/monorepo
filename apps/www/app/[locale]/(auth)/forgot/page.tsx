import { useState } from "react";
import TextField from "components/form/text-field";
import ButtonBlueFilled from "components/button/button-blue-filled";
import Spinner from "components/common/spinner";

type ForgotProps = {
  searchParams: {
    email?: string;
  };
};

export default function Forgot(props: ForgotProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form action={onSubmit} className="flex flex-col gap-6">
      {props.searchParams.email ? (
        <>
          <input name="email" type="hidden" value={props.searchParams.email} />
          <div className="flex justify-center gap-1 text-sm">
            {/* eslint-disable-next-line react/no-unescaped-entities -- correct */}
            <p className="text-gray-100">Didn't receive the email?</p>
            <button className="text-blue-300 hover:underline" type="submit">
              Click to resend
            </button>
          </div>
        </>
      ) : (
        <>
          <TextField label="E-mail" name="email" placeholder="Enter your email" type="email" />
          <ButtonBlueFilled type="submit">Reset password</ButtonBlueFilled>
        </>
      )}
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

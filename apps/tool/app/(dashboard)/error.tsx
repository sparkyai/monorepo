"use client";

import ButtonPrimary from "@components/button/button-primary";

type PageErrorProps = {
  error: Error;
  reset: VoidFunction;
};

export default function PageError(props: PageErrorProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-3xl font-bold text-rose-500">Something went wrong!</h2>
      <ButtonPrimary onClick={props.reset}>Reset</ButtonPrimary>
    </div>
  );
}

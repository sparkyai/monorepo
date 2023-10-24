"use client";

import { useEffect } from "react";

type PageErrorProps = {
  error: Error & {
    digest?: string;
  };
};

export default function PageError(props: PageErrorProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console -- ignore
    console.error(props.error.message, props.error.digest);
  }, [props.error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-3xl font-bold text-rose-500">Something went wrong!</h2>
    </div>
  );
}

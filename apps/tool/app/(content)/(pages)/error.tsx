"use client";

type PageErrorProps = {
  error: Error;
};

export default function PageError(props: PageErrorProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-3xl font-bold text-rose-500">Something went wrong!</h2>
      <p>Error: {props.error.message}</p>
    </div>
  );
}

type ForgotHeaderProps = {
  searchParams: {
    email?: string;
  };
};

export default function ForgotHeader(props: ForgotHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-center text-2xl font-semibold leading-loose">
        {props.searchParams.email ? "Check your email" : "Forgot password?"}
      </h1>
      <p className="text-center text-gray-50">
        {props.searchParams.email
          ? `We sent a password reset link to ${props.searchParams.email}`
          : "No worries, we’ll send you reset instructions."}
      </p>
    </div>
  );
}

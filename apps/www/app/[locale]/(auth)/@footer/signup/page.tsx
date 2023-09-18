import NextLink from "next/link";

type SignupFooterProps = {
  params: {
    locale: string;
  };
};

export default function SignupFooter(props: SignupFooterProps) {
  return (
    <div className="flex justify-center gap-1 text-sm">
      <p>Already have an account?</p>
      <NextLink className="text-blue-300 hover:underline" href={`/${props.params.locale}/login`}>
        Log in
      </NextLink>
    </div>
  );
}

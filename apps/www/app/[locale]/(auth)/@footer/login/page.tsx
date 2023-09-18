import NextLink from "next/link";

type LoginFooterProps = {
  params: {
    locale: string;
  };
};

export default function LoginFooter(props: LoginFooterProps) {
  return (
    <div className="flex justify-center gap-1 text-sm">
      <p>Don’t have an account?</p>
      <NextLink className="text-blue-300 hover:underline" href={`/${props.params.locale}/signup`}>
        Sign up
      </NextLink>
    </div>
  );
}

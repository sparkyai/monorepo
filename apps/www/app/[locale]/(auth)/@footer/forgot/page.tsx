import NextLink from "next/link";
import IcomoonIcon from "components/common/icomoon-icon";

type ForgotFooterProps = {
  params: {
    locale: string;
  };
};

export default function ForgotFooter(props: ForgotFooterProps) {
  return (
    <NextLink
      className="mx-auto inline-flex items-center gap-2 text-sm font-semibold leading-tight text-gray-100"
      href={`/${props.params.locale}/login`}
    >
      <IcomoonIcon name="arrow-left-short" />
      Back to log in
    </NextLink>
  );
}

import NextLink from "next/link";
import IcomoonIcon from "components/common/icomoon-icon";

type ResetHeaderProps = {
  params: {
    locale: string;
  };
};

export default function ResetFooter(props: ResetHeaderProps) {
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

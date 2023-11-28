import NextLink from "next/link";
import ButtonBlueFilled from "shared/ui/button-blue-filled";
import { fetchDonationLink } from "../model/fetch";

type DonationLinkProps = {
  locale: string;
  className?: string;
};

export default async function DonationLink(props: DonationLinkProps) {
  const link = await fetchDonationLink(props.locale);

  if (!link) {
    return null;
  }

  let href = `/${link.page.locale}`;

  if (link.page.slug) {
    href += `/${link.page.slug}`;
  }

  return (
    <ButtonBlueFilled className={props.className} component={NextLink} href={href}>
      {link.label}
    </ButtonBlueFilled>
  );
}

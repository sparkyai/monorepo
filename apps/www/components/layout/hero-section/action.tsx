import NextLink from "next/link";
import ButtonBlueFilled from "components/button/button-blue-filled";

type Page = {
  slug: string | null;
  locale: string;
};

type ActionProps = {
  url: string | null;
  page: Page | null;
  label: string;
  legal: Page | null;
  feature: Page | null;
};

export default function Action(props: ActionProps) {
  if (props.url && props.label) {
    return (
      <ButtonBlueFilled component="a" href={props.url} rel="noreferrer" target="_blank">
        {props.label}
      </ButtonBlueFilled>
    );
  }

  let url: string | null = null;
  let slug: string | null = null;

  if (props.page) {
    url = `/${props.page.locale}`;
    slug = props.page.slug;
  }

  if (props.legal) {
    url = `/${props.legal.locale}/legals`;
    slug = props.legal.slug;
  }

  if (props.feature) {
    url = `/${props.feature.locale}/features`;
    slug = props.feature.slug;
  }

  if (url && slug) {
    url += `/${slug}`;
  }

  if (url) {
    return (
      <ButtonBlueFilled component={NextLink} href={url}>
        {props.label}
      </ButtonBlueFilled>
    );
  }

  return null;
}

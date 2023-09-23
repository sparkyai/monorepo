import NextLink from "next/link";
import ButtonBlueFilled from "components/button/button-blue-filled";
import IcomoonIcon from "components/common/icomoon-icon";
import { app } from "lib/utils/url";

interface AppAction {
  path: string;
  label: string;
}

interface PageAction {
  page: {
    slug: string | null;
    locale: string;
    publishedAt: string;
  };
  label: string;
}

interface LegalAction {
  legal: {
    slug: string | null;
    locale: string;
    publishedAt: string;
  };
  label: string;
}

interface SocialAction {
  label: string;
  social: {
    url: string;
    name: string;
  };
}

interface FeatureAction {
  label: string;
  feature: {
    slug: string | null;
    locale: string;
    publishedAt: string;
  };
}

export type Action = AppAction | PageAction | LegalAction | SocialAction | FeatureAction;

type LinkProps = {
  action: Action;
  locale: string;
};

export default function Link(props: LinkProps) {
  let href: string | undefined;

  if ("path" in props.action) {
    href = app(props.action.path);
  } else if ("social" in props.action) {
    href = props.action.social.url;
  }

  if (href) {
    return (
      <ButtonBlueFilled className="mx-auto mt-7" component="a" href={href} rel="noreferrer" target="_blank">
        {"social" in props.action && <IcomoonIcon className="mr-2.5" name={props.action.social.name.toLowerCase()} />}
        {props.action.label}
      </ButtonBlueFilled>
    );
  }

  if ("path" in props.action) {
    return (
      <ButtonBlueFilled className="mx-auto mt-7" component="a" href={props.action.path}>
        {props.action.label}
      </ButtonBlueFilled>
    );
  }

  let slug: string | null = null;
  let locale: string = props.locale;
  let publishedAt: string | undefined;

  if ("page" in props.action) {
    slug = props.action.page.slug;
    locale = props.action.page.locale;
    publishedAt = props.action.page.publishedAt;
  }

  if ("legal" in props.action) {
    slug = props.action.legal.slug;
    locale = props.action.legal.locale;
    publishedAt = props.action.legal.publishedAt;
  }

  if ("feature" in props.action) {
    slug = props.action.feature.slug;
    locale = props.action.feature.locale;
    publishedAt = props.action.feature.publishedAt;
  }

  if (publishedAt) {
    const url = `/${locale}${slug ? `/${slug}` : ""}`;

    return (
      <ButtonBlueFilled className="mx-auto mt-7" component={NextLink} href={url}>
        {props.action.label}
      </ButtonBlueFilled>
    );
  }

  return null;
}

import type { PropsWithChildren } from "react";
import Image from "next/image";
import HeroSection from "components/layout/hero-section";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";

type Page = {
  slug: string | null;
  locale: string;
};

type HeroProps = PropsWithChildren<{
  url: string | null;
  page: Page | null;
  legal: Page | null;
  label: string;
  feature: Page | null;
  media: null | ImageData;
  locale: string;
  header: {
    title: string;
    subtitle: string;
  };
  avatars?: boolean;
}>;

export default async function Hero(props: HeroProps) {
  const action = {
    url: props.url,
    page: props.page,
    label: props.label,
    legal: props.legal,
    feature: props.feature,
  };

  return (
    <HeroSection action={action} avatars={props.avatars} locale={props.locale} {...props.header}>
      {props.media && (
        <div className="aspect-video overflow-hidden rounded-md lg:mx-auto lg:w-10/12">
          <Image
            alt={props.media.alt}
            placeholder="blur"
            sizes="(min-width: 1024px) 1200px, 100vw"
            src={getStaticImageData(props.media)}
          />
        </div>
      )}
    </HeroSection>
  );
}

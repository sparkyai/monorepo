import type { PropsWithChildren } from "react";
import Image from "next/image";
import HeroSection from "components/layout/hero-section";
import { app } from "lib/utils/url";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";

type HeroProps = PropsWithChildren<{
  media: null | ImageData;
  locale: string;
  header: {
    title: string;
    subtitle: string;
  };
  avatars?: boolean;
}>;

export default async function Hero(props: HeroProps) {
  const dictionary = await import(`lib/dictionaries/${props.locale}.json`).then((module) => module.default);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled
    // @ts-expect-error
    <HeroSection
      avatars={props.avatars}
      link={{ href: app(), label: dictionary["Start for free"] }}
      locale={props.locale}
      {...props.header}
    >
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

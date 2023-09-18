import NextImage from "next/image";
import Section from "components/layout/section";
import ContainerCard from "components/layout/container-card";
import LongText from "components/typography/logn-text";
import ButtonBlueFilled from "components/button/button-blue-filled";
import { app } from "lib/utils/url";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";

type PromoBannerProps = {
  locale: string;
  banner: null | {
    text: string;
    title: string;
    media: ImageData;
  };
};

export default async function PromoBanner(props: PromoBannerProps) {
  if (!props.banner) {
    return null;
  }

  const dictionary = await import(`lib/dictionaries/${props.locale}.json`).then((module) => module.default);

  return (
    <Section>
      <ContainerCard className="lg:items-center">
        <div className="w-full lg:w-6/12 lg:pr-7">
          <h2 className="text-xl font-semibold sm:text-2xl md:text-4xl">{props.banner.title}</h2>
          <LongText className="text-md mb-5 mt-4 md:mb-8 md:mt-5 md:text-lg">{props.banner.text}</LongText>
          <ButtonBlueFilled component="a" href={app()}>
            {dictionary["Start for free"]}
          </ButtonBlueFilled>
        </div>
        <div className="mt-5 w-full lg:mt-0 lg:w-6/12 lg:pl-7">
          <NextImage
            alt={props.banner.media.alt}
            className="rounded-md"
            placeholder="blur"
            sizes="(min-width: 1024px) 650px, 100vw"
            src={getStaticImageData(props.banner.media)}
          />
        </div>
      </ContainerCard>
    </Section>
  );
}

import NextImage from "next/image";
import Section from "components/layout/section";
import LongText from "components/typography/logn-text";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
import AboutCard from "components/about/card";

type AboutCompanyProps = {
  text: string;
  info: {
    id: number;
    topic: string;
    title: string;
    description: string;
  }[];
  title: string;
  media: null | ImageData;
  locale: string;
};

export default function AboutCompany(props: AboutCompanyProps) {
  return (
    <Section>
      <div className="container flex flex-col gap-12 xl:flex-row xl:gap-16">
        <div className="xl:w-5/12">
          <h2 className="text-xl font-semibold sm:text-3xl md:text-5xl">{props.title}</h2>
          <div className="text-md mt-6 flex flex-col gap-3">
            <LongText>{props.text}</LongText>
          </div>
        </div>
        {props.media && (
          <div className="flex w-full xl:w-0 xl:grow">
            <NextImage
              alt={props.media.alt}
              className="w-full rounded-md"
              placeholder="blur"
              sizes="(min-width: 1280px) 768px, 100vw"
              src={getStaticImageData(props.media)}
            />
          </div>
        )}
      </div>
      <div className="container flex flex-col gap-5 lg:flex-row">
        {props.info.map((item) => (
          <AboutCard className="lg:grow" key={item.id}>
            <header className="font-medium">
              <p className="text-md md:text-xl">{item.topic}</p>
              <h3 className="mt-2 text-lg sm:text-xl md:text-3xl">{item.title}</h3>
            </header>
            <LongText className="mt-6">{item.description}</LongText>
          </AboutCard>
        ))}
      </div>
    </Section>
  );
}

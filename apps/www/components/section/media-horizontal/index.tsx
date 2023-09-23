import NextImage from "next/image";
import { twMerge } from "tailwind-merge";
import Section from "components/layout/section";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
import RichText from "components/common/rich-text";
import ContainerCard from "components/layout/container-card";
import Action from "./action";

type Page = {
  slug: string | null;
  locale: string;
};

type MediaHorizontalProps = {
  url: string | null;
  page: Page | null;
  legal: Page | null;
  media: ImageData | null;
  label: string;
  locale: string;
  content: string;
  feature: Page | null;
  advantages: {
    id: number;
    title: string;
    subtitle: string;
  }[];
  mediaPosition: "left" | "right";
};

export default function MediaHorizontal(props: MediaHorizontalProps) {
  return (
    <Section>
      <ContainerCard className="grid grid-cols-1 gap-12 xl:grid-cols-2">
        {(props.feature || props.content) && (
          <div className="flex flex-col gap-8">
            {props.content && (
              <RichText className="prose prose-legal md:prose-lg max-w-full text-gray-200 md:text-center xl:text-left">
                {JSON.parse(props.content)}
              </RichText>
            )}
            <Action {...props} />
          </div>
        )}
        {props.media && (
          <NextImage
            alt={props.media.alt}
            className={twMerge(
              "mx-auto rounded-md lg:w-10/12 xl:w-full",
              props.mediaPosition !== "right" && "xl:order-first",
            )}
            placeholder="blur"
            sizes="(min-width: 1024px) 1200px, 100vw"
            src={getStaticImageData(props.media)}
          />
        )}
        <hr className="border-gray-300 xl:col-span-2" />
        <div className="grid grid-cols-1 gap-x-14 gap-y-7 lg:grid-cols-3 xl:col-span-2">
          {props.advantages.map((advantage) => (
            <div className="flex flex-col gap-2" key={advantage.id}>
              <h3 className="font-semibold">{advantage.title}</h3>
              <p className="text-sm font-medium text-gray-200">{advantage.subtitle}</p>
            </div>
          ))}
        </div>
      </ContainerCard>
    </Section>
  );
}

import NextImage from "next/image";
import Section from "components/layout/section";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
import HeaderContainer from "components/layout/header-container";
import RichText from "components/common/rich-text";

type MediaProps = {
  media: ImageData | null;
  locale: string;
  header: {
    title: string;
    subtitle: string;
  };
  content: string;
  mediaPosition: "top" | "bottom";
};

export default function Media(props: MediaProps) {
  return (
    <Section>
      {props.mediaPosition === "top" && props.media && (
        <div className="container">
          <NextImage
            alt={props.media.alt}
            className="mx-auto rounded-md lg:w-10/12"
            placeholder="blur"
            sizes="(min-width: 1024px) 1200px, 100vw"
            src={getStaticImageData(props.media)}
          />
        </div>
      )}
      <HeaderContainer {...props.header} />
      {props.content && <RichText className="container flex flex-col gap-6">{JSON.parse(props.content)}</RichText>}
      {props.mediaPosition === "bottom" && props.media && (
        <div className="container">
          <NextImage
            alt={props.media.alt}
            className="mx-auto rounded-md lg:w-10/12"
            placeholder="blur"
            sizes="(min-width: 1024px) 1200px, 100vw"
            src={getStaticImageData(props.media)}
          />
        </div>
      )}
    </Section>
  );
}

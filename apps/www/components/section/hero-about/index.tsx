import Image from "next/image";
import HeroSection from "components/layout/hero-section";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";

type HeroAboutProps = {
  media: null | ImageData;
  locale: string;
  header: {
    title: string;
    subtitle: string;
  };
};

export default function HeroAbout(props: HeroAboutProps) {
  return (
    <HeroSection {...props.header} locale={props.locale}>
      {props.media && (
        <div className="relative aspect-[21/9] overflow-hidden rounded-md">
          <Image
            alt={props.media.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 1400px, 100vw"
            src={getStaticImageData(props.media)}
          />
        </div>
      )}
    </HeroSection>
  );
}

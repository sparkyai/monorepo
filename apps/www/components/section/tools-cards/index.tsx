import NextImage from "next/image";
import NextLink from "next/link";
import Section from "components/layout/section";
import Carousel from "components/common/carousel";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
import ButtonBlueFilled from "components/button/button-blue-filled";

type ToolsCardsProps = {
  cards: {
    id: number;
    title: string;
    label: string;
    image: ImageData;
    feature: {
      slug: string;
      locale: string;
    };
    description: string;
  }[];
  locale: string;
};

export default function ToolsCards(props: ToolsCardsProps) {
  return (
    <Section>
      <Carousel>
        {props.cards.map((card) => (
          <div className="inline-flex w-96 flex-col rounded-sm border border-gray-400 bg-gray-600 p-5" key={card.id}>
            <NextImage
              alt={card.image.alt}
              className="rounded-xs mb-5 aspect-video bg-blue-200"
              sizes="290px"
              src={getStaticImageData(card.image)}
            />
            <h3 className="mb-3 text-2xl font-bold text-gray-50">{card.title}</h3>
            <p className="mb-6 text-sm text-gray-200">{card.description}</p>
            <ButtonBlueFilled component={NextLink} href={`/${card.feature.locale}/features/${card.feature.slug}`}>
              {card.label}
            </ButtonBlueFilled>
          </div>
        ))}
      </Carousel>
    </Section>
  );
}

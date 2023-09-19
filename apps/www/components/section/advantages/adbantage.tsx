import NextImage from "next/image";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
import LongText from "components/typography/logn-text";

type AdvantageProps = {
  icon: ImageData;
  title: string;
  description: string;
};

export default function Advantage(props: AdvantageProps) {
  return (
    <div className="flex flex-col lg:w-3/12 lg:grow">
      <div className="relative h-10 w-10">
        <NextImage
          alt={props.title}
          className="object-contain"
          fill
          sizes="40px"
          src={getStaticImageData(props.icon)}
        />
      </div>
      <h3 className="text-md mb-3 mt-4 font-medium md:text-xl">{props.title}</h3>
      <LongText className="text-sm">{props.description}</LongText>
    </div>
  );
}

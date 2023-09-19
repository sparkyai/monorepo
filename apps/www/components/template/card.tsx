import NextImage from "next/image";
import { twMerge } from "tailwind-merge";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
import LongText from "components/typography/logn-text";

type TemplateCardProps = {
  name: string;
  icon: ImageData;
  summary: string;
  className?: string;
};

export default function TemplateCard(props: TemplateCardProps) {
  return (
    <div className={twMerge("inline-flex flex-col rounded-sm border border-gray-400 bg-gray-600 p-5", props.className)}>
      <div className="inline-flex w-fit rounded-full bg-gray-500 p-3">
        <div className="relative h-8 w-8">
          <NextImage
            alt={props.name}
            className="object-contain"
            fill
            sizes="32px"
            src={getStaticImageData(props.icon)}
          />
        </div>
      </div>
      <h3 className="text-md my-4 font-semibold">{props.name}</h3>
      <LongText className="text-sm">{props.summary}</LongText>
    </div>
  );
}

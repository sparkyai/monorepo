import { Caveat } from "next/font/google";
import NextImage from "next/image";
import ContainerCard from "components/layout/container-card";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
import RichText from "components/common/rich-text";
import Form from "./form";

const caveat = Caveat({
  weight: "700",
  subsets: ["latin", "cyrillic"],
});

type DetailsProps = {
  title: string;
  review?: {
    author?: {
      name: string;
      avatar: ImageData;
      jobTitle: string;
    };
    message: string;
  };
  template: {
    name: string;
    icon: ImageData;
    locale: string;
    example: string;
    summary: string;
  };
  subtitle: string;
};

export default async function Details(props: DetailsProps) {
  const dictionary = await import(`lib/dictionaries/${props.template.locale}`).then((module) => module.default);

  return (
    <ContainerCard>
      <div className="w-full lg:w-1/2 lg:pr-5">
        <p className="text-md mb-4 font-semibold text-gray-50">{props.subtitle}</p>
        <h3 className="text-md mb-7 font-semibold sm:text-lg md:text-2xl">{props.title}</h3>
        <Form {...props.template} />
      </div>
      <div className="mt-5 flex w-full flex-col lg:mt-0 lg:w-1/2 lg:pl-5">
        <div className="relative my-6 w-full py-4 sm:my-12 lg:mx-auto lg:my-6 lg:w-11/12">
          <span className="absolute z-10 -translate-y-full rounded-full bg-yellow-300 px-6 py-2.5 text-sm font-bold text-gray-900">
            {dictionary["Example of generated text"]}
          </span>
          <div className="absolute inset-0 hidden -skew-y-12 rounded-sm border border-gray-50/10 bg-gray-900/60 sm:block sm:-rotate-3 sm:-skew-y-6 md:-rotate-6 md:-skew-y-2" />
          <div className="absolute inset-0 -skew-y-6 rounded-sm border border-gray-50/10 bg-gray-900/60 sm:-rotate-2 sm:-skew-y-3 md:-rotate-3 md:-skew-y-1" />
          <div className="absolute inset-0 hidden rounded-sm border border-gray-50/10 bg-gray-900/60 sm:block" />
          <RichText className="relative flex flex-col gap-2.5 p-5 text-xs font-light !leading-5 text-gray-50">
            {JSON.parse(props.template.example)}
          </RichText>
        </div>
        {props.review?.author && (
          <>
            <blockquote
              className={`my-5 w-full ${caveat.className} text-md text-right font-bold sm:text-lg md:text-2xl`}
            >
              &ldquo;{props.review.message}&rdquo;
            </blockquote>
            <div className="ml-auto">
              <div className="flex items-center gap-5">
                <NextImage
                  alt={props.review.author.name}
                  className="w-10 rounded-full"
                  placeholder="blur"
                  sizes="40px"
                  src={getStaticImageData(props.review.author.avatar)}
                />
                <div className="flex flex-col">
                  <span className="text-sm">{props.review.author.name}</span>
                  <strong className="mt-1 truncate text-xs font-bold text-gray-50">
                    {props.review.author.jobTitle}
                  </strong>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ContainerCard>
  );
}

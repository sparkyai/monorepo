import NextImage from "next/image";
import { twMerge } from "tailwind-merge";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
import LongText from "components/typography/logn-text";

const EMAIL = /^[\w-.]+@(?:[\w-]+\.)+[\w-]{2,4}$/;

type ContactCardProps = {
  icon: ImageData;
  text: string;
  contact: string;
  className?: string;
};

export default function ContactCard(props: ContactCardProps) {
  const contact = props.contact.trim();
  const type = EMAIL.test(contact) ? "mailto" : "tel";

  return (
    <div className={twMerge("inline-flex flex-col rounded-sm border border-gray-400 bg-gray-600 p-5", props.className)}>
      <div className="inline-flex w-fit rounded-full bg-gray-500 p-3">
        <div className="relative h-8 w-8">
          <NextImage
            alt={props.icon.alt}
            className="object-contain"
            fill
            sizes="32px"
            src={getStaticImageData(props.icon)}
          />
        </div>
      </div>
      <LongText className="text-md mb-4 mt-7 font-semibold sm:text-lg md:text-xl">{props.text}</LongText>
      <a className="mt-auto font-semibold text-blue-300 hover:underline" href={`${type}:${contact}`}>
        {contact}
      </a>
    </div>
  );
}

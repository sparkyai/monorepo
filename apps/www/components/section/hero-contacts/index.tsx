import NextImage from "next/image";
import HeroSection from "components/layout/hero-section";
import type { ImageData } from "lib/data/api";
import { getStaticImageData } from "lib/data/api";
import ContactCard from "./card";
import Form from "./form";

type HeroContactsProps = {
  form: {
    image: ImageData;
  };
  locale: string;
  header: {
    title: string;
    subtitle: string;
  };
  contacts: {
    id: number;
    icon: ImageData;
    text: string;
    contact: string;
    className?: string;
  }[];
};

export default async function HeroContacts(props: HeroContactsProps) {
  const dictionary = await import(`lib/dictionaries/${props.locale}.json`).then((module) => module.default);
  const translation = await import(`./translation/${props.locale}.json`).then((module) => module.default);

  return (
    <HeroSection {...props.header} locale={props.locale}>
      <div className="flex flex-col overflow-hidden rounded-md bg-gray-600 shadow-md lg:flex-row">
        <Form submitLabel={dictionary["Send message"]} translation={translation} />
        <div className="relative aspect-square w-full lg:aspect-auto lg:w-1/2">
          <NextImage
            alt={props.form.image.alt}
            className="object-cover"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 700px, (min-width: 640px) 50vw, 10vw"
            src={getStaticImageData(props.form.image)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 lg:flex-row">
        {props.contacts.map((contact) => (
          <ContactCard className="w-full" key={contact.id} {...contact} />
        ))}
      </div>
    </HeroSection>
  );
}

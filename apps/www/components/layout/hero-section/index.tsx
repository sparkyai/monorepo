import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import LongText from "components/typography/logn-text";
import ButtonBlueFilled from "components/button/button-blue-filled";
import Section from "components/layout/section";
import Freelancer from "./freelancer.webp";
import Marketer from "./marketer.webp";
import Blogger from "./blogger.webp";
import Writer from "./writer.webp";
import User from "./user";

type HeroSectionProps = PropsWithChildren<{
  link?: {
    href: string;
    label: string;
  };
  title: string;
  locale: string;
  subtitle: string;
  avatars?: boolean;
}>;

export default async function HeroSection(props: HeroSectionProps) {
  const { users } = await import(`./translation/${props.locale}.json`);

  return (
    <Section>
      <div className="container flex flex-col gap-14">
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap lg:text-center">
            {props.avatars && <User avatar={Marketer} className="-mb-48" jobTitle={users[0].jobTitle} />}
            <h1
              className={twMerge(
                "mx-auto w-full text-2xl font-semibold sm:text-4xl md:text-6xl md:font-medium xl:w-9/12 2xl:w-8/12",
                props.avatars ? "lg:w-9/12" : "lg:w-11/12 lg:px-4",
              )}
            >
              {props.title}
            </h1>
            {props.avatars && <User avatar={Freelancer} className="-mb-48" jobTitle={users[1].jobTitle} />}
            <LongText className="mt-5 w-full text-lg sm:text-xl md:text-2xl lg:mx-auto lg:w-10/12 xl:w-10/12 2xl:w-9/12">
              {props.subtitle}
            </LongText>
          </div>
          {props.link && (
            <div className="flex items-start lg:justify-around">
              {props.avatars && <User avatar={Writer} className="w-1/12" jobTitle={users[2].jobTitle} />}
              <ButtonBlueFilled component="a" href={props.link.href}>
                {props.link.label}
              </ButtonBlueFilled>
              {props.avatars && <User avatar={Blogger} className="w-1/12" jobTitle={users[3].jobTitle} />}
            </div>
          )}
        </div>
        {props.children}
      </div>
    </Section>
  );
}

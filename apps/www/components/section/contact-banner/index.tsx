import ContainerCard from "components/layout/container-card";
import LongText from "components/typography/logn-text";
import Section from "components/layout/section";
import type { Action } from "./link";
import Link from "./link";

type ContactBannerProps = {
  locale: string;
  banner?: null | {
    action: Action[];
    message: string;
  };
};

export default function ContactBanner(props: ContactBannerProps) {
  if (!props.banner) {
    return null;
  }

  return (
    <Section component="div">
      <ContainerCard className="lg:mx-auto lg:w-10/12">
        <LongText className="w-full text-center text-xl font-semibold sm:text-2xl md:text-3xl">
          {props.banner.message}
        </LongText>
        {props.banner.action.length > 0 && <Link action={props.banner.action[0]} locale={props.locale} />}
      </ContainerCard>
    </Section>
  );
}

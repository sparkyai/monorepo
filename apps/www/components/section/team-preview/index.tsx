import NextLink from "next/link";
import Section from "components/layout/section";
import ContainerCard from "components/layout/container-card";
import LongText from "components/typography/logn-text";
import members from "lib/team/members";
import ButtonBlueFilled from "components/button/button-blue-filled";
import Avatar from "./avatar";

type TeamPreviewProps = {
  page?: null | {
    slug: string;
    locale: string;
  };
  title: string;
  locale: string;
  subtitle: string;
};

export default async function TeamPreview(props: TeamPreviewProps) {
  const dictionary = await import(`lib/dictionaries/${props.locale}.json`).then((module) => module.default);

  return (
    <Section>
      <ContainerCard className="items-center">
        <div className="w-full lg:w-5/12">
          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-end justify-center gap-2">
              <Avatar {...members[props.locale][0]} className="aspect-square w-20 sm:w-32" />
              <Avatar {...members[props.locale][1]} className="aspect-[2/3] w-20 sm:w-32" />
            </div>
            <div className="flex items-start justify-center gap-2">
              <Avatar {...members[props.locale][2]} className="aspect-square w-24 sm:w-40" />
              <Avatar {...members[props.locale][3]} className="aspect-[2/3] w-20 sm:w-32" />
              <Avatar {...members[props.locale][4]} className="aspect-[6/5] w-24 sm:w-40" />
            </div>
          </div>
        </div>
        <div className="mt-14 w-full grow lg:ml-12 lg:mt-0 lg:w-5/12">
          <h2 className="text-xl font-semibold sm:text-3xl md:text-5xl">{props.title}</h2>
          <LongText className="text-md mb-6 mt-4 sm:text-lg md:text-xl">{props.subtitle}</LongText>
          {props.page && (
            <ButtonBlueFilled
              component={NextLink}
              href={`/${props.page.locale}${props.page.slug ? `/${props.page.slug}` : ""}`}
            >
              {dictionary["Read more about us"]}
            </ButtonBlueFilled>
          )}
        </div>
      </ContainerCard>
    </Section>
  );
}

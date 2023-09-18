import Section from "components/layout/section";
import HeaderContainer from "components/layout/header-container";
import AboutContainerCard from "components/about/container-card";
import LongText from "components/typography/logn-text";

type AboutUsInfoProps = {
  info: {
    id: number;
    topic: string;
    title: string;
    description: string;
  }[];
  title: string;
};

export default function AboutUsInfo(props: AboutUsInfoProps) {
  return (
    <Section>
      <HeaderContainer title={props.title} />
      {props.info.map((item, i) => (
        <AboutContainerCard className="sm:items-center" key={item.id} light={i % 2 > 0}>
          <div className="w-full sm:w-5/12 md:w-4/12 lg:w-5/12 2xl:w-4/12">
            <p className="text-md font-medium md:text-xl">{item.topic}</p>
            <h3 className="mt-4 text-xl font-bold sm:text-3xl lg:text-6xl">{item.title}</h3>
          </div>
          <div className="flex w-full flex-col gap-3 font-light sm:w-0 sm:grow xl:ml-auto xl:w-6/12 xl:grow-0 2xl:w-6/12">
            <LongText>{item.description}</LongText>
          </div>
        </AboutContainerCard>
      ))}
    </Section>
  );
}

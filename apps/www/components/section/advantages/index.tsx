import AboutContainerCard from "components/about/container-card";
import Section from "components/layout/section";
import type { ImageData } from "lib/data/api";
import Advantage from "./adbantage";

type AdvantagesProps = {
  title: string;
  advantages: {
    id: number;
    icon: ImageData;
    title: string;
    description: string;
  }[];
};

export default function Advantages(props: AdvantagesProps) {
  return (
    <Section>
      <AboutContainerCard>
        <h2 className="text-xl font-semibold sm:text-3xl md:text-5xl">{props.title}</h2>
        <div className="mt-20 flex w-full flex-wrap gap-10 fill-blue-300">
          {props.advantages.map((advantage) => (
            <Advantage key={advantage.id} {...advantage} />
          ))}
        </div>
      </AboutContainerCard>
    </Section>
  );
}

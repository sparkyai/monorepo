import ContainerCard from "components/layout/container-card";
import RichText from "components/common/rich-text";
import Variants from "./variants";

type DonationProps = {
  info: string;
  locale: string;
  details: string;
  variants: {
    id: number;
    name: string;
    amount: number;
    profit: string;
  }[];
};

export default async function Donation(props: DonationProps) {
  const [translation, dictionary] = await Promise.all([
    import(`./translation/${props.locale}.json`).then((module) => module.default),
    import(`lib/dictionaries/${props.locale}.json`).then((module) => module.default),
  ]);

  const variants = props.variants.map((variant) => ({
    ...variant,
    profit: {
      label: dictionary["What will you get"],
      content: variant.profit.split(/\n+/).map((text, i) => ({
        id: i,
        text,
      })),
    },
  }));

  return (
    <ContainerCard className="gap-4 md:gap-8">
      <div className="flex w-full flex-col gap-4 md:w-7/12 md:justify-between md:gap-8">
        <div className="rounded-xs flex flex-col gap-4 bg-gradient-to-r from-[#6F5AFF]/30 via-[#C135FF]/30 to-[#FF3797]/30 px-5 py-6 xl:pr-12">
          <h2 className="text-xl font-semibold">{dictionary["Sparky Web Application Development Plan"]}</h2>
          <RichText>{JSON.parse(props.details)}</RichText>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold">{dictionary.Legend}</h3>
          <p>{props.info}</p>
        </div>
      </div>
      <Variants translation={translation} variants={variants} />
    </ContainerCard>
  );
}

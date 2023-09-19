import HeroSection from "components/layout/hero-section";
import PricingBoard from "components/pricing/board";

type HeroPricingProps = {
  locale: string;
  header: {
    title: string;
    subtitle: string;
  };
  models: {
    id: number;
    name: string;
    tooltip: {
      title: string;
      speed: number;
      reasoning: number;
      conciseness: number;
      description: string;
    };
  }[];
  products: {
    id: number;
    users: number;
    prices: Record<string, number> &
      {
        model: {
          id: number;
        };
      }[];
    credits: number;
  }[];
};

export default function HeroPricing(props: HeroPricingProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled
    // @ts-expect-error
    <HeroSection {...props.header} locale={props.locale}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled */}
      {/* @ts-expect-error */}
      <PricingBoard locale={props.locale} models={props.models} products={props.products} />
    </HeroSection>
  );
}

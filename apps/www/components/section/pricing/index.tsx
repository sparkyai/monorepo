import Section from "components/layout/section";
import HeaderContainer from "components/layout/header-container";
import PricingBoard from "components/pricing/board";

type PricingProps = {
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

export default function Pricing(props: PricingProps) {
  return (
    <Section>
      <HeaderContainer {...props.header} />
      {props.models.length > 0 && props.products.length > 0 && (
        <div className="container">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled */}
          {/* @ts-expect-error */}
          <PricingBoard locale={props.locale} models={props.models} products={props.products} />
        </div>
      )}
    </Section>
  );
}

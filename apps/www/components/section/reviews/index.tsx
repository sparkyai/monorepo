import HeaderContainer from "components/layout/header-container";
import Section from "components/layout/section";
import CardCarousel from "./card-carousel";

type ReviewsProps = {
  header: {
    title: string;
    subtitle: string;
  };
};

export default function Reviews(props: ReviewsProps) {
  return (
    <Section>
      <HeaderContainer {...props.header} />
      <CardCarousel />
    </Section>
  );
}

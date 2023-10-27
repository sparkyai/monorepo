import HeaderContainer from "components/layout/header-container";
import Section from "components/layout/section";

type ParagraphProps = {
  text: string;
  title: string;
};

export default function Paragraph(props: ParagraphProps) {
  return (
    <Section>
      <HeaderContainer subtitle={props.text} title={props.title} />
    </Section>
  );
}

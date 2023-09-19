import Section from "components/layout/section";
import HeaderContainer from "components/layout/header-container";
import TemplateCard from "components/template/card";
import type { ImageData } from "lib/data/api";

type AboutCategoryProps = {
  locale: string;
  header: {
    title: string;
    subtitle: string;
  };
  templates: {
    id: number;
    name: string;
    icon: ImageData;
    summary: string;
  }[];
};

export default function AboutCategory(props: AboutCategoryProps) {
  const space = Array(props.templates.length % 4)
    .fill(0)
    .map((_, i) => i);

  return (
    <Section>
      <HeaderContainer {...props.header} />
      <div className="container flex flex-wrap justify-center gap-5">
        {props.templates.map((template) => (
          <TemplateCard className="w-72 sm:w-80" key={template.id} {...template} />
        ))}
        {space.map((id) => (
          <div className="hidden w-80 md:block" key={id} />
        ))}
      </div>
    </Section>
  );
}

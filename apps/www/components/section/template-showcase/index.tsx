import HeaderContainer from "components/layout/header-container";
import Section from "components/layout/section";
import type { ImageData } from "lib/data/api";
import reviews from "./reviews";
import Group from "./group";

type TemplateShowcaseProps = {
  locale: string;
  header: {
    title: string;
    subtitle: string;
  };
  categories: {
    id: number;
    title: string;
    primary: {
      name: string;
      icon: ImageData;
      locale: string;
      example: string;
      summary: string;
    };
    category: unknown;
    subtitle: string;
    templates: {
      id: number;
      name: string;
      icon: ImageData;
      summary: string;
    }[];
  }[];
};

export default async function TemplateShowcase(props: TemplateShowcaseProps) {
  return (
    <Section>
      <HeaderContainer {...props.header} />
      {props.categories.map((category, i) => (
        <Group key={category.id} {...category} review={reviews[props.locale][i % reviews[props.locale].length]} />
      ))}
    </Section>
  );
}

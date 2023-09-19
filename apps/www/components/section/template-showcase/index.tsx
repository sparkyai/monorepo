import HeaderContainer from "components/layout/header-container";
import Section from "components/layout/section";
import type { ImageData } from "lib/data/api";
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
    category: {
      review?: {
        author?: {
          name: string;
          avatar: ImageData;
          jobTitle: string;
        };
        message: string;
      };
    };
    subtitle: string;
    templates: {
      id: number;
      name: string;
      icon: ImageData;
      summary: string;
    }[];
    showCategoryReview?: boolean;
  }[];
};

export default async function TemplateShowcase(props: TemplateShowcaseProps) {
  return (
    <Section>
      <HeaderContainer {...props.header} />
      {props.categories.map((category) => (
        <Group
          key={category.id}
          {...category}
          review={category.showCategoryReview ? category.category.review : void 0}
        />
      ))}
    </Section>
  );
}

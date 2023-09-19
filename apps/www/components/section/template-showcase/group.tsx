import Details from "components/section/template-showcase/details";
import type { ImageData } from "lib/data/api";
import Carousel from "components/common/carousel";
import TemplateCard from "components/template/card";

type GroupProps = {
  title: string;
  review?: {
    author?: {
      name: string;
      avatar: ImageData;
      jobTitle: string;
    };
    message: string;
  };
  primary?: {
    name: string;
    icon: ImageData;
    locale: string;
    example: string;
    summary: string;
  };
  subtitle: string;
  templates: {
    id: number;
    name: string;
    icon: ImageData;
    summary: string;
  }[];
};

export default function Group(props: GroupProps) {
  if (!props.primary) {
    return null;
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment -- controlled */}
      {/* @ts-expect-error */}
      <Details review={props.review} subtitle={props.subtitle} template={props.primary} title={props.title} />
      {Boolean(props.templates.length) && (
        <Carousel>
          {props.templates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </Carousel>
      )}
    </>
  );
}

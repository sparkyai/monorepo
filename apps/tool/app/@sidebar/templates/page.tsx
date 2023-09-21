import prisma from "@lib/utils/prisma";
import CreateTemplate from "./create";
import TemplateLink from "./link";
import Category from "./category";

type TemplatesSidebarProps = {
  searchParams: {
    search?: string;
  };
};

export default async function TemplatesSidebar(props: TemplatesSidebarProps) {
  const [categories, templates] = await Promise.all([
    prisma.category.findMany({
      select: {
        id: true,
        name: true,
        templates: {
          where: props.searchParams.search
            ? {
                name: {
                  mode: "insensitive",
                  contains: props.searchParams.search,
                },
              }
            : void 0,
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.template.findMany({
      where: {
        name: props.searchParams.search
          ? {
              mode: "insensitive",
              contains: props.searchParams.search,
            }
          : void 0,
        category: {
          is: null,
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return (
    <>
      <div className="mr-4 box-content flex w-80 grow flex-col gap-3 overflow-y-auto px-4">
        {categories.map((category) => (
          <Category key={category.id} {...category}>
            {category.templates.map((template) => (
              <TemplateLink key={template.id} {...template} />
            ))}
          </Category>
        ))}
        {Boolean(templates.length) && <hr className="mr-4" />}
        {templates.map((template) => (
          <TemplateLink key={template.id} {...template} />
        ))}
      </div>
      <CreateTemplate />
    </>
  );
}

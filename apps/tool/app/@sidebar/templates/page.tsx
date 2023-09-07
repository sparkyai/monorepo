import prisma from "@lib/utils/prisma";
import TemplateLink from "./link";
import CreateTemplate from "./create";

export default async function TemplatesSidebar() {
  const templates = await prisma.template.findMany({
    select: {
      id: true,
      name: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <div className="box-content flex w-80 grow flex-col gap-3 overflow-y-auto px-4">
        {templates.map((template) => (
          <TemplateLink key={template.id} {...template} />
        ))}
      </div>
      <CreateTemplate />
    </>
  );
}

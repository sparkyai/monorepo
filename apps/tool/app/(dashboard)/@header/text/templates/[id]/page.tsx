import { notFound } from "next/navigation";
import prisma from "@lib/utils/prisma";
import Back from "@app/(dashboard)/@header/back";
import { getLanguageCollection } from "@lib/data/language";
import { getObjectUrl } from "@lib/utils/s3";
import UpdateTemplate from "./update";

type TemplateHeaderProps = {
  params: {
    id: string;
  };
};

export default async function TemplateHeader(props: TemplateHeaderProps) {
  const [template, categories, languages] = await Promise.all([
    prisma.text_templates.findUnique({
      where: { id: Number(props.params.id) },
      select: {
        id: true,
        name: true,
        poster: {
          select: {
            mime: true,
            width: true,
            height: true,
            s3_key: true,
          },
        },
        category: {
          select: {
            id: true,
          },
        },
        language: {
          select: {
            code: true,
          },
        },
        description: true,
      },
    }),
    prisma.text_categories.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { id: "desc" },
    }),
    getLanguageCollection(),
  ]);

  if (!template) {
    notFound();
  }

  const update = {
    ...template,
    poster: template.poster ? getObjectUrl(template.poster.s3_key) : null,
  };

  return (
    <>
      <Back />
      <h1 className="max-w-xs truncate text-3xl font-medium tracking-wide">{template.name}</h1>
      <UpdateTemplate categories={categories} languages={languages} template={update} />
    </>
  );
}

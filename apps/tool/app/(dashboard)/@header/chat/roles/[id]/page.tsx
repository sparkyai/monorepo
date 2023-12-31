import { notFound } from "next/navigation";
import prisma from "@lib/utils/prisma";
import Back from "@app/(dashboard)/@header/back";
import { getLanguageCollection } from "@lib/data/language";
import { getObjectUrl } from "@lib/utils/s3";
import UpdateRole from "./update";

type RoleHeaderProps = {
  params: {
    id: string;
  };
};

export default async function RoleHeader(props: RoleHeaderProps) {
  const [role, categories, languages] = await Promise.all([
    prisma.chat_roles.findUnique({
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
    prisma.chat_categories.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { id: "desc" },
    }),
    getLanguageCollection(),
  ]);

  if (!role) {
    notFound();
  }

  const update = {
    ...role,
    poster: role.poster ? getObjectUrl(role.poster.s3_key) : null,
  };

  return (
    <>
      <Back />
      <h1 className="max-w-xs truncate text-3xl font-medium tracking-wide">{role.name}</h1>
      <UpdateRole categories={categories} languages={languages} role={update} />
    </>
  );
}

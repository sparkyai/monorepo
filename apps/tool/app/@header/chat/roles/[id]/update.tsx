"use client";

import { useState, useTransition } from "react";
import type { TypeOf } from "zod";
import { useRouter, usePathname } from "next/navigation";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { LanguageSchema, ImageSchema } from "@lib/utils/schema";
import { updateChatRole } from "@lib/actions/chat/role";
import Edit from "@components/icon/edit";
import Poster from "@components/common/poster";
import FileField from "@components/form/file-field";
import { upload } from "@lib/actions/s3";

type UpdateRoleProps = {
  role: {
    id: number;
    name: string;
    poster: null | string;
    category: {
      id: number;
    };
    language: {
      code: string;
    };
    description: null | string;
  };
  languages: TypeOf<typeof LanguageSchema>[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function UpdateRole(props: UpdateRoleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState(props.role.name);
  const [file, setFile] = useState<null | File>(null);
  const [poster, setPoster] = useState(props.role.poster);
  const [category, setCategory] = useState(props.role.category.id.toString());
  const [language, setLanguage] = useState(props.role.language.code);
  const [description, setDescription] = useState(props.role.description || "");

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
        onClick={onOpen}
        type="button"
      >
        <Edit size={16} />
      </button>
      <Dialog
        canUpdate={Boolean(
          file ||
            poster !== props.role.poster ||
            name.trim() !== props.role.name ||
            language !== props.role.language.code ||
            description.trim() !== props.role.description ||
            category !== props.role.category.id.toString(),
        )}
        className="max-w-lg grid-cols-2 gap-2"
        onClose={onClose}
        onUpdate={onUpdate}
        open={isOpen}
        title="Update Role"
      >
        <FieldGroup className="col-span-full" label="Name">
          <TextField onChange={setName} value={name} />
        </FieldGroup>
        <FieldGroup label="Category">
          <SelectField
            onChange={setCategory}
            options={props.categories.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            value={category}
          />
        </FieldGroup>
        <FieldGroup label="Language">
          <SelectField
            onChange={setLanguage}
            options={props.languages.map((item) => ({
              label: item.name,
              value: item.code,
            }))}
            value={language}
          />
        </FieldGroup>
        <FieldGroup className="col-span-2" label="Poster">
          <Poster file={file as never} onDelete={onDeletePoster} poster={poster} />
          <FileField accept="image/*" onChange={setFile} value={file} />
        </FieldGroup>
        <FieldGroup className="col-span-2" label="Description">
          <TextField onChange={setDescription} rows={7} value={description} />
        </FieldGroup>
        {isPending && <Loader className="absolute inset-0 bg-slate-950/60" />}
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);

    setFile(null);
    setName(props.role.name);
    setPoster(props.role.poster);
    setCategory(props.role.category.id.toString());
    setLanguage(props.role.language.code);
    setDescription(props.role.description || "");
  }

  function onDeletePoster() {
    setFile(null);
    setPoster(null);
  }

  function onUpdate() {
    startTransition(async () => {
      let posterData: TypeOf<typeof ImageSchema> | undefined | null = void 0;

      if (file) {
        const posterFile = file as File & { width: number; height: number };
        const data = new FormData();
        data.append("file", file);

        posterData = {
          mime: posterFile.type,
          width: posterFile.width,
          height: posterFile.height,
          s3_key: await upload(data),
        };
      } else if (!poster) {
        posterData = null;
      }

      const response = await updateChatRole(props.role.id, {
        name: name.trim(),
        poster: posterData,
        category: Number(category),
        language,
        description: description.trim(),
      });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.refresh();
      router.push(pathname);
      setIsOpen(false);
    });
  }
}

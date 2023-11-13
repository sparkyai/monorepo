"use client";

import { useState, useTransition } from "react";
import type { TypeOf } from "zod";
import { useRouter, usePathname } from "next/navigation";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { LanguageSchema } from "@lib/utils/schema";
import { updateTextTemplate } from "@lib/actions/text/template";
import Edit from "@components/icon/edit";

type UpdateTemplateProps = {
  template: {
    id: number;
    name: string;
    poster: null | {
      mime: string;
      width: number;
      height: number;
      pathname: string;
    };
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

export default function UpdateTemplate(props: UpdateTemplateProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState(props.template.name);
  // const [poster, setPoster] = useState();
  const [category, setCategory] = useState(props.template.category.id.toString());
  const [language, setLanguage] = useState(props.template.language.code);
  const [description, setDescription] = useState(props.template.description || "");

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
          name.trim() !== props.template.name ||
            language !== props.template.language.code ||
            description.trim() !== props.template.description ||
            category !== props.template.category.id.toString(),
        )}
        className="max-w-lg grid-cols-2 gap-2"
        onClose={onClose}
        onUpdate={onUpdate}
        open={isOpen}
        title="Update Template"
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
        {/*<FieldGroup className="col-span-2" label="Poster">*/}
        {/*  <ImageField className="aspect-video" onChange={setPoster} value={poster} />*/}
        {/*</FieldGroup>*/}
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

    setName(props.template.name);
    // setPoster();
    setCategory(props.template.category.id.toString());
    setLanguage(props.template.language.code);
    setDescription(props.template.description || "");
  }

  function onUpdate() {
    startTransition(async () => {
      const response = await updateTextTemplate(props.template.id, {
        name: name.trim(),
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

"use client";

import { useState, useTransition } from "react";
import type { TypeOf } from "zod";
import { useRouter, usePathname } from "next/navigation";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import ButtonPrimary from "@components/button/button-primary";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { LanguageSchema } from "@lib/utils/schema";
import { createChatRole } from "@lib/actions/chat/role";

type CreateRoleProps = {
  languages: TypeOf<typeof LanguageSchema>[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function CreateRole(props: CreateRoleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState("");
  // const [poster, setPoster] = useState();
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <ButtonPrimary className="ml-auto truncate" onClick={onOpen}>
        Create Role
      </ButtonPrimary>
      <Dialog
        canCreate={Boolean(name && category && language)}
        className="max-w-lg grid-cols-2 gap-2"
        onClose={onClose}
        onCreate={onCreate}
        open={isOpen}
        title="Create Role"
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
  }

  function onCreate() {
    startTransition(async () => {
      const response = await createChatRole({ name: name.trim(), category: Number(category), language, description });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.refresh();
      router.push(`${pathname}/${response.data.id}`);
      onClose();
    });
  }
}

"use client";

import { useState, useTransition } from "react";
import type { TypeOf } from "zod";
import { useRouter, usePathname } from "next/navigation";
import Dialog from "@components/common/dialog";
import { createChatCategory } from "@lib/actions/chat/category";
import Loader from "@components/common/loader";
import ButtonPrimary from "@components/button/button-primary";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { LanguageSchema } from "@lib/utils/schema";

type CreateCategoryProps = {
  languages: TypeOf<typeof LanguageSchema>[];
};

export default function CreateCategory(props: CreateCategoryProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <>
      <ButtonPrimary className="ml-auto truncate" onClick={onOpen}>
        Create Category
      </ButtonPrimary>
      <Dialog
        canCreate={Boolean(language && name)}
        className="gap-2"
        onClose={onClose}
        onCreate={onCreate}
        open={isOpen}
        title="Create Category"
      >
        <FieldGroup className="col-span-full" label="Name">
          <TextField onChange={setName} value={name} />
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
      const response = await createChatCategory({ name: name.trim(), language });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.replace(pathname);
      onClose();
    });
  }
}

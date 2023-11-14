"use client";

import { useState, useTransition } from "react";
import type { TypeOf } from "zod";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { LanguageSchema } from "@lib/utils/schema";
import Edit from "@components/icon/edit";
import IconButtonSuccess from "@components/button/icon-button-success";
import { updateTextCategory } from "@lib/actions/text/category";

type UpdateCategoryProps = {
  category: {
    id: number;
    name: string;
    language: TypeOf<typeof LanguageSchema>;
  };
  languages: TypeOf<typeof LanguageSchema>[];
};

export default function UpdateCategory(props: UpdateCategoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(props.category.name);
  const [language, setLanguage] = useState(props.category.language.code);

  return (
    <>
      <IconButtonSuccess className="-my-1.5" onClick={onOpen}>
        <Edit size={16} />
      </IconButtonSuccess>
      <Dialog
        canUpdate={Boolean(language !== props.category.language.code || name.trim() !== props.category.name)}
        className="gap-2"
        onClose={onClose}
        onUpdate={onUpdate}
        open={isOpen}
        title="Update Category"
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

    setName(props.category.name);
    setLanguage(props.category.language.code);
  }

  function onUpdate() {
    startTransition(async () => {
      const response = await updateTextCategory(props.category.id, { name: name.trim(), language });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.replace([pathname, searchParams.toString()].filter(Boolean).join("?"));
      setIsOpen(false);
    });
  }
}

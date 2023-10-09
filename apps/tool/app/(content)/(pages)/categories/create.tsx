"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonPrimary from "@components/button/button-primary";
import TextField from "@components/form/text-field";
import FieldGroup from "@components/form/field-group";
import SelectField from "@components/form/select-field";
import Dialog from "@components/common/dialog";
import { createCategory } from "@lib/actions/category";

type CreateCategoryProps = {
  languages: {
    id: number;
    name: string;
  }[];
};

export default function CreateCategory(props: CreateCategoryProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("");

  return (
    <>
      <ButtonPrimary className="ml-auto" onClick={onOpen}>
        New Category
      </ButtonPrimary>
      <Dialog
        footer={
          <ButtonPrimary className="ml-auto" disabled={!name || !language} onClick={onCreate}>
            Create
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        title="Create category"
      >
        <FieldGroup label="Name">
          <TextField onChange={setName} value={name} />
        </FieldGroup>
        <FieldGroup label="Language">
          <SelectField
            onChange={setLanguage}
            options={props.languages.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            value={language}
          />
        </FieldGroup>
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);

    setName("");
    setLanguage("");
  }

  function onCreate() {
    void createCategory(name, parseInt(language)).then(() => {
      router.refresh();
      onClose();
    });
  }
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonPrimary from "@components/button/button-primary";
import TextField from "@components/form/text-field";
import FieldGroup from "@components/form/field-group";
import SelectField from "@components/form/select-field";
import { createTemplate } from "@lib/actions/template";
import Dialog from "@components/common/dialog";

type CreateTemplateProps = {
  languages: {
    id: number;
    name: string;
    code: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function CreateTemplate(props: CreateTemplateProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");

  return (
    <>
      <ButtonPrimary className="ml-auto" onClick={onOpen}>
        New Template
      </ButtonPrimary>
      <Dialog
        footer={
          <ButtonPrimary className="ml-auto" disabled={!name || !language || !category} onClick={onCreate}>
            Create
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        title="Create template"
      >
        <FieldGroup label="Name">
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
    setCategory("");
  }

  function onCreate() {
    void createTemplate(name, parseInt(category), parseInt(language)).then((template) => {
      router.refresh();
      router.push(`/templates/${template.id}`);

      onClose();
    });
  }
}

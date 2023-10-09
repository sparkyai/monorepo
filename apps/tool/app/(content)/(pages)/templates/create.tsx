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
  const [categoryQuery, setCategoryQuery] = useState("");

  return (
    <>
      <ButtonPrimary className="ml-auto" onClick={onOpen}>
        New Template
      </ButtonPrimary>
      <Dialog
        footer={
          <ButtonPrimary className="ml-auto" disabled={!name || !language || !categoryQuery.trim()} onClick={onCreate}>
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
            onInput={setCategoryQuery}
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
    setCategoryQuery("");
  }

  function onCreate() {
    let newCategory: null | string | number = categoryQuery.trim();

    if (category) {
      const categoryItem = props.categories.find((item) => item.id.toString() === category);

      if (categoryItem && newCategory.toLowerCase() === categoryItem.name.toLowerCase()) {
        newCategory = categoryItem.id;
      }
    }

    void createTemplate(name, newCategory, parseInt(language)).then((template) => {
      router.refresh();
      router.push(`/templates/${template.id}`);

      onClose();
    });
  }
}

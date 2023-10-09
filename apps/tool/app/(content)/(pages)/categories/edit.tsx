"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import { updateCategory } from "@lib/actions/category";
import Edit from "@components/icon/edit";

type EditCategoryProps = {
  category: {
    id: number;
    name: string;
    language: {
      id: number;
    };
  };
  languages: {
    id: number;
    name: string;
  }[];
};

export default function EditCategory(props: EditCategoryProps) {
  const router = useRouter();

  const [name, setName] = useState(props.category.name);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(props.category.language.id.toString());

  useEffect(() => {
    setName(props.category.name);
    setLanguage(props.category.language.id.toString());
  }, [props.category]);

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
        footer={
          <ButtonPrimary className="ml-auto" disabled={!name || !language} onClick={onCreate}>
            Save
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        title="Update category"
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
  }

  function onCreate() {
    void updateCategory(props.category.id, name, parseInt(language)).then(() => {
      router.refresh();
      onClose();
    });
  }
}

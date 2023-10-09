"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Edit from "@components/icon/edit";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import ButtonPrimary from "@components/button/button-primary";
import { updateTemplate } from "@lib/actions/template";
import FieldGroup from "@components/form/field-group";
import Dialog from "@components/common/dialog";

type TemplateEditorProps = {
  template: {
    id: number;
    name: string;
    language: {
      id: number;
    };
    category: {
      id: number;
      name: string;
    };
  };
  languages: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function TemplateEditor(props: TemplateEditorProps) {
  const router = useRouter();

  const [name, setName] = useState(props.template.name);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(props.template.language.id.toString());
  const [category, setCategory] = useState(props.template.category.id.toString());

  useEffect(() => {
    setName(props.template.name);
    setLanguage(props.template.language.id.toString());
    setCategory(props.template.category.id.toString() || "");
  }, [props]);

  return (
    <>
      <button
        className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
      >
        <Edit size={16} />
      </button>
      <Dialog
        footer={
          <ButtonPrimary
            className="ml-auto"
            disabled={
              name === props.template.name &&
              (!category || category === props.template.category.id.toString()) &&
              (!language || language === props.template.language.id.toString())
            }
            onClick={onUpdate}
          >
            Save
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        title="Edit template"
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

  function onUpdate() {
    void updateTemplate(props.template.id, { name, category: parseInt(category), language: parseInt(language) }).then(
      () => {
        router.refresh();
        onClose();
      },
    );
  }

  function onClose() {
    setIsOpen(false);
  }
}

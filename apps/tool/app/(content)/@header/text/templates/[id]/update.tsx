"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import Edit from "@components/icon/edit";
import Loader from "@components/common/loader";
import { updateTextTemplate } from "@lib/actions/text";

type UpdateDialogProps = {
  template: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
    language: {
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

export default function UpdateDialog(props: UpdateDialogProps) {
  const router = useRouter();

  const [name, setName] = useState(props.template.name);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(props.template.category.id.toString());
  const [language, setLanguage] = useState(props.template.language.id.toString());
  const [isLoading, setIsLoading] = useState(false);
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
        footer={
          <ButtonPrimary
            className="ml-auto"
            disabled={
              name.trim() === props.template.name &&
              category === props.template.category.id.toString() &&
              language === props.template.language.id.toString()
            }
            onClick={onUpdate}
          >
            Update
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        title="Update role"
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
      {(isLoading || isPending) && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/75">
          <Loader className="m-auto" />
        </div>
      )}
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function onUpdate() {
    const data = {
      name,
      category: parseInt(category),
      language: parseInt(language),
    };

    setIsLoading(true);

    void updateTextTemplate(props.template.id, data).then(() => {
      setIsLoading(false);
      onClose();

      startTransition(() => {
        router.refresh();
      });
    });
  }
}

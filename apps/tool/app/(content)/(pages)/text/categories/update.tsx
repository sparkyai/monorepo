"use client";

import { useState, useEffect } from "react";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import Edit from "@components/icon/edit";
import type { ChatCategory } from "@lib/actions/chat";

type UpdateDialogProps = {
  category: {
    id: number;
    name: string;
    language: {
      id: number;
    };
  };
  onUpdate: (data: Partial<ChatCategory>) => void;
  languages: {
    id: number;
    name: string;
  }[];
};

export default function UpdateDialog(props: UpdateDialogProps) {
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
          <ButtonPrimary
            className="ml-auto"
            disabled={
              (!name.trim() || name.trim() === props.category.name) &&
              (!language || language === props.category.language.id.toString())
            }
            onClick={onUpdate}
          >
            Update
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        title="Update category"
      >
        <FieldGroup className="col-span-2" label="Name">
          <TextField onChange={setName} value={name} />
        </FieldGroup>
        <FieldGroup className="col-span-2" label="Language">
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

    setName(props.category.name);
    setLanguage(props.category.language.id.toString());
  }

  function onUpdate() {
    props.onUpdate({
      name,
      language: parseInt(language),
    });

    onClose();
  }
}

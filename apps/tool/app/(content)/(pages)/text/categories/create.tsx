"use client";

import { useState } from "react";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { ChatCategory } from "@lib/actions/chat";

type CreateDialogProps = {
  onCreate: (data: ChatCategory) => void;
  languages: {
    id: number;
    name: string;
  }[];
};

export default function CreateDialog(props: CreateDialogProps) {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("");

  return (
    <>
      <ButtonPrimary className="ml-auto truncate" onClick={onOpen}>
        New Category
      </ButtonPrimary>
      <Dialog
        footer={
          <ButtonPrimary className="ml-auto truncate" disabled={!name.trim() || !language} onClick={onCreate}>
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
    props.onCreate({
      name,
      language: parseInt(language),
    });

    onClose();
  }
}

"use client";

import { useState, useEffect } from "react";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { ImageTemplate } from "@lib/actions/image";

type CreateDialogProps = {
  leonardo: {
    id: string;
    name: string;
  }[];
  onCreate: (data: ImageTemplate) => void;
  languages: {
    id: number;
    name: string;
  }[];
};

export default function CreateDialog(props: CreateDialogProps) {
  const [name, setName] = useState("");
  const [model, setModel] = useState<null | string>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setModel(["Leonardo"].includes(provider) ? "" : null);
  }, [provider]);

  return (
    <>
      <ButtonPrimary className="ml-auto truncate" onClick={onOpen}>
        New Template
      </ButtonPrimary>
      <Dialog
        footer={
          <ButtonPrimary
            className="ml-auto"
            disabled={!name.trim() || !language || !provider || model === ""}
            onClick={onCreate}
          >
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
        <FieldGroup label="Provider">
          <SelectField onChange={setProvider} options={["DALL·E", "Leonardo"]} value={provider} />
        </FieldGroup>
        {provider === "Leonardo" && typeof model === "string" && (
          <FieldGroup label="Model">
            <SelectField
              onChange={setModel}
              options={props.leonardo.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              value={model}
            />
          </FieldGroup>
        )}
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);

    setName("");
    setModel(null);
    setProvider("");
    setLanguage("");
  }

  function onCreate() {
    props.onCreate({
      name,
      model,
      provider,
      language: parseInt(language),
    });

    onClose();
  }
}

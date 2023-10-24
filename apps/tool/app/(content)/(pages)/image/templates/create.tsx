"use client";

import { useState, useEffect } from "react";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { ImageTemplate } from "@lib/actions/image";
import ImageField from "@components/form/image-field";
import usePoster from "@lib/hooks/use-poster";

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
  const [poster, setPoster, resetPoster] = usePoster();
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");

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
        size="lg"
        title="Create template"
      >
        <FieldGroup className="col-span-1" label="Name">
          <TextField onChange={setName} value={name} />
        </FieldGroup>
        <FieldGroup className="col-span-1" label="Language">
          <SelectField
            onChange={setLanguage}
            options={props.languages.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            value={language}
          />
        </FieldGroup>
        <FieldGroup className="col-span-1" label="Provider">
          <SelectField onChange={setProvider} options={["DALL·E", "Leonardo"]} value={provider} />
        </FieldGroup>
        {provider === "Leonardo" && typeof model === "string" && (
          <FieldGroup className="col-span-1" label="Model">
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
        <FieldGroup className="col-span-2" label="Poster">
          <ImageField className="aspect-video" onChange={setPoster} value={poster} />
        </FieldGroup>
        <FieldGroup className="col-span-2" label="Description">
          <TextField onChange={setDescription} rows={7} value={description} />
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
    setModel(null);
    resetPoster();
    setProvider("");
    setLanguage("");
    setDescription("");
  }

  function onCreate() {
    props.onCreate({
      name,
      model,
      poster,
      provider,
      language: parseInt(language),
      description,
    });

    onClose();
  }
}

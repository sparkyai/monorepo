"use client";

import { useState } from "react";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import Edit from "@components/icon/edit";
import type { ImageTemplate } from "@lib/actions/image";
import ImageField from "@components/form/image-field";
import usePoster from "@lib/hooks/use-poster";

type UpdateDialogProps = {
  leonardo: {
    id: string;
    name: string;
  }[];
  template: {
    id: number;
    name: string;
    model: null | string;
    poster: null | {
      url: string;
    };
    provider: string;
    language: {
      id: number;
    };
    description: null | string;
  };
  onUpdate: (data: Partial<ImageTemplate>) => void;
  languages: {
    id: number;
    name: string;
  }[];
};

export default function UpdateDialog(props: UpdateDialogProps) {
  const [name, setName] = useState(props.template.name);
  const [model, setModel] = useState(props.template.model);
  const [poster, setPoster, resetPoster] = usePoster(props.template.poster?.url);
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState(props.template.provider);
  const [language, setLanguage] = useState(props.template.language.id.toString());
  const [description, setDescription] = useState(props.template.description || "");

  // useEffect(() => {
  //   setModel(["Leonardo"].includes(provider) ? "" : null);
  // }, [provider]);

  // useEffect(() => {
  //   setModel(["Leonardo"].includes(props.template.provider) ? "" : null);
  // }, [props.template.provider]);

  // useEffect(() => {
  //   setName(props.template.name);
  //   setModel(props.template.model);
  //   setProvider(props.template.provider);
  //   setLanguage(props.template.language.id.toString());
  // }, [props.template]);

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
              (!name.trim() || name.trim() === props.template.name) &&
              (model === "" || model === props.template.model) &&
              (typeof poster !== typeof props.template.poster || poster?.name === props.template.poster?.url) &&
              (!provider || provider === props.template.provider || model === "") &&
              (!language || language === props.template.language.id.toString()) &&
              (!description.trim() || description.trim() === props.template.description)
            }
            onClick={onUpdate}
          >
            Update
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        size="lg"
        title="Update template"
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
          <SelectField
            onChange={(value) => {
              setProvider(value);
              setModel(["Leonardo"].includes(value) ? "" : null);
            }}
            options={["DALL·E", "Leonardo"]}
            value={provider}
          />
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

    setName(props.template.name);
    setModel(props.template.model);
    resetPoster();
    setProvider(props.template.provider);
    setLanguage(props.template.language.id.toString());
    setDescription(props.template.description || "");
  }

  function onUpdate() {
    props.onUpdate({
      name,
      model,
      poster,
      provider,
      language: parseInt(language),
      description,
    });

    setIsOpen(false);
  }
}

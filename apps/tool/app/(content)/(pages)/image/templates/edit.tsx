"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditIcon from "@components/icon/edit";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import { updateImageTemplate } from "@lib/actions/template";

type EditProps = {
  leonardo: {
    id: string;
    name: string;
  }[];
  template: {
    id: number;
    name: string;
    model: null | string;
    provider: string;
    language: {
      id: number;
      name: string;
    };
  };
  languages: {
    id: number;
    name: string;
  }[];
};

export default function Edit(props: EditProps) {
  const router = useRouter();

  const [name, setName] = useState(props.template.name);
  const [model, setModel] = useState(props.template.model);
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState(props.template.provider);
  const [language, setLanguage] = useState(props.template.language.id.toString());

  useEffect(() => {
    setModel(["Leonardo"].includes(provider) ? "" : null);
  }, [provider]);

  useEffect(() => {
    setName(props.template.name);
    setModel(props.template.model);
    setProvider(props.template.provider);
    setLanguage(props.template.language.id.toString());
  }, [props.template]);

  return (
    <>
      <button
        className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
        onClick={onOpen}
        type="button"
      >
        <EditIcon size={16} />
      </button>
      <Dialog
        footer={
          <ButtonPrimary
            className="ml-auto"
            disabled={
              !name ||
              !language ||
              !provider ||
              model === "" ||
              (props.template.name === name &&
                props.template.model === model &&
                props.template.provider === provider &&
                props.template.language.id.toString() === language)
            }
            onClick={onCreate}
          >
            Save
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        title="Update template"
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
  }

  function onCreate() {
    void updateImageTemplate(props.template.id, {
      name,
      model: model || void 0,
      provider,
      language: parseInt(language),
    }).then(() => {
      router.refresh();
      onClose();
    });
  }
}

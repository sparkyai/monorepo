"use client";

import { useState, useTransition, useEffect } from "react";
import type { TypeOf } from "zod";
import { useRouter, usePathname } from "next/navigation";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { LanguageSchema, ImageSchema } from "@lib/utils/schema";
import { updateImageTemplate } from "@lib/actions/image/template";
import Edit from "@components/icon/edit";
import IconButtonSuccess from "@components/button/icon-button-success";

type UpdateTemplateProps = {
  leonardo: {
    id: string;
    name: string;
  }[];
  template: {
    id: number;
    name: string;
    model: null | string;
    poster: null | TypeOf<typeof ImageSchema>;
    provider: string;
    language: TypeOf<typeof LanguageSchema>;
    description: null | string;
  };
  languages: TypeOf<typeof LanguageSchema>[];
};

export default function UpdateTemplate(props: UpdateTemplateProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState(props.template.name);
  const [model, setModel] = useState(props.template.model);
  // const [poster, setPoster] = useState();
  const [provider, setProvider] = useState(props.template.provider);
  const [language, setLanguage] = useState(props.template.language.code);
  const [description, setDescription] = useState(props.template.description || "");

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setModel(["Leonardo"].includes(provider) ? "" : null);
  }, [provider]);

  return (
    <>
      <IconButtonSuccess className="-my-1.5" onClick={onOpen}>
        <Edit size={16} />
      </IconButtonSuccess>
      <Dialog
        // canCreate={Boolean(name.trim() && language && provider && model !== "")}
        canUpdate={Boolean()}
        className="max-w-lg grid-cols-2 gap-2"
        onClose={onClose}
        onUpdate={onUpdate}
        open={isOpen}
        title="Update Template"
      >
        <FieldGroup className="col-span-full" label="Name">
          <TextField onChange={setName} value={name} />
        </FieldGroup>
        <FieldGroup label="Provider">
          <SelectField onChange={setProvider} options={["DALL·E", "Leonardo"]} value={provider} />
        </FieldGroup>
        <FieldGroup label="Language">
          <SelectField
            onChange={setLanguage}
            options={props.languages.map((item) => ({
              label: item.name,
              value: item.code,
            }))}
            value={language}
          />
        </FieldGroup>
        {provider === "Leonardo" && typeof model === "string" && (
          <FieldGroup className="col-span-full" label="Model">
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
        {/*<FieldGroup className="col-span-2" label="Poster">*/}
        {/*  <ImageField className="aspect-video" onChange={setPoster} value={poster} />*/}
        {/*</FieldGroup>*/}
        <FieldGroup className="col-span-2" label="Description">
          <TextField onChange={setDescription} rows={7} value={description} />
        </FieldGroup>
        {isPending && <Loader className="absolute inset-0 bg-slate-950/60" />}
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
    // resetPoster();
    setProvider(props.template.provider);
    setLanguage(props.template.language.code);
    setDescription(props.template.description || "");
  }

  function onUpdate() {
    startTransition(async () => {
      const response = await updateImageTemplate(props.template.id, {
        name: name.trim(),
        model,
        provider,
        language,
        description: description.trim(),
      });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.replace(pathname);
      setIsOpen(false);
    });
  }
}

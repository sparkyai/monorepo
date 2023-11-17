"use client";

import { useState, useTransition } from "react";
import type { TypeOf } from "zod";
import { useRouter } from "next/navigation";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { LanguageSchema, ImageSchema } from "@lib/utils/schema";
import { updateImageTemplate } from "@lib/actions/image/template";
import Edit from "@components/icon/edit";
import IconButtonSuccess from "@components/button/icon-button-success";
import FileField from "@components/form/file-field";
import Poster from "@components/common/poster";
import { upload } from "@lib/actions/s3";

type UpdateTemplateProps = {
  leonardo: {
    id: string;
    name: string;
  }[];
  template: {
    id: number;
    name: string;
    model: null | string;
    poster: null | string;
    provider: string;
    language: TypeOf<typeof LanguageSchema>;
    description: null | string;
  };
  languages: TypeOf<typeof LanguageSchema>[];
};

export default function UpdateTemplate(props: UpdateTemplateProps) {
  const router = useRouter();

  const [name, setName] = useState(props.template.name);
  const [file, setFile] = useState<null | File>(null);
  const [model, setModel] = useState(props.template.model);
  const [poster, setPoster] = useState(props.template.poster);
  const [provider, setProvider] = useState(props.template.provider);
  const [language, setLanguage] = useState(props.template.language.code);
  const [description, setDescription] = useState(props.template.description || "");

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <IconButtonSuccess className="-my-1.5" onClick={onOpen}>
        <Edit size={16} />
      </IconButtonSuccess>
      <Dialog
        canUpdate={Boolean(
          file ||
            poster !== props.template.poster ||
            name.trim() !== props.template.name ||
            language !== props.template.language.code ||
            description.trim() !== props.template.description ||
            (provider === props.template.provider ? model !== props.template.model && model !== "" : provider),
        )}
        className="max-w-screen-sm grid-cols-2 gap-2"
        onClose={onClose}
        onUpdate={onUpdate}
        open={isOpen}
        title="Update Template"
      >
        <FieldGroup className="col-span-full" label="Name">
          <TextField onChange={setName} value={name} />
        </FieldGroup>
        <FieldGroup label="Provider">
          <SelectField
            onChange={(value) => {
              setProvider(value);
              setModel(["Leonardo"].includes(value) ? "" : null);
            }}
            options={["DALL·E", "Leonardo"]}
            value={provider}
          />
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
        <FieldGroup className="col-span-2" label="Poster">
          <Poster file={file as never} onDelete={onDeletePoster} poster={poster} />
          <FileField accept="image/*" onChange={setFile} value={file} />
        </FieldGroup>
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

    setFile(null);
    setName(props.template.name);
    setModel(props.template.model);
    setPoster(props.template.poster);
    setProvider(props.template.provider);
    setLanguage(props.template.language.code);
    setDescription(props.template.description || "");
  }

  function onDeletePoster() {
    setFile(null);
    setPoster(null);
  }

  function onUpdate() {
    startTransition(async () => {
      let posterData: TypeOf<typeof ImageSchema> | undefined | null = void 0;

      if (file) {
        const posterFile = file as File & { width: number; height: number };
        const data = new FormData();
        data.append("file", file);

        posterData = {
          mime: posterFile.type,
          width: posterFile.width,
          height: posterFile.height,
          s3_key: await upload(data),
        };
      } else if (!poster && props.template.poster) {
        posterData = null;
      }

      const response = await updateImageTemplate(props.template.id, {
        name: name.trim(),
        model,
        poster: posterData,
        provider,
        language,
        description: description.trim(),
      });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.refresh();
      setIsOpen(false);
    });
  }
}

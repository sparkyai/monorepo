"use client";

import { useState, useTransition, useEffect } from "react";
import type { TypeOf } from "zod";
import { useRouter, usePathname } from "next/navigation";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import ButtonPrimary from "@components/button/button-primary";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { LanguageSchema, ImageSchema } from "@lib/utils/schema";
import { createImageTemplate } from "@lib/actions/image/template";
import Poster from "@components/common/poster";
import FileField from "@components/form/file-field";
import { upload } from "@lib/actions/s3";

type CreateTemplateProps = {
  leonardo: {
    id: string;
    name: string;
  }[];
  languages: TypeOf<typeof LanguageSchema>[];
};

export default function CreateTemplate(props: CreateTemplateProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState("");
  const [file, setFile] = useState<null | File>(null);
  const [model, setModel] = useState<null | string>(null);
  const [poster, setPoster] = useState<null | string>(null);
  const [provider, setProvider] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setModel(["Leonardo"].includes(provider) ? "" : null);
  }, [provider]);

  return (
    <>
      <ButtonPrimary className="ml-auto truncate" onClick={onOpen}>
        Create Template
      </ButtonPrimary>
      <Dialog
        canCreate={Boolean(name.trim() && language && provider && model !== "")}
        className="max-w-screen-sm grid-cols-2 gap-2"
        onClose={onClose}
        onCreate={onCreate}
        open={isOpen}
        title="Create Template"
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
        <FieldGroup className="col-span-2" label="Poster">
          <Poster file={file as never} poster={poster} />
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

    setName("");
    setFile(null);
    setModel(null);
    setPoster(null);
    setProvider("");
    setLanguage("");
    setDescription("");
  }

  function onCreate() {
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
      }

      const response = await createImageTemplate({
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

      router.replace(pathname);
      onClose();
    });
  }
}

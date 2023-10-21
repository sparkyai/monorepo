"use client";

import { useState, useTransition } from "react";
import { useListState } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import Table from "@components/common/table";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import DeleteDialog from "@components/dialog/delete";
import type { ImageTemplate } from "@lib/actions/image";
import { createImageTemplate, updateImageTemplate, deleteImageTemplate } from "@lib/actions/image";
import CreateDialog from "./create";
import UpdateDialog from "./update";

type CollectionProps = {
  leonardo: {
    id: string;
    name: string;
  }[];
  languages: {
    id: number;
    name: string;
  }[];
  templates: {
    id: number;
    name: string;
    model: null | string;
    provider: string;
    language: {
      id: number;
      name: string;
    };
  }[];
};

export default function Collection(props: CollectionProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("");
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [templates, handlers] = useListState(props.templates);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <TextField className="w-60" onChange={setQuery} placeholder="Search" type="search" value={query} />
        <SelectField
          className="w-44"
          onChange={setProvider}
          options={["DALL·E", "Leonardo"]}
          placeholder="Provider"
          value={provider}
        />
        <SelectField
          className="w-36"
          onChange={setLanguage}
          options={props.languages.map((item) => ({
            label: item.name,
            value: item.id.toString(),
          }))}
          placeholder="Language"
          value={language}
        />
        <CreateDialog languages={props.languages} leonardo={props.leonardo} onCreate={onCreate} />
      </div>
      <Table isLoading={isLoading || isPending}>
        <Table.Header>
          <span className="w-32 grow">Name</span>
          <span className="w-32 grow">Language</span>
          <span className="w-32 grow">Provider</span>
          <span aria-hidden className="w-16 shrink-0" />
        </Table.Header>
        {templates
          .filter(
            (category) =>
              (!query || category.name.toLowerCase().includes(query.toLowerCase())) &&
              (!provider || category.provider === provider) &&
              (!language || category.language.id.toString() === language),
          )
          .map((template) => (
            <Table.Row key={template.id}>
              <span className="w-32 grow">{template.name}</span>
              <span className="w-32 grow">{template.language.name}</span>
              <span className="w-32 grow">{template.provider}</span>
              <div className="flex w-16 shrink-0 gap-2">
                <UpdateDialog
                  languages={props.languages}
                  leonardo={props.leonardo}
                  onUpdate={(data) => {
                    onUpdate(template.id, data);
                  }}
                  template={template}
                />
                <DeleteDialog
                  description="Are you sure you want to delete the template?"
                  onDelete={() => {
                    onDelete(template.id);
                  }}
                  title="Delete template"
                />
              </div>
            </Table.Row>
          ))}
      </Table>
    </div>
  );

  function refresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  function onDelete(id: number) {
    setIsLoading(true);

    void deleteImageTemplate(id).then(() => {
      handlers.filter((item) => item.id !== id);
      setIsLoading(false);

      refresh();
    });
  }

  function onUpdate(id: number, data: Partial<ImageTemplate>) {
    setIsLoading(true);

    void updateImageTemplate(id, data).then(() => {
      handlers.applyWhere(
        (item) => item.id === id,
        (template) => ({
          id: template.id,
          name: data.name || template.name,
          model: data.model || template.model,
          provider: data.provider || template.provider,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- controlled
          language: props.languages.find((item) => item.id === data.language)!,
        }),
      );
      setIsLoading(false);

      refresh();
    });
  }

  function onCreate(data: ImageTemplate) {
    setIsLoading(true);

    void createImageTemplate(data).then((template) => {
      handlers.prepend(template);
      setIsLoading(false);

      refresh();
    });
  }
}

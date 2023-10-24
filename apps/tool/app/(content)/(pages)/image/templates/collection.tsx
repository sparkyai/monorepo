"use client";

import { useState, useTransition } from "react";
import { useListState } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import Table from "@components/common/table";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import DeleteDialog from "@components/dialog/delete";
import type { ImageTemplate } from "@lib/actions/image";
import {
  createImageTemplate,
  updateImageTemplate,
  deleteImageTemplate,
  updateImageTemplatePoster,
} from "@lib/actions/image";
import AnalyticsDialog from "@components/dialog/analytics";
import CreateDialog from "./create";
import UpdateDialog from "./update";

type Template = {
  id: number;
  name: string;
  model: null | string;
  poster: null | {
    url: string;
  };
  provider: string;
  language: {
    id: number;
    name: string;
  };
  description: null | string;
};

type CollectionProps = {
  leonardo: {
    id: string;
    name: string;
  }[];
  languages: {
    id: number;
    name: string;
  }[];
  templates: Template[];
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
          <span aria-hidden className="w-28 shrink-0" />
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
              <div className="flex w-28 shrink-0 justify-end gap-2">
                <AnalyticsDialog url={`/api/analytics/image/templates/${template.id}`} />
                <UpdateDialog
                  languages={props.languages}
                  leonardo={props.leonardo}
                  onUpdate={(data) => {
                    onUpdate(template, data);
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

  function onUpdate(template: Template, { poster, ...data }: Partial<ImageTemplate>) {
    setIsLoading(true);

    void updateImageTemplate(template.id, data).then(() => {
      const form = new FormData();
      let promise = Promise.resolve(template.poster?.url);

      if (poster && poster.name !== template.poster?.url) {
        form.append("poster", poster);

        promise = updateImageTemplatePoster(template.id, form);
      } else if (template.poster && !poster) {
        promise = updateImageTemplatePoster(template.id, form);
      }

      void promise.then((url) => {
        handlers.applyWhere(
          (item) => item.id === template.id,
          () => ({
            id: template.id,
            name: data.name || template.name,
            model: data.model || template.model,
            poster: url ? { url } : template.poster,
            provider: data.provider || template.provider,
            language: props.languages.find((lang) => lang.id === data.language) || template.language,
            description: data.description || template.description,
          }),
        );
        setIsLoading(false);

        refresh();
      });
    });
  }

  function onCreate({ poster, ...data }: ImageTemplate) {
    setIsLoading(true);

    void createImageTemplate(data).then((template) => {
      const form = new FormData();

      if (poster) {
        form.append("poster", poster);
      }

      void updateImageTemplatePoster(template.id, form).then((url) => {
        handlers.prepend({ ...template, poster: url ? { url } : null });
        setIsLoading(false);

        refresh();
      });
    });
  }
}

"use client";

import { useState, useTransition } from "react";
import { useListState } from "@mantine/hooks";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Table from "@components/common/table";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import DeleteDialog from "@components/dialog/delete";
import Edit from "@components/icon/edit";
import type { TextTemplate } from "@lib/actions/text";
import { createTextTemplate, deleteTextTemplate } from "@lib/actions/text";
import AnalyticsDialog from "@components/dialog/analytics";
import CreateDialog from "./create";

type CollectionProps = {
  templates: {
    id: number;
    name: string;
    poster: null | {
      url: string;
    };
    category: {
      id: number;
      name: string;
    };
    language: {
      id: number;
      name: string;
    };
  }[];
  languages: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function Collection(props: CollectionProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [templates, handlers] = useListState(props.templates);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <TextField className="w-60" onChange={setQuery} placeholder="Search" type="search" value={query} />
        <SelectField
          className="w-44"
          onChange={setCategory}
          options={props.categories.map((item) => ({
            label: item.name,
            value: item.id.toString(),
          }))}
          placeholder="Category"
          value={category}
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
        <CreateDialog categories={props.categories} languages={props.languages} onCreate={onCreate} />
      </div>
      <Table isLoading={isLoading || isPending}>
        <Table.Header>
          <span className="w-32 grow">Name</span>
          <span className="w-32 grow">Category</span>
          <span className="w-32 grow">Language</span>
          <span aria-hidden className="w-28 shrink-0" />
        </Table.Header>
        {templates
          .filter(
            (role) =>
              (!query || role.name.toLowerCase().includes(query.toLowerCase())) &&
              (!category || role.category.id.toString() === category) &&
              (!language || role.language.id.toString() === language),
          )
          .map((template) => (
            <Table.Row key={template.id}>
              <span className="w-32 grow truncate">{template.name}</span>
              <span className="w-32 grow truncate">{template.category.name}</span>
              <span className="w-32 grow truncate">{template.language.name}</span>
              <div className="flex w-28 shrink-0 justify-end gap-2">
                <AnalyticsDialog url={`/api/analytics/text/templates/${template.id}`} />
                <NextLink
                  className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
                  href={`/text/templates/${template.id}`}
                >
                  <Edit size={16} />
                </NextLink>
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

    void deleteTextTemplate(id).then(() => {
      handlers.filter((item) => item.id !== id);
      setIsLoading(false);

      refresh();
    });
  }

  function onCreate(data: TextTemplate) {
    setIsLoading(true);

    void createTextTemplate(data).then((template) => {
      handlers.prepend(template);
      setIsLoading(false);

      startTransition(() => {
        router.push(`/text/templates/${template.id}`);

        refresh();
      });
    });
  }
}

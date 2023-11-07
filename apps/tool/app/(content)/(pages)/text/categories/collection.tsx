"use client";

import { useState, useTransition } from "react";
import { useListState } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import Table from "@components/common/table";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import DeleteDialog from "@components/dialog/delete";
import type { TextCategory } from "@lib/actions/text";
import { createTextCategory, updateTextCategory, deleteTextCategory } from "@lib/actions/text";
import CreateDialog from "./create";
import UpdateDialog from "./update";

type CollectionProps = {
  languages: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
    _count: {
      templates: number;
    };
    language: {
      id: number;
      name: string;
    };
  }[];
};

export default function Collection(props: CollectionProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [categories, handlers] = useListState(props.categories);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <TextField className="w-60" onChange={setQuery} placeholder="Search" type="search" value={query} />
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
        <CreateDialog languages={props.languages} onCreate={onCreate} />
      </div>
      <Table isLoading={isLoading || isPending}>
        <Table.Header>
          <span className="w-32 grow">Name</span>
          <span className="w-32 grow">Language</span>
          <span className="w-32 grow">Templates</span>
          <span aria-hidden className="w-28 shrink-0" />
        </Table.Header>
        {categories
          .filter(
            (category) =>
              (!query || category.name.toLowerCase().includes(query.toLowerCase())) &&
              (!language || category.language.id.toString() === language),
          )
          .map((category) => (
            <Table.Row key={category.id}>
              <span className="w-32 grow">{category.name}</span>
              <span className="w-32 grow">{category.language.name}</span>
              <span className="w-32 grow">{category._count.templates}</span>
              <div className="flex w-28 shrink-0 justify-end gap-2">
                {/*<AnalyticsDialog url={`/api/analytics/text/categories/${category.id}`} />*/}
                <UpdateDialog
                  category={category}
                  languages={props.languages}
                  onUpdate={(data) => {
                    onUpdate(category.id, data);
                  }}
                />
                <DeleteDialog
                  description={`Templates in this category will also be deleted.\nAre you sure you want to delete the category?`}
                  onDelete={() => {
                    onDelete(category.id);
                  }}
                  title="Delete category"
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

    void deleteTextCategory(id).then(() => {
      handlers.filter((item) => item.id !== id);
      setIsLoading(false);

      refresh();
    });
  }

  function onUpdate(id: number, data: Partial<TextCategory>) {
    setIsLoading(true);

    void updateTextCategory(id, data).then(() => {
      handlers.applyWhere(
        (item) => item.id === id,
        (category) => ({
          id: category.id,
          name: data.name || category.name,
          _count: category._count,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- controlled
          language: props.languages.find((item) => item.id === data.language)!,
        }),
      );
      setIsLoading(false);

      refresh();
    });
  }

  function onCreate(data: TextCategory) {
    setIsLoading(true);

    void createTextCategory(data).then((category) => {
      handlers.prepend(category);
      setIsLoading(false);

      refresh();
    });
  }
}

"use client";

import { useState, useTransition } from "react";
import { useListState } from "@mantine/hooks";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Table from "@components/common/table";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { ChatRole } from "@lib/actions/chat";
import { deleteChatRole, createChatRole, updateChatRolePoster } from "@lib/actions/chat";
import DeleteDialog from "@components/dialog/delete";
import Edit from "@components/icon/edit";
import CreateDialog from "./create";

type CollectionProps = {
  roles: {
    id: number;
    name: string;
    poster: null | {
      mime: string;
      width: number;
      height: number;
      pathname: string;
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

  const [roles, handlers] = useListState(props.roles);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
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
        {roles
          .filter(
            (role) =>
              (!query || role.name.toLowerCase().includes(query.toLowerCase())) &&
              (!category || role.category.id.toString() === category) &&
              (!language || role.language.id.toString() === language),
          )
          .map((role) => (
            <Table.Row key={role.id}>
              <span className="w-32 grow truncate">{role.name}</span>
              <span className="w-32 grow truncate">{role.category.name}</span>
              <span className="w-32 grow truncate">{role.language.name}</span>
              <div className="flex w-28 shrink-0 justify-end gap-2">
                {/*<AnalyticsDialog url={`/api/analytics/chat/roles/${role.id}`} />*/}
                <NextLink
                  className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
                  href={`/chat/roles/${role.id}`}
                >
                  <Edit size={16} />
                </NextLink>
                <DeleteDialog
                  description="Are you sure you want to delete the role?"
                  onDelete={() => {
                    onDelete(role.id);
                  }}
                  title="Delete role"
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

    void deleteChatRole(id).then(() => {
      handlers.filter((item) => item.id !== id);
      setIsLoading(false);

      refresh();
    });
  }

  function onCreate({ poster, ...data }: ChatRole) {
    setIsLoading(true);

    void createChatRole(data).then((role) => {
      const form = new FormData();

      if (poster) {
        form.append("poster", poster);
      }

      void updateChatRolePoster(role.id, form).then(() => {
        handlers.prepend(role);
        setIsLoading(false);

        startTransition(() => {
          router.push(`/chat/roles/${role.id}`);

          refresh();
        });
      });
    });
  }
}

"use client";

import { useListState } from "@mantine/hooks";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import SidebarGroup from "@components/sidebar/group";
import Add from "@components/icon/add";
import Loader from "@components/common/loader";
import type { TextTemplateMessage } from "@lib/actions/text";
import { createTextTemplateMessage, deleteTextTemplateMessage, updateTextTemplateMessage } from "@lib/actions/text";
import Message from "./message";

type ContextProps = {
  template: {
    id: number;
  };
  messages: {
    id: bigint;
    role: string;
    content: string;
  }[];
};

export default function Context(props: ContextProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [collection, handlers] = useListState(
    props.messages.map((message) => ({
      show: false,
      message,
    })),
  );

  return (
    <SidebarGroup
      actions={
        <button
          className="p-1 transition-colors hover:text-blue-400 active:text-blue-400"
          onClick={onCreate}
          type="button"
        >
          <Add size={20} />
        </button>
      }
      name="Context"
    >
      {collection.map((item, index) => (
        <Message
          key={item.message.id.toString()}
          message={item.message}
          onChange={(data) => {
            onUpdate(item.message.id, data);
          }}
          onClose={() => {
            handlers.setItemProp(index, "show", false);
          }}
          onDelete={() => {
            onDelete(item.message.id);
          }}
          onOpen={() => {
            handlers.setItemProp(index, "show", true);
          }}
          show={item.show}
        />
      ))}
      {(isLoading || isPending) && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/75">
          <Loader className="m-auto" />
        </div>
      )}
    </SidebarGroup>
  );

  function refresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  function onDelete(id: bigint) {
    setIsLoading(true);

    void deleteTextTemplateMessage(id).then(() => {
      handlers.filter((item) => item.message.id !== id);

      setIsLoading(false);

      refresh();
    });
  }

  function onUpdate(id: bigint, data: Partial<TextTemplateMessage>) {
    setIsLoading(true);

    void updateTextTemplateMessage(id, data).then(() => {
      handlers.applyWhere(
        (item) => item.message.id === id,
        (item) => ({
          show: false,
          message: {
            id: item.message.id,
            role: data.role || item.message.role,
            content: data.content || item.message.content,
          },
        }),
      );

      setIsLoading(false);

      refresh();
    });
  }

  function onCreate() {
    setIsLoading(true);

    void createTextTemplateMessage(props.template.id, { role: "system", content: "" }).then((message) => {
      handlers.append({
        show: true,
        message,
      });

      setIsLoading(false);

      refresh();
    });
  }
}

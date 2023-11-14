"use client";

import { useListState } from "@mantine/hooks";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { TypeOf } from "zod";
import SidebarGroup from "@components/sidebar/group";
import Add from "@components/icon/add";
import Loader from "@components/common/loader";
import {
  createTextTemplateMessage,
  deleteTextTemplateMessage,
  updateTextTemplateMessage,
} from "@lib/actions/text/template";
import type { MessageSchema } from "@lib/utils/schema";
import Message from "./message";

type ContextProps = {
  template: {
    id: number;
    messages: {
      id: string;
      role: string;
      content: string;
    }[];
  };
};

export default function Context(props: ContextProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [collection, handlers] = useListState(
    props.template.messages.map((message) => ({
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
      {isPending && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/75">
          <Loader className="m-auto" />
        </div>
      )}
    </SidebarGroup>
  );

  function onDelete(id: string) {
    startTransition(async () => {
      const response = await deleteTextTemplateMessage(id);

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      handlers.filter((item) => item.message.id !== id);

      router.refresh();
    });
  }

  function onUpdate(id: string, data: Partial<TypeOf<typeof MessageSchema>>) {
    startTransition(async () => {
      const response = await updateTextTemplateMessage(id, data);

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

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

      router.refresh();
    });
  }

  function onCreate() {
    startTransition(async () => {
      const data = {
        role: "system",
        content: "",
      };

      const response = await createTextTemplateMessage({
        template: props.template.id,
        ...data,
      });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      handlers.append({
        show: true,
        message: {
          id: response.data.id,
          ...data,
        },
      });

      router.refresh();
    });
  }
}

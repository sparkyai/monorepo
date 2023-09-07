"use client";

import { useEffect, useMemo, useState } from "react";
import Add from "@components/icon/add";
import { updateTemplateContext } from "@lib/actions/template";
import TemplateSidebarGroup from "./group";
import Message from "./message";
import TemplateSidebarParameter from "./parameter";

const PARAMETERS_REGEX = /{(?<name>[A-zА-я0-9_]+)}/gm;

type TemplateSidebarContextProps = {
  template: {
    id: number;
  };
  messages: {
    id: string;
    role: string;
    content: string;
  }[];
};

export default function TemplateSidebarContext(props: TemplateSidebarContextProps) {
  const [messages, setMessages] = useState(
    props.messages.map((message, i) => ({
      ...message,
      show: false,
      position: i,
    })),
  );
  const parameters = useMemo(
    () =>
      messages
        .map((message) =>
          Array.from(message.content.matchAll(PARAMETERS_REGEX)).map(
            (match) =>
              (
                match.groups as {
                  name: string;
                }
              ).name,
          ),
        )
        .flat()
        .filter((name, index, collection) => index === collection.indexOf(name)),
    [messages],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = messages.map((message) => ({
        id: message.id ? message.id : void 0,
        role: message.role,
        content: message.content,
        position: message.position,
      }));

      void updateTemplateContext(props.template.id, data);
    }, 300);

    return function cancel() {
      clearTimeout(timer);
    };
  }, [props.template, messages]);

  return (
    <>
      <TemplateSidebarGroup
        actions={
          <button
            className="p-1 transition-colors hover:text-blue-400 active:text-blue-400"
            onClick={() => {
              setMessages((oldMessages) => [
                ...oldMessages,
                {
                  id: "",
                  show: true,
                  role: "user",
                  content: "",
                  position: oldMessages.length,
                },
              ]);
            }}
            type="button"
          >
            <Add size={20} />
          </button>
        }
        name="Context"
      >
        {!messages.length && <span>Empty</span>}
        {messages.map((message) => (
          <Message
            key={`${message.id}-${message.position}`}
            {...message}
            onChangeContent={(value) => {
              setMessages((oldMessages) => {
                const newMessages = [...oldMessages];
                const index = oldMessages.findIndex((item) => item.id === message.id);

                newMessages[index].content = value;

                return newMessages;
              });
            }}
            onChangeRole={(value) => {
              setMessages((oldMessages) => {
                const newMessages = [...oldMessages];
                const index = oldMessages.findIndex((item) => item.id === message.id);

                newMessages[index].role = value;

                return newMessages;
              });
            }}
            onClose={() => {
              setMessages((oldMessages) => {
                const newMessages = [...oldMessages];
                const index = oldMessages.findIndex((item) => item.id === message.id);

                newMessages[index].show = false;

                return newMessages;
              });
            }}
            onOpen={() => {
              setMessages((oldMessages) => {
                const newMessages = [...oldMessages];
                const index = oldMessages.findIndex((item) => item.id === message.id);

                newMessages[index].show = true;

                return newMessages;
              });
            }}
            onRemove={() => {
              setMessages((oldMessages) => {
                const newMessages = [...oldMessages];
                const index = oldMessages.findIndex((item) => item.id === message.id);

                newMessages.splice(index, 1);

                return newMessages;
              });
            }}
          />
        ))}
      </TemplateSidebarGroup>

      {Boolean(parameters.length) && (
        <TemplateSidebarGroup name="Parameters">
          {parameters.map((name) => (
            <TemplateSidebarParameter key={name} name={name} />
          ))}
        </TemplateSidebarGroup>
      )}
    </>
  );
}

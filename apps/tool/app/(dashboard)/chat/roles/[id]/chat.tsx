"use client";

import { twMerge } from "tailwind-merge";
import type { FormEvent, UIEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Send from "@components/icon/send";
import Stop from "@components/icon/stop";
import useChat from "@lib/hooks/use-chat";
import Loader from "@components/common/loader";

type ChatProps = {
  role: {
    id: number;
    prompt: string;
  };
};

export default function Chat(props: ChatProps) {
  const [history, isLoading, chat] = useChat(`/api/chat/roles/${props.role.id}/completion`, [
    {
      role: "system",
      content: props.role.prompt,
    },
  ]);

  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [lock, setLock] = useState(true);

  useEffect(() => {
    lock && ref.current && ref.current.scrollTo({ top: ref.current.scrollHeight });
  }, [lock, history]);

  return (
    <>
      <div
        className="flex grow flex-col gap-3 overflow-y-auto border-b border-slate-700 p-6"
        onScroll={onScroll}
        ref={ref}
      >
        {history.slice(1).map((message) => (
          <p
            className={twMerge(
              "w-10/12 whitespace-break-spaces rounded-xl border border-slate-700 bg-slate-800 p-4",
              message.role === "user" && "ml-auto",
            )}
            key={message.id}
          >
            {message.content}
          </p>
        ))}
        {isLoading && history[history.length - 1]?.role !== "assistant" && (
          <Loader className="w-10/12 rounded-xl border border-slate-700 bg-slate-800 p-4" />
        )}
      </div>
      <form className="relative flex" onSubmit={onSubmit}>
        <input
          className="w-full bg-transparent py-3 pl-6 pr-16 focus:outline-0"
          name="message"
          placeholder="Write a message..."
          type="text"
        />
        <button
          className={twMerge(
            "absolute right-0 mr-3 p-3 text-slate-400 transition-colors hover:text-slate-50 active:text-slate-50",
            isLoading && "hidden",
          )}
          type="submit"
        >
          <Send size={24} />
        </button>
        <button
          className={twMerge(
            "absolute right-0 mr-3 p-3 text-slate-400 transition-colors hover:text-slate-50 active:text-slate-50",
            !isLoading && "hidden",
          )}
          onClick={onCancel}
          type="button"
        >
          <Stop size={24} />
        </button>
      </form>
    </>
  );

  function onCancel() {
    chat.cancel("cancel");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const message = data.get("message") as string;

    if (isLoading || !message) {
      return;
    }

    event.currentTarget.reset();
    chat.send(message);
  }

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollHeight, offsetHeight } = event.currentTarget;

    setLock(scrollTop - top > 0 && scrollTop + offsetHeight === scrollHeight);
    setTop(scrollTop);
  }
}

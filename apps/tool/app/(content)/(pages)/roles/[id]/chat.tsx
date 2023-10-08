"use client";

import { twMerge } from "tailwind-merge";
import type { FormEvent, UIEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Send from "@components/icon/send";
import useChat from "@lib/hooks/use-chat";
import Stop from "@components/icon/stop";

type ChatProps = {
  topP: number;
  model: string;
  system: string;
  temperature: number;
  presentPenalty: number;
  frequencyPenalty: number;
};

export default function Chat(props: ChatProps) {
  const [history, isLoading, chat] = useChat({
    topP: props.topP,
    model: props.model,
    messages: [
      {
        role: "system",
        content: props.system,
      },
    ],
    temperature: props.temperature,
    presentPenalty: props.presentPenalty,
    frequencyPenalty: props.frequencyPenalty,
  });

  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [lock, setLock] = useState(true);

  useEffect(() => {
    lock && ref.current && ref.current.scrollTo({ top: ref.current.scrollHeight });
  }, [lock, history]);

  // return (
  //   <div
  //     className="flex grow flex-col gap-3 overflow-y-auto border-r border-slate-700 p-6"
  //     onScroll={onScroll}
  //     ref={ref}
  //   >
  //     {content && (
  //       <p className="whitespace-break-spaces rounded-xl border border-slate-700 bg-slate-800 p-4">{content}</p>
  //     )}
  //   </div>
  // );

  return (
    <div className="flex grow flex-col overflow-hidden border-r border-slate-700">
      <div
        className="flex grow flex-col gap-3 overflow-y-auto border-b border-slate-700 p-6"
        onScroll={onScroll}
        ref={ref}
      >
        {history.map((message) => (
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
          <div className="flex justify-center gap-1 py-3">
            <div className="animate-[bounce_linear_1.2s_infinite_-.9s] py-2">
              <div className="h-2 w-2 rounded-full bg-slate-400" />
            </div>
            <div className="animate-[bounce_linear_1.2s_infinite_-.6s] py-2">
              <div className="h-2 w-2 rounded-full bg-slate-400" />
            </div>
            <div className="animate-[bounce_linear_1.2s_infinite_-.3s] py-2">
              <div className="h-2 w-2 rounded-full bg-slate-400" />
            </div>
            <div className="animate-[bounce_linear_1.2s_infinite] py-2">
              <div className="h-2 w-2 rounded-full bg-slate-400" />
            </div>
          </div>
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
    </div>
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

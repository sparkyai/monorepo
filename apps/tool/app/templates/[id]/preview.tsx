"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type State = "idle" | "loading";

type Context = {
  state: State;
  params: object;
  content: string;
  setState: Dispatch<SetStateAction<State>>;
  setParams: Dispatch<SetStateAction<object>>;
  setContent: Dispatch<SetStateAction<string>>;
};

const Content = createContext({} as Context);

export function usePreview() {
  return useContext(Content);
}

export function usePreviewParam<T>(name: string) {
  const { params, setParams } = usePreview();

  return [params[name] as T, setParam] as const;

  function setParam(value: SetStateAction<T>) {
    const callback = typeof value !== "function" ? () => value as unknown as T : (value as (prevState: T) => T);

    setParams((oldParams) => ({
      ...oldParams,
      [name]: callback(oldParams[name] as T),
    }));
  }
}

export function PreviewProvider(props: PropsWithChildren) {
  const controller = useRef<AbortController>();

  const [state, setState] = useState<State>("idle");
  const [params, setParams] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    if (state !== "idle" && controller.current) {
      const $controller = controller.current;

      return function cancel() {
        $controller.abort();
      };
    }
  }, [state]);

  return (
    <Content.Provider value={{ state, params, content, setState, setParams, setContent }}>
      {props.children}
    </Content.Provider>
  );
}

type PreviewActionProps = {
  template: {
    id: number;
  };
};

export function PreviewAction(props: PreviewActionProps) {
  const controller = useRef<AbortController>();

  const { state, params, setState, setContent } = usePreview();

  return (
    <button
      className={twMerge(
        "ml-auto rounded-lg px-3 py-1 text-sm font-medium capitalize tracking-wider transition-colors",
        state === "idle"
          ? "bg-green-700 hover:bg-green-800 active:bg-green-800"
          : "bg-red-700 hover:bg-red-800 active:bg-red-800",
      )}
      onClick={state === "idle" ? (onGenerate as VoidFunction) : onCancel}
      type="button"
    >
      {state === "idle" ? "generate" : "stop"}
    </button>
  );

  function onCancel() {
    controller.current?.abort("cancel");
  }

  async function onGenerate() {
    setState("loading");
    setContent("");

    controller.current = new AbortController();

    const response = await fetch(`/api/templates/${props.template.id}/completion`, {
      body: JSON.stringify(params),
      signal: controller.current.signal,
      method: "POST",
    }).catch(() => void 0);

    if (response && response.ok && response.body) {
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

      await reader.read().then(
        function handler(result) {
          if (!result.done) {
            setContent((oldContent) => oldContent + result.value);

            return reader.read().then(handler, () => void 0);
          }
        },
        () => void 0,
      );
    }

    setState("idle");
  }
}

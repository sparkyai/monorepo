"use client";

import type { UseListState } from "@mantine/hooks/lib/use-list-state/use-list-state";
import type { PropsWithChildren, Dispatch, SetStateAction } from "react";
import { createContext, useState, useContext, useRef } from "react";
import { useListState } from "@mantine/hooks";
import { twMerge } from "tailwind-merge";
import TextField from "@components/form/text-field";

type Parameter = {
  name: string;
  value: string;
};

const ErrorContext = createContext([] as unknown as [null | string, Dispatch<SetStateAction<null | string>>]);
const StateContext = createContext([] as unknown as [boolean, Dispatch<SetStateAction<boolean>>]);
const ContentContext = createContext([] as unknown as [string, Dispatch<SetStateAction<string>>]);
const ParametersContext = createContext([] as unknown as UseListState<Parameter>);

export function useGeneration() {
  const [error] = useContext(ErrorContext);
  const [content] = useContext(ContentContext);
  const [isLoading] = useContext(StateContext);

  return [content, isLoading, error] as const;
}

type GenerationTrigger = {
  template: {
    id: number;
  };
};

export function GenerationTrigger(props: GenerationTrigger) {
  const controller = useRef<AbortController>();

  const [params] = useContext(ParametersContext);
  const [_, setError] = useContext(ErrorContext);
  const [__, setContent] = useContext(ContentContext);
  const [isLoading, setIsLoading] = useContext(StateContext);

  return (
    <button
      className={twMerge(
        "rounded-lg px-3.5 py-2 font-medium capitalize tracking-wider transition-colors",
        isLoading
          ? "bg-red-700 hover:bg-red-800 active:bg-red-800"
          : "bg-green-700 hover:bg-green-800 active:bg-green-800",
      )}
      onClick={onGenerate as VoidFunction}
      type="button"
    >
      {isLoading ? "stop" : "generate"}
    </button>
  );

  async function onGenerate() {
    if (isLoading) {
      controller.current?.abort("cancel");
      setIsLoading(false);

      return;
    }

    setError(null);
    setContent("");
    setIsLoading(true);

    controller.current = new AbortController();

    const response = await request(props.template.id, params, controller.current.signal).catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });

    if (response) {
      const reader = response.pipeThrough(new TextDecoderStream()).getReader();

      await reader.read().then(
        function handler(result) {
          if (!result.done) {
            setContent((oldContent) => oldContent + result.value);

            return reader.read().then(handler, () => void 0);
          }

          setIsLoading(false);
        },
        () => void 0,
      );
    }
  }
}

async function request(id: number, parameters: Parameter[], signal: AbortSignal) {
  const response = await fetch(`/api/templates/${id}/completion`, {
    body: JSON.stringify(
      parameters.reduce((payload, parameter) => {
        payload[parameter.name] = parameter.value;

        return payload;
      }, {}),
    ),
    signal,
    method: "POST",
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.body;
}

type GenerationParameterProps = {
  name: string;
};

export function GenerationParameter(props: GenerationParameterProps) {
  const [parameters, handlers] = useContext(ParametersContext);

  const parameter = parameters.find((item) => item.name === props.name);

  return <TextField onChange={onChange} value={parameter?.value || ""} />;

  function onChange(value: string) {
    if (parameter) {
      handlers.applyWhere(
        (item) => item.name === props.name,
        () => ({ name: props.name, value }),
      );
    } else {
      handlers.append({ name: props.name, value });
    }
  }
}

export function GenerationProvider(props: PropsWithChildren) {
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parameters, handlers] = useListState<Parameter>([]);

  return (
    <ErrorContext.Provider value={[error, setError]}>
      <StateContext.Provider value={[isLoading, setIsLoading]}>
        <ContentContext.Provider value={[content, setContent]}>
          <ParametersContext.Provider value={[parameters, handlers]}>{props.children}</ParametersContext.Provider>
        </ContentContext.Provider>
      </StateContext.Provider>
    </ErrorContext.Provider>
  );
}

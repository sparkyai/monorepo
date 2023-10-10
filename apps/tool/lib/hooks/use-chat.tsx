import { useListState } from "@mantine/hooks";
import { useRef, useState } from "react";

type Message = {
  id: number;
  role: string;
  content: string;
};

export default function useChat(url: string, messages?: Omit<Message, "id">[]) {
  const controller = useRef<AbortController>();

  const [history, handlers] = useListState(messages?.map((message, id) => ({ id, ...message })));
  const [isLoading, setIsLoading] = useState(false);

  return [history, isLoading, { send, cancel }] as const;

  function send(content: string) {
    setIsLoading(true);

    const message = {
      id: history.length,
      role: "user",
      content,
    };
    handlers.append(message);

    controller.current = new AbortController();

    void request(url, [...history, message], controller.current.signal).then((stream) => {
      const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
      const id = history.length + 1;
      let assistant = "";

      handlers.append({ id, role: "assistant", content: assistant });

      void reader.read().then(
        function handler(result) {
          if (!result.done) {
            handlers.setItemProp(id, "content", (assistant += result.value));

            return reader.read().then(handler, () => void 0);
          }

          setIsLoading(false);
        },
        () => void 0,
      );
    });
  }

  function cancel(reason?: string) {
    controller.current?.abort(reason);
    setIsLoading(false);
  }
}

async function request(url: string, data: object, signal: AbortSignal) {
  const response = await fetch(url, {
    body: JSON.stringify(data),
    signal,
    method: "POST",
  });

  if (response.ok && response.body) {
    return response.body;
  }

  throw new Error(response.statusText);
}

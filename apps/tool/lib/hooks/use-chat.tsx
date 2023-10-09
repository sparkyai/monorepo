import { useRef, useState } from "react";

type Message = {
  id: number;
  role: string;
  content: string;
};

type ChatOption = {
  topP: number;
  model: string;
  messages?: Omit<Message, "id">[];
  temperature: number;
  presentPenalty: number;
  frequencyPenalty: number;
};

export default function useChat(options: ChatOption) {
  const controller = useRef<AbortController>();

  const [messages, setMessages] = useState<Message[]>(
    options.messages?.map((message, id) => ({ id, ...message })) || [],
  );
  const [isLoading, setIsLoading] = useState(false);

  return [messages, isLoading, { send, cancel }] as const;

  function send(message: string) {
    setIsLoading(true);

    controller.current = new AbortController();

    const newMessages = [...messages, { id: messages.length, role: "user", content: message }];
    setMessages(newMessages);

    request({ ...options, messages: newMessages }, controller.current.signal)
      .then((stream) => {
        const reader = stream.pipeThrough(new TextDecoderStream()).getReader();

        newMessages.push({ id: newMessages.length, role: "assistant", content: "" });
        setMessages(newMessages);

        void reader.read().then(
          function handler(result) {
            if (!result.done) {
              newMessages[newMessages.length - 1].content += result.value;
              setMessages([...newMessages]);

              return reader.read().then(handler, () => void 0);
            }

            setIsLoading(false);
          },
          () => void 0,
        );
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  function cancel(reason?: string) {
    controller.current?.abort(reason);
    setIsLoading(false);
  }
}

async function request(data: Required<ChatOption>, signal: AbortSignal) {
  const response = await fetch(`/api/chat/completions`, {
    body: JSON.stringify(data),
    signal,
    method: "POST",
  });

  if (response.ok && response.body) {
    return response.body;
  }

  throw new Error(response.statusText);
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Edit from "@components/icon/edit";
import TextField from "@components/form/text-field";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import { updateChatRole } from "@lib/actions/chat/role";

type PromptProps = {
  role: {
    id: number;
    prompt: string;
  };
};

export default function Prompt(props: PromptProps) {
  const router = useRouter();

  const [prompt, setPrompt] = useState(props.role.prompt);

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button className="group flex gap-3 rounded-md bg-slate-700 px-3 py-1.5" onClick={onOpen} type="button">
        <span className="font-bold">System Prompt</span>
        <Edit
          className="m-1 ml-auto opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100"
          size={16}
        />
      </button>
      <Dialog
        canUpdate={prompt.trim() !== props.role.prompt}
        className="max-w-lg"
        onClose={onClose}
        onUpdate={onUpdate}
        open={isOpen}
        title="Edit system prompt"
      >
        <TextField onChange={setPrompt} rows={16} value={prompt} />
        {isPending && <Loader className="absolute inset-0 bg-slate-950/60" />}
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);

    setPrompt(props.role.prompt);
  }

  function onUpdate() {
    startTransition(async () => {
      const response = await updateChatRole(props.role.id, { prompt });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.refresh();
      setIsOpen(false);
    });
  }
}

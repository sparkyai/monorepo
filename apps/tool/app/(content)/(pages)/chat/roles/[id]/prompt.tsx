"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Edit from "@components/icon/edit";
import TextField from "@components/form/text-field";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import { updateChatRole } from "@lib/actions/chat";

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
  const [isLoading, setIsLoading] = useState(false);
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
        footer={
          <ButtonPrimary className="ml-auto" disabled={prompt.trim() === props.role.prompt} onClick={onUpdate}>
            Update
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        size="lg"
        title="Edit system prompt"
      >
        <TextField onChange={setPrompt} rows={16} value={prompt} />
      </Dialog>
      {(isLoading || isPending) && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/75">
          <Loader className="m-auto" />
        </div>
      )}
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function onUpdate() {
    setIsLoading(true);

    void updateChatRole(props.role.id, { prompt }).then(() => {
      setIsLoading(false);
      onClose();

      startTransition(() => {
        router.refresh();
      });
    });
  }
}

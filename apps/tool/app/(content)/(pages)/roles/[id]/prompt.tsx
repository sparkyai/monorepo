"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Edit from "@components/icon/edit";
import TextField from "@components/form/text-field";
import ButtonPrimary from "@components/button/button-primary";
import { updateRoleSystemPrompt } from "@lib/actions/role";
import Dialog from "@components/common/dialog";

type PromptProps = {
  role: {
    id: number;
    system: null | {
      content: string;
    };
  };
};

export default function Prompt(props: PromptProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(props.role.system?.content || "");

  useEffect(() => {
    setContent(props.role.system?.content || "");
  }, [props.role.system]);

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
          <ButtonPrimary className="ml-auto" disabled={content.trim() === props.role.system?.content} onClick={onSave}>
            Save
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        size="lg"
        title="Edit system prompt"
      >
        <TextField onChange={setContent} rows={16} value={content} />
      </Dialog>
    </>
  );

  function onSave() {
    void updateRoleSystemPrompt(props.role.id, content.trim()).then(() => {
      router.refresh();
      onClose();
    });
  }

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }
}

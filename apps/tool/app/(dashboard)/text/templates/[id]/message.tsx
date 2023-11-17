"use client";

import { useState } from "react";
import type { TypeOf } from "zod";
import Edit from "@components/icon/edit";
import Remove from "@components/icon/remove";
import SelectField from "@components/form/select-field";
import TextField from "@components/form/text-field";
import Dialog from "@components/common/dialog";
import type { MessageSchema } from "@lib/utils/schema";

type MessageProps = {
  show: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  message: TypeOf<typeof MessageSchema>;
  onDelete: VoidFunction;
  onChange: (message: TypeOf<typeof MessageSchema>) => void;
};

export default function Message(props: MessageProps) {
  const [role, setRole] = useState(props.message.role);
  const [content, setContent] = useState(props.message.content);

  return (
    <>
      <div className="group flex gap-3 rounded-md bg-slate-700 px-3 py-1.5">
        <span className="font-bold capitalize">{props.message.role} prompt</span>
        <div className="ml-auto flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100">
          <button
            className="p-1 transition-colors hover:text-blue-400 active:text-blue-400"
            onClick={props.onOpen}
            type="button"
          >
            <Edit size={16} />
          </button>
          <button
            className="p-1 transition-colors hover:text-red-400 active:text-red-400"
            onClick={props.onDelete}
            type="button"
          >
            <Remove size={16} />
          </button>
        </div>
      </div>
      <Dialog
        canUpdate={Boolean(role && (role !== props.message.role || content.trim() !== props.message.content))}
        className="max-w-screen-sm"
        onClose={onClose}
        onUpdate={onUpdate}
        open={props.show}
        title="Update prompt"
      >
        <div className="flex items-end justify-between gap-3">
          <span className="font-medium">Prompt</span>
          <SelectField
            className="w-36"
            onChange={setRole}
            options={[
              { label: "User", value: "user" },
              { label: "System", value: "system" },
              { label: "Assistant", value: "assistant" },
            ]}
            value={role}
          />
        </div>
        <TextField onChange={setContent} rows={16} value={content} />
      </Dialog>
    </>
  );

  function onClose() {
    props.onClose();
    setRole(props.message.role);
    setContent(props.message.content);
  }

  function onUpdate() {
    props.onChange({ role, content: content.trim() });
    props.onClose();
  }
}

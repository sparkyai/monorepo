"use client";

import Close from "@components/icon/close";
import Edit from "@components/icon/edit";
import Remove from "@components/icon/remove";
import Portal from "@components/portal";

type MessageProps = {
  role: string;
  show: boolean;
  onOpen: () => void;
  content: string;
  onClose: () => void;
  onRemove: () => void;
  onChangeRole: (role: string) => void;
  onChangeContent: (content: string) => void;
};

export default function Message(props: MessageProps) {
  return (
    <>
      <div className="group flex gap-3 rounded-md bg-stone-800 px-3 py-3">
        {/*<button className="cursor-grab active:cursor-grabbing" type="button">*/}
        {/*  <Grip size={20} />*/}
        {/*</button>*/}
        <span className="font-bold capitalize">{props.role} prompt</span>
        <div className="ml-auto flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100">
          <button
            className="p-1 transition-colors hover:text-blue-400 active:text-blue-400"
            onClick={() => {
              props.onOpen();
            }}
            type="button"
          >
            <Edit size={16} />
          </button>
          <button
            className="p-1 transition-colors hover:text-red-400 active:text-red-400"
            onClick={props.onRemove}
            type="button"
          >
            <Remove size={16} />
          </button>
        </div>
      </div>
      <Portal>
        {props.show && (
          <div className="fixed inset-0 flex bg-stone-950/75">
            <div className="m-auto flex w-full max-w-screen-sm flex-col gap-4 rounded-xl bg-stone-800 p-4">
              <header className="mb-6 flex justify-between gap-3">
                <h2 className="text-2xl font-bold capitalize">edit context prompt</h2>
                <button
                  className="p-1.5 transition-colors hover:text-red-400 active:text-red-400"
                  onClick={() => {
                    props.onClose();
                  }}
                  type="button"
                >
                  <Close size={20} />
                </button>
              </header>
              <label className="flex items-center justify-between gap-3">
                <span className="font-medium">Role</span>
                <select
                  className="rounded-md bg-stone-700 px-3 py-1.5"
                  onChange={(e) => {
                    props.onChangeRole(e.currentTarget.value);
                  }}
                  value={props.role}
                >
                  <option value="user">User</option>
                  <option value="system">System</option>
                  <option value="assistant">Assistant</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-medium">Prompt</span>
                <textarea
                  className="rounded-md bg-stone-700 px-3 py-1.5"
                  onChange={(e) => {
                    props.onChangeContent(e.currentTarget.value);
                  }}
                  rows={16}
                  value={props.content}
                />
              </label>
            </div>
          </div>
        )}
      </Portal>
    </>
  );
}

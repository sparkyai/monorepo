"use client";

import { useState } from "react";
import Dialog from "@components/common/dialog";
import ButtonPrimary from "@components/button/button-primary";
import ButtonDanger from "@components/button/button-danger";
import Remove from "@components/icon/remove";

type DeleteDialogProps = {
  title: string;
  onDelete: () => void;
  description: string;
};

export default function DeleteDialog(props: DeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="p-1.5 transition-colors hover:text-red-400 active:text-red-400" onClick={onOpen} type="button">
        <Remove size={16} />
      </button>
      <Dialog
        footer={
          <>
            <ButtonPrimary className="w-0 grow" onClick={onClose} size="lg">
              Cancel
            </ButtonPrimary>
            <ButtonDanger className="w-0 grow" onClick={onDelete} size="lg">
              Delete
            </ButtonDanger>
          </>
        }
        onClose={onClose}
        open={isOpen}
        title={props.title}
      >
        <div className="col-span-2 flex flex-col gap-1">
          {props.description.split(/\n+/).map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function onDelete() {
    props.onDelete();
    onClose();
  }
}

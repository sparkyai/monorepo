"use client";

import { useState, useTransition } from "react";
import Dialog from "@components/common/dialog";
import Remove from "@components/icon/remove";
import IconButtonDanger from "@components/button/icon-button-danger";
import Loader from "@components/common/loader";
import { deleteImageTemplate } from "@lib/actions/image/template";

type DeleteTemplateProps = {
  template: {
    id: number;
    name: string;
  };
};

export default function DeleteTemplate(props: DeleteTemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <IconButtonDanger className="-my-1.5" onClick={onOpen}>
        <Remove size={16} />
      </IconButtonDanger>
      <Dialog className="gap-2" onClose={onClose} onDelete={onDelete} open={isOpen} title="Delete Template">
        <p>Are you sure you want to delete the &ldquo;{props.template.name}&rdquo; template?</p>
        {isPending && <Loader className="absolute inset-0 bg-slate-950/60" />}
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
    startTransition(async () => {
      const response = await deleteImageTemplate(props.template.id);

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      onClose();
    });
  }
}

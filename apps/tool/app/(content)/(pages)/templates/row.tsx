"use client";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NextLink from "next/link";
import Remove from "@components/icon/remove";
import { deleteTemplate } from "@lib/actions/template";
import Dialog from "@components/common/dialog";
import ButtonPrimary from "@components/button/button-primary";
import ButtonDanger from "@components/button/button-danger";

type TableRowProps = {
  id?: number;
  name?: string;
  category?: string;
  language?: string;
  className?: string;
};

export default function TableRow(props: TableRowProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={twMerge("flex items-center gap-2 border-t border-slate-700 px-4 py-2 first:border-0", props.className)}
    >
      {props.id ? (
        <NextLink className="w-32 grow" href={`/templates/${props.id}`}>
          {props.name}
        </NextLink>
      ) : (
        <span className="w-32 grow">{props.name || "Name"}</span>
      )}
      <span className="w-32 grow">{props.category || "Category"}</span>
      <span className="w-32 grow">{props.language || "Language"}</span>
      <div className="flex w-7 gap-2">
        {props.id && (
          <button
            className="p-1.5 transition-colors hover:text-red-400 active:text-red-400"
            onClick={onOpen}
            type="button"
          >
            <Remove size={16} />
          </button>
        )}
      </div>
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
        title="Delete template"
      >
        <p>Are you sure you want to delete the template?</p>
      </Dialog>
    </div>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function onDelete() {
    props.id &&
      void deleteTemplate(props.id).then(() => {
        router.refresh();
      });
  }
}

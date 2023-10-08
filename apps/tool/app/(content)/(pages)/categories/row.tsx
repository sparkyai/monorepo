"use client";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Remove from "@components/icon/remove";
import { deleteCategory } from "@lib/actions/category";
import Dialog from "@components/common/dialog";
import ButtonPrimary from "@components/button/button-primary";
import ButtonDanger from "@components/button/button-danger";

type CategoryRowProps = {
  id?: number;
  name?: string;
  language?: string;
  templates?: number;
  className?: string;
};

export default function CategoryRow(props: CategoryRowProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={twMerge("flex items-center gap-2 border-t border-slate-700 px-4 py-2 first:border-0", props.className)}
    >
      <span className="w-32 grow">{props.name || "Name"}</span>
      <span className="w-32 grow">{props.language || "Language"}</span>
      <span className="w-32 grow">
        {typeof props.templates === "number" ? `${props.templates} Templates` : "Templates"}
      </span>
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
        title="Delete category"
      >
        <p>Templates in this category will also be deleted. Are you sure you want to delete the category?</p>
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
      void deleteCategory(props.id).then(() => {
        router.refresh();
      });
  }
}

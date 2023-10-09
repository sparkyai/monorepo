"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Dialog from "@components/common/dialog";
import ButtonPrimary from "@components/button/button-primary";
import { deleteCategory } from "@lib/actions/category";
import ButtonDanger from "@components/button/button-danger";
import Remove from "@components/icon/remove";

type RemoveCategoryProps = {
  category: {
    id: number;
  };
};

export default function RemoveCategory(props: RemoveCategoryProps) {
  const router = useRouter();

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
        title="Delete category"
      >
        <p>Templates in this category will also be deleted. Are you sure you want to delete the category?</p>
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
    void deleteCategory(props.category.id).then(() => {
      router.refresh();
      onClose();
    });
  }
}

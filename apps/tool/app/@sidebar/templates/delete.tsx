"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Close from "@components/icon/close";
import Portal from "@components/portal";
import Remove from "@components/icon/remove";
import { deleteCategory } from "@lib/actions/category";

type CategoryDeleteProps = {
  id: number;
  name: string;
};

export default function CategoryDelete(props: CategoryDeleteProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="p-1.5 transition-colors hover:text-red-400 active:text-red-400"
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
      >
        <Remove size={16} />
      </button>
      <Portal>
        {isOpen && (
          <div className="fixed inset-0 flex bg-stone-950/75">
            <div className="m-auto flex w-full max-w-xs flex-col gap-4 rounded-xl bg-stone-800 p-4">
              <header className="col-span-2 mb-3 flex justify-between gap-3">
                <h2 className="text-2xl font-bold capitalize">delete category</h2>
                <button
                  className="p-1.5 transition-colors hover:text-red-400 active:text-red-400"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  type="button"
                >
                  <Close size={20} />
                </button>
              </header>

              <p>All templates in the category will be deleted</p>

              <div className="flex gap-3">
                <button
                  className="w-0 grow cursor-pointer rounded-lg border-4 border-red-500 bg-red-500 px-4 py-2 font-semibold transition-colors hover:border-red-600 hover:bg-red-600 active:border-red-600 active:bg-red-600"
                  onClick={() => {
                    void deleteCategory(props.id).then(() => {
                      router.refresh();
                    });
                  }}
                  type="button"
                >
                  Delete
                </button>
                <button
                  className="w-0 grow cursor-pointer rounded-lg border-4 border-stone-500 bg-stone-500 px-4 py-2 font-semibold transition-colors hover:border-stone-600 hover:bg-stone-600 active:border-stone-600 active:bg-stone-600"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Portal>
    </>
  );
}

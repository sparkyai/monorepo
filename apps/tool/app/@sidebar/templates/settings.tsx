"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateCategory } from "@lib/actions/category";
import Close from "@components/icon/close";
import Edit from "@components/icon/edit";
import Portal from "@components/portal";

type CategorySettingsProps = {
  id: number;
  name: string;
};

export default function CategorySettings(props: CategorySettingsProps) {
  const router = useRouter();

  const [name, setName] = useState(props.name);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.name !== name) {
        void updateCategory(props.id, name).then(() => {
          router.refresh();
        });
      }
    }, 700);

    return function cancel() {
      clearTimeout(timer);
    };
  }, [router, props, name]);

  return (
    <>
      <button
        className="ml-auto p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
      >
        <Edit size={16} />
      </button>
      <Portal>
        {isOpen && (
          <div className="fixed inset-0 flex bg-stone-950/75">
            <div className="m-auto flex w-full max-w-xs flex-col gap-4 rounded-xl bg-stone-800 p-4">
              <header className="col-span-2 mb-3 flex justify-between gap-3">
                <h2 className="text-2xl font-bold capitalize">edit category</h2>
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

              <label className="flex flex-col gap-2">
                <span className="font-medium">Name</span>
                <input
                  className="rounded-md bg-stone-700 px-3 py-1.5"
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                  type="text"
                  value={name}
                />
              </label>
            </div>
          </div>
        )}
      </Portal>
    </>
  );
}

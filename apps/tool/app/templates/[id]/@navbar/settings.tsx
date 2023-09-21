"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateTemplate } from "@lib/actions/template";
import Edit from "@components/icon/edit";
import Portal from "@components/portal";
import Close from "@components/icon/close";
import TemplateNavbarTextFiled from "./text-field";
import TemplateNavbarCategoryField from "./category-field";

type TemplateNavbarSettingsProps = {
  template: {
    id: number;
    name: string;
    category?: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
};

export default function TemplateNavbarSettings(props: TemplateNavbarSettingsProps) {
  const router = useRouter();

  const [name, setName] = useState(props.template.name);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(props.template.category || "");

  useEffect(() => {
    setCategory(props.template.category || "");
  }, [props]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const categoryName = category.trim();

      if (props.template.name !== name || (categoryName && props.template.category !== categoryName)) {
        void updateTemplate(props.template.id, { name, category: categoryName }).then(() => {
          router.refresh();
        });
      }
    }, 700);

    return function cancel() {
      clearTimeout(timer);
    };
  }, [router, props, name, category]);

  return (
    <>
      <button
        className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
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
            <div className="row-auto m-auto grid w-full max-w-screen-sm grid-cols-2 gap-4 rounded-xl bg-stone-800 p-4">
              <header className="col-span-2 mb-3 flex justify-between gap-3">
                <h2 className="text-2xl font-bold capitalize">edit template</h2>
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

              <TemplateNavbarTextFiled name="Name" onChange={setName} value={name} />
              <TemplateNavbarCategoryField
                categories={props.categories}
                name="Category"
                onChange={setCategory}
                value={category}
              />
            </div>
          </div>
        )}
      </Portal>
    </>
  );
}

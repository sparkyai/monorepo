"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import Edit from "@components/icon/edit";
import { updateChatRole, updateChatRolePoster } from "@lib/actions/chat";
import Loader from "@components/common/loader";
import ImageField from "@components/form/image-field";
import usePoster from "@lib/hooks/use-poster";

type UpdateDialogProps = {
  role: {
    id: number;
    name: string;
    poster: null | {
      url: string;
    };
    category: {
      id: number;
      name: string;
    };
    language: {
      id: number;
      name: string;
    };
    description: null | string;
  };
  languages: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function UpdateDialog(props: UpdateDialogProps) {
  const router = useRouter();

  const [name, setName] = useState(props.role.name);
  const [poster, setPoster, resetPoster] = usePoster(props.role.poster?.url);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(props.role.category.id.toString());
  const [language, setLanguage] = useState(props.role.language.id.toString());
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState(props.role.description || "");

  return (
    <>
      <button
        className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
        onClick={onOpen}
        type="button"
      >
        <Edit size={16} />
      </button>
      <Dialog
        footer={
          <ButtonPrimary
            className="ml-auto"
            disabled={
              name.trim() === props.role.name &&
              description.trim() === (props.role.description || "") &&
              category === props.role.category.id.toString() &&
              language === props.role.language.id.toString() &&
              typeof poster === typeof props.role.poster &&
              poster?.name === props.role.poster?.url
            }
            onClick={onUpdate}
          >
            Update
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        size="lg"
        title="Update role"
      >
        <FieldGroup className="col-span-1" label="Name">
          <TextField onChange={setName} value={name} />
        </FieldGroup>
        <FieldGroup className="col-span-1 col-start-1" label="Category">
          <SelectField
            onChange={setCategory}
            options={props.categories.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            value={category}
          />
        </FieldGroup>
        <FieldGroup className="col-span-1" label="Language">
          <SelectField
            onChange={setLanguage}
            options={props.languages.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            value={language}
          />
        </FieldGroup>
        <FieldGroup className="col-span-2" label="Poster">
          <ImageField className="aspect-video" onChange={setPoster} value={poster} />
        </FieldGroup>
        <FieldGroup className="col-span-2" label="Description">
          <TextField onChange={setDescription} rows={7} value={description} />
        </FieldGroup>
      </Dialog>
      {(isLoading || isPending) && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/75">
          <Loader className="m-auto" />
        </div>
      )}
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);

    setName(props.role.name);
    resetPoster();
    setCategory(props.role.category.id.toString());
    setLanguage(props.role.language.id.toString());
    setDescription(props.role.description || "");
  }

  function onUpdate() {
    setIsLoading(true);

    const data = {
      name,
      category: parseInt(category),
      language: parseInt(language),
      description,
    };

    void updateChatRole(props.role.id, data).then(() => {
      const form = new FormData();
      let promise = Promise.resolve();

      if (poster && poster.name !== props.role.poster?.url) {
        form.append("poster", poster);

        promise = updateChatRolePoster(props.role.id, form);
      } else if (props.role.poster && !poster) {
        promise = updateChatRolePoster(props.role.id, form);
      }

      void promise.then(() => {
        setIsLoading(false);
        setIsOpen(false);

        startTransition(() => {
          router.refresh();
        });
      });
    });
  }
}

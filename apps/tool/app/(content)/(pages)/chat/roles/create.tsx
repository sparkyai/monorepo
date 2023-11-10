"use client";

import { useState } from "react";
import ButtonPrimary from "@components/button/button-primary";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import type { ChatRole } from "@lib/actions/chat";

type CreateDialogProps = {
  onCreate: (data: ChatRole) => void;
  languages: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function CreateDialog(props: CreateDialogProps) {
  const [name, setName] = useState("");
  // const [poster, setPoster, resetPoster] = usePoster();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <ButtonPrimary className="ml-auto truncate" onClick={onOpen}>
        New Role
      </ButtonPrimary>
      <Dialog
        footer={
          <ButtonPrimary className="ml-auto" disabled={!name.trim() || !category || !language} onClick={onCreate}>
            Create
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        size="lg"
        title="Create role"
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
        {/*<FieldGroup className="col-span-2" label="Poster">*/}
        {/*  <ImageField className="aspect-video" onChange={setPoster} value={poster} />*/}
        {/*</FieldGroup>*/}
        <FieldGroup className="col-span-2" label="Description">
          <TextField onChange={setDescription} rows={7} value={description} />
        </FieldGroup>
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);

    setName("");
    // resetPoster();
    setCategory("");
    setLanguage("");
    setDescription("");
  }

  function onCreate() {
    props.onCreate({
      name,
      // poster,
      category: parseInt(category),
      language: parseInt(language),
      description,
    });

    onClose();
  }
}

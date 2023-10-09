"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonPrimary from "@components/button/button-primary";
import TextField from "@components/form/text-field";
import FieldGroup from "@components/form/field-group";
import SelectField from "@components/form/select-field";
import Dialog from "@components/common/dialog";
import { createRole } from "@lib/actions/role";

type CreateTemplateProps = {
  languages: {
    id: number;
    name: string;
    code: string;
  }[];
};

export default function CreateRole(props: CreateTemplateProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("");

  return (
    <>
      <ButtonPrimary className="ml-auto" onClick={onOpen}>
        New Role
      </ButtonPrimary>
      <Dialog
        footer={
          <ButtonPrimary className="ml-auto" disabled={!name || !language} onClick={onCreate}>
            Create
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        title="Create role"
      >
        <FieldGroup label="Name">
          <TextField onChange={setName} value={name} />
        </FieldGroup>
        <FieldGroup label="Language">
          <SelectField
            onChange={setLanguage}
            options={props.languages.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            value={language}
          />
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
    setLanguage("");
  }

  function onCreate() {
    void createRole(name, parseInt(language)).then((role) => {
      router.refresh();
      router.push(`/roles/${role.id}`);
    });
  }
}

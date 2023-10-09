"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Edit from "@components/icon/edit";
import TextField from "@components/form/text-field";
import SelectField from "@components/form/select-field";
import ButtonPrimary from "@components/button/button-primary";
import FieldGroup from "@components/form/field-group";
import { updateRole } from "@lib/actions/role";
import Dialog from "@components/common/dialog";

type RoleEditorProps = {
  role: {
    id: number;
    name: string;
    language: {
      id: number;
    };
  };
  languages: {
    id: number;
    name: string;
  }[];
};

export default function RoleEditor(props: RoleEditorProps) {
  const router = useRouter();

  const [name, setName] = useState(props.role.name);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(props.role.language.id.toString());

  useEffect(() => {
    setName(props.role.name);
    setLanguage(props.role.language.id.toString());
  }, [props]);

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
      <Dialog
        footer={
          <ButtonPrimary
            className="ml-auto"
            disabled={name === props.role.name && (!language || props.role.language.id.toString() === language)}
            onClick={onUpdate}
          >
            Save
          </ButtonPrimary>
        }
        onClose={onClose}
        open={isOpen}
        title="Edit template"
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

  function onUpdate() {
    void updateRole(props.role.id, { name, language: parseInt(language) }).then(() => {
      router.refresh();
      onClose();
    });
  }

  function onClose() {
    setIsOpen(false);
  }
}

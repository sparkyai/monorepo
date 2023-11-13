"use client";

import SidebarGroup from "@components/sidebar/group";
import { getTemplateParameters } from "@lib/utils/model";
import FieldGroup from "@components/form/field-group";
import { GenerationParameter } from "./generation";

type InputProps = {
  messages: {
    id: string;
    role: string;
    content: string;
  }[];
};

export default function Input(props: InputProps) {
  const parameters = getTemplateParameters(props.messages);

  if (!parameters.length) {
    return null;
  }

  return (
    <SidebarGroup className="-mx-4 overflow-y-auto px-4" name="Parameters">
      {parameters.map((name) => (
        <FieldGroup key={name} label={name}>
          <GenerationParameter name={name} />
        </FieldGroup>
      ))}
    </SidebarGroup>
  );
}

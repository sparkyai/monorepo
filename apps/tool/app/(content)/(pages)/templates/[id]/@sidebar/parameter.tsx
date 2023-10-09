"use client";

import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import { usePreviewParam } from "../preview";

type TemplateSidebarParameterProps = {
  name: string;
};

export default function TemplateSidebarParameter(props: TemplateSidebarParameterProps) {
  const [value, setValue] = usePreviewParam<string>(props.name);

  return (
    <FieldGroup label={props.name}>
      <TextField name={props.name} onChange={setValue} value={value || ""} />
    </FieldGroup>
  );
}

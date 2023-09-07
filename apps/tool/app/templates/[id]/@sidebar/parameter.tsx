"use client";

import { usePreviewParam } from "../preview";
import TemplateSidebarTextFiled from "./text-field";

type TemplateSidebarParameterProps = {
  name: string;
};

export default function TemplateSidebarParameter(props: TemplateSidebarParameterProps) {
  const [value, setValue] = usePreviewParam<string>(props.name);

  return <TemplateSidebarTextFiled name={props.name} onChange={setValue} value={value || ""} />;
}

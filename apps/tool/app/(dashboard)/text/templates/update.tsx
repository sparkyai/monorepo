"use client";

import { useRouter } from "next/navigation";
import Edit from "@components/icon/edit";
import IconButtonSuccess from "@components/button/icon-button-success";

type UpdateTemplateProps = {
  template: {
    id: number;
  };
};

export default function UpdateTemplate(props: UpdateTemplateProps) {
  const router = useRouter();

  return (
    <IconButtonSuccess className="-my-1.5" onClick={onUpdate}>
      <Edit size={16} />
    </IconButtonSuccess>
  );

  function onUpdate() {
    router.push(`/text/templates/${props.template.id}`);
  }
}

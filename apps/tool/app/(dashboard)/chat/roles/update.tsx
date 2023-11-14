"use client";

import { useRouter } from "next/navigation";
import Edit from "@components/icon/edit";
import IconButtonSuccess from "@components/button/icon-button-success";

type UpdateRoleProps = {
  role: {
    id: number;
  };
};

export default function UpdateRole(props: UpdateRoleProps) {
  const router = useRouter();

  return (
    <IconButtonSuccess className="-my-1.5" onClick={onUpdate}>
      <Edit size={16} />
    </IconButtonSuccess>
  );

  function onUpdate() {
    router.push(`/chat/roles/${props.role.id}`);
  }
}

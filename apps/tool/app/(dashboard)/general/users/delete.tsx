"use client";

import { useState, useTransition } from "react";
import Dialog from "@components/common/dialog";
import Remove from "@components/icon/remove";
import IconButtonDanger from "@components/button/icon-button-danger";
import Loader from "@components/common/loader";
import { deleteUser } from "@lib/actions/general/user";

type DeleteUserProps = {
  user?: {
    id: number;
  };
};

export default function DeleteUser(props: DeleteUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <IconButtonDanger className="-my-1.5" disabled={!props.user} onClick={onOpen}>
        <Remove size={16} />
      </IconButtonDanger>
      <Dialog className="gap-2" onClose={onClose} onDelete={onDelete} open={isOpen} title="Delete User">
        <p>Are you sure you want to delete the user?</p>
        {isPending && <Loader className="absolute inset-0 bg-slate-950/60" />}
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function onDelete() {
    startTransition(async () => {
      if (props.user) {
        const response = await deleteUser(props.user.id);

        if (response.error) {
          throw new Error(JSON.stringify(response.error, void 0, 2));
        }
      }

      onClose();
    });
  }
}

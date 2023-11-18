"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import ButtonPrimary from "@components/button/button-primary";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import { inviteUser } from "@lib/actions/general/user";

export default function InviteUser() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");

  return (
    <>
      <ButtonPrimary className="ml-auto truncate" onClick={onOpen}>
        Invite
      </ButtonPrimary>
      <Dialog
        canInvite={Boolean(email)}
        className="gap-2"
        onClose={onClose}
        onInvite={onCreate}
        open={isOpen}
        title="Create Category"
      >
        <FieldGroup className="col-span-full" label="Email">
          <TextField onChange={setEmail} value={email} />
        </FieldGroup>
        {isPending && <Loader className="absolute inset-0 bg-slate-950/60" />}
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);

    setEmail("");
  }

  function onCreate() {
    startTransition(async () => {
      const response = await inviteUser({ email });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.replace(pathname);
      onClose();
    });
  }
}

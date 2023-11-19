"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Dialog from "@components/common/dialog";
import Loader from "@components/common/loader";
import ButtonPrimary from "@components/button/button-primary";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import { createToken } from "@lib/actions/general/token";

export default function CreateToken() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");

  return (
    <>
      <ButtonPrimary className="ml-auto truncate" onClick={onOpen}>
        Create
      </ButtonPrimary>
      <Dialog
        canCreate={Boolean(name)}
        className="gap-2"
        onClose={onClose}
        onCreate={onCreate}
        open={isOpen}
        title="Create Token"
      >
        <FieldGroup className="col-span-full" label="Name">
          <TextField onChange={setName} value={name} />
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

    setName("");
  }

  function onCreate() {
    startTransition(async () => {
      const response = await createToken({ name });

      if (response.error) {
        throw new Error(JSON.stringify(response.error, void 0, 2));
      }

      router.replace(pathname);
      onClose();
    });
  }
}

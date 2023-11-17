"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Dialog from "@components/common/dialog";
import FieldGroup from "@components/form/field-group";
import Loader from "@components/common/loader";
import ButtonPrimary from "@components/button/button-primary";
import { userTopUp } from "@lib/actions/telegram/user";
import NumberField from "@components/form/number-field";

type UserTopUpProps = {
  user: {
    id: bigint;
  };
};

export default function UserTopUp(props: UserTopUpProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [tokens, setTokens] = useState(0);

  return (
    <>
      <ButtonPrimary className="-my-1.5" onClick={onOpen}>
        Top Up
      </ButtonPrimary>
      <Dialog onClose={onClose} onTopUp={onTopUp} open={isOpen} title="Top Up User Balance">
        <FieldGroup className="col-span-full" label="Tokens">
          <NumberField onChange={setTokens} value={tokens} />
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

    setTokens(0);
  }

  function onTopUp() {
    startTransition(async () => {
      await userTopUp(props.user.id, tokens);
      router.refresh();
      onClose();
    });
  }
}

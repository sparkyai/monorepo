"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";
import Dialog from "@components/common/dialog";
import IconButtonPrimary from "@components/button/icon-button-primary";
import Bank from "@components/icon/bank";

export default function UserPayments(props: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButtonPrimary className="-my-1.5" onClick={onOpen}>
        <Bank size={16} />
      </IconButtonPrimary>
      <Dialog className="max-w-screen-md" onClose={onClose} open={isOpen} title="User Payments">
        {props.children}
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }
}

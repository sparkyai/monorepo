"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";
import Dialog from "@components/common/dialog";
import IconButtonPrimary from "@components/button/icon-button-primary";
import Briefcase from "@components/icon/briefcase";

export default function UserReferrals(props: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButtonPrimary className="-my-1.5" onClick={onOpen}>
        <Briefcase size={16} />
      </IconButtonPrimary>
      <Dialog className="max-w-screen-sm" onClose={onClose} open={isOpen} title="User Referrals">
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

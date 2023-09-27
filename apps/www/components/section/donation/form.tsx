"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import TextField from "components/form/text-field";
import ButtonBlueFilled from "components/button/button-blue-filled";
import { createDonation } from "lib/action/donation";
import Spinner from "components/common/spinner";

type DonationFormProps = {
  onSend: VoidFunction;
  amount?: number;
  translation: {
    action: string;
    dialog: {
      title: string;
      action: string;
    };
    fields: Record<
      string,
      {
        label: string;
        placeholder: string;
      }
    >;
    loading: string;
  };
};

export default function DonationForm(props: DonationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const isDisabled = typeof props.amount !== "number";

  return (
    <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <Dialog.Trigger
        className={twMerge(
          "inline-flex cursor-pointer justify-center self-end rounded-sm border border-blue-500 bg-blue-500 px-5 py-3.5 text-lg font-semibold leading-5 transition-colors hover:border-blue-400 hover:bg-blue-400 active:border-blue-400 active:bg-blue-400",
          isDisabled &&
            "cursor-not-allowed border-gray-300 bg-gray-300 text-gray-200 hover:border-gray-300 hover:bg-gray-300 active:border-gray-300 active:bg-gray-300",
        )}
        disabled={isDisabled}
      >
        {props.translation.action}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-gray-900/60" />
        <Dialog.Content asChild>
          <form className="fixed left-1/2 top-1/2 z-50 flex w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-gray-500 p-6 transition-all focus:outline-0 sm:p-12">
            <Dialog.Title asChild>
              <h2 className="text-3xl font-semibold">{props.translation.dialog.title}</h2>
            </Dialog.Title>
            <div className="mb-7 mt-9 flex flex-col gap-6">
              <TextField
                hasError={hasError}
                label={props.translation.fields.name.label}
                name="name"
                onChange={setName}
                placeholder={props.translation.fields.name.placeholder}
                required
                value={name}
              />
              <TextField
                hasError={hasError}
                label={props.translation.fields.email.label}
                name="email"
                onChange={setEmail}
                placeholder={props.translation.fields.email.placeholder}
                required
                type="email"
                value={email}
              />
              <TextField
                label={props.translation.fields.message.label}
                name="message"
                onChange={setMessage}
                placeholder={props.translation.fields.message.placeholder}
                rows={5}
                value={message}
              />
            </div>
            <ButtonBlueFilled onClick={onSubmit} type="button">
              {props.translation.dialog.action} {props.amount}$
            </ButtonBlueFilled>

            {isPending && (
              <div className="fixed inset-0 z-50 flex bg-gray-500/75">
                <Spinner label={props.translation.loading} />
              </div>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );

  function onSubmit() {
    if (props.amount) {
      setHasError(false);
      setIsPending(true);

      const donation = {
        ccy: 840,
        name,
        email,
        amount: props.amount,
        message,
      };

      createDonation(donation)
        .then(
          (url) => {
            window.open(url, "_blank", "noreferrer");

            props.onSend();
            setName("");
            setEmail("");
            setIsOpen(false);
            setMessage("");
          },
          () => {
            setHasError(true);
          },
        )
        .finally(() => {
          setIsPending(false);
        });
    }
  }
}

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import ButtonBlueFilled from "components/button/button-blue-filled";
import LongText from "components/typography/logn-text";
import TextField from "components/form/text-field";
import Spinner from "components/common/spinner";
import { save } from "lib/action/feedback";

type FormProps = {
  submitLabel: string;
  translation: {
    title: string;
    fields: Record<
      string,
      {
        label: string;
        placeholder: string;
      }
    >;
    dialog: {
      success: {
        text: string;
        title: string;
        action: string;
      };
    };
    loading: string;
  };
};

export default function Form({ translation, submitLabel }: FormProps) {
  const form = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isPending || isOpen}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- correct */}
      <form action={onSubmit} className="flex flex-col p-5 sm:p-12 lg:w-1/2" ref={form}>
        <h2 className="text-3xl font-semibold">{translation.title}</h2>
        <div className="mb-7 mt-9 flex flex-col gap-6">
          <TextField
            hasError={hasError}
            label={translation.fields.name.label}
            name="name"
            placeholder={translation.fields.name.placeholder}
            required
          />
          <TextField
            hasError={hasError}
            label={translation.fields.email.label}
            name="email"
            placeholder={translation.fields.email.placeholder}
            required
            type="email"
          />
          <TextField
            hasError={hasError}
            label={translation.fields.message.label}
            name="message"
            placeholder={translation.fields.message.placeholder}
            required
            rows={5}
          />
        </div>
        <ButtonBlueFilled type="submit">{submitLabel}</ButtonBlueFilled>
      </form>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-gray-900/60" />
        {isPending ? (
          <div className="fixed inset-0 z-50 flex">
            <Spinner label={translation.loading} />
          </div>
        ) : (
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex w-11/12 max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-gray-500 p-6 transition-all focus:outline-none">
            <header className="flex">
              <Dialog.Title className="grow truncate text-xl font-semibold">
                {translation.dialog.success.title}
              </Dialog.Title>
              <Dialog.Close aria-label={translation.dialog.success.action} className="p-1 focus:outline-none">
                <svg fill="currentColor" height="22" viewBox="0 0 16 16" width="22">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </Dialog.Close>
            </header>
            <LongText className="my-2 text-sm text-gray-50">{translation.dialog.success.text}</LongText>
            <footer className="mt-4 flex justify-end">
              <ButtonBlueFilled
                aria-label={translation.dialog.success.action}
                className="!px-3 !py-1.5 !text-sm"
                onClick={onClose}
              >
                {translation.dialog.success.action}
              </ButtonBlueFilled>
            </footer>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );

  function onClose() {
    form.current?.reset();
    setIsOpen(false);
  }

  function onOpenChange(open: boolean) {
    !open && onClose();
  }

  async function onSubmit(data: FormData) {
    setIsOpen(true);
    setHasError(false);
    setIsPending(true);

    await save(data).catch(() => {
      setIsOpen(false);
      setHasError(true);
    });

    setIsPending(false);
  }
}

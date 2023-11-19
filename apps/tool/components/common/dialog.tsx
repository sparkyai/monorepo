import type { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Close from "@components/icon/close";
import Portal from "@components/common/portal";
import ButtonDanger from "@components/button/button-danger";
import IconButton from "@components/button/icon-button";
import ButtonPrimary from "@components/button/button-primary";

type DialogProps = PropsWithChildren<{
  title: string;
  open?: boolean;
  footer?: ReactNode;
  onClose?: VoidFunction;
  onTopUp?: VoidFunction;
  onCreate?: VoidFunction;
  onInvite?: VoidFunction;
  onUpdate?: VoidFunction;
  onDelete?: VoidFunction;
  className?: string;
  canCreate?: boolean;
  canInvite?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
}>;

export default function Dialog(props: DialogProps) {
  return (
    <Portal>
      {props.open && (
        <div className="fixed inset-0 z-30 flex overflow-auto bg-slate-950/75 p-4">
          <div
            className={twMerge(
              "max-w-sm",
              props.className,
              "relative m-auto grid w-full gap-4 rounded-xl bg-slate-800 p-4",
            )}
          >
            <header className="col-span-full mb-3 flex justify-between gap-3">
              <h2 className="grow truncate text-2xl font-bold">{props.title}</h2>
              <IconButton onClick={props.onClose}>
                <Close size={20} />
              </IconButton>
            </header>
            {props.children}
            {(props.onCreate || props.onInvite || props.onTopUp || props.onUpdate || props.onDelete) && (
              <footer className="col-span-full mt-6 flex justify-end gap-3">
                {props.onCreate && (
                  <ButtonPrimary
                    className="w-1/2"
                    disabled={typeof props.canCreate === "boolean" && !props.canCreate}
                    onClick={props.onCreate}
                    size="lg"
                  >
                    Create
                  </ButtonPrimary>
                )}
                {props.onInvite && (
                  <ButtonPrimary className="w-1/2" onClick={props.onInvite} size="lg">
                    Invite
                  </ButtonPrimary>
                )}
                {props.onTopUp && (
                  <ButtonPrimary className="w-1/2" onClick={props.onTopUp} size="lg">
                    Top Up
                  </ButtonPrimary>
                )}
                {props.onUpdate && (
                  <ButtonPrimary
                    className="w-1/2"
                    disabled={typeof props.canUpdate === "boolean" && !props.canUpdate}
                    onClick={props.onUpdate}
                    size="lg"
                  >
                    Update
                  </ButtonPrimary>
                )}
                {props.onDelete && (
                  <ButtonDanger
                    className="w-1/2"
                    disabled={typeof props.canDelete === "boolean" && !props.canDelete}
                    onClick={props.onDelete}
                    size="lg"
                  >
                    Delete
                  </ButtonDanger>
                )}
              </footer>
            )}
          </div>
        </div>
      )}
    </Portal>
  );
}

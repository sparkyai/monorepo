import type { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Close from "@components/icon/close";
import Portal from "@components/common/portal";

type DialogProps = PropsWithChildren<{
  title: string;
  open?: boolean;
  size?: "md" | "lg";
  footer?: ReactNode;
  onClose?: VoidFunction;
}>;

export default function Dialog(props: DialogProps) {
  return (
    <Portal>
      {props.open && (
        <div className="fixed inset-0 z-30 flex overflow-auto bg-slate-950/75 p-4">
          <div
            className={twMerge(
              "m-auto grid w-full max-w-sm grid-cols-2 gap-4 rounded-xl bg-slate-800 p-4",
              props.size && "max-w-xl",
            )}
          >
            <header className="col-span-2 mb-3 flex justify-between gap-3">
              <h2 className="text-2xl font-bold">{props.title}</h2>
              <button
                className="p-1.5 transition-colors hover:text-red-400 active:text-red-400"
                onClick={props.onClose}
                type="button"
              >
                <Close size={20} />
              </button>
            </header>
            {props.children}
            {props.footer && <footer className="col-span-2 mt-6 flex gap-3">{props.footer}</footer>}
          </div>
        </div>
      )}
    </Portal>
  );
}

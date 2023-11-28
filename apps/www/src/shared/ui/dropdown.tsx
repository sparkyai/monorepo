"use client";

import type { ComponentProps, Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const Context = createContext(
  {} as unknown as {
    id: string;
    rect: DOMRect;
    isOpen: boolean;
    setRect: Dispatch<SetStateAction<DOMRect>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  },
);

export function DropdownRoot(props: PropsWithChildren) {
  const id = `dropdown${useId()}`;
  const pathname = usePathname();

  const [rect, setRect] = useState({} as DOMRect);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return <Context.Provider value={{ id, rect, isOpen, setRect, setIsOpen }}>{props.children}</Context.Provider>;
}

export function DropdownTrigger(props: Omit<ComponentProps<"button">, "onFocus" | "tabIndex">) {
  const trigger = useRef<HTMLButtonElement>(null);

  const { id, isOpen, setRect, setIsOpen } = useContext(Context);

  useEffect(() => {
    function onMouseUp(event: MouseEvent) {
      for (const target of event.composedPath()) {
        if ((target as HTMLElement).id === id) {
          return;
        }
      }

      setIsOpen(false);

      if (trigger.current === event.target) {
        event.stopPropagation();
      }
    }

    if (isOpen) {
      window.addEventListener("click", onMouseUp, true);

      return function cancel() {
        window.removeEventListener("click", onMouseUp, true);
      };
    }
  }, [id, isOpen, setIsOpen]);

  return (
    <button
      aria-expanded={isOpen}
      onClick={(event) => {
        setRect(event.currentTarget.getBoundingClientRect());
        setIsOpen((state) => !state);
      }}
      type="button"
      {...props}
      ref={trigger}
    />
  );
}

export function DropdownContent(props: ComponentProps<"div">) {
  const { id, rect, isOpen } = useContext(Context);

  return isOpen ? (
    <div style={{ zIndex: 10, position: "absolute", marginTop: rect.height, marginLeft: rect.width / 2 }}>
      <div {...props} id={id} />
    </div>
  ) : null;
}

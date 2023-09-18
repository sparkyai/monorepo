"use client";

import type { ComponentProps, Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const Context = createContext(
  {} as unknown as {
    rect: DOMRect;
    isOpen: boolean;
    setRect: Dispatch<SetStateAction<DOMRect>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  },
);

export function DropdownRoot(props: PropsWithChildren) {
  const [rect, setRect] = useState({} as DOMRect);
  const [isOpen, setIsOpen] = useState(false);

  return <Context.Provider value={{ rect, isOpen, setRect, setIsOpen }}>{props.children}</Context.Provider>;
}

export function DropdownTrigger(props: Omit<ComponentProps<"button">, "onFocus" | "tabIndex">) {
  const ref = useRef<HTMLButtonElement>(null);
  const { isOpen, setRect, setIsOpen } = useContext(Context);

  useEffect(() => {
    function onMouseUp(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("click", onMouseUp);

    return function cancel() {
      window.removeEventListener("click", onMouseUp);
    };
  }, [setIsOpen]);

  return (
    <button
      aria-expanded={isOpen}
      onClick={(event) => {
        setRect(event.currentTarget.getBoundingClientRect());
        setIsOpen((state) => !state);
      }}
      ref={ref}
      type="button"
      {...props}
    />
  );
}

export function DropdownContent(props: ComponentProps<"div">) {
  const { rect, isOpen } = useContext(Context);

  return isOpen ? (
    <div style={{ zIndex: 10, position: "absolute", marginTop: rect.height, marginLeft: rect.width / 2 }}>
      <div {...props} />
    </div>
  ) : null;
}

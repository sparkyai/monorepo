"use client";

import { useEffect, useRef, useState } from "react";

type ProfileProps = {
  user: {
    name: string;
    surname: string;
  };
};

export default function Profile(props: ProfileProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onMouseUp(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener("mouseup", onMouseUp, true);

      return function cancel() {
        window.removeEventListener("mouseup", onMouseUp, true);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative flex items-center gap-2" ref={ref}>
      <button className="font-medium tracking-wider after:absolute after:inset-0" onClick={onClick} type="button">
        {props.user.name} {props.user.surname}
      </button>
      <div className="flex h-9 w-9 rounded-full bg-slate-700">
        <span className="m-auto font-bold uppercase tracking-wider">
          {props.user.name[0]}
          {props.user.surname[0]}
        </span>
      </div>
      {isOpen && (
        <div className="absolute inset-x-0 top-full z-10 mt-2 flex flex-col rounded-md border border-slate-600 bg-slate-700 p-1">
          <button
            className="rounded px-3 py-1 text-left transition-colors hover:bg-slate-600 active:bg-slate-600"
            onClick={closeHandler(() => void 0)}
            type="button"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );

  function onClick() {
    setIsOpen((state) => !state);
  }

  function closeHandler(listener: VoidFunction) {
    return function handler() {
      setIsOpen(false);
      listener();
    };
  }
}

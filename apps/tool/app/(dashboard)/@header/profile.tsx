"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

type ProfileProps = {
  user: {
    first_name: string;
    last_name: string;
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
      <button
        className="truncate font-medium tracking-wider after:absolute after:inset-0"
        onClick={onClick}
        type="button"
      >
        {props.user.first_name} {props.user.last_name}
      </button>
      <div className="flex h-9 w-9 rounded-full bg-slate-700">
        <span className="m-auto font-bold uppercase tracking-wider">
          {props.user.first_name[0]}
          {props.user.last_name[0]}
        </span>
      </div>
      {isOpen && (
        <div className="absolute inset-x-0 top-full z-10 mt-2 flex flex-col rounded-md border border-slate-600 bg-slate-700 p-1">
          <button
            className="rounded px-3 py-1 text-left transition-colors hover:bg-slate-600 active:bg-slate-600"
            onClick={onSignOut}
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

  function onSignOut() {
    setIsOpen(false);
    void signOut();
  }
}

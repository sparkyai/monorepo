"use client";

import type { PropsWithChildren, TransitionEvent } from "react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type CollapsibleProps = PropsWithChildren<{
  open?: boolean;
  className?: string;
}>;

export default function Collapsible(props: CollapsibleProps) {
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content.current) {
      const target = content.current;
      const height = `${target.scrollHeight}px`;

      if (props.open) {
        target.style.height = `${target.scrollHeight}px`;
        target.style.opacity = "1";
      } else {
        // eslint-disable-next-line no-multi-assign -- controlled
        target.style.height = content.current.style.opacity = "0";
      }

      return function cancel() {
        if (props.open) {
          target.style.height = height;
        }
      };
    }
  }, [props.open]);

  return (
    <div
      className={twMerge("overflow-y-hidden transition-all duration-500", props.className)}
      onTransitionEnd={onTransitionEnd}
      ref={content}
    >
      {props.children}
    </div>
  );

  function onTransitionEnd(event: TransitionEvent) {
    if (event.propertyName === "height" && props.open && content.current) {
      content.current.style.height = "auto";
    }
  }
}

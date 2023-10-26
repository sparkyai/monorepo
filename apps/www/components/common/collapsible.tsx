"use client";

import type { ComponentProps, JSX, JSXElementConstructor, PropsWithChildren, Ref, TransitionEvent } from "react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type CollapsibleProps = PropsWithChildren<{
  open?: boolean;
  className?: string;
  component?: keyof JSX.IntrinsicElements;
}>;

export default function Collapsible(props: CollapsibleProps) {
  const content = useRef<HTMLElement>(null);
  const Component = (props.component || "div") as unknown as JSXElementConstructor<
    ComponentProps<"div"> & {
      ref?: Ref<HTMLElement>;
    }
  >;

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
    <Component
      className={twMerge("overflow-y-hidden transition-all duration-500", props.className)}
      onTransitionEnd={onTransitionEnd}
      ref={content}
      style={{ height: 0 }}
    >
      {props.children}
    </Component>
  );

  function onTransitionEnd(event: TransitionEvent) {
    if (event.propertyName === "height" && props.open && content.current) {
      content.current.style.height = "auto";
    }
  }
}

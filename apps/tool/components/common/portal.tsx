import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export default function Portal(props: PropsWithChildren) {
  return typeof window === "undefined" ? null : createPortal(props.children, document.body);
}

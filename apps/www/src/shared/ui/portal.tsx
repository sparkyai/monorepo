"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal(props: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? createPortal(props.children, document.body) : null;
}

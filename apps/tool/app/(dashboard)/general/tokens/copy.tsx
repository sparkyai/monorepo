"use client";

import { useClipboard } from "@mantine/hooks";
import Copy from "@components/icon/copy";
import Check from "@components/icon/check";
import IconButtonPrimary from "@components/button/icon-button-primary";

type CopyTokenProps = {
  token: {
    key: string;
  };
};

export default function CopyToken(props: CopyTokenProps) {
  const clipboard = useClipboard();

  return (
    <IconButtonPrimary className="-my-1.5" onClick={onCopy}>
      {clipboard.copied ? <Check className="text-slate-50" size={16} /> : <Copy size={16} />}
    </IconButtonPrimary>
  );

  function onCopy() {
    clipboard.copy(props.token.key);
  }
}

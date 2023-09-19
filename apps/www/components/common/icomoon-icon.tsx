import "lib/icomoon/style.css";
import { twMerge } from "tailwind-merge";

type IcomoonIconProps = {
  name: string;
  className?: string;
};

export default function IcomoonIcon(props: IcomoonIconProps) {
  return <i className={twMerge(`icon-${props.name}`, props.className)} />;
}

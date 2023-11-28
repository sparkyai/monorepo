import { twMerge } from "tailwind-merge";
import "../style.css";

type IcomoonIconProps = {
  name: string;
  className?: string;
};

export default function IcomoonIcon(props: IcomoonIconProps) {
  return <i className={twMerge(`icon-${props.name}`, props.className)} />;
}

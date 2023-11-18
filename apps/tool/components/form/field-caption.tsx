import { twMerge } from "tailwind-merge";

type FieldGroupProps = {
  message: string;
  className?: string;
};

export default function FieldCaption(props: FieldGroupProps) {
  return <p className={twMerge(props.className, "text-xs tracking-wider")}>{props.message}</p>;
}

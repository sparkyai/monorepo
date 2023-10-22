import { twMerge } from "tailwind-merge";

type LoaderProps = {
  className?: string;
};

export default function Loader(props: LoaderProps) {
  return (
    <div className={twMerge("py-2", props.className, "flex items-center justify-center gap-1")}>
      <div className="animate-[bounce_1.2s_infinite_-.9s] pt-2">
        <div className="h-2 w-2 rounded-full bg-slate-400" />
      </div>
      <div className="animate-[bounce_1.2s_infinite_-.6s] pt-2">
        <div className="h-2 w-2 rounded-full bg-slate-400" />
      </div>
      <div className="animate-[bounce_1.2s_infinite_-.3s] pt-2">
        <div className="h-2 w-2 rounded-full bg-slate-400" />
      </div>
      <div className="animate-[bounce_1.2s_infinite] pt-2">
        <div className="h-2 w-2 rounded-full bg-slate-400" />
      </div>
    </div>
  );
}

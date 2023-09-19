import { twMerge } from "tailwind-merge";

type ProgressProps = {
  size: number;
  value: number;
  className?: string;
};

export default function Progress(props: ProgressProps) {
  const radius = 5;
  const stroke = 1;
  const dasharray = 2 * radius * Math.PI;

  return (
    <div className={twMerge("flex gap-2", props.className)}>
      <svg
        className="-rotate-90 self-center"
        height={props.size}
        viewBox={`0 0 ${(radius + stroke) * 2} ${(radius + stroke) * 2}`}
        width={props.size}
      >
        <circle
          className="stroke-gray-100"
          cx={radius + stroke}
          cy={radius + stroke}
          fill="transparent"
          r={radius}
          strokeLinecap="round"
          strokeWidth={stroke}
        />
        <circle
          className="stroke-current"
          cx={radius + stroke}
          cy={radius + stroke}
          fill="transparent"
          r={radius}
          strokeDasharray={(dasharray * props.value) / 100}
          strokeLinecap="round"
          strokeWidth={stroke}
        />
      </svg>
      <span className="truncate">{props.value}%</span>
    </div>
  );
}

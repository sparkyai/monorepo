type IconProps = {
  size: number;
  className?: string;
};

export default function Stop(props: IconProps) {
  return (
    <svg className={props.className} fill="currentColor" height={props.size} viewBox="0 0 16 16" width={props.size}>
      <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
    </svg>
  );
}

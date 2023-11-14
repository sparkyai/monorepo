type IconProps = {
  size: number;
  className?: string;
};

export default function ChevronRight(props: IconProps) {
  return (
    <svg className={props.className} fill="currentColor" height={props.size} viewBox="0 0 16 16" width={props.size}>
      <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
    </svg>
  );
}

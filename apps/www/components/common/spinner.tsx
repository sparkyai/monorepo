type SpinnerProps = {
  label: string;
};

export default function Spinner(props: SpinnerProps) {
  return (
    <div
      aria-label={props.label}
      className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent text-blue-400"
      role="status"
    >
      <span className="sr-only">{props.label}...</span>
    </div>
  );
}

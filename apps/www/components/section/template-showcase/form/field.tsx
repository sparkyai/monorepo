type FieldProps = {
  rows?: number;
  label: string;
  value: string;
};

export default function Field(props: FieldProps) {
  return (
    <div className="w-full">
      <span className="sm:text-md text-xs font-bold sm:font-normal md:text-lg">{props.label}</span>
      <textarea
        aria-label={props.label}
        className="mt-2.5 block w-full cursor-default resize-none rounded border border-gray-400 bg-gray-600 p-2 text-sm text-gray-50 focus:outline-none"
        readOnly
        rows={props.rows || 1}
        value={props.value}
      />
    </div>
  );
}

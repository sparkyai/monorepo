"use client";

type TemplateNavbarTextFiledProps = {
  name: string;
  value: string;
  onFocus?: () => void;
  onChange: (value: string) => void;
};

export default function TemplateNavbarTextFiled(props: TemplateNavbarTextFiledProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-medium">{props.name}</span>
      <input
        className="rounded-md bg-stone-700 px-3 py-1.5"
        onChange={(e) => {
          props.onChange(e.currentTarget.value);
        }}
        onFocus={props.onFocus}
        type="text"
        value={props.value}
      />
    </label>
  );
}

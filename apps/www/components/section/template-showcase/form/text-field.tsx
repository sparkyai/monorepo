import Field from "./field";

type ComponentTemplateTextFieldProps = {
  size: "short" | "long";
  name: string;
  string?: string;
  placeholder: string;
};

export default function TextField(props: ComponentTemplateTextFieldProps) {
  return (
    <Field label={props.name} rows={props.size === "short" ? void 0 : 5} value={props.string || props.placeholder} />
  );
}

import Field from "./field";

type ComponentTemplateNumberFieldProps = {
  name: string;
  number?: number;
  placeholder: string;
};

export default function NumberField(props: ComponentTemplateNumberFieldProps) {
  return <Field label={props.name} value={props.number?.toString() || props.placeholder} />;
}

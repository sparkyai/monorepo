import Field from "./field";

type ComponentTemplateSelectFieldProps = {
  name: string;
  string?: string;
  placeholder: string;
};

export default function SelectField(props: ComponentTemplateSelectFieldProps) {
  return <Field label={props.name} value={props.string || props.placeholder} />;
}

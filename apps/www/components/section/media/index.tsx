import Section from "components/layout/section";

export default function Media(props: unknown) {
  return (
    <Section>
      <pre className="overflow-hidden">{JSON.stringify(props, void 0, 2)}</pre>
    </Section>
  );
}

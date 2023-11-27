type LongTextProps = {
  children: string;
  className?: string;
};

export default function LongText(props: LongTextProps) {
  const lines = props.children.split("\n").filter(Boolean);

  return (
    <>
      {lines.map((text) => (
        <p className={props.className} key={text}>
          {text}
        </p>
      ))}
    </>
  );
}

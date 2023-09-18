import IcomoonIcon from "components/common/icomoon-icon";

type RatingProps = {
  value: number;
};

export default function Rating(props: RatingProps) {
  const items = "1"
    .repeat(props.value)
    .padEnd(5, "0")
    .slice(0, 5)
    .split("")
    .map((code, i) => ({
      id: `${code}-${i}`,
      code,
    }));

  return (
    <div className="mt-2 flex gap-1 text-[0.75rem] text-yellow-200">
      {items.map((item) =>
        item.code === "1" ? <IcomoonIcon key={item.id} name="star-fill" /> : <IcomoonIcon key={item.id} name="star" />,
      )}
    </div>
  );
}

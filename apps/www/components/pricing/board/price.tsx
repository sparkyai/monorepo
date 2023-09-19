type PriceProps = {
  label: {
    period: string;
  };
  amount: number;
  currency: string;
};

export default function Price(props: PriceProps) {
  return (
    <div className="flex items-center justify-center">
      <span className="text-4xl font-semibold">
        {props.amount.toLocaleString("en", {
          style: "currency",
          currency: props.currency,
        })}
      </span>
      <span className="text-lg text-gray-50">&nbsp;/ {props.label.period}</span>
    </div>
  );
}

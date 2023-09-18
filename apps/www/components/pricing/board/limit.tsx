type LimitProps = {
  words: {
    count: number;
    label: string;
  };
  users: {
    count: number;
    label: string;
  };
};

export default function Limit(props: LimitProps) {
  return (
    <div className="mb-3 mt-5 flex items-center justify-center gap-3">
      <span className="text-md font-semibold">
        {props.words.count.toLocaleString("en")} {props.words.label}
      </span>
      {/*<span className="text-gray-50 text-sm">*/}
      {/*  {props.users.count.toLocaleString("en")} {props.users.label}*/}
      {/*</span>*/}
    </div>
  );
}

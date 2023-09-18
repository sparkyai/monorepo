import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uk";

type LastModifiedProps = {
  locale: string;
  updatedAt: Date;
};

export default function LastModified(props: LastModifiedProps) {
  return (
    <time className="capitalize" dateTime={props.updatedAt.toISOString()}>
      {dayjs(props.updatedAt).locale(props.locale).format("DD MMMM YYYY")}
    </time>
  );
}

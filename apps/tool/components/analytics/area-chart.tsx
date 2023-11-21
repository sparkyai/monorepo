"use client";

import * as ReCharts from "recharts";
import dayjs from "@lib/utils/dayjs";
import { useAnalyticsData } from "./analytics";

function dayFormat(value: number) {
  return dayjs(value).format("DD/MM");
}

function yearFormat(value: number) {
  return dayjs(value).format("DD/MM/YYYY");
}

type AreaChartProps = {
  keys: Record<string, string>;
  name?: (key: string) => string;
};

export default function AreaChart(props: AreaChartProps) {
  const getName = props.name || ((key: string) => key.replace("_", " "));

  const [data, isLoading] = useAnalyticsData();

  if (isLoading) {
    return <div className="aspect-video animate-pulse rounded-md bg-slate-700" />;
  }

  return (
    <ReCharts.ResponsiveContainer aspect={16 / 9} className="aspect-video w-full">
      <ReCharts.AreaChart data={data}>
        <ReCharts.CartesianGrid strokeDasharray="3 3" />
        <ReCharts.XAxis
          dataKey="date"
          domain={[dayjs().add(-1, "month").valueOf(), dayjs().valueOf()]}
          tickFormatter={dayFormat}
          type="number"
        />
        <ReCharts.YAxis domain={[0, "auto"]} type="number" />
        <ReCharts.Legend />
        <ReCharts.Tooltip labelClassName="text-slate-800" labelFormatter={yearFormat} wrapperClassName="rounded-xl" />
        {Object.keys(props.keys).map((key) => (
          <ReCharts.Area
            dataKey={key}
            fill={props.keys[key]}
            key={key}
            name={getName(key)}
            stroke={props.keys[key]}
            type="monotone"
          />
        ))}
      </ReCharts.AreaChart>
    </ReCharts.ResponsiveContainer>
  );
}

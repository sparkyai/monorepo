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

  return (
    <div className="flex aspect-video">
      {isLoading ? (
        <div className="grow animate-pulse rounded-md bg-slate-700" />
      ) : (
        <ReCharts.ResponsiveContainer aspect={16 / 9} width="100%">
          <ReCharts.AreaChart data={data} height={9} width={16}>
            <ReCharts.CartesianGrid strokeDasharray="3 3" />
            <ReCharts.XAxis
              dataKey="date"
              domain={[dayjs().add(-1, "month").valueOf(), dayjs().valueOf()]}
              tickCount={500}
              tickFormatter={dayFormat}
              type="number"
            />
            <ReCharts.YAxis />
            <ReCharts.Legend />
            <ReCharts.Tooltip
              labelClassName="text-slate-800"
              labelFormatter={yearFormat}
              wrapperClassName="rounded-xl"
            />
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
      )}
    </div>
  );
}

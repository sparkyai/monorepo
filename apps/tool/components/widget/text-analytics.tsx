"use client";

import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import Widget from "@components/common/widget";
import SelectField from "@components/form/select-field";
import Loader from "@components/common/loader";
import AnalyticsDialog from "@components/dialog/analytics";

type Template = {
  id: number;
  name: string;
};

type Item = {
  date: string;
  like: number;
  dislike: number;
  generate: number;
  regenerate: number;
};

export default function TextAnalyticsWidget() {
  const [data, setData] = useState<Item[]>([]);
  const [period, setPeriod] = useState("month");
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const controller = new AbortController();

    void fetch(`/api/analytics/text?period=${period}`, { signal: controller.signal }).then(async (response) => {
      const { analytics, top } = await response.json();

      setTemplates(top);
      setData(
        analytics.map((item) => ({
          ...item,
          date: new Date(item.updated_at).toLocaleString("ru", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        })),
      );

      setIsLoading(false);
    });

    return function cancel() {
      controller.abort();

      setIsLoading(false);
    };
  }, [period]);

  return (
    <Widget>
      <div className="col-span-2 flex items-center justify-between px-4 pt-4">
        <h2 className="text-xl font-medium">Text</h2>
        <SelectField
          onChange={setPeriod}
          options={[
            { label: "last day", value: "day" },
            { label: "last week", value: "week" },
            { label: "last month", value: "month" },
            { label: "last year", value: "year" },
          ]}
          value={period}
        />
      </div>
      <div className="aspect-video w-full px-4 py-2">
        <div className="relative h-full">
          <ResponsiveContainer className="absolute inset-0">
            <AreaChart data={data} height={9} width={16}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip labelClassName="text-slate-800" wrapperClassName="rounded-xl" />
              <Area dataKey="like" fill="#10B981" stroke="#10B981" type="monotone" />
              <Area dataKey="dislike" fill="#EA580C" stroke="#EA580C" type="monotone" />
              <Area dataKey="generate" fill="#1D4ED8" stroke="#1D4ED8" type="monotone" />
              <Area dataKey="regenerate" fill="#FBBF24" stroke="#FBBF24" type="monotone" />
            </AreaChart>
          </ResponsiveContainer>
          {isLoading && <Loader className="absolute inset-0 bg-slate-950/75" />}
        </div>
      </div>
      {templates.map((role) => (
        <div
          className="flex items-center justify-between gap-4 border-t border-slate-700 px-4 py-2 tracking-wider"
          key={role.id}
        >
          <span>{role.name}</span>
          <AnalyticsDialog url={`/api/analytics/text/templates/${role.id}`} />
        </div>
      ))}
    </Widget>
  );
}

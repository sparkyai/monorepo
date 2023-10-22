"use client";

import { useState, useEffect } from "react";
import { AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Area } from "recharts";
import Dialog from "@components/common/dialog";
import PieChart from "@components/icon/pie-chart";
import Loader from "@components/common/loader";
import SelectField from "@components/form/select-field";

type Analytics = {
  like: number;
  dislike: number;
  generate: number;
  regenerate: number;
  updated_at: string;
}[];

type AnalyticsDialogProps = {
  url: string;
};

export default function AnalyticsDialog(props: AnalyticsDialogProps) {
  const [data, setData] = useState<object[]>([]);
  const [period, setPeriod] = useState("day");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && period) {
      setIsLoading(true);

      const controller = new AbortController();

      void fetch(`${props.url}?period=${period}`, { signal: controller.signal }).then(async (response) => {
        const analytics: Analytics = await response.json();
        // "day", "week", "month", "year"
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
    }
  }, [period, isOpen, props.url]);

  return (
    <>
      <button
        className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
        onClick={onOpen}
        type="button"
      >
        <PieChart size={16} />
      </button>
      <Dialog onClose={onClose} open={isOpen} size="lg" title="Analytics">
        <div className="flex justify-end">
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
        <div className="relative">
          <ResponsiveContainer style={{ width: "100%", aspectRatio: "16 / 9" }}>
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
          {isLoading && <Loader className="absolute inset-0 rounded-xl bg-slate-950/75" />}
        </div>
      </Dialog>
    </>
  );

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }
}

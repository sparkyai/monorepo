"use client";

import type { Dispatch, PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import SelectField from "@components/form/select-field";

type AnalyticsContext = [period: string, setPeriod: Dispatch<string>, isLoading: boolean, data: { date: Date }[]];

const Context = createContext<AnalyticsContext>(["month", () => void 0, false, []]);

export function useAnalyticsData() {
  const { 2: isLoading, 3: data } = useContext(Context);

  return [data, isLoading] as const;
}

export function AnalyticsPeriod() {
  const [period, setPeriod] = useContext(Context);

  return (
    <SelectField
      className="w-40"
      onChange={setPeriod}
      options={[
        { label: "last day", value: "day" },
        { label: "last week", value: "week" },
        { label: "last month", value: "month" },
        { label: "last year", value: "year" },
      ]}
      value={period}
    />
  );
}

type AnalyticProviderProps = PropsWithChildren<{
  endpoint: string;
}>;

export function AnalyticsProvider(props: AnalyticProviderProps) {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("month");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setData([]);
    setIsLoading(true);

    const url = new URL(props.endpoint, location.href);

    url.searchParams.set("period", "month");

    void fetch(url, { signal: controller.signal }).then(
      async (response) => {
        const payload = await response.json();

        if (!payload.error) {
          setData(
            payload.data.map((item) => {
              const result: Record<string, number> = {
                date: new Date(item.date).getTime(),
              };

              delete item.date;

              for (const name in item) {
                result[name] = Number(item[name]);
              }

              return result;
            }),
          );
        }

        setIsLoading(false);
      },
      () => void 0,
    );

    return function cancel() {
      controller.abort();
      setIsLoading(false);
    };
  }, [props.endpoint]);

  return <Context.Provider value={[period, setPeriod, isLoading, data]}>{props.children}</Context.Provider>;
}

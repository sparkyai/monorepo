"use client";

import { useState, Suspense } from "react";
import Dialog from "@components/common/dialog";
import PieChart from "@components/icon/pie-chart";
import IconButtonPrimary from "@components/button/icon-button-primary";
import SelectField from "@components/form/select-field";
import CategoryChart from "./chart";

type CategoryAnalyticsProps = {
  category: {
    id: number;
  };
};

export default function CategoryAnalytics(props: CategoryAnalyticsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [period, setPeriod] = useState("month");

  return (
    <>
      <IconButtonPrimary className="-my-1.5" onClick={onOpen}>
        <PieChart size={16} />
      </IconButtonPrimary>
      <Dialog className="max-w-lg" onClose={onClose} open={isOpen} title="Category Analitics">
        <div className="flex justify-end">
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
        </div>
        <div className="relative">
          <Suspense
            fallback={<div className="aspect-video w-full animate-pulse rounded-md bg-slate-700" />}
            key={`:chart:category:${props.category.id}:`}
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error -- - */}
            {/* @ts-ignore */}
            <CategoryChart category={props.category} period={period} />
          </Suspense>
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

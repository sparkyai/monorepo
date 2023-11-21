"use client";

import { useState } from "react";
import Dialog from "@components/common/dialog";
import PieChart from "@components/icon/pie-chart";
import IconButtonPrimary from "@components/button/icon-button-primary";
import { AnalyticsProvider } from "@components/analytics/analytics";
import AreaChart from "@components/analytics/area-chart";

type CategoryAnalyticsProps = {
  category: {
    id: number;
  };
};

export default function CategoryAnalytics(props: CategoryAnalyticsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButtonPrimary className="-my-1.5" onClick={onOpen}>
        <PieChart size={16} />
      </IconButtonPrimary>
      <Dialog className="max-w-screen-sm" onClose={onClose} open={isOpen} title="Category Analitics">
        <AnalyticsProvider endpoint={`/api/analytics/text/categories/${props.category.id}/token-usage`}>
          <AreaChart keys={{ prompt_tokens: "#EA580C", completion_tokens: "#1D4ED8" }} />
        </AnalyticsProvider>
        <AnalyticsProvider endpoint={`/api/analytics/text/categories/${props.category.id}/generation-usage`}>
          <AreaChart keys={{ text_generations: "#1D4ED8" }} name={() => "generations"} />
        </AnalyticsProvider>
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

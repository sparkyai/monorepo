"use client";

import { useState } from "react";
import Dialog from "@components/common/dialog";
import PieChart from "@components/icon/pie-chart";
import IconButtonPrimary from "@components/button/icon-button-primary";
import { AnalyticsProvider } from "@components/analytics/analytics";
import AreaChart from "@components/analytics/area-chart";

type UserAnalyticsProps = {
  user: {
    id: bigint;
  };
};

export default function UserAnalytics(props: UserAnalyticsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButtonPrimary className="-my-1.5" onClick={onOpen}>
        <PieChart size={16} />
      </IconButtonPrimary>
      <Dialog className="max-w-screen-sm" onClose={onClose} open={isOpen} title="User Analitics">
        <AnalyticsProvider endpoint={`/api/analytics/telegram/users/${props.user.id}/token-usage`}>
          <AreaChart
            keys={{
              image_tokens: "#FBBF24",
              prompt_tokens: "#EA580C",
              completion_tokens: "#1D4ED8",
            }}
          />
        </AnalyticsProvider>
        <AnalyticsProvider endpoint={`/api/analytics/telegram/users/${props.user.id}/generation-usage`}>
          <AreaChart
            keys={{
              text_generations: "#FBBF24",
              chat_generations: "#EA580C",
              image_generations: "#1D4ED8",
            }}
          />
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

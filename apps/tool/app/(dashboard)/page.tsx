import { AnalyticsProvider } from "@components/analytics/analytics";
import AreaChart from "@components/analytics/area-chart";
import Widget from "@components/common/widget";

export default function Dashboard() {
  return (
    <div className="grid-cols-400 grid gap-4">
      <Widget>
        <AnalyticsProvider endpoint="/api/analytics/token-usage">
          <AreaChart
            keys={{
              image_tokens: "#FBBF24",
              prompt_tokens: "#EA580C",
              completion_tokens: "#1D4ED8",
            }}
          />
        </AnalyticsProvider>
      </Widget>
      <Widget>
        <AnalyticsProvider endpoint="/api/analytics/generation-usage">
          <AreaChart
            keys={{
              text_generations: "#FBBF24",
              chat_generations: "#EA580C",
              image_generations: "#1D4ED8",
            }}
          />
        </AnalyticsProvider>
      </Widget>
    </div>
  );
}

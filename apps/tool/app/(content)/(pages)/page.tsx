import ChatAnalyticsWidget from "@components/widget/chat-analytics";
import ImageAnalyticsWidget from "@components/widget/image-analytics";
import TextAnalyticsWidget from "@components/widget/text-analytics";

export default function Dashboard() {
  return (
    <div className="grid-cols-400 grid gap-4">
      <ChatAnalyticsWidget />
      <TextAnalyticsWidget />
      <ImageAnalyticsWidget />
    </div>
  );
}

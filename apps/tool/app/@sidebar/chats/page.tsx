import Link from "../link";
import ChatLink from "./link";

export default function ChatsSidebar() {
  return (
    <>
      <div className="box-content flex w-80 flex-col gap-3 overflow-y-auto px-4">
        {Array(100)
          .fill(0)
          .map((_, i) => (
            <ChatLink id={(i + 1).toString()} key={`Chat #${i + 1}`} messages={2} name={`Chat #${i + 1}`} />
          ))}
      </div>
      <div className="flex justify-end px-4">
        <Link href="#" prefetch={false}>
          new chat
        </Link>
      </div>
    </>
  );
}

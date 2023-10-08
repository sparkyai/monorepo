import type { ServerRuntime } from "next";
import type { NextRequest } from "next/server";
import { StreamingTextResponse } from "ai";

export const runtime: ServerRuntime = "edge";

export async function POST(request: NextRequest) {
  // const

  const transform = new TransformStream();

  setTimeout(() => {
    let line = 0;
    const writer = transform.writable.getWriter();

    void writer.write("").then(
      function repeat() {
        if (line > 200) {
          return writer.close();
        }

        setTimeout(() => void writer.write(`Line #${line++}\n`).then(repeat), 50);
      },
      () => void 0,
    );
  });

  request.signal.addEventListener("abort", () => {
    void transform.writable.abort("cancel").catch(() => void 0);
  });

  return new StreamingTextResponse(transform.readable);
}

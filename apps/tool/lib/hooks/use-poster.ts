import { useEffect, useState } from "react";

export default function usePoster(url?: string) {
  const [poster, setPoster] = useState<null | File>(null);

  useEffect(resetPoster, [url]);

  return [poster, setPoster, resetPoster] as const;

  function resetPoster() {
    if (url) {
      void fetch(url).then(async (response) => {
        const file = await response.blob();

        setPoster(new File([file], url, { type: file.type }));
      });
    } else {
      setPoster(null);
    }
  }
}

import { Poppins } from "next/font/google";
import NextLink from "next/link";
import { twMerge } from "tailwind-merge";

const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],
});

type BrandProps = {
  locale: string;
};

export default function Brand(props: BrandProps) {
  return (
    <NextLink className="flex items-center gap-2.5 py-2.5" href={`/${props.locale}`}>
      <svg height="30" viewBox="0 0 16 16" width="30">
        <path
          d="M2.069 3.448l5.931-3.448v2.483l-1.655 0.966 1.655 1.103v2.483l-5.931-3.586zM1.103 4.966l6.897 4v2.483l-4.69-2.621v1.931l4.69 2.759v2.483l-6.897-4v-7.034z"
          fill="#4a80f6"
        />
        <path
          d="M8 2.483v-2.483l6.897 4v2.483l-6.897-4zM8 7.034v-2.483l6.897 4v3.448l-6.897 4v-2.483l4.69-2.759v-0.966l-4.69-2.759zM10.207 10.207l-2.207-1.241v2.483l2.207-1.241z"
          fill="#2e36f9"
        />
      </svg>
      <span className={twMerge(poppins.className, "text-[1.25rem] font-bold leading-normal")}>Sparky</span>
    </NextLink>
  );
}

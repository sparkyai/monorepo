import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import { twMerge } from "tailwind-merge";

type AvatarProps = {
  name: string;
  image: StaticImageData;
  className?: string;
};

export default function Avatar(props: AvatarProps) {
  return (
    <div className={twMerge("overflow-hidden rounded-md", props.className)}>
      <NextImage
        alt={props.name}
        className="h-full w-full object-cover"
        placeholder="blur"
        sizes="(min-width: 1024px) 160px, (min-width: 640px) 20vw, 33vw"
        src={props.image}
      />
    </div>
  );
}

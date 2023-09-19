import type { StaticImageData } from "next/image";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Badge from "components/badge/badge";

type UserProps = {
  avatar: StaticImageData;
  jobTitle: string;
  className?: string;
};

export default function User(props: UserProps) {
  return (
    <div className={twMerge("hidden flex-col gap-4 lg:flex", props.className)}>
      <div className="mx-auto aspect-square overflow-hidden rounded-full">
        <Image
          alt={props.jobTitle}
          height={60}
          placeholder="blur"
          sizes="(min-width: 1024px) 88px, 0"
          src={props.avatar}
          width={60}
        />
      </div>
      <Badge className="text-center text-xs">{props.jobTitle}</Badge>
    </div>
  );
}

import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import { twMerge } from "tailwind-merge";
import AboutCard from "components/about/card";
import IcomoonIcon from "components/common/icomoon-icon";

type Social = {
  url: string;
  name: string;
};

type MemberProps = {
  name: string;
  image: StaticImageData;
  socials: Social[];
  summary: string;
  position: string;
  className?: string;
};

export default function Member(props: MemberProps) {
  return (
    <div className={twMerge("p-2.5", props.className)}>
      <AboutCard className="h-full w-full items-center !gap-0 text-center">
        <NextImage alt={props.name} className="rounded-full" sizes="80px" src={props.image} width={80} />
        <h3 className="mt-5 text-lg font-semibold">{props.name}</h3>
        <p className="text-blue-300">{props.position}</p>
        <p className="mt-4 max-w-xs text-gray-50">{props.summary}</p>
        {props.socials.length > 0 && (
          <div className="mt-4 flex gap-4">
            {props.socials.map(({ url, name }) => (
              <a
                aria-label={name}
                className="text-gray-200 transition-colors hover:text-blue-200"
                href={url}
                key={name}
                rel="noreferrer"
                target="_blank"
              >
                <IcomoonIcon className="text-[1.5rem]" name={name.toLowerCase()} />
              </a>
            ))}
          </div>
        )}
      </AboutCard>
    </div>
  );
}

import type { StaticImageData } from "next/image";
import Image from "next/image";
import Rating from "./rating";

type ReviewCardProps = {
  text: string;
  title: string;
  rating: number;
  author: {
    name: string;
    avatar: StaticImageData;
    jobTitle: string;
  };
  className?: string;
};

export default function ReviewCard({ text, title, rating, author, className }: ReviewCardProps) {
  return (
    <div className={`flex flex-col rounded-sm border border-gray-400 bg-gray-600 p-5 ${className}`.trim()}>
      <div className="flex items-center gap-5">
        <div className="aspect-square w-12 shrink-0 overflow-hidden rounded-full">
          <Image alt={author.name} className="h-full w-full" placeholder="blur" sizes="40px" src={author.avatar} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">{author.name}</span>
          <strong className="mt-1 text-xs font-bold text-gray-50">{author.jobTitle}</strong>
        </div>
      </div>
      <Rating value={rating} />
      <h3 className="text-md mb-3 mt-5 font-semibold">{title}</h3>
      <p className="text-sm text-gray-50">{text}</p>
    </div>
  );
}

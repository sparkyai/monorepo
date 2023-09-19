import type { StaticImageData } from "next/image";
import Carousel from "components/common/carousel";
import ReviewCard from "components/review/card";
import Avatar01 from "./avatar-1.webp";
import Avatar10 from "./avatar-10.webp";
import Avatar11 from "./avatar-11.webp";
import Avatar12 from "./avatar-12.webp";
import Avatar02 from "./avatar-2.webp";
import Avatar03 from "./avatar-3.webp";
import Avatar04 from "./avatar-4.webp";
import Avatar05 from "./avatar-5.webp";
import Avatar06 from "./avatar-6.webp";
import Avatar07 from "./avatar-7.webp";
import Avatar08 from "./avatar-8.webp";
import Avatar09 from "./avatar-9.webp";
import reviews from "./reviews.json";

type Review = {
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

export default function CardCarousel() {
  const groups: {
    id: number;
    0: Review;
    1: Review;
  }[] = [];

  (reviews[0] as Review).author.avatar = Avatar03;
  (reviews[1] as Review).author.avatar = Avatar04;
  (reviews[2] as Review).author.avatar = Avatar05;
  (reviews[3] as Review).author.avatar = Avatar06;
  (reviews[4] as Review).author.avatar = Avatar07;
  (reviews[5] as Review).author.avatar = Avatar08;
  (reviews[6] as Review).author.avatar = Avatar09;
  (reviews[7] as Review).author.avatar = Avatar10;
  (reviews[8] as Review).author.avatar = Avatar11;
  (reviews[9] as Review).author.avatar = Avatar12;
  (reviews[10] as Review).author.avatar = Avatar01;
  (reviews[11] as Review).author.avatar = Avatar02;

  for (let i = 0; i < 12; i += 2) {
    groups.push({
      id: i,
      0: reviews[i] as Review,
      1: reviews[i + 1] as Review,
    });
  }

  return (
    <Carousel>
      {groups.map((group) => (
        <div className="flex w-full flex-wrap gap-5" key={group.id}>
          <ReviewCard {...group[0]} className="h-1/2 w-full" />
          <ReviewCard {...group[1]} className="h-1/2 w-full" />
        </div>
      ))}
    </Carousel>
  );
}

"use client";

import "swiper/swiper.css";
import type { ReactElement } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Children } from "react";

type CarouselProps = {
  children: ReactElement[];
};

export default function Carousel(props: CarouselProps) {
  return (
    <div className="container relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-gray-900 from-50%" />
      <Swiper
        autoplay={{
          delay: 3000,
        }}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          360: { slidesPerView: 1.3 },
          375: { slidesPerView: 1.35 },
          400: { slidesPerView: 1.4 },
          460: { slidesPerView: 1.55 },
          520: { slidesPerView: 1.7 },
          640: { slidesPerView: 1.85 },
          768: { slidesPerView: 2.3 },
          1024: { slidesPerView: 3.2 },
          1280: { slidesPerView: 3.8 },
          1440: { slidesPerView: 4.2 },
        }}
        centeredSlides
        loop
        loopedSlides={2}
        modules={[Autoplay]}
        spaceBetween={20}
      >
        {Children.map(props.children, (child) => (
          <SwiperSlide className="!flex !h-auto select-none pb-12">{child}</SwiperSlide>
        ))}
      </Swiper>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-gray-900 from-50%" />
    </div>
  );
}

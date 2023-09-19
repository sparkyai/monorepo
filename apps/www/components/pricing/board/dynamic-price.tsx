"use client";

import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
import IcomoonIcon from "components/common/icomoon-icon";
import Price from "./price";
import Limit from "./limit";
import { usePeriod } from "./period";
import { useQuality } from "./quality";

type DynamicPriceProps = {
  label: {
    words: string;
    users: string;
    price: string;
    period: string;
  };
  currency: string;
  products: {
    id: number;
    users: number;
    prices: Record<string, number> &
      {
        model: {
          id: number;
        };
      }[];
    credits: number;
  }[];
};

export default function DynamicPrice(props: DynamicPriceProps) {
  const period = usePeriod();
  const quality = useQuality();
  const [position, setPosition] = useState(0);

  const selectedProduct = props.products[position];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- controlled
  const price = selectedProduct.prices.find((item) => item.model.id.toString() === quality)!;

  function onValueChange(interval: number[]) {
    setPosition(interval[0]);
  }

  return (
    <div className="-mx-2.5 flex flex-col">
      <Price amount={price[period]} currency={props.currency} label={props.label} />
      <div className="mb-3 mt-5 flex flex-wrap text-gray-50">
        <span className="ml-4 text-sm text-gray-50">{(props.products[0].credits / 1000).toLocaleString("en")}K</span>
        <span className="ml-auto mr-4 text-sm text-gray-50">
          {(props.products[props.products.length - 1].credits / 1000).toLocaleString("en")}K
        </span>
        <Slider.Root
          className="relative flex w-full items-center"
          defaultValue={[0]}
          max={props.products.length - 1}
          min={0}
          onValueChange={onValueChange}
          step={1}
        >
          <Slider.Track className="flex w-full flex-wrap justify-between px-4 pt-3">
            <Slider.Range className="mb-2 flex w-full rounded-full border border-blue-50" />
            {props.products.map((product) => (
              <span className="h-1 select-none rounded-full border border-blue-50" key={product.id} />
            ))}
          </Slider.Track>
          <Slider.Thumb
            aria-label={props.label.price}
            className="flex cursor-pointer rounded-full bg-blue-500 px-3 py-1.5 hover:bg-blue-400 focus:outline-0 focus:ring-0"
          >
            <IcomoonIcon className="rotate-90 select-none text-xs leading-none text-blue-50" name="chevron-expand" />
          </Slider.Thumb>
        </Slider.Root>
      </div>
      <Limit
        users={{ count: selectedProduct.users, label: props.label.users }}
        words={{ count: selectedProduct.credits, label: props.label.words }}
      />
    </div>
  );
}

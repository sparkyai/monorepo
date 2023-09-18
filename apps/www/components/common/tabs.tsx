"use client";

import type { AriaAttributes, PropsWithChildren } from "react";
import * as Primitive from "@radix-ui/react-tabs";
import { twMerge } from "tailwind-merge";

type TabsProps = PropsWithChildren<{
  defaultValue: string;
  className?: string;
}>;

export function Tabs({ children, className, defaultValue }: TabsProps) {
  return (
    <Primitive.Root className={className} defaultValue={defaultValue}>
      {children}
    </Primitive.Root>
  );
}

export function TabsList({ children }: PropsWithChildren) {
  return <Primitive.List asChild>{children}</Primitive.List>;
}

type TabsTriggerProps = PropsWithChildren<
  AriaAttributes & {
    value: string;
    className?: string;
  }
>;

export function TabsTrigger({ value, children, className, ...props }: TabsTriggerProps) {
  return (
    <Primitive.Trigger
      {...props}
      className={twMerge(
        "text-md inline-flex cursor-pointer justify-center truncate rounded-full border border-gray-300 bg-gray-500 px-5 py-2 font-semibold leading-5 text-blue-50 transition-colors hover:border-gray-300 hover:bg-gray-400 active:border-gray-300 active:bg-gray-400",
        "radix-state-active:text-blue-50 radix-state-active:bg-blue-500 radix-state-active:border-blue-500 radix-state-active:cursor-default",
        className,
      )}
      value={value}
    >
      {children}
    </Primitive.Trigger>
  );
}

type TabsContentProps = PropsWithChildren<{
  value: string;
  className?: string;
  forceMount?: true;
}>;

export function TabsContent({ value, children, className, forceMount }: TabsContentProps) {
  return (
    <Primitive.Content className={className} forceMount={forceMount} value={value}>
      {children}
    </Primitive.Content>
  );
}

"use client";

import type { PropsWithChildren } from "react";
import IcomoonIcon from "components/common/icomoon-icon";

type MegaMenuProps = PropsWithChildren<{
  name: string;
}>;

export default function MegaMenu(props: MegaMenuProps) {
  return (
    <div className="group relative">
      <button
        className="my-px inline-flex h-12 items-center gap-2.5 truncate border-b-2 border-transparent px-3"
        type="button"
      >
        {props.name}
        <IcomoonIcon className="text-xs transition-transform duration-300 group-hover:rotate-90" name="chevron-down" />
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full flex -translate-x-1/2 gap-8 rounded-md bg-gray-900 px-8 py-4 opacity-0 shadow transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-active:pointer-events-auto group-active:opacity-100">
        {props.children}
        {/*<div className="flex gap-8 rounded-md bg-gray-900 px-8 py-4 shadow">*/}
        {/*  <div className="flex shrink-0 flex-col gap-1">*/}
        {/*    {sort(filter(groups, "menuAttached"), "order").map((group) => (*/}
        {/*      <button*/}
        {/*        key={group.id}*/}
        {/*        onClick={() => setActiveGroup(group)}*/}
        {/*        className={`p-3 font-semibold transition-colors ${*/}
        {/*          activeGroup.id === group.id ? "text-blue-300" : "hover:text-blue-500"*/}
        {/*        }`}*/}
        {/*      >*/}
        {/*        {group.title}*/}
        {/*      </button>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*  <div className="relative flex w-screen max-w-md items-start gap-5 xl:max-w-2xl">*/}
        {/*    {"items" in activeGroup &&*/}
        {/*      activeGroup.items.map((item) => {*/}
        {/*        if ("related" in item && item.related) {*/}
        {/*          const href = getHref(item.related.attributes);*/}

        {/*          if (typeof href === "string" && item.related.attributes.publishedAt) {*/}
        {/*            const url = `/${locale}${href ? "/" + href : ""}`;*/}

        {/*            return (*/}
        {/*              <NextLink*/}
        {/*                key={item.id}*/}
        {/*                href={url}*/}
        {/*                className="flex w-1/2 gap-2 transition-colors hover:text-blue-500 xl:w-1/3"*/}
        {/*              >*/}
        {/*                <span className="flex h-12 w-12 rounded-sm bg-gray-400"></span>*/}
        {/*                <span className="grow font-semibold">{item.title}</span>*/}
        {/*              </NextLink>*/}
        {/*            );*/}
        {/*          }*/}
        {/*        }*/}

        {/*        return null;*/}
        {/*      })}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

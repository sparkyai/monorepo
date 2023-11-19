import type { PropsWithChildren } from "react";
import { getSessionUser } from "@lib/utils/next-auth";
import Profile from "./profile";

export default async function Header(props: PropsWithChildren) {
  const user = await getSessionUser();

  return (
    <header className="my-0.5 flex gap-3 px-6 py-4">
      {props.children}
      <div className="grow" />
      <Profile user={user} />
    </header>
  );
}

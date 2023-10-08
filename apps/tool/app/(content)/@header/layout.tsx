import type { PropsWithChildren } from "react";
import { getSession } from "@lib/utils/auth";
import Profile from "./profile";

export default async function HeaderLayout(props: PropsWithChildren) {
  const session = await getSession();

  return (
    <header className="my-0.5 flex gap-3 px-6 py-4">
      {props.children}
      <div className="grow" />
      <Profile user={session.user} />
    </header>
  );
}

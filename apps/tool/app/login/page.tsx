import { redirect } from "next/navigation";
import Widget from "@components/common/widget";
import Sparky from "@components/brand/sparky";
import prisma from "@lib/utils/prisma";
import { getSessionUser } from "@lib/utils/next-auth";
import Form from "./form";

type LoginProps = {
  searchParams: {
    signature?: string;
  };
};

export default async function Login(props: LoginProps) {
  if (await getSessionUser()) {
    redirect("/");
  }

  let user: { email: string } | null = null;

  if (props.searchParams.signature) {
    user = await prisma.users.findFirst({
      where: {
        invitation: {
          is: { signature: props.searchParams.signature },
        },
      },
      select: { email: true },
    });
  }

  return (
    <Widget className="m-auto w-full max-w-sm gap-8 p-4">
      <div className="flex items-center justify-center gap-3 py-4">
        <Sparky size={40} />
        <span className="text-3xl font-bold tracking-wide">Sparky</span>
      </div>

      <Form user={user || void 0} />
    </Widget>
  );
}

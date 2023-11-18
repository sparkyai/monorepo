import type { Session as AuthSession, NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { redirect } from "next/navigation";
import prisma from "@lib/utils/prisma";

declare module "next-auth" {
  interface Session {
    user?: {
      id: number;
      email: string;
      last_name: string;
      first_name: string;
    };
  }
}

export const NEXT_AUTH_OPTIONS: NextAuthOptions = {
  pages: {
    error: "/login",
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session(params) {
      const session: AuthSession = { user: void 0, expires: params.session.expires };
      const user = await prisma.users.findUnique({
        where: { id: Number(params.token.sub) },
        select: {
          id: true,
          email: true,
          last_name: true,
          first_name: true,
        },
      });

      if (user) {
        session.user = {
          id: user.id,
          email: user.email,
          last_name: user.last_name as unknown as string,
          first_name: user.first_name as unknown as string,
        };
      }

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials) {
          const user = await prisma.users.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              password: true,
              last_name: true,
              first_name: true,
            },
          });

          if (user?.password && (await compare(credentials.password, user.password))) {
            return { id: user.id.toString() };
          }
        }

        return null;
      },
      credentials: {
        email: {},
        password: {},
      },
    }),
  ],
};

export async function getSessionUser() {
  const session = await getServerSession(NEXT_AUTH_OPTIONS);

  if (session?.user) {
    return session.user;
  }

  redirect("/login");
}

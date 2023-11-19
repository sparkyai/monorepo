"use server";

import { revalidatePath } from "next/cache";
import * as Sentry from "@sentry/nextjs";
import bcrypt from "bcrypt";
import type { TypeOf } from "zod";
import { UserSchema } from "@lib/utils/schema";
import { sendEmail } from "@lib/utils/sendgrid";
import prisma from "@lib/utils/prisma";
import { hash } from "@lib/utils/crypto";

function revalidate() {
  revalidatePath("/general/users");
}

const InviteSchema = UserSchema.pick({
  email: true,
});

export async function inviteUser(payload: TypeOf<typeof InviteSchema>) {
  const user = InviteSchema.safeParse(payload);

  if (!user.success) {
    return { error: user.error.format() };
  }

  try {
    const signature = hash("md5", `${user.data.email}:${Date.now()}`, "base64url");
    const data = await prisma.users.create({
      data: {
        email: user.data.email,
        invitation: {
          create: { signature },
        },
      },
      select: {
        id: true,
        invitation: {
          select: { signature: true },
        },
      },
    });

    await sendEmail({
      to: user.data.email,
      html: `You have been invited to the Sparky AI Tool. Click this <a href="${process.env.TOOL_URL}/login?signature=${signature}"target="_blank">link</a> to complete your registration.`,
      subject: "Sparky AI Tool sign up",
    });

    revalidate();

    return { data: { id: data.id } };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function updateUser(id: number, payload: Partial<TypeOf<typeof UserSchema>>) {
  const user = UserSchema.partial().safeParse(payload);

  if (!user.success) {
    return { error: user.error.format() };
  }

  try {
    await prisma.users.update({
      data: {
        ...user.data,
        // eslint-disable-next-line import/no-named-as-default-member -- -
        password: user.data.password && (await bcrypt.hash(user.data.password, 10)),
      },
      where: { id },
      select: { id: true },
    });

    revalidate();

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function confirmUser(payload: TypeOf<typeof UserSchema>) {
  const user = UserSchema.safeParse(payload);

  if (!user.success) {
    return { error: user.error.format() };
  }

  try {
    await prisma.users.update({
      // data: user.data,
      data: {
        ...user.data,
        // eslint-disable-next-line import/no-named-as-default-member -- -
        password: user.data.password && (await bcrypt.hash(user.data.password, 10)),
        invitation: {
          delete: {},
        },
      },
      where: { email: user.data.email },
      select: { id: true },
    });

    revalidate();

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.users.delete({
      where: { id },
      select: { id: true },
    });

    revalidate();

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

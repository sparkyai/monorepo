"use server";

import * as Sentry from "@sentry/nextjs";
import type { TypeOf } from "zod";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@lib/utils/prisma";
import { TextTemplateSchema, MessageSchema } from "@lib/utils/schema";

function revalidate(id?: number) {
  revalidatePath(id ? "/text/templates" : `/text/templates/${id}`);
}

export async function createTextTemplate(payload: TypeOf<typeof TextTemplateSchema>) {
  const template = TextTemplateSchema.safeParse(payload);

  if (!template.success) {
    return { error: template.error.format() };
  }

  try {
    let poster: object | undefined = void 0;

    if (template.data.poster) {
      poster = {
        create: template.data.poster,
      };
    }

    let parameters: object | undefined = void 0;

    if (template.data.parameters) {
      parameters = {
        create: template.data.parameters,
      };
    }

    const data = await prisma.text_templates.create({
      data: {
        name: template.data.name,
        poster,
        category: {
          connect: { id: template.data.category },
        },
        language: {
          connect: { code: template.data.language },
        },
        parameters,
        description: template.data.description,
      },
      select: { id: true },
    });

    revalidate();

    return { data };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function updateTextTemplate(id: number, payload: Partial<TypeOf<typeof TextTemplateSchema>>) {
  const template = TextTemplateSchema.partial().safeParse(payload);

  if (!template.success) {
    return { error: template.error.format() };
  }

  try {
    let poster: object | undefined = void 0;

    if (template.data.poster) {
      poster = {
        create: template.data.poster,
      };
    }

    let category: object | undefined = void 0;

    if (template.data.category) {
      category = {
        connect: { id: template.data.category },
      };
    }

    let language: object | undefined = void 0;

    if (template.data.language) {
      language = {
        connect: { code: template.data.language },
      };
    }

    let parameters: object | undefined = void 0;

    if (template.data.parameters) {
      parameters = {
        upsert: {
          create: template.data.parameters,
          update: template.data.parameters,
        },
      };
    }

    await prisma.text_templates.update({
      data: {
        name: template.data.name,
        poster,
        category,
        language,
        parameters,
        description: template.data.description,
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

export async function deleteTextTemplate(id: number) {
  try {
    const template = await prisma.text_templates.delete({
      where: { id },
      select: {
        poster: {
          select: {
            id: true,
            pathname: true,
          },
        },
      },
    });

    if (template.poster) {
      await prisma.images.delete({
        where: { id: template.poster.id },
        select: { id: true },
      });

      // todo(aws): remove image from s3
    }

    revalidate();

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function createTextTemplateMessage(payload: TypeOf<typeof MessageSchema> & { template: number }) {
  const message = MessageSchema.extend({ template: z.number().int().positive() }).safeParse(payload);

  if (!message.success) {
    return { error: message.error.format() };
  }

  try {
    const data = await prisma.text_template_messages.create({
      data: {
        role: message.data.role,
        content: message.data.content,
        template: {
          connect: { id: message.data.template },
        },
      },
      select: {
        id: true,
        template: {
          select: {
            id: true,
          },
        },
      },
    });

    revalidate(data.template.id);

    return { data: { id: data.id } };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function updateTextTemplateMessage(id: string, payload: Partial<TypeOf<typeof MessageSchema>>) {
  const message = MessageSchema.partial().safeParse(payload);

  if (!message.success) {
    return { error: message.error.format() };
  }

  try {
    const data = await prisma.text_template_messages.update({
      data: payload,
      where: { id },
      select: {
        template: {
          select: {
            id: true,
          },
        },
      },
    });

    revalidate(data.template.id);

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function deleteTextTemplateMessage(id: string) {
  try {
    const message = await prisma.text_template_messages.delete({
      where: { id },
      select: {
        template: {
          select: {
            id: true,
          },
        },
      },
    });

    revalidate(message.template.id);

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

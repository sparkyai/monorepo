import type { TypeOf } from "zod";
import type { interaction } from "@lib/utils/schema";

export type Delegate<T> = {
  update: (args: object) => Promise<unknown>;
  findUniqueOrThrow: (args: { where: { id: T } }) => {
    interactions: (args: object) => Promise<
      {
        id: unknown;
      }[]
    >;
  };
};

export async function handler<T>(data: TypeOf<typeof interaction>, id: T, delegate: Delegate<T>) {
  let interactions: { id: unknown }[] = [];

  if (["like", "dislike"].includes(data.type)) {
    interactions = await delegate.findUniqueOrThrow({ where: { id } }).interactions({
      where: {
        type: {
          in: ["like", "dislike"],
        },
        client: {
          id: data.client.id,
        },
      },
      select: { id: true },
    });
  }

  await delegate.update({
    data: {
      interactions: {
        upsert: {
          where: {
            id: interactions[0]?.id || 0,
          },
          update: {
            type: data.type,
          },
          create: {
            type: data.type,
            client: {
              connectOrCreate: {
                where: {
                  id: data.client.id,
                },
                create: {
                  id: data.client.id,
                },
              },
            },
          },
        },
      },
    },
    where: { id },
    select: { id: true },
  });
}

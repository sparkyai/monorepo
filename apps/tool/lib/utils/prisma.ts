import { PrismaClient } from "@prisma/client";

// @ts-expect-error eslint-disable-next-line no-extend-native -- -
// eslint-disable-next-line no-extend-native,func-names -- -
BigInt.prototype.toJSON = function () {
  return Number(this);
};

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

export default global.prisma as PrismaClient;

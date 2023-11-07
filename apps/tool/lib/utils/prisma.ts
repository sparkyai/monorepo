import { PrismaClient } from "@prisma/client";

// @ts-expect-error eslint-disable-next-line no-extend-native -- controlled
// eslint-disable-next-line no-extend-native,func-names -- controlled
BigInt.prototype.toJSON = function () {
  return this.toString();
};

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

export default global.prisma as PrismaClient;

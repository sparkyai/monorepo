import type { BinaryToTextEncoding, BinaryLike } from "node:crypto";
import { createHash } from "node:crypto";

export function hash(algorithm: string, data: BinaryLike | string, encoding: BinaryToTextEncoding = "base64") {
  return createHash(algorithm).update(data).digest(encoding);
}

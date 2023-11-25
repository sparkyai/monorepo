import { env } from "@sparky/env";

export function getObjectUrl(key: string) {
  return `https://${env("S3_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com/${key}`;
}

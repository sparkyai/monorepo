"use server";

import { randomBytes } from "node:crypto";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const client = new S3Client({
  region: `${process.env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.IAM_USER_KEY}`,
    secretAccessKey: `${process.env.IAM_USER_SECRET}`,
  },
});

export async function upload(data: FormData) {
  if (!data.has("file")) {
    throw new Error("Invalid data");
  }

  const file = data.get("file") as File;
  const key = `${randomBytes(128).readBigInt64BE().toString(36)}.${file.name.split(".").pop()}`;

  const params = {
    Bucket: `${process.env.S3_BUCKET}`,
    Key: key,
    Body: new Uint8Array(await file.arrayBuffer()),
    ContentType: file.type,
  };

  return new Upload({ client, params }).done().then(() => {
    return key;
  });
}

export async function remove(key: string) {
  await client.send(
    new DeleteObjectCommand({
      Bucket: `${process.env.S3_BUCKET}`,
      Key: key,
    }),
  );
}

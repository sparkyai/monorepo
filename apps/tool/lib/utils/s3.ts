import type { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const client = new S3Client({
  region: `${process.env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.IAM_USER_KEY}`,
    secretAccessKey: `${process.env.IAM_USER_SECRET}`,
  },
});

export async function uploadObject(key: string, file: File): Promise<string> {
  const params = {
    Bucket: `${process.env.S3_BUCKET}`,
    Key: key,
    Body: file,
    ContentType: file.type,
    CacheControl: "max-age=630720000",
  };

  return new Upload({ client, params }).done().then((data: CompleteMultipartUploadCommandOutput) => {
    return data.Location as unknown as string;
  });
}

export async function deleteObject(key: string) {
  await client.send(
    new DeleteObjectCommand({
      Bucket: `${process.env.S3_BUCKET}`,
      Key: key,
    }),
  );
}

export function getObjectUrl(pathname: string) {
  return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com${pathname}`;
}

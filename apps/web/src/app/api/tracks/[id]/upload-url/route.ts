import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// TODO: npm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const trackId = params.id;

  // TODO: Generate presigned R2 upload URL:
  // const s3 = new S3Client({
  //   region: "auto",
  //   endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  //   credentials: {
  //     accessKeyId: process.env.R2_ACCESS_KEY_ID!,
  //     secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  //   },
  // });
  // const objectKey = `tracks/${trackId}/${Date.now()}.mp3`;
  // const url = await getSignedUrl(
  //   s3,
  //   new PutObjectCommand({ Bucket: process.env.R2_BUCKET_NAME!, Key: objectKey, ContentType: "audio/*" }),
  //   { expiresIn: 300 }
  // );
  // return NextResponse.json({ upload_url: url, object_key: objectKey });

  return NextResponse.json({
    upload_url: "TODO: configure R2 credentials",
    object_key: `tracks/${trackId}/placeholder.mp3`,
  });
}

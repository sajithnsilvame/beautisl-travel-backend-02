import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import path from "path";
import { CloudflareR2Config } from "../lib/cloudflare.config";


export class ImageService {
  private static s3Client = new S3Client({
    region: "auto",
    endpoint: CloudflareR2Config.endpoint,
    credentials: {
      accessKeyId: CloudflareR2Config.accessKeyId,
      secretAccessKey: CloudflareR2Config.secretAccessKey,
    },
  });

  static async processImageNoWatermark(imageBuffer: Buffer): Promise<Buffer> {
    return await sharp(imageBuffer).toBuffer(); // return original image
  }

  static async processRichTextImage(imageBuffer: Buffer): Promise<Buffer> {
    const metadata = await sharp(imageBuffer).metadata();
  
    const svgRoundedCorners = `
      <svg width="100%" height="100%" viewBox="0 0 ${metadata.width} ${metadata.height}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${metadata.width}" height="${metadata.height}" rx="12" ry="12" />
      </svg>
    `;
  
    return await sharp(imageBuffer)
      .composite([{ input: Buffer.from(svgRoundedCorners), blend: "dest-in" }])
      .toBuffer();
  }

  static async uploadToR2(buffer: Buffer, mimeType: string, folder = "uploads") {
    const fileKey = `${folder}/${uuidv4()}`;

    const command = new PutObjectCommand({
      Bucket: CloudflareR2Config.bucketName,
      Key: fileKey,
      Body: buffer,
      ContentType: mimeType,
    });

    await this.s3Client.send(command);
    const publicUrl = `${CloudflareR2Config.publicBaseUrl}/${fileKey}`;
    return { fileKey, publicUrl };
  }

  
  static async uploadImage(buffer: Buffer, mimeType: string): Promise<{ fileKey: string; publicUrl: string }> {
    const processed = await this.processImageNoWatermark(buffer);
    return await this.uploadToR2(processed, mimeType);
  }

  static getImageUrl(fileKey: string): string {
    return `${CloudflareR2Config.publicBaseUrl}/${fileKey}`;
  }
}
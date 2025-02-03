import { Storage } from "@google-cloud/storage";
import { env } from "../env/env";

export async function uploadToGCP(fileName: string, content: any) {
  const storage = new Storage({ keyFilename: "adc.json" });

  try {
    const buff = Buffer.from(JSON.stringify(content));
    await storage.bucket(env.BUCKET_NAME).file(fileName).save(buff);
    console.log("File uploaded to Cloud Bucket!");
  } catch (err) {
    console.error(err);
    throw new Error("Couldnt upload file to Bucket. Please try again.");
  }
}

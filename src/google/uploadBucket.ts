import { Storage } from "@google-cloud/storage";
import { env } from "../env/env";

export async function uploadToGCP(fileName: string, filePath: string) {
  const storage = new Storage({ keyFilename: "adc.json" });
  const options = {
    destination: fileName,
  };
  try {
    await storage.bucket(env.BUCKET_NAME).upload(filePath, options);
    console.log("File uploaded to Cloud Bucket!");
  } catch (err) {
    console.error(err);
    throw new Error("Couldnt upload file to Bucket. Please try again.");
  }
}

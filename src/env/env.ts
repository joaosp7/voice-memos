import z from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  BUCKET_NAME: z.string(),
  OUTPUT_BUCKET: z.string(),
  BASE_URL: z.string(),
})


const envProcess = envSchema.safeParse(process.env);

if (!envProcess.success){
  throw new Error('Problem with Env Variables.');
}

export const env = envProcess.data
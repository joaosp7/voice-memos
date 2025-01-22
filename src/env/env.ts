import z from 'zod'

const envSchema = z.object({
  BUCKET_NAME: z.string(),
})


const envProcess = envSchema.safeParse(process.env);

if (!envProcess.success){
  throw new Error('Problem with Env Variables.');
}

export const env = envProcess.data
import { LanguageCode, StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";
import { env } from "../env/env";

export const transcribe = async (fileName:string,jobName:string) => {
  const transcribeClient = new TranscribeClient({region: 'sa-east-1'})
  const params = {
    TranscriptionJobName: jobName,
    LanguageCode: LanguageCode.PT_BR,
    Media: {
      MediaFileUri: 's3://' + env.BUCKET_NAME + `/${fileName}`
    },
    OutputBucketName: env.OUTPUT_BUCKET,
  }
  try {
    const data = await transcribeClient.send( new StartTranscriptionJobCommand(params));
    console.log('Success - ', data);
    return data
  }
  catch(err){
    console.log('Error - ', err)
  }
}
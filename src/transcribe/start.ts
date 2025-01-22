import { LanguageCode, StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";

export const run = async (jobName:string, fileName:string) => {
  const transcribeClient = new TranscribeClient({region: 'sa-east-1'})
  const params = {
    TranscriptionJobName: jobName,
    LanguageCode: LanguageCode.PT_BR,
    Media: {
      MediaFileUri: `s3://voice-memos-bucket/${fileName}`
    },
    OutputBucketName: 'voice-memos-bucket',
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
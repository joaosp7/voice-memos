import { LanguageCode, StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";

const params = {
  TranscriptionJobName: 'Job-TESTE-Node',
  LanguageCode: LanguageCode.PT_BR,
  Media: {
    MediaFileUri: 's3://voice-memos-bucket/teste.ogg'
  },
  OutputBucketName: 'voice-memos-bucket',
}

const transcribeClient = new TranscribeClient({region: 'sa-east-1'})
export const run = async () => {
  try {
    const data = await transcribeClient.send( new StartTranscriptionJobCommand(params));
    console.log('Success - ', data);
    return data
  }
  catch(err){
    console.log('Error - ', err)
  }
}

run();
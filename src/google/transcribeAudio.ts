import { LanguageCode } from "@aws-sdk/client-transcribe";
import { SpeechClient } from "@google-cloud/speech";
import { env } from "../env/env";

export async function transcribeAudioGoogle(fileName: string) {
  const client = new SpeechClient({ keyFilename: "temp.json" });
  const uri = `gs://${env.BUCKET_NAME}/${fileName}`;
  const audio = {
    uri: uri,
  };
  const config = {
    languageCode: "pt-BR",
  };
  const request = {
    audio: audio,
    config: config,
  };
  const [response] = await client.recognize(request);
  const transcription = response.results
    ?.map((result) => {
      if (result.alternatives) return result.alternatives[0].transcript;
    })
    .join("\n");
  console.log(transcription);
  return transcription;
}

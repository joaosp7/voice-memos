import path from "node:path";
import { uploadS3 } from ".";

async function teste(){
  await uploadS3('voice-memos-bucket', 'first.ogg', './first.ogg')
  console.log('Deu certo!')
}


teste().then(()=>{
  console.log('TERMINOU')
})
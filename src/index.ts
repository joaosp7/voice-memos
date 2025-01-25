import express from 'express';
import multer from 'multer'
import { uploadS3 } from './s3/uploadToBucket';
import fs from 'node:fs'
import { transcribe } from './transcribe/start';
import { env } from './env/env';

const app = express()
const upload = multer({dest: 'tmp/'});
app.get('/', (req,res)=>{
  res.send('Ok!');
})

app.post('/transcribe',upload.single('file'), async (req:any, res)=>{
  const filePath = req.file.path;
  const fileName = req.file.originalname;
  const jobName = req.body.jobName;
  if (!jobName){
    res.send('jobName must be sended in the request body. Please try again!').sendStatus(400)
    throw new Error('jobName missing.')
  }
  await uploadS3(env.BUCKET_NAME, fileName, filePath);
  await transcribe(fileName, jobName);
  fs.unlinkSync(filePath);
 const _url = env.BASE_URL + `/${jobName}.json`
res.send(`Job started! When finished, available at ${_url}`).sendStatus(200);
})

app.listen(3030, ()=>{
  console.log('Server up and running on port 3030!');
})
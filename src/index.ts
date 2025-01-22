import express from 'express';
import multer from 'multer'
import { uploadS3 } from './s3/uploadToBucket';
import fs from 'node:fs'
import { run } from './transcribe/start';

const app = express()
const upload = multer({dest: 'tmp/'});
app.get('/', (req,res)=>{
  res.send('Ok!');
})

app.post('/transcribe',upload.single('file'), async (req:any, res)=>{
  const filePath = req.file.path;
  const fileName = req.file.originalname
  
 await uploadS3('voice-memos-bucket', fileName, filePath);
 fs.unlinkSync(filePath)
 await run('JobNodeBack', fileName)
  res.send(200);
})

app.listen(3030, ()=>{
  console.log('Server up and running on port 3030!');
})
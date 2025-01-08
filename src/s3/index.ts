import { readFile } from "node:fs/promises";
import { PutObjectCommand, S3Client, S3ServiceException } from "@aws-sdk/client-s3";

export async function uploadS3(bucketName: string, key: string, filePath:string){
  const client = new S3Client({});
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: await readFile(filePath),
  })

  try{
    const response = await client.send(command);
    console.log(response);
  }
  catch (err) {
    if (err instanceof S3ServiceException && 
      err.name === 'EntityTooLarge'
    ){ console.error(' File too large')}
    else if (err instanceof S3ServiceException){
      console.error('Error from S3 while uploading object to bucket')
    }
    else {
      throw err;
    }
  }

}

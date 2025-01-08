import express from 'express';

const app = express()

app.get('/', (req,res)=>{
  res.send('Ok!');
})

app.listen(3030, ()=>{
  console.log('Server up and running on port 3030!');
})
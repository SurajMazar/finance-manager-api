import express, { Response,Request } from 'express';

const app = express();

app.get('',(req:Request,res:Response)=>{
  res.send("Hello from finance manager api");
})

app.listen(5000);
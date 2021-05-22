import express, { Response,Request, NextFunction } from 'express';
import {port} from './app/config/site.config';
import {instance} from './utils/multer.utils';
import api from './routes/routes';

const app = express();
app.use(express.static('./public'));
app.use(express.json());
app.use(instance.any());

app.get('',(req:Request,res:Response,next:NextFunction)=>{
  res.send("Hello from finance manager api");
  next();
})

app.use(api);

app.listen(port);


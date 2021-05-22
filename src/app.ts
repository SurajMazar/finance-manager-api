import express, { Response,Request, NextFunction } from 'express';
import {port} from './app/config/site.config';
import {instance} from './utils/multer.utils';
import api from './routes/routes';
import cors from 'cors';
import { formatResponse } from './utils/response.util';


const app = express();
// json parser for body
app.use(express.static('./public'));
app.use(express.json());
app.use(instance.any());
app.use(express.urlencoded({ extended: false}));
app.use(cors());


app.use('/api',api);

// for 404 api 
app.get('/api/*', (req:Request, res:Response)=>{
  res.status(404).json(formatResponse({
    message:"404 error!! The requested route doesnt exists."
  },false))
});
// end 404 api route



app.listen(port);


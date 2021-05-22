import * as dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
dotenv.config();

// port 
export const port = process.env.PORT;

//pages
export const ItemPerPage = 10;

// jwt 
export const JWT_SECRET_KEY:Secret = "Hr/OwDdxV5YfQ9rvAgMBAAE=hHr/OwDdxV5YfQ9rvAgMBAAE=";
export const JWT_EXPIRY = 60*60*24*7;
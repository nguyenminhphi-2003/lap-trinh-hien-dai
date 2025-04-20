import express from 'express'
import productRouter from './routers/product.js';
import { connectDB } from './config/db.js';
import dotenv  from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express();


app.use(express.json());
app.use(morgan("dev"))

connectDB("")

app.use('/products', productRouter)


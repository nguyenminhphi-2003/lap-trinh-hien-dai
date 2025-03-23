import express from 'express'
import productRouter from "./routers/product";
import { connectDB } from './config/db';
import dotenv  from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express();


app.use(express.json());
app.use(morgan("dev"))
//connect db
connectDB(process.env.DB_URI)


app.use('/api', productRouter)

export const viteNodeApp = app;
import express from 'express'
import productRouter from './routers/product.js';
import { connectDB } from './config/db.js';
import dotenv  from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express();


app.use(express.json());
app.use(morgan("dev"))

connectDB("mongodb+srv://root:12345@lap-trinh-hien-dai.n0j6pdw.mongodb.net/?retryWrites=true&w=majority&appName=lap-trinh-hien-dai")

app.use('/products', productRouter)

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
});
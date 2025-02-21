import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(process.env.DB_HOST);

app.use(morgan('dev'));

app.listen(8000, () => {
  console.log('Hello world!');
});

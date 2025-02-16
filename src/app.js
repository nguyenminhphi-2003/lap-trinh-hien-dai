import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.listen(8000, () => {
  console.log('Hello world!');
});

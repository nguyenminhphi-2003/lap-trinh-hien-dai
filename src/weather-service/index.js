import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import weatherRoutes from './weather.js';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/weather', weatherRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

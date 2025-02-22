import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import errorController from './controllers/errorController.js';
import { CreateError } from './utils/CreateError.js';

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Catch all unmatched routes
app.use((req, res, next) => {
  next(new CreateError('Not Found', 404));
});

// Error handling
app.use(errorController);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

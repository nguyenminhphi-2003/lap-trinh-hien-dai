import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import errorController from './to-do-list/controllers/errorController.js';
import { CreateError } from './to-do-list/utils/CreateError.js';

// Chat websocket server
import chatapp from './chat-websocket/server.js';

// Todolist routes
import userRoutes from './to-do-list/routes/userRoutes.js';
import taskRoutes from './to-do-list/routes/taskRoutes.js';

// Weather routes
import weatherRoutes from './weather-service/weather.js'

// Upload file routes
import uploadRoutes from './upload-file/app.js';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Todo list routes
app.use('/todolist/users', userRoutes);
app.use('/todolist/tasks', taskRoutes);

// Weather routes
app.use('/weather', weatherRoutes);

// Upload file routes
app.use('/upload', uploadRoutes);

app.use((req, res, next) => {
  next(new CreateError('Not Found', 404));
});

app.use(errorController);

app.listen(3000, () => {
  console.log('Listening all apps on port 3000...');
});

chatapp.listen(4000, () => {
  console.log('Chat app is running on port 4000...');
});
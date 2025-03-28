import { Sequelize, DataTypes } from 'sequelize';
import UserModel from './models/userModel.js';
import TaskModel from './models/taskModel.js';

const sequelize = new Sequelize('todolist', 'root', 'abc12345', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});
(async () => {
  await sequelize.sync({ alter: true });
  console.log('Database synchronized successfully');
})();

const User = UserModel(sequelize, DataTypes);
const Task = TaskModel(sequelize, DataTypes);

User.associate({ Task });
Task.associate({ User });

export { User, Task };

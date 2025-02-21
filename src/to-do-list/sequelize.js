import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todolist', 'root', '12345', {
  host: '172.25.48.1',
  dialect: 'mysql',
});
(async () => {
  await sequelize.sync({ alter: true });
  console.log('Database synchronized successfully');
})();

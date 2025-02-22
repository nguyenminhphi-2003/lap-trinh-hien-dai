import { User, Task } from '../sequelize.js';
import catchAsync from '../utils/catchAsync.js';
import { CreateError } from '../utils/CreateError.js';

// QUERY FILTER
const filterByStatus = (req) => {
  const { status } = req.query;
  const filter = { user_id: req.user.id };

  if (status) filter.status = status;

  return filter;
};

const taskController = {
  getAllTasks: catchAsync(async (req, res) => {
    const tasks = await Task.findAll({
      where: filterByStatus(req),
    });

    console.log(req.query);

    res.status(200).json({
      status: 'success',
      data: tasks,
    });
  }),

  getTaskById: catchAsync(async (req, res, next) => {
    const filter = filterByStatus(req);
    filter.id = req.params.id;

    const task = await Task.findOne({
      where: filter,
      include: [{ model: User, attributes: ['name'] }],
    });

    if (!task) return next(new CreateError('Task not found', 404));

    res.status(200).json({
      status: 'success',
      data: task,
    });
  }),

  createTask: catchAsync(async (req, res) => {
    const task = await Task.create({
      ...req.body,
      user_id: req.user.id,
    });

    res.status(201).json({
      status: 'success',
      data: task,
    });
  }),

  updateTask: catchAsync(async (req, res, next) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) return next(new CreateError('Task not found', 404));

    await task.update(req.body);

    res.status(200).json({
      status: 'success',
      data: task,
    });
  }),

  deleteTask: catchAsync(async (req, res, next) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) return next(new CreateError('Task not found', 404));

    await task.destroy();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

export default taskController;

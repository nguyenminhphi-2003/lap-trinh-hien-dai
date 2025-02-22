import { User } from '../sequelize.js';
import catchAsync from '../utils/catchAsync.js';
import { CreateError } from '../utils/CreateError.js';

const userController = {
  getAllUsers: catchAsync(async (req, res) => {
    const users = await User.findAll();

    res.status(200).json({
      status: 'success',
      data: users,
    });
  }),

  getUserById: catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (!user) return next(new CreateError('User not found', 404));

    res.status(200).json({
      status: 'success',
      data: user,
    });
  }),

  createUser: catchAsync(async (req, res) => {
    res.status(400).json({
      status: 'fail',
      message: 'Please use /signup for create new user',
    });
  }),

  updateUser: catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    await user.update({
      name: req.body.name,
    });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  }),

  deleteCurrentUser: catchAsync(async (req, res) => {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).json({
      status: 'success',
    });
  }),
};

export default userController;

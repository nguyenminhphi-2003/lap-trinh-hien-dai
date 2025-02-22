import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import { CreateError } from '../utils/CreateError.js';
import { promisify } from 'util';
import { User } from '../sequelize.js';

const JWT_SECRET = '123';

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '10m',
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const authController = {
  signup: catchAsync(async (req, res) => {
    const newUser = await User.create(
      {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
      },
      { fields: ['username', 'name', 'password'] },
    );

    createSendToken(newUser, 201, res);
  }),

  login: catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new CreateError('Please provide email and password', 400));
    }

    const user = await User.scope('withPassword').findOne({
      where: { username: username },
    });
    if (!user || user.password !== password) {
      return next(new CreateError('Incorrect username or password', 401));
    }

    createSendToken(user, 200, res);
  }),

  protect: catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return next(new CreateError('Please login', 401));
    }

    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user)
      return next(
        new CreateError(
          'The user belong to this token does no longer exist.',
          401,
        ),
      );

    req.user = user;
    res.locals.user = user;
    next();
  }),
};

export default authController;

import { UniqueConstraintError } from 'sequelize';

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err instanceof UniqueConstraintError) {
    err.statusCode = 400;
    err.status = 'fail';
    err.mesage = 'Username already exists';
  }

  // Only use for development
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

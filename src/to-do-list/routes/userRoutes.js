import { Router } from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect);

router
  .get('/', userController.getAllUsers)
  .post('/', userController.createUser);

router
  .get('/:id', userController.getUserById)
  .patch('/:id', userController.updateUser)
  .delete('/:id', userController.deleteCurrentUser);

export default router;

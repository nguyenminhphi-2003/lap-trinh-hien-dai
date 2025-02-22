import { Router } from 'express';
import taskController from '../controllers/taskController.js';
import authController from '../controllers/authController.js';

const router = Router();

router.use(authController.protect);

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);


router
  .route('/:id')
  .get(taskController.getTaskById)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;

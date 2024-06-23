import express, { Router } from 'express';

import userController from './../controllers/userController';
import userProtection from '../middlewares/userProtection';
import authMiddleware from '../middlewares/authMiddleware';
import validator from '../validators';

const router: Router = express.Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .delete(
    authMiddleware.authenticate,
    userProtection.authorize,
    userController.deleteUserById
  )
  .get(userController.getUserById)
  .patch(
    authMiddleware.authenticate,
    userProtection.authorize,
    validator('user_update'),
    userController.updateUserById
  )
  .get();

export default router;

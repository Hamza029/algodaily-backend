import express, { Router } from 'express';

import userController from './../controllers/userController';
import userProtection from '../middlewares/userProtection';
import authMiddleware from '../middlewares/authMiddleware';

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
    userController.updateUserById
  )
  .get();

export default router;

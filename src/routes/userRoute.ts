import express, { Router } from 'express';

import userController from './../controllers/userController';
import userProtection from '../middlewares/userProtection';

const router: Router = express.Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .delete(
    userProtection.authenticate,
    userProtection.authorize,
    userController.deleteUserById
  )
  .get(userController.getUserById)
  .patch(
    userProtection.authenticate,
    userProtection.authorize,
    userController.updateUserById
  )
  .get();

export default router;

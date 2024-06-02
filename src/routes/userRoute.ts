import express, { Router } from 'express';

import userController from './../controllers/userController';

const router: Router = express.Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .delete(userController.protect, userController.deleteUserById)
  .get(userController.getUserById)
  .patch(userController.protect, userController.updateUserById);

export default router;

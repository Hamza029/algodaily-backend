import express, { Router } from 'express';

import authController from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
import validator from './../validators';

const router: Router = express.Router();

router.route('/signup').post(validator('signup'), authController.signup);

router.route('/login').post(validator('login'), authController.login);

router
  .route('/password')
  .patch(authMiddleware.authenticate, authController.updateMyPassword);

export default router;

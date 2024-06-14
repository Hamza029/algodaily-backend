import express, { Router } from 'express';

import authController from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = express.Router();

router.route('/signup').post(authController.signup);

router.route('/login').post(authController.login);

router
  .route('/password')
  .patch(authMiddleware.authenticate, authController.updateMyPassword);

export default router;

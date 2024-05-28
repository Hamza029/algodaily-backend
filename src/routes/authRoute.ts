import express, { Router } from 'express';

import authController from '../controllers/authController';

const router: Router = express.Router();

router.route('/signup').post(authController.signup);

router.route('/login').post(authController.login);

export default router;

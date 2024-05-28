import express, { Router } from 'express';

import authController from '../controllers/authController';

const router: Router = express.Router();

router.route('/signup').post(authController.signup);

export default router;

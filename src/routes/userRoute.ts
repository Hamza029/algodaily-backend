import express, { Express, Router } from 'express';

import userController from './../controllers/userController';

const router: Router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id').delete(userController.deleteUserById);

export default router;

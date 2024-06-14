import express from 'express';
import { Router } from 'express';
import blogController from '../controllers/blogController';
import blogProtection from '../middlewares/blogProtection';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = express.Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(authMiddleware.authenticate, blogController.createBlog);

router
  .route('/:id')
  .get(blogController.getBlogById)
  .delete(
    authMiddleware.authenticate,
    blogProtection.authorize,
    blogController.deleteBlogById
  )
  .patch(
    authMiddleware.authenticate,
    blogProtection.authorize,
    blogController.updateBlogById
  );

export default router;

import express from 'express';
import { Router } from 'express';
import blogController from '../controllers/blogController';
import blogProtection from '../middlewares/blogProtection';
import authMiddleware from '../middlewares/authMiddleware';
import validator from '../validators';

const router: Router = express.Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(authMiddleware.authenticate, validator('create_blog'), blogController.createBlog);

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
    validator('blog_update'),
    blogController.updateBlogById
  );

export default router;

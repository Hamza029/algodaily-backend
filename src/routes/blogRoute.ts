import express from 'express';
import { Router } from 'express';
import blogController from '../controllers/blogController';

const router: Router = express.Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route('/:id')
  .get(blogController.getBlogById)
  .delete(blogController.protect, blogController.deleteBlogById)
  .patch(blogController.protect, blogController.updateBlogById);

export default router;

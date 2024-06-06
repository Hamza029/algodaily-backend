import { IBlogResponse } from './../interfaces/blog';
import { Request, Response, NextFunction } from 'express';
import blogService from '../services/blogService';
import sendResponse from '../utils/sendResponse';
import { parseIdParam } from '../utils/parseParam';

const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs: IBlogResponse[] = await blogService.getAllBlogs();

    sendResponse<IBlogResponse[]>(
      req,
      res,
      200,
      'successfully fetched all blogs',
      blogs
    );
  } catch (err) {
    next(err);
  }
};

const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = parseIdParam(req);

  try {
    const blog = await blogService.getBlogById(id);

    sendResponse<IBlogResponse>(
      req,
      res,
      200,
      'successfully fetched blog',
      blog
    );
  } catch (err) {
    next(err);
  }
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseIdParam(req);
    await blogService.protect(id, req.header('Authorization'));
    next();
  } catch (err) {
    next(err);
  }
};

const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization');
  const requestBody = { ...req.body };

  try {
    await blogService.createBlog(requestBody, token);

    sendResponse(req, res, 201, 'successfully created you blog');
  } catch (err) {
    next(err);
  }
};

const deleteBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = parseIdParam(req);

  try {
    await blogService.deleteBlogById(id);

    sendResponse(req, res, 200, 'successfully deleted your blog');
  } catch (err) {
    next(err);
  }
};

const updateBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = parseIdParam(req);
  const requestBody = { ...req.body };

  try {
    const blog: IBlogResponse = await blogService.updateBlogById(
      id,
      requestBody
    );

    sendResponse<IBlogResponse>(
      req,
      res,
      200,
      'successfully updated your blog',
      blog
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllBlogs,
  getBlogById,
  protect,
  createBlog,
  deleteBlogById,
  updateBlogById,
};

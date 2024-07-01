import { IBlogResponse } from './../interfaces/blog';
import { Request, Response, NextFunction } from 'express';
import blogService from '../services/blogService';
import sendResponse from '../utils/sendResponse';
import { IProtectedRequest } from '../interfaces';
import { HTTPStatusCode } from '../constants';

const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs: IBlogResponse[] = await blogService.getAllBlogs(req.query);

    sendResponse<IBlogResponse[]>(
      req,
      res,
      HTTPStatusCode.Ok,
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
  try {
    const blog = await blogService.getBlogById(req.params.id);

    sendResponse<IBlogResponse>(
      req,
      res,
      HTTPStatusCode.Ok,
      'successfully fetched blog',
      blog
    );
  } catch (err) {
    next(err);
  }
};

const createBlog = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const requestBody = { ...req.body };

  try {
    await blogService.createBlog(requestBody, req.user!);

    sendResponse(
      req,
      res,
      HTTPStatusCode.Created,
      'successfully created you blog'
    );
  } catch (err) {
    next(err);
  }
};

const deleteBlogById = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await blogService.deleteBlogById(req.params.id);

    sendResponse(req, res, HTTPStatusCode.Ok, 'successfully deleted your blog');
  } catch (err) {
    next(err);
  }
};

const updateBlogById = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const requestBody = { ...req.body };

  try {
    const blog: IBlogResponse = await blogService.updateBlogById(
      req.params.id,
      requestBody
    );

    sendResponse<IBlogResponse>(
      req,
      res,
      HTTPStatusCode.Ok,
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
  createBlog,
  deleteBlogById,
  updateBlogById,
};

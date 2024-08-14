import { IBlogResponse, IBlogResponseList } from './../interfaces/blog';
import { Request, Response, NextFunction } from 'express';
import blogService from '../services/blogService';
import sendResponse from '../utils/sendResponse';
import { ICommentResponseList, IProtectedRequest } from '../interfaces';
import { HTTPStatusCode } from '../constants';
import KnexError from '../utils/knexError';
import AppError from '../utils/appError';

const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs: IBlogResponseList = await blogService.getAllBlogs(req.query);

    sendResponse<IBlogResponseList>(
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

const likeBlogByBlogId = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await blogService.likeBlogByBlogId(id, req.user!);
    sendResponse(
      req,
      res,
      HTTPStatusCode.Created,
      'Successfully liked the blog'
    );
  } catch (err) {
    if ((err as KnexError).code === 'ER_DUP_ENTRY') {
      next(
        new AppError(
          'You have already liked this blog',
          HTTPStatusCode.Conflict
        )
      );
    } else {
      next(err);
    }
  }
};

const unlikeBlogByBlogId = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await blogService.unlikeBlogByBlogId(id, req.user!);
    sendResponse(req, res, HTTPStatusCode.Ok, 'Successfully unliked the blog');
  } catch (err) {
    next(err);
  }
};

const getCommentsByBlogId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const queryParams = { ...req.query };
    const comments: ICommentResponseList =
      await blogService.getCommentsByBlogId(id, queryParams);
    sendResponse<ICommentResponseList>(
      req,
      res,
      HTTPStatusCode.Ok,
      'Successfully fetched comments',
      comments
    );
  } catch (err) {
    next(err);
  }
};

const createComment = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const reqBody = { ...req.body };
    await blogService.createComment(reqBody, id, req.user!);
    sendResponse(
      req,
      res,
      HTTPStatusCode.Created,
      'Successfylly added your comment'
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
  likeBlogByBlogId,
  unlikeBlogByBlogId,
  createComment,
  getCommentsByBlogId,
};

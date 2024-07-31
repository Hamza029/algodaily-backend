import db from '../database/db';
import {
  IBlog,
  IBlogDbInput,
  IBlogUpdateDbInput,
  IComment,
  ICommentDBInput,
  ICommentResponse,
  ILike,
  IUser,
} from '../interfaces';

const getAllBlogs = async (
  skip: number,
  limit: number,
  search: string
): Promise<IBlog[]> => {
  const blogs: IBlog[] = await db<IBlog>('Blog')
    .whereRaw(
      `Blog.title like "%${search}%" or Blog.description like "%${search}%"`
    )
    .select('*')
    .offset(skip)
    .limit(limit);

  return blogs;
};

const getBlogById = async (id: string): Promise<IBlog | undefined> => {
  const blog: IBlog | undefined = await db<IBlog>('Blog')
    .select('*')
    .where('id', '=', id)
    .first();
  return blog;
};

const getBlogsByAuthorId = async (
  authorId: string,
  skip: number,
  limit: number,
  search: string
): Promise<IBlog[]> => {
  const blogs: IBlog[] = await db<IBlog>('Blog')
    .whereRaw(
      `authorId="${authorId}" and (Blog.title like "%${search}%" or Blog.description like "%${search}%")`
    )
    .select('*')
    .offset(skip)
    .limit(limit);

  return blogs;
};

const createBlog = async (blogDbInput: IBlogDbInput): Promise<void> => {
  await db<IBlog>('Blog').insert(blogDbInput);
};

const deleteBlogById = async (id: string): Promise<void> => {
  await db<IBlog>('Blog').where('id', '=', id).del();
};

const updateBlogById = async (
  id: string,
  blogUpdateDbInput: IBlogUpdateDbInput
): Promise<void> => {
  await db<IBlog>('Blog').where('id', '=', id).update(blogUpdateDbInput);
};

const getLikesByBlogId = async (blogId: string): Promise<ILike[]> => {
  const likes = await db<ILike>('Like').where({ blogId: blogId }).select('*');
  return likes;
};

const likeBlogByBlogId = async (
  blogId: string,
  userId: string
): Promise<void> => {
  await db<ILike>('Like').insert({ blogId, userId });
};

const unlikeBlogByBlogId = async (
  blogId: string,
  userId: string
): Promise<number> => {
  const unreacted = await db<ILike>('Like')
    .where({ blogId: blogId, userId: userId })
    .del();
  return unreacted;
};

const getCommentsByBlogId = async (blogId: string) => {
  const comments: ICommentResponse[] = await db<IComment>('Comment')
    .where({ blogId: blogId })
    .join<IUser>('User', 'Comment.userId', 'User.id')
    .select(
      'Comment.id',
      'userId',
      'blogId',
      'createdAt',
      'username',
      'content'
    )
    .orderBy('createdAt');

  return comments;
};

const createComment = async (
  commentDbInput: ICommentDBInput
): Promise<void> => {
  await db<IComment>('Comment').insert(commentDbInput);
};

export default {
  getAllBlogs,
  getBlogById,
  getBlogsByAuthorId,
  createBlog,
  deleteBlogById,
  updateBlogById,
  getLikesByBlogId,
  likeBlogByBlogId,
  unlikeBlogByBlogId,
  createComment,
  getCommentsByBlogId,
};

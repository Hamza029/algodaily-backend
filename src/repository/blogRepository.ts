import db from '../database/db';
import {
  IBlog,
  IBlogDbInput,
  IBlogUpdateDbInput,
  IComment,
  ICommentDBInput,
  ICommentResponse,
  ILike,
  ILikeResponse,
  IUser,
} from '../interfaces';

const getAllBlogs = async (
  skip: number,
  limit: number,
  search: string
): Promise<IBlog[]> => {
  const blogs: IBlog[] = await db<IBlog>('Blog')
    .whereRaw(
      `Blog.title like "%${search}%" or Blog.description like "%${search}%" or Blog.authorUsername like "%${search}%"`
    )
    .select('*')
    .orderBy('createdAt', 'desc')
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
      `authorId="${authorId}" and (Blog.title like "%${search}%" or Blog.description like "%${search}%" or Blog.authorUsername like "%${search}%")`
    )
    .select('*')
    .orderBy('createdAt', 'desc')
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

const getLikesByBlogId = async (blogId: string): Promise<ILikeResponse[]> => {
  const likes = await db<ILike>('Like')
    .where({ blogId: blogId })
    .join<IUser>('User', 'Like.userId', 'User.id')
    .select('Like.id', 'userId', 'blogId', 'username');
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
    .orderBy('createdAt', 'desc');

  return comments;
};

const createComment = async (
  commentDbInput: ICommentDBInput
): Promise<void> => {
  await db<IComment>('Comment').insert(commentDbInput);
};

const getTotalBlogsCount = async (search: string): Promise<number> => {
  const [totalBlogs] = await db<IBlog>('Blog')
    .count('id', { as: 'cnt' })
    .whereRaw(
      `Blog.title like "%${search}%" or Blog.description like "%${search}%"`
    );
  return Number(totalBlogs.cnt);
};

const getTotalBlogsCountByAuthorId = async (
  authorId: string,
  search: string
): Promise<number> => {
  const [totalBlogs] = await db<IBlog>('Blog')
    .count('id', { as: 'cnt' })
    .whereRaw(
      `authorId="${authorId}" and (Blog.title like "%${search}%" or Blog.description like "%${search}%")`
    );
  return Number(totalBlogs.cnt);
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
  getTotalBlogsCount,
  getTotalBlogsCountByAuthorId,
};

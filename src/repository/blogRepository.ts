import db from '../database/db';
import { IBlog, IBlogDbInput, IBlogUpdateDbInput } from '../interfaces';

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

export default {
  getAllBlogs,
  getBlogById,
  getBlogsByAuthorId,
  createBlog,
  deleteBlogById,
  updateBlogById,
};

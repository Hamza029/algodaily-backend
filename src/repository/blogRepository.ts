import db from '../database/db';
import {
  IBlog,
  IBlogDbInput,
  IBlogResponse,
  IBlogUpdateDbInput,
} from '../interfaces';

const getALlBlogs = async (): Promise<IBlog[]> => {
  const blogs: IBlog[] = await db<IBlog>('Blog').select('*');
  return blogs;
};

const getBlogById = async (id: number): Promise<IBlog | undefined> => {
  const blog: IBlog | undefined = await db<IBlog>('Blog')
    .select('*')
    .where('id', '=', id)
    .first();
  return blog;
};

const getBlogsByAuthorUsername = async (username: string): Promise<IBlog[]> => {
  const blogs: IBlog[] = await db<IBlog>('IBlog')
    .select('*')
    .where({ authorUsername: username });
  return blogs;
};

const createBlog = async (blogDbInput: IBlogDbInput): Promise<void> => {
  await db<IBlog>('Blog').insert(blogDbInput);
};

const deleteBlogById = async (id: number): Promise<void> => {
  await db<IBlog>('Blog').where('id', '=', id).del();
};

const updateBlogById = async (
  id: number,
  blogUpdateDbInput: IBlogUpdateDbInput
): Promise<void> => {
  await db<IBlog>('Blog').where('id', '=', id).update(blogUpdateDbInput);
};

export default {
  getALlBlogs,
  getBlogById,
  getBlogsByAuthorUsername,
  createBlog,
  deleteBlogById,
  updateBlogById,
};
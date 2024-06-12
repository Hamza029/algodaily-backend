import { HTTPStatusCode } from '../constants';
import {
  IBlog,
  IBlogDbInput,
  IBlogInput,
  IBlogQueryParams,
  IBlogResponse,
  IBlogUpdateDbInput,
  IBlogUpdateInput,
  IUser,
} from '../interfaces';
import blogRepository from '../repository/blogRepository';
import userRepository from '../repository/userRepository';
import AppError from '../utils/appError';
import jwtUtil from '../utils/jwtUtil';
import {
  BlogDbInputDTO,
  BlogResponseDTO,
  BlogUpdateDbInput,
} from './dtos/blog.dto';

const getAllBlogs = async (
  queryParams: IBlogQueryParams
): Promise<IBlogResponse[]> => {
  const { authorUsername } = queryParams;

  const page: number = queryParams.page ? Number(queryParams.page) : 1;

  if (!page) {
    throw new AppError('Invalid page number', HTTPStatusCode.BadRequest);
  }

  const limit: number = 3;
  const skip: number = (page - 1) * limit;

  const blogs: IBlog[] = await (!authorUsername
    ? blogRepository.getALlBlogs(skip, limit)
    : blogRepository.getBlogsByAuthorUsername(authorUsername, skip, limit));

  if (blogs.length === 0) {
    throw new AppError('No blogs found', HTTPStatusCode.NotFound);
  }

  const blogsResponseDTO: IBlogResponse[] = blogs.map(
    (blog) => new BlogResponseDTO(blog)
  );

  return blogsResponseDTO;
};

const getBlogById = async (id: number): Promise<IBlogResponse> => {
  const blog: IBlog | undefined = await blogRepository.getBlogById(id);

  if (!blog) {
    throw new Error("This blog doesn't exist");
  }

  const blogResponseDTO: IBlogResponse = new BlogResponseDTO(blog);

  return blogResponseDTO;
};

const protect = async (id: number, token: string | undefined) => {
  const blog: IBlog | undefined = await blogRepository.getBlogById(id);

  if (!blog) {
    throw new Error("This blog doesn't exist");
  }

  await jwtUtil.authorize(token, blog.authorUsername);
};

const createBlog = async (
  blogInput: IBlogInput,
  token: string | undefined
): Promise<void> => {
  const payload = await jwtUtil.isLoggedIn(token);

  const user: IUser | undefined = await userRepository.getUserByUsername(
    payload.Username
  );

  if (!user) {
    throw new Error('the owner of this token no longer exists');
  }

  const blogDbInputDTO: IBlogDbInput = new BlogDbInputDTO(blogInput, user);

  await blogRepository.createBlog(blogDbInputDTO);
};

const deleteBlogById = async (id: number) => {
  const blog = await blogRepository.getBlogById(id);

  if (!blog) {
    throw new Error("This blog doesn't exist");
  }

  await blogRepository.deleteBlogById(id);
};

const updateBlogById = async (
  id: number,
  blogUpdateInput: IBlogUpdateInput
): Promise<IBlogResponse> => {
  const blog: IBlog | undefined = await blogRepository.getBlogById(id);

  if (!blog) {
    throw new Error("This blog doesn't exist");
  }

  const blogUpdateDbInput: IBlogUpdateDbInput = new BlogUpdateDbInput(
    blogUpdateInput
  );

  await blogRepository.updateBlogById(id, blogUpdateDbInput);

  const updatedBlog: IBlog | undefined = await blogRepository.getBlogById(id);

  const blogResponseDTO = new BlogResponseDTO(updatedBlog!);

  return blogResponseDTO;
};

export default {
  getAllBlogs,
  getBlogById,
  protect,
  createBlog,
  deleteBlogById,
  updateBlogById,
};

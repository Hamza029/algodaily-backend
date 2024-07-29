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
import AppError from '../utils/appError';
import {
  BlogDbInputDTO,
  BlogResponseDTO,
  BlogUpdateDbInput,
} from './dtos/blog.dto';

const getAllBlogs = async (
  queryParams: IBlogQueryParams
): Promise<IBlogResponse[]> => {
  const { authorId } = queryParams;

  const page: number = Number(queryParams.page) || 1;
  const search: string = queryParams.search || '';

  const limit: number = 10;
  const skip: number = (page - 1) * limit;

  const blogs: IBlog[] = await (!authorId
    ? blogRepository.getAllBlogs(skip, limit, search)
    : blogRepository.getBlogsByAuthorId(authorId, skip, limit, search));

  const blogsResponseDTO: IBlogResponse[] = blogs.map(
    (blog) => new BlogResponseDTO(blog)
  );

  return blogsResponseDTO;
};

const getBlogById = async (id: string): Promise<IBlogResponse> => {
  const blog: IBlog | undefined = await blogRepository.getBlogById(id);

  if (!blog) {
    throw new AppError("This blog doesn't exist", HTTPStatusCode.NotFound);
  }

  const blogResponseDTO: IBlogResponse = new BlogResponseDTO(blog);

  return blogResponseDTO;
};

const createBlog = async (
  blogInput: IBlogInput,
  user: IUser
): Promise<void> => {
  const blogDbInputDTO: IBlogDbInput = new BlogDbInputDTO(blogInput, user);

  await blogRepository.createBlog(blogDbInputDTO);
};

const deleteBlogById = async (id: string) => {
  const blog = await blogRepository.getBlogById(id);

  if (!blog) {
    throw new AppError("This blog doesn't exist", HTTPStatusCode.NotFound);
  }

  await blogRepository.deleteBlogById(id);
};

const updateBlogById = async (
  id: string,
  blogUpdateInput: IBlogUpdateInput
): Promise<IBlogResponse> => {
  const blog: IBlog | undefined = await blogRepository.getBlogById(id);

  if (!blog) {
    throw new AppError("This blog doesn't exist", HTTPStatusCode.NotFound);
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
  createBlog,
  deleteBlogById,
  updateBlogById,
};

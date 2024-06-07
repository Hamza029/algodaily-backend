import {
  IBlog,
  IBlogDbInput,
  IBlogInput,
  IBlogResponse,
  IBlogUpdateDbInput,
  IBlogUpdateInput,
  IUser,
} from '../interfaces';
import blogRepository from '../repository/blogRepository';
import userRepository from '../repository/userRepository';
import jwtUtil from '../utils/jwtUtil';
import {
  BlogDbInputDTO,
  BlogResponseDTO,
  BlogUpdateDbInput,
} from './dtos/blog.dto';

const getAllBlogs = async (queryParams: any): Promise<IBlogResponse[]> => {
  const queryObj = {
    authorUsername: queryParams.authorUsername || '',
  };

  const blogs: IBlog[] = await blogRepository.getALlBlogs(queryObj);

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

const getBlogsByAuthorUsername = async (
  username: string
): Promise<IBlogResponse[]> => {
  const blogs: IBlog[] =
    await blogRepository.getBlogsByAuthorUsername(username);

  const blogsResponseDTO: IBlogResponse[] = blogs.map(
    (blog) => new BlogResponseDTO(blog)
  );

  return blogsResponseDTO;
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
  getBlogsByAuthorUsername,
  protect,
  createBlog,
  deleteBlogById,
  updateBlogById,
};

import { HTTPStatusCode } from '../constants';
import {
  IBlog,
  IBlogDbInput,
  IBlogInput,
  IBlogQueryParams,
  IBlogResponse,
  IBlogResponseList,
  IBlogUpdateDbInput,
  IBlogUpdateInput,
  ICommentDBInput,
  ICommentInput,
  ICommentResponse,
  ILikeResponse,
  IUser,
} from '../interfaces';
import blogRepository from '../repository/blogRepository';
import AppError from '../utils/appError';
import {
  BlogDbInputDTO,
  BlogResponseDTO,
  BlogUpdateDbInput,
} from './dtos/blog.dto';
import { CommentDbInputDTO } from './dtos/comment.dto';

const getAllBlogs = async (
  queryParams: IBlogQueryParams
): Promise<IBlogResponseList> => {
  const { authorId } = queryParams;

  const page: number = Number(queryParams.page) || 1;
  const search: string = queryParams.search || '';

  const limit: number = 6;
  const skip: number = (page - 1) * limit;

  const blogs: IBlog[] = await (!authorId
    ? blogRepository.getAllBlogs(skip, limit, search)
    : blogRepository.getBlogsByAuthorId(authorId, skip, limit, search));

  const likes: Array<ILikeResponse[]> = [];
  const comments: Array<ICommentResponse[]> = [];

  for (let i = 0; i < blogs.length; i++) {
    likes.push(await blogRepository.getLikesByBlogId(blogs[i].id));
    comments.push(await blogRepository.getCommentsByBlogId(blogs[i].id));
  }

  const blogsResponseDTO: IBlogResponse[] = blogs.map((blog, index) => {
    return new BlogResponseDTO(blog, likes[index], comments[index]);
  });

  const totalBlogs = await (!authorId
    ? blogRepository.getTotalBlogsCount(search)
    : blogRepository.getTotalBlogsCountByAuthorId(authorId, search));

  const responseList: IBlogResponseList = {
    totalPages: Math.ceil(totalBlogs / limit),
    blogs: blogsResponseDTO,
  };

  return responseList;
};

const getBlogById = async (id: string): Promise<IBlogResponse> => {
  const blog: IBlog | undefined = await blogRepository.getBlogById(id);

  if (!blog) {
    throw new AppError("This blog doesn't exist", HTTPStatusCode.NotFound);
  }

  const likes = await blogRepository.getLikesByBlogId(blog.id);
  const comments = await blogRepository.getCommentsByBlogId(blog.id);

  const blogResponseDTO: IBlogResponse = new BlogResponseDTO(
    blog,
    likes,
    comments
  );

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

  const blogResponseDTO = new BlogResponseDTO(
    updatedBlog!,
    await blogRepository.getLikesByBlogId(updatedBlog!.id),
    await blogRepository.getCommentsByBlogId(updatedBlog!.id)
  );

  return blogResponseDTO;
};

const likeBlogByBlogId = async (blogId: string, user: IUser) => {
  await blogRepository.likeBlogByBlogId(blogId, user.id);
};

const unlikeBlogByBlogId = async (blogId: string, user: IUser) => {
  const unreacted = await blogRepository.unlikeBlogByBlogId(blogId, user.id);
  if (!unreacted) {
    throw new AppError("You haven't liked this blog", HTTPStatusCode.NotFound);
  }
};

const createComment = async (
  commentInput: ICommentInput,
  blogId: string,
  user: IUser
) => {
  const commentDbInputDTO: ICommentDBInput = new CommentDbInputDTO(
    commentInput.content,
    blogId,
    user.id
  );
  await blogRepository.createComment(commentDbInputDTO);
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
};

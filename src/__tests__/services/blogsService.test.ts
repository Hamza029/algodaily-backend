import { HTTPStatusCode, UserRoles } from '../../constants';
import {
  IBlog,
  IBlogDbInput,
  IBlogInput,
  IBlogResponse,
  IBlogUpdateInput,
  IUser,
} from '../../interfaces';
import blogService from '../../services/blogService';
import AppError from '../../utils/appError';
import blogRepository from './../../repository/blogRepository';

jest.mock('./../../repository/blogRepository', () => {
  return {
    __esModule: true,
    default: {
      getAllBlogs: jest.fn(),
      getBlogById: jest.fn(),
      createBlog: jest.fn(),
      updateBlogById: jest.fn(),
      deleteBlogById: jest.fn(),
      getBlogsByAuthorUsername: jest.fn(),
    },
  };
});

const mockBlogs: IBlog[] = [
  {
    id: 'fe32bd7f-376b-11ef-bf41-088fc3196e05',
    authorId: 'fe32bd7f-376b-11ef-bf41-088fc319usr1',
    title: 'A',
    description: 'A',
    authorUsername: 'userA',
  },
  {
    id: 'fe32bd7f-376b-11ef-bf41-088fc319abcd',
    authorId: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    title: 'B',
    description: 'B',
    authorUsername: 'userB',
  },
];

const mockBlogsResponse: IBlogResponse[] = [
  {
    id: 'fe32bd7f-376b-11ef-bf41-088fc3196e05',
    authorId: 'fe32bd7f-376b-11ef-bf41-088fc319usr1',
    title: 'A',
    description: 'A',
    authorUsername: 'userA',
    _links: {
      self: {
        href: '/api/blogs/fe32bd7f-376b-11ef-bf41-088fc3196e05',
        method: 'GET',
      },
      update: {
        href: '/api/blogs/fe32bd7f-376b-11ef-bf41-088fc3196e05',
        method: 'PATCH',
      },
      delete: {
        href: '/api/blogs/fe32bd7f-376b-11ef-bf41-088fc3196e05',
        method: 'DELETE',
      },
    },
  },
  {
    id: 'fe32bd7f-376b-11ef-bf41-088fc319abcd',
    authorId: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    title: 'B',
    description: 'B',
    authorUsername: 'userB',
    _links: {
      self: {
        href: '/api/blogs/fe32bd7f-376b-11ef-bf41-088fc319abcd',
        method: 'GET',
      },
      update: {
        href: '/api/blogs/fe32bd7f-376b-11ef-bf41-088fc319abcd',
        method: 'PATCH',
      },
      delete: {
        href: '/api/blogs/fe32bd7f-376b-11ef-bf41-088fc319abcd',
        method: 'DELETE',
      },
    },
  },
];

describe('blogService.getAllBlogs', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return list of blogs', async () => {
    const queryParams = {
      page: '3',
    };

    (blogRepository.getAllBlogs as jest.Mock).mockResolvedValueOnce(mockBlogs);

    const blogsResponse: IBlogResponse[] =
      await blogService.getAllBlogs(queryParams);

    expect(blogsResponse).toEqual(mockBlogsResponse);
  });

  it('should return list of blogs of page 1', async () => {
    const queryParams = {
      page: 'abcd',
    };

    (blogRepository.getAllBlogs as jest.Mock).mockResolvedValueOnce(mockBlogs);

    const blogsResponse: IBlogResponse[] =
      await blogService.getAllBlogs(queryParams);

    expect(blogsResponse).toEqual(mockBlogsResponse);
  });

  it('should return list of blogs for particular author', async () => {
    const queryParams = {
      page: '3',
      authorUsername: 'A',
    };

    (
      blogRepository.getBlogsByAuthorUsername as jest.Mock
    ).mockResolvedValueOnce(mockBlogs);

    const blogsResponse: IBlogResponse[] =
      await blogService.getAllBlogs(queryParams);

    expect(blogsResponse).toEqual(mockBlogsResponse);
  });

  it('should throw AppError with status 404', async () => {
    const queryParams = {
      page: '100',
    };

    (blogRepository.getAllBlogs as jest.Mock).mockResolvedValueOnce([]);

    await expect(blogService.getAllBlogs(queryParams)).rejects.toThrow(
      new AppError('No blogs found', HTTPStatusCode.NotFound)
    );
  });
});

describe('blogService.getBlogById', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a blog', async () => {
    const id: string = mockBlogs[0].id;

    (blogRepository.getBlogById as jest.Mock).mockResolvedValueOnce(
      mockBlogs[0]
    );

    const blogResponse: IBlogResponse | undefined =
      await blogService.getBlogById(id);

    expect(blogResponse).toEqual(mockBlogsResponse[0]);
  });

  it('should return a blog', async () => {
    const id: string = mockBlogs[0].id;

    (blogRepository.getBlogById as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(blogService.getBlogById(id)).rejects.toThrow(
      new AppError("This blog doesn't exist", HTTPStatusCode.NotFound)
    );
  });
});

describe('blogService.createBlog', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockUser: IUser = {
    Id: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    Username: 'a',
    Name: 'a',
    Email: 'a@gmail.com',
    Role: UserRoles.USER,
    JoinDate: new Date(),
  };

  const blogInput: IBlogInput = {
    title: 'A',
    description: 'A',
  };

  const blogDbInput: IBlogDbInput = {
    ...blogInput,
    authorId: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    authorUsername: mockUser.Username,
  };

  it('should create a blog', async () => {
    (blogRepository.createBlog as jest.Mock).mockResolvedValueOnce(null);

    await blogService.createBlog(blogInput, mockUser);

    expect(blogRepository.createBlog).toHaveBeenCalledWith(blogDbInput);
  });
});

describe('blogService.updateBlogById', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const id = mockBlogs[0].id;

  const blogUpdateInput: IBlogUpdateInput = {
    title: 'C',
    description: 'C',
  };

  const mockUpdatedBlog: IBlog = {
    id: mockBlogs[0].id,
    authorId: mockBlogs[0].authorId,
    title: 'C',
    description: 'C',
    authorUsername: mockBlogs[0].authorUsername,
  };

  const mockUpdatedBlogResponse: IBlogResponse = {
    ...mockUpdatedBlog,
    _links: {
      self: {
        href: '/api/blogs/fe32bd7f-376b-11ef-bf41-088fc3196e05',
        method: 'GET',
      },
      update: {
        href: '/api/blogs/fe32bd7f-376b-11ef-bf41-088fc3196e05',
        method: 'PATCH',
      },
      delete: {
        href: '/api/blogs/fe32bd7f-376b-11ef-bf41-088fc3196e05',
        method: 'DELETE',
      },
    },
  };

  it('should update a blog', async () => {
    (blogRepository.getBlogById as jest.Mock)
      .mockResolvedValueOnce(mockBlogs[0])
      .mockResolvedValueOnce(mockUpdatedBlog);

    const blogResponse: IBlogResponse = await blogService.updateBlogById(
      id,
      blogUpdateInput
    );

    expect(blogResponse).toEqual(mockUpdatedBlogResponse);
  });

  it('should throw blog not found error', async () => {
    (blogRepository.getBlogById as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(blogService.updateBlogById).rejects.toThrow(
      new AppError("This blog doesn't exist", HTTPStatusCode.NotFound)
    );
  });
});

describe('blogService.deleteBlogById', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const id = mockBlogs[0].id;

  it('should delete a blog', async () => {
    (blogRepository.getBlogById as jest.Mock).mockResolvedValueOnce(
      mockBlogs[0]
    );
    (blogRepository.deleteBlogById as jest.Mock).mockResolvedValueOnce(null);

    await blogService.deleteBlogById(id);

    expect(blogRepository.deleteBlogById).toHaveBeenCalledWith(id);
  });

  it('should throw blog not found error', async () => {
    (blogRepository.getBlogById as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(blogService.deleteBlogById(id)).rejects.toThrow(
      new AppError("This blog doesn't exist", HTTPStatusCode.NotFound)
    );
  });
});

import { HTTPStatusCode, UserRoles } from '../../constants';
import {
  IBlog,
  IBlogDbInput,
  IBlogInput,
  IBlogResponse,
  IBlogResponseList,
  IBlogUpdateInput,
  ICommentCount,
  ICommentInput,
  ICommentQueryParams,
  ICommentResponse,
  ICommentResponseList,
  ILikeResponse,
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
      getBlogsByAuthorId: jest.fn(),
      getLikesByBlogId: jest.fn(),
      getCommentsCountByBlogId: jest.fn(),
      getTotalBlogsCount: jest.fn(),
      getTotalBlogsCountByAuthorId: jest.fn(),
      createComment: jest.fn(),
      likeBlogByBlogId: jest.fn(),
      unlikeBlogByBlogId: jest.fn(),
      getLikesByBlogIds: jest.fn(),
      getCommentCountsByBlogIds: jest.fn(),
      getCommentsByBlogId: jest.fn(),
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
    createdAt: new Date('2024-08-02T04:55:06.000Z'),
  },
  {
    id: 'fe32bd7f-376b-11ef-bf41-088fc319abcd',
    authorId: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    title: 'B',
    description: 'B',
    authorUsername: 'userB',
    createdAt: new Date('2024-08-02T04:55:06.000Z'),
  },
];

const mockLikesResponse: ILikeResponse[] = [
  {
    blogId: 'fe32bd7f-376b-11ef-bf41-088fc3196e05',
    id: '26afb5ef-54a3-11ef-8246-088fc3196e05',
    userId: 'fe32bd7f-376b-11ef-bf41-088fc319usr1',
    username: 'userA',
  },
  {
    blogId: 'fe32bd7f-376b-11ef-bf41-088fc319abcd',
    id: '26afb5ef-54a3-11ef-8246-088fc3196e06',
    userId: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    username: 'userB',
  },
];

const mockCommentCountsResponse: ICommentCount[] = [
  {
    blogId: 'fe32bd7f-376b-11ef-bf41-088fc3196e05',
    numberOfComments: 3,
  },
  {
    blogId: 'fe32bd7f-376b-11ef-bf41-088fc319abcd',
    numberOfComments: 3,
  },
];

const mockBlogsResponse: IBlogResponse[] = [
  {
    id: 'fe32bd7f-376b-11ef-bf41-088fc3196e05',
    authorId: 'fe32bd7f-376b-11ef-bf41-088fc319usr1',
    title: 'A',
    description: 'A',
    authorUsername: 'userA',
    likes: [mockLikesResponse[0]],
    commentsCount: 3,
    createdAt: new Date('2024-08-02T04:55:06.000Z'),
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
    createdAt: new Date('2024-08-02T04:55:06.000Z'),
    likes: [mockLikesResponse[1]],
    commentsCount: 3,
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

const mockBlogsResponseList: IBlogResponseList = {
  totalPages: 3,
  blogs: mockBlogsResponse,
};

const mockCommnetsResponse: ICommentResponse[] = [
  {
    id: '264610d1-5a2f-11ef-b143-088fc3196e05',
    userId: '485944e0-508b-11ef-a18f-088fc3196e05',
    blogId: 'f9c28d64-5499-11ef-8246-088fc3196e05',
    createdAt: new Date('2024-08-14T11:20:02.000Z'),
    username: 'hamza1',
    content: 'asdfasf',
  },
  {
    id: '24c5a0e5-5a2f-11ef-b143-088fc3196e05',
    userId: '485944e0-508b-11ef-a18f-088fc3196e05',
    blogId: 'f9c28d64-5499-11ef-8246-088fc3196e05',
    createdAt: new Date('2024-08-14T11:20:00.000Z'),
    username: 'hamza1',
    content: 'asdfasf',
  },
  {
    id: 'c5fa988d-5a2e-11ef-b143-088fc3196e05',
    userId: '485944e0-508b-11ef-a18f-088fc3196e05',
    blogId: 'f9c28d64-5499-11ef-8246-088fc3196e05',
    createdAt: new Date('2024-08-14T11:17:21.000Z'),
    username: 'hamza1',
    content: 'lskadjflkasdjf',
  },
];

const mockCommnetsResponseList: ICommentResponseList = {
  totalComments: 3,
  comments: mockCommnetsResponse,
};

describe('blogService.getAllBlogs', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    (blogRepository.getLikesByBlogId as jest.Mock).mockResolvedValue([]);
    (blogRepository.getLikesByBlogIds as jest.Mock).mockResolvedValue(
      mockLikesResponse
    );
    (blogRepository.getCommentsCountByBlogId as jest.Mock).mockResolvedValue(3);
    (blogRepository.getCommentCountsByBlogIds as jest.Mock).mockResolvedValue(
      mockCommentCountsResponse
    );
  });

  it('should return list of blogs', async () => {
    const queryParams = {
      page: '3',
    };

    (blogRepository.getAllBlogs as jest.Mock).mockResolvedValueOnce(mockBlogs);
    (blogRepository.getTotalBlogsCount as jest.Mock).mockResolvedValueOnce(17);

    const blogsResponse: IBlogResponseList =
      await blogService.getAllBlogs(queryParams);

    expect(blogsResponse).toEqual(mockBlogsResponseList);
  });

  it('should return list of blogs of page 1', async () => {
    const queryParams = {
      page: 'abcd',
    };

    (blogRepository.getAllBlogs as jest.Mock).mockResolvedValueOnce(mockBlogs);
    (blogRepository.getTotalBlogsCount as jest.Mock).mockResolvedValueOnce(17);

    const blogsResponse: IBlogResponseList =
      await blogService.getAllBlogs(queryParams);

    expect(blogsResponse).toEqual(mockBlogsResponseList);
  });

  it('should return list of blogs for particular author', async () => {
    const queryParams = {
      page: '3',
      authorId: '504f9c47-3798-11ef-bf41-088fc3196e05',
    };

    (blogRepository.getBlogsByAuthorId as jest.Mock).mockResolvedValueOnce(
      mockBlogs
    );
    (
      blogRepository.getTotalBlogsCountByAuthorId as jest.Mock
    ).mockResolvedValueOnce(17);

    const blogsResponse: IBlogResponseList =
      await blogService.getAllBlogs(queryParams);

    expect(blogsResponse).toEqual(mockBlogsResponseList);
  });

  it('should throw error', async () => {
    const queryParams = {
      page: '100',
    };

    (blogRepository.getAllBlogs as jest.Mock).mockRejectedValueOnce(
      new AppError('Something went wrong', HTTPStatusCode.InternalServerError)
    );

    await expect(blogService.getAllBlogs(queryParams)).rejects.toThrow(
      new AppError('Something went wrong', HTTPStatusCode.InternalServerError)
    );
  });
});

describe('blogService.getBlogById', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    (blogRepository.getLikesByBlogId as jest.Mock).mockResolvedValue(
      mockBlogsResponse[0].likes
    );
    (blogRepository.getCommentsCountByBlogId as jest.Mock).mockResolvedValue(3);
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

  it('should return a blog too', async () => {
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
    id: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    username: 'a',
    name: 'a',
    email: 'a@gmail.com',
    role: UserRoles.USER,
    joinDate: new Date(),
  };

  const blogInput: IBlogInput = {
    title: 'A',
    description: 'A',
  };

  const blogDbInput: IBlogDbInput = {
    ...blogInput,
    authorId: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    authorUsername: mockUser.username,
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

  beforeEach(() => {
    (blogRepository.getLikesByBlogId as jest.Mock).mockResolvedValue([]);
    (blogRepository.getCommentsCountByBlogId as jest.Mock).mockResolvedValue(3);
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
    createdAt: new Date('2024-08-02T04:55:06.000Z'),
  };

  const mockUpdatedBlogResponse: IBlogResponse = {
    ...mockUpdatedBlog,
    likes: [],
    commentsCount: 3,
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

describe('blogService.createComment', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockUser: IUser = {
    id: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    username: 'a',
    name: 'a',
    email: 'a@gmail.com',
    role: UserRoles.USER,
    joinDate: new Date(),
  };

  const commentInput: ICommentInput = {
    content: 'This is a comment',
  };

  it('should create a comment', async () => {
    await blogService.createComment(commentInput, mockBlogs[0].id, mockUser);

    expect(blogRepository.createComment).toHaveBeenCalledTimes(1);
  });
});

describe('blogService.likeBlogByBlogId', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockUser: IUser = {
    id: 'fe32bd7f-376b-11ef-bf41-088fc319usr2',
    username: 'a',
    name: 'a',
    email: 'a@gmail.com',
    role: UserRoles.USER,
    joinDate: new Date(),
  };

  it('should like a blog successfully', async () => {
    await blogService.likeBlogByBlogId(mockBlogs[0].id, mockUser);

    expect(blogRepository.likeBlogByBlogId).toHaveBeenCalledTimes(1);
    expect(blogRepository.likeBlogByBlogId).toHaveBeenCalledWith(
      mockBlogs[0].id,
      mockUser.id
    );
  });

  it('should unlike a blog successfully', async () => {
    (blogRepository.unlikeBlogByBlogId as jest.Mock).mockResolvedValueOnce(1);

    await blogService.unlikeBlogByBlogId(mockBlogs[0].id, mockUser);

    expect(blogRepository.unlikeBlogByBlogId).toHaveBeenCalledTimes(1);
    expect(blogRepository.unlikeBlogByBlogId).toHaveBeenCalledWith(
      mockBlogs[0].id,
      mockUser.id
    );
  });

  it('should throw an error', async () => {
    (blogRepository.unlikeBlogByBlogId as jest.Mock).mockResolvedValueOnce(0);

    await expect(
      blogService.unlikeBlogByBlogId(mockBlogs[0].id, mockUser)
    ).rejects.toThrow(
      new AppError("You haven't liked this blog", HTTPStatusCode.NotFound)
    );

    expect(blogRepository.unlikeBlogByBlogId).toHaveBeenCalledTimes(1);
    expect(blogRepository.unlikeBlogByBlogId).toHaveBeenCalledWith(
      mockBlogs[0].id,
      mockUser.id
    );
  });
});

describe('blogService.getCommentsByBlogId', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const queryParams: ICommentQueryParams = {
    skip: '0',
    limit: '5',
  };

  it('should return list of comments for given blogId', async () => {
    (blogRepository.getCommentsByBlogId as jest.Mock).mockResolvedValueOnce(
      mockCommnetsResponse
    );

    (
      blogRepository.getCommentsCountByBlogId as jest.Mock
    ).mockResolvedValueOnce(3);

    const commentsResponse: ICommentResponseList =
      await blogService.getCommentsByBlogId(
        'f9c28d64-5499-11ef-8246-088fc3196e05',
        queryParams
      );

    expect(commentsResponse).toEqual(mockCommnetsResponseList);
  });
});

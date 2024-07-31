import {
  HATEOAS_Types,
  IBlog,
  IBlogDbInput,
  IBlogInput,
  IBlogResponse,
  IBlogUpdateDbInput,
  IBlogUpdateInput,
  ICommentResponse,
  ILike,
  IUser,
} from '../../interfaces';

export class BlogDbInputDTO implements IBlogDbInput {
  authorId: string;
  title: string;
  description: string;
  authorUsername: string;

  constructor(blogInput: IBlogInput, user: IUser) {
    this.authorId = user.id;
    this.title = blogInput.title;
    this.description = blogInput.description;
    this.authorUsername = user.username;
  }
}

export class BlogResponseDTO implements IBlogResponse {
  id: string;
  authorId: string;
  title: string;
  description: string;
  authorUsername: string;
  likes: ILike[];
  comments: ICommentResponse[];
  _links: HATEOAS_Types;

  constructor(blog: IBlog, likes: ILike[], comments: ICommentResponse[]) {
    this.id = blog.id;
    this.authorId = blog.authorId;
    this.title = blog.title;
    this.description = blog.description;
    this.authorUsername = blog.authorUsername;
    this.likes = likes;
    this.comments = comments;
    this._links = {
      self: {
        href: `/api/blogs/${blog.id}`,
        method: 'GET',
      },
      update: {
        href: `/api/blogs/${blog.id}`,
        method: 'PATCH',
      },
      delete: {
        href: `/api/blogs/${blog.id}`,
        method: 'DELETE',
      },
    };
  }
}

export class BlogUpdateDbInput implements IBlogUpdateDbInput {
  title: string;
  description: string;

  constructor(blogUpdateInput: IBlogUpdateInput) {
    this.title = blogUpdateInput.title;
    this.description = blogUpdateInput.description;
  }
}

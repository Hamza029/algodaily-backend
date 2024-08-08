import { ICommentDBInput } from '../../interfaces';

export class CommentDbInputDTO implements ICommentDBInput {
  blogId: string;
  userId: string;
  content: string;
  createdAt: Date;

  constructor(content: string, blogId: string, userId: string) {
    this.content = content;
    this.blogId = blogId;
    this.userId = userId;
    this.createdAt = new Date();
  }
}

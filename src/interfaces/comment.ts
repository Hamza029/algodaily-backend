export interface IComment {
  id: string;
  blogId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface ICommentResponse extends IComment {
  username: string;
}

export interface ICommentDBInput extends Omit<IComment, 'id'> {}

export interface ICommentInput extends Pick<IComment, 'content'> {}

export interface ICommentResponseList {
  comments: ICommentResponse[];
  totalComments: number;
}

export interface ICommentCount {
  blogId: string;
  numberOfComments: number;
}

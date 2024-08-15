export interface ILike {
  id: string;
  blogId: string;
  userId: string;
}

export interface ILikeResponse extends ILike {
  username: string;
}

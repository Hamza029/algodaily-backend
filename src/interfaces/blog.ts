import { ICommentResponse } from './comment';
import { HATEOAS_Types } from './hateoas';
import { ILike } from './like';

interface IBlogAttributes {
  id: string;
  authorId: string;
  title: string;
  description: string;
  authorUsername: string;
  likes: ILike[];
  comments: ICommentResponse[];
  _links: HATEOAS_Types;
}

export interface IBlog
  extends Omit<IBlogAttributes, '_links' | 'likes' | 'comments'> {}

export interface IBlogInput
  extends Pick<IBlogAttributes, 'title' | 'description'> {}

export interface IBlogDbInput
  extends Omit<IBlogAttributes, 'id' | '_links' | 'likes' | 'comments'> {}

export interface IBlogResponse extends IBlogAttributes {}

export interface IBlogUpdateInput
  extends Pick<IBlogAttributes, 'title' | 'description'> {}

export interface IBlogUpdateDbInput
  extends Pick<IBlogAttributes, 'title' | 'description'> {}

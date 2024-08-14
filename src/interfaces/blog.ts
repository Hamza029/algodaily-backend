import { HATEOAS_Types } from './hateoas';
import { ILikeResponse } from './like';

interface IBlogAttributes {
  id: string;
  authorId: string;
  title: string;
  description: string;
  authorUsername: string;
  createdAt: Date;
  likes: ILikeResponse[];
  commentsCount: number;
  _links: HATEOAS_Types;
}

export interface IBlog
  extends Omit<IBlogAttributes, '_links' | 'likes' | 'commentsCount'> {}

export interface IBlogInput
  extends Pick<IBlogAttributes, 'title' | 'description'> {}

export interface IBlogDbInput
  extends Omit<
    IBlogAttributes,
    'id' | '_links' | 'likes' | 'commentsCount' | 'createdAt'
  > {}

export interface IBlogResponse extends IBlogAttributes {}

export interface IBlogUpdateInput
  extends Pick<IBlogAttributes, 'title' | 'description'> {}

export interface IBlogUpdateDbInput
  extends Pick<IBlogAttributes, 'title' | 'description'> {}

export interface IBlogResponseList {
  totalPages: number;
  blogs: IBlogResponse[];
}

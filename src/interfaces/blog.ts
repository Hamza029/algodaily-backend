import { HATEOAS_Types } from './hateoas';

interface IBlogAttributes {
  id: string;
  authorId: string;
  title: string;
  description: string;
  authorUsername: string;
  _links: HATEOAS_Types;
}

export interface IBlog extends Omit<IBlogAttributes, '_links'> {}

export interface IBlogInput
  extends Pick<IBlogAttributes, 'title' | 'description'> {}

export interface IBlogDbInput extends Omit<IBlogAttributes, 'id' | '_links'> {}

export interface IBlogResponse extends IBlogAttributes {}

export interface IBlogUpdateInput
  extends Pick<IBlogAttributes, 'title' | 'description'> {}

export interface IBlogUpdateDbInput
  extends Pick<IBlogAttributes, 'title' | 'description'> {}

interface IQueryParams {
  authorId?: string;
  search?: string;
  page?: string;
}

export interface IBlogQueryParams
  extends Pick<IQueryParams, 'authorId' | 'page' | 'search'> {}

export interface IUserQueryParams extends Pick<IQueryParams, 'page'> {}

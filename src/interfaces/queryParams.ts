interface IQueryParams {
  authorId?: string;
  search?: string;
  page?: string;
  sort?: string;
}

export interface IBlogQueryParams
  extends Pick<IQueryParams, 'authorId' | 'page' | 'search' | 'sort'> {}

export interface IUserQueryParams extends Pick<IQueryParams, 'page'> {}

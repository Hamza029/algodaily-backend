interface IQueryParams {
  authorUsername?: string;
  search?: string;
}

export interface IBlogQueryParams
  extends Pick<IQueryParams, 'authorUsername'> {}

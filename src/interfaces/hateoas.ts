export type HATEOAS_Types = Record<
  'self' | 'update' | 'delete',
  {
    href: string;
    method: string;
  }
>;

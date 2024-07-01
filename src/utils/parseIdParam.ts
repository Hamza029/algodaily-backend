import { Request } from 'express';

export default (req: Request): string => {
  const { id } = req.params;

  return id;
};

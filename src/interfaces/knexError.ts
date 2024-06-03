export interface IKnexError extends Error {
  code: string;
  errNo: number;
  sqlState: number;
  sqlMessage: string;
  sql: string;
}

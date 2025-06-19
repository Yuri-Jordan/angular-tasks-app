export type PaginatedItems<T> = {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
export interface PaginationParam {
  page: number;
  limit: number;
  needTotalCount?: boolean;
  onlyCount?: boolean;
  sort?: string;
  direction?: string;
}

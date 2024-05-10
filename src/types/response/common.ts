export type CommonResponse<T> = {
  message: string;
  data: T;
};

export type Meta = {
  page: number;
  perPage: number;
  total: number;
  total_page: number;
};

export type CommonListResponse<T> = {
  message: string;
  data: T;
  meta?: Meta;
};

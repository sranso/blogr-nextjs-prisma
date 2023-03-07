export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ResponseError = {
  message: string;
};

export const isResponseError = (
  data: any | ResponseError
): data is ResponseError => (data as ResponseError).message !== undefined;

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

export type Session = {
  email: string;
}

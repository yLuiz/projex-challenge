export interface IUserRequest {
  id?: number,
  email: string,
  password: string,
  name: string,
}

export interface IUserResponse {
  id?: number,
  email: string,
  name: string,
  createdAt: Date;
  updatedAt: Date;
}
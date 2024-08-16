export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthRes {
  token: string;
}

export interface RegisterRes {
  result: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

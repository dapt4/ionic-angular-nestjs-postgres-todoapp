export interface User {
  id: number;
  nombre: string;
  email: string;
}

export interface AuthBody {
  username: string;
  password: string;
}

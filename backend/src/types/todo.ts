export interface Todo {
  id?: number;
  user_id: number;
  title: string;
  description: string;
  created_at_: string;
  completed: boolean;
}

export interface SuccessRes {
  success: boolean;
}

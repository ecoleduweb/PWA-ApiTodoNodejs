export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoRequest {
  text: string;
}

export interface UpdateTodoRequest {
  isCompleted?: boolean;
  text?: string;
}

export interface TodoResponse {
  id: string;
  text: string;
  isCompleted: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
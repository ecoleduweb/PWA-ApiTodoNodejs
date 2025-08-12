export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateTodoRequest {
  // Ajoute ce qu'il manque
}


export interface TodoResponse {
  id: string;
  text: string;
  isCompleted: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateTodoRequest {
  // Ajoute ce qu'il manque en te basant sur la route POST dans ton swagger. Il manque un champ.
}


export interface TodoResponse {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
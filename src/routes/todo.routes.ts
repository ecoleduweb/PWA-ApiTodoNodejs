import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';

export const createTodoRoutes = (): Router => {
  
  const todoController = new TodoController();
  
  const router = Router();

  router.get('/todos', todoController.getAllTodos);
  router.get('/todo/:id', todoController.getTodoById);
  router.post('/todo', todoController.createTodo);
  router.patch('/todo/:id', todoController.updateTodo);
  router.delete('/todo/:id', todoController.deleteTodo);

  return router;
};
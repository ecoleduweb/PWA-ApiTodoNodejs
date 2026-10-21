import { Request, Response, NextFunction } from 'express';
import { TodoService } from '../services/todo.service';
import { CreateTodoRequest } from '../types/todo.types';

const todoService = new TodoService();

export class TodoController {

  getAllTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  };

  getTodoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const todo = await todoService.getTodoById(id);
      
      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // pour accéder au corps de la requête, on utilise req.body
    const todoRequest : CreateTodoRequest = req.body;
    try {
      const todo = await todoService.createTodo(todoRequest);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  };

  updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const updatedTodo = await todoService.updateTodo(id, req.body); 
      if (!updatedTodo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }
      res.json(updatedTodo);
    } catch (error) {
      next(error);
    }
  }

  deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const deleted = await todoService.deleteTodo(id);

      if (!deleted) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }         
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
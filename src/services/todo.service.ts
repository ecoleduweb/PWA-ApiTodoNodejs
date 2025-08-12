import { TodoRepository } from '../repositories/todo.repository';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo.types';

const todoRepository = new TodoRepository();

export class TodoService {

  async getAllTodos(): Promise<Todo[]> {
    return await todoRepository.findAll();
  }

  async getTodoById(id: string): Promise<Todo | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid todo ID');
    }
    return await todoRepository.findById(id);
  }

  async createTodo(data: CreateTodoRequest): Promise<Todo> {
    if (!data.text || typeof data.text !== 'string' || data.text.trim() === '') {
      throw new Error('Todo text is required and must be a non-empty string');
    }

    return await todoRepository.create({
      text: data.text.trim()
    });
  }

  async updateTodo(id: string, data: UpdateTodoRequest): Promise<Todo | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid todo ID');
    }

    const existingTodo = await todoRepository.findById(id);
    if (!existingTodo) {
      return null;
    }

    if (data.text !== undefined && (typeof data.text !== 'string' || data.text.trim() === '')) {
      throw new Error('Todo text must be a non-empty string');
    }

    if (data.isCompleted !== undefined && typeof data.isCompleted !== 'boolean') {
      throw new Error('isCompleted must be a boolean');
    }

    const updateData: UpdateTodoRequest = {};
    if (data.text !== undefined) {
      updateData.text = data.text.trim();
    }
    if (data.isCompleted !== undefined) {
      updateData.isCompleted = data.isCompleted;
    }

    return await todoRepository.update(id, updateData);
  }

  async deleteTodo(id: string): Promise<boolean> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid todo ID');
    }

    const existingTodo = await todoRepository.findById(id);
    if (!existingTodo) {
      return false;
    }

    return await todoRepository.delete(id);
  }
}
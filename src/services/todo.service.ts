import { TodoRepository } from '../repositories/todo.repository';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo.types';

export class TodoService {
  private todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }

  async getTodoById(id: string): Promise<Todo | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid todo ID');
    }
    return await this.todoRepository.findById(id);
  }

  async createTodo(data: CreateTodoRequest): Promise<Todo> {
    if (!data.text || typeof data.text !== 'string' || data.text.trim() === '') {
      throw new Error('Todo text is required and must be a non-empty string');
    }

    return await this.todoRepository.create({
      text: data.text.trim()
    });
  }

  async updateTodo(id: string, data: UpdateTodoRequest): Promise<Todo | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid todo ID');
    }

    const existingTodo = await this.todoRepository.findById(id);
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

    return await this.todoRepository.update(id, updateData);
  }

  async deleteTodo(id: string): Promise<boolean> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid todo ID');
    }

    const existingTodo = await this.todoRepository.findById(id);
    if (!existingTodo) {
      return false;
    }

    return await this.todoRepository.delete(id);
  }
}
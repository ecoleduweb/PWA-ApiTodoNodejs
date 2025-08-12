import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { todos } from '../db/schema';
import { Todo } from '../types/todo.types';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/connection';

export class TodoRepository {

  async findAll(): Promise<Todo[]> {
    const result = await db.select().from(todos).orderBy(todos.createdAt);
    return result.map(this.mapToTodo);
  }

  async findById(id: string): Promise<Todo | null> {
    const result = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
    return result.length > 0 ? this.mapToTodo(result[0]) : null;
  }

  async create(todo: Todo): Promise<Todo> {
    await db.insert(todos).values(todo);

    const result = await this.findById(id);
    if (!result) {
      throw new Error('Failed to create todo');
    }
    return result;
  }
  private mapToTodo(row: any): Todo {
    return {
      id: row.id,
      text: row.text,
      isCompleted: row.isCompleted,
      date: row.date,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }
}
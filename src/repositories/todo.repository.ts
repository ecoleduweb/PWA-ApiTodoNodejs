import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { todos } from '../db/schema';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo.types';
import { v4 as uuidv4 } from 'uuid';

export class TodoRepository {
  private db: MySql2Database<any>;

  constructor(db: MySql2Database<any>) {
    this.db = db;
  }

  async findAll(): Promise<Todo[]> {
    const result = await this.db.select().from(todos).orderBy(todos.createdAt);
    return result.map(this.mapToTodo);
  }

  async findById(id: string): Promise<Todo | null> {
    const result = await this.db.select().from(todos).where(eq(todos.id, id)).limit(1);
    return result.length > 0 ? this.mapToTodo(result[0]) : null;
  }

  async create(data: CreateTodoRequest): Promise<Todo> {
    const id = uuidv4();
    const now = new Date();
    
    await this.db.insert(todos).values({
      id,
      text: data.text,
      isCompleted: false,
      date: now,
      createdAt: now,
      updatedAt: now
    });

    const result = await this.findById(id);
    if (!result) {
      throw new Error('Failed to create todo');
    }
    return result;
  }

  async update(id: string, data: UpdateTodoRequest): Promise<Todo | null> {
    try {
      const updateData: any = {
        updatedAt: new Date()
      };

      if (data.text !== undefined) {
        updateData.text = data.text;
      }
      if (data.isCompleted !== undefined) {
        updateData.isCompleted = data.isCompleted;
      }

      await this.db.update(todos).set(updateData).where(eq(todos.id, id));
      return await this.findById(id);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.db.delete(todos).where(eq(todos.id, id));
      return true;
    } catch (error) {
      return false;
    }
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
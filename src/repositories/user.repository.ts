import { eq } from 'drizzle-orm';
import { NewUser, User } from '../types/user.types';
import { users } from '../db/schema';
import { db } from '../db/connection';

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result.length > 0 ? this.mapToUser(result[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result.length > 0 ? this.mapToUser(result[0]) : null;
  }

  async create(user: NewUser): Promise<User> {
    await db.insert(users).values(user);

    const result = await this.findById(user.id);
    if (!result) {
      throw new Error('Failed to create user');
    }
    return result;
  }

  // async delete(id: string): Promise<void> {
  //   await db.delete(users).where(eq(users.id, id));
  // }

  // async update(id: string, user: Partial<User>): Promise<User> {
  //   await db.update(users).set(user).where(eq(users.id, id));
  //   return this.findById(id) as Promise<User>;
  // }
  
  private mapToUser(row: any): User {
    return {
      id: row.id,
      lastName: row.lastName,
      firstName: row.firstName,
      email: row.email,
      passwordHash: row.passwordHash,
      balance: row.balance,
      createdAt: row.createdAt
    };
  }
}
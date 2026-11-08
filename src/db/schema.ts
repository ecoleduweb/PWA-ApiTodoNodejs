import { mysqlTable, varchar, boolean, timestamp, decimal } from 'drizzle-orm/mysql-core';

// On défini le schéma ici. C'est ce qui sera utilisé pour créer la table dans la base de données.
// On utilise les types de Drizzle pour définir les colonnes de la table.
// Chaque colonne est définie avec un type, une longueur (si applicable) et des contraintes
export const todos = mysqlTable('todos', {
  id: varchar('id', { length: 36 }).primaryKey(),
  text: varchar('text', { length: 500 }).notNull(),
  isCompleted: boolean('is_completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  lastName: varchar('lastName', { length: 100 }).notNull(),
  firstName: varchar('firstName', { length: 100 }).notNull(),
  email: varchar('email', { length: 254 }).notNull().unique(),
  passwordHash: varchar('passwordHash', { length: 255 }).notNull(),
  balance: decimal('balance', { precision: 15, scale: 2 }).default('10000.00').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

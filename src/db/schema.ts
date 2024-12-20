import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

const timestamps = {
	createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow()
};

// Users Schema
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	...timestamps
});

// Notes Schema
export const notes = pgTable('notes', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	description: text('description').notNull().unique(),
	...timestamps
});

import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const timestamps = {
	createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow()
};

// Users Schema
export const users = pgTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	image: text('image'),
	emailVerified: boolean('email_verified').default(false),
	password: text('password').notNull(),
	...timestamps
});

// Notes Schema
export const notes = pgTable('notes', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	description: text('description').notNull().unique(),
	...timestamps
});

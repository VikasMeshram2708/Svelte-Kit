import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const timestamps = {
	createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow()
};

export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	email: text('email').unique().notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	password: text('password'),
	image: text('image')
});

export const accounts = pgTable('account', {
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	type: text('type').notNull(),
	provider: text('provider').notNull(),
	providerAccountId: text('providerAccountId').notNull(),
	refresh_token: text('refresh_token'),
	access_token: text('access_token'),
	expires_at: integer('expires_at'),
	token_type: text('token_type'),
	scope: text('scope'),
	id_token: text('id_token'),
	session_state: text('session_state')
});

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable('verificationToken', {
	identifier: text('identifier').notNull(),
	token: text('token').notNull(),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const authenticators = pgTable('authenticator', {
	credentialID: text('credentialID').notNull().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	providerAccountId: text('providerAccountId').notNull(),
	credentialPublicKey: text('credentialPublicKey').notNull(),
	counter: integer('counter').notNull(),
	credentialDeviceType: text('credentialDeviceType').notNull(),
	credentialBackedUp: boolean('credentialBackedUp').notNull(),
	transports: text('transports')
});

// Notes Schema
export const notes = pgTable('notes', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	description: text('description').notNull().unique(),
	...timestamps
});

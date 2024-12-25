import * as z from 'zod';

export const signUpSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Name must be at least 2 characters long.' })
		.max(150, { message: 'Name must be at most 150 characters long.' }),
	email: z
		.string()
		.email({ message: 'Invalid email address.' })
		.min(5, { message: 'Email must be at least 5 characters long.' })
		.max(150, { message: 'Email must be at most 150 characters long.' }),
	password: z
		.string()
		.min(5, { message: 'Password must be at least 5 characters long.' })
		.max(150, { message: 'Password must be at most 150 characters long.' })
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid email address.' })
		.min(5, { message: 'Email must be at least 5 characters long.' })
		.max(150, { message: 'Email must be at most 150 characters long.' }),
	password: z
		.string()
		.min(5, { message: 'Password must be at least 5 characters long.' })
		.max(150, { message: 'Password must be at most 150 characters long.' })
});

export type loginSchema = z.infer<typeof loginSchema>;

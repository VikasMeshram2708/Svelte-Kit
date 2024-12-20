import * as z from 'zod';

export const signUpSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: 'Name must have at-least 2 character'
		})
		.max(150, {
			message: 'Name should not exceed more than 150 character'
		}),
	email: z.string().email(),
	password: z
		.string()
		.min(5, {
			message: 'Password must have at-least 5 character'
		})
		.max(250, {
			message: 'Password should not exceed more than 250 character'
		})
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(5, {
			message: 'Password must have at-least 5 character'
		})
		.max(250, {
			message: 'Password should not exceed more than 250 character'
		})
});

export type loginSchema = z.infer<typeof loginSchema>;

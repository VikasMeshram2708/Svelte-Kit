import * as z from 'zod';

export const todoSchema = z.object({
	content: z.string().min(2, { message: 'Todo should have at-least 2 characters' }).max(150, {
		message: 'Todo should not exceed more than 150 characters'
	})
});
export type todoSchema = z.infer<typeof todoSchema>;

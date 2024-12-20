import * as z from 'zod';

export const noteSchema = z.object({
	title: z
		.string()
		.min(2, {
			message: 'Title must have at-least 2 character'
		})
		.max(150, {
			message: 'Title should not exceed more than 150 character'
		}),
	description: z
		.string()
		.min(5, {
			message: 'Description must have at-least 5 character'
		})
		.max(250, {
			message: 'Description should not exceed more than 250 character'
		})
});

export type noteSchema = z.infer<typeof noteSchema>;

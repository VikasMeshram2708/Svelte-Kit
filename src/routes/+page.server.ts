import { noteSchema } from '../model/note-model';
import type { Actions } from './$types';

export const actions = {
	createNote: async ({ request }) => {
		try {
			const data = await request.formData();

			// Parse data into noteSchema format
			const noteData = {
				title: data.get('title') as string | null,
				description: data.get('description') as string | null,
			};

			// Validate with Zod schema
			const parsedRes = noteSchema.safeParse(noteData);

			if (!parsedRes.success) {
				// Validation failed, return errors
				return {
					success: false,
					errors: {
						title: parsedRes.error.flatten().fieldErrors.title || null,
						description: parsedRes.error.flatten().fieldErrors.description || null,
					},
				};
			}

			// Validation succeeded
			const configData = parsedRes.data;
			console.log('Received Data:', configData);

			return {
				success: true,
				data: configData,
			};
		} catch (error) {
			console.error('Error in createNote action:', error);
			// Handle unexpected server errors
			return {
				success: false,
				errors: { general: 'An unexpected error occurred. Please try again later.' },
			};
		}
	},
} satisfies Actions;

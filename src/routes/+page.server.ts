import { fail } from '@sveltejs/kit';
import { noteSchema } from '../model/note-model';
import { notes } from '../db/schema';
import { db } from '../db';

export const actions = {
	createNote: async ({ request, locals }) => {
		try {
			// Check authentication
			const session = await locals.auth();
			if (!session?.user?.id) {
				return fail(400, {
					success: false,
					session: 'Login Required'
				});
			}

			// Parse form data
			const formData = await request.formData();

			const data: noteSchema = {
				title: String(formData.get('title')),
				description: String(formData.get('description'))
			};

			// Validate input
			const validation = noteSchema.safeParse(data);

			if (!validation.success) {
				const fieldErrors = validation.error.flatten().fieldErrors;
				if (fieldErrors?.title) {
					return fail(400, {
						success: false,
						error: fieldErrors?.title?.[0]
					});
				}
				return fail(400, {
					success: false,
					error: fieldErrors?.description?.[0]
				});
			}

			// Insert note into database
			const { title, description } = validation.data;

			await db.insert(notes).values({
				title,
				description,
				userId: session.user.id
			});

			return {
				success: true
			};
		} catch (error) {
			console.error('Failed to create note:', error);

			return fail(500, {
				success: false,
				error: 'Failed to create note. Please try again later.'
			});
		}
	}
};

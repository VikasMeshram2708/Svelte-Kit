import { fail, redirect } from '@sveltejs/kit';
import { noteSchema } from '../model/note-model';
import { notes } from '../db/schema';
import { json, type ServerLoad } from '@sveltejs/kit';
import { db } from '../db';
import { desc, eq, sql } from 'drizzle-orm';
import { paginationSchema } from '../model/pagination-model';

export const load: ServerLoad = async ({ url, locals }) => {
	//  Session
	const session = await locals.auth();
	if (!session?.user?.id) {
		return json(
			{
				message: 'Login Required'
			},
			{
				status: 302
			}
		);
	}

	const limit = url.searchParams.get('limit') || 5;
	const skip = url.searchParams.get('skip') || 5;

	console.log('PARAMS: lm', limit);
	console.log('PARAMS: sk ', skip);

	// Pagination Validation
	const pgValidation = paginationSchema.safeParse({ limit: +limit, skip: +skip });

	if (!pgValidation?.success) {
		const fieldErrors = pgValidation.error.flatten().fieldErrors;
		console.log('fieldErrors', fieldErrors);

		// Redirect to Error Page
		if (fieldErrors.limit) {
			throw redirect(302, `/error?error=${fieldErrors?.limit?.[0]}`);
			// return json(
			// 	{
			// 		error: fieldErrors?.limit?.[0]
			// 	},
			// 	{
			// 		status: 422
			// 	}
			// );
		}
		throw redirect(302, `/error?error=${fieldErrors?.skip?.[0]}`);

		// return json(
		// 	{
		// 		error: fieldErrors?.skip?.[0]
		// 	},
		// 	{
		// 		status: 422
		// 	}
		// );
	}

	try {
		const res = await db
			.select({
				record: notes,
				count: sql<number>`count(*) over()`
			})
			.from(notes)
			.where(eq(notes?.userId, String(session?.user?.id)))
			.orderBy(desc(notes?.createdAt))
			.limit(+limit)
			.offset(+skip);

		// console.log('NOTES: ', res);
		if (!res) {
			return json(
				{
					message: 'Failed to fetch Notes'
				},
				{
					status: 400
				}
			);
		}
		return {
			notes: res.map((item) => item.record),
			meta: {
				total: res?.[0]?.count ?? 0,
				skip,
				limit
			}
		};
	} catch (e) {
		return json(
			{
				message: `Something went wrong. Notes Fetching Failed. ${e}`
			},
			{
				status: 500
			}
		);
	}
};

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

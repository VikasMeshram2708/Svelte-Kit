import { fail, redirect } from '@sveltejs/kit';
import { noteSchema } from '../model/note-model';
import { notes } from '../db/schema';
import { json } from '@sveltejs/kit';
import { db } from '../db';
import { desc, eq, sql } from 'drizzle-orm';
import { paginationSchema } from '../model/pagination-model';
import type { PageServerLoad } from './$types.js';

// Load Function
export const load: PageServerLoad = async ({ url, locals }) => {
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

	// console.log('PARAMS: lm', limit);
	// console.log('PARAMS: sk ', skip);

	// Pagination Validation
	const pgValidation = paginationSchema.safeParse({ limit: +limit, skip: +skip });

	if (!pgValidation?.success) {
		const fieldErrors = pgValidation.error.flatten().fieldErrors;
		// console.log('fieldErrors', fieldErrors);

		// Redirect to Error Page
		if (fieldErrors.limit) {
			throw redirect(302, `/error?error=${fieldErrors?.limit?.[0]}`);
		}
		throw redirect(302, `/error?error=${fieldErrors?.skip?.[0]}`);
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
			notes: res?.map((e) => e?.record),
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

// Form Actions
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

			// Validate User Notes Count
			const notesCount = await db
				.select({
					count: sql<number>`count(*) over()`
				})
				.from(notes)
				.where(eq(notes?.userId, String(session?.user?.id)));

			const premiumCount = notesCount?.[0]?.count;
			console.log('SERVER: COUNT', premiumCount);
			if (premiumCount > 30) {
				return fail(400, {
					success: false,
					error: 'Your Free Tier is finished.Cannot create more than 30 notes.Buy a premium.',
					count: premiumCount
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

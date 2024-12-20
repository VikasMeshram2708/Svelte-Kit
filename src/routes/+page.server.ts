import type { Actions } from './$types';

export const actions = {
	createNote: async ({ request }) => {
		const data = await request.formData();
		const noteData = {
			title: data.get('title'),
			description: data.get('description')
		};
		console.log('rec-d', noteData);
		return {
			success: true,
			noteData
		};
	}
} satisfies Actions;

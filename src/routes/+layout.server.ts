import { verifyUser } from '$lib';
import type { LayoutServerLoad } from './$types';
// import { fail } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const session = cookies.get('svAuth') || '';

	// if (!session) {
	// 	throw fail(302, { session: 'Login Required' });
	// }

	const user = await verifyUser(session);
	return {
		user
	};
};

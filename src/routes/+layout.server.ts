import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// Retrieve the session from locals
	const session = await locals.auth();

	// Log session details for debugging
	console.log('Session details:', session?.user);

	// Prevent redirect loops by checking if the current route is `/auth`

	if (url.pathname === '/auth' && session?.user) {
		throw redirect(302, '/');
	}
	if (!session?.user && url.pathname !== '/auth') {
		throw redirect(302, '/auth');
	}

	// Return the session for use in the layout
	return {
		session
	};
};

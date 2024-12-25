// import { verifyUser } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get('svAuth') || '';

	if (!session) {
		throw redirect(302, '/auth/login');
		// return {
		// 	error: 'Login Required'
		// };
	}
};

export const actions: Actions = {
	logout:({ cookies }) => {
		try {
			cookies.delete('svAuth', {
				path: '/'
			});

			return redirect(302, '/auth/login');
		} catch (error) {
			return {
				error: `Something went wrong. Logout Faile. ${error}`
			};
		}
	}
};

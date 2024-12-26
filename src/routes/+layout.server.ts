import { verifyUser } from '$lib';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const session = cookies.get('svAuth') || '';

	const user = await verifyUser(session);

	return {
		user
	};
};

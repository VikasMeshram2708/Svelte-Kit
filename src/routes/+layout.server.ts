import { verifyUser } from '$lib';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const session = cookies.get('svAuth') || '';

	const user = await verifyUser(session);

	return {
		user
	};
};

// export const actions = {
// 	pagination: async ({ cookies, request }) => {
// 		const session = cookies.get('svAuth') || '';

// 		// Pagination params
// 		const formData = await request.formData();

// 		const metaData = {
// 			limit: formData.get('limit') || 5,
// 			skip: formData.get('skip') || 5
// 		};

// 		console.log('metaData', metaData);

// 		const user = await verifyUser(session);
// 		// @ts-ignore

// 		const userId = await user?.token?.id;

// 		// Find total no. of todos
// 		const totalTodos = await prismaInstance.todo.count({
// 			where: {
// 				userId: userId
// 			}
// 		});

// 		// find the user specific todos
// 		const todos = await prismaInstance.todo.findMany({
// 			where: {
// 				userId: userId
// 			},
// 			orderBy: {
// 				createdAt: 'desc'
// 			},
// 			skip: +metaData?.skip,
// 			take: +metaData?.limit
// 		});

// 		return {
// 			newTodos: todos,
// 			meta: {
// 				total: totalTodos,
// 				current: todos?.length
// 			}
// 		};
// 	}
// } satisfies Actions;

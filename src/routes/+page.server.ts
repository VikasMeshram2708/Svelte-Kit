/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { todoSchema } from '../model/todo';
import { prismaInstance, verifyUser } from '$lib';

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
	// Add Todo
	addTodo: async ({ request, cookies }) => {
		try {
			const session = cookies.get('svAuth') || '';
			// console.log('wbw-sess', session);

			// User Data
			const user = await verifyUser(session);
			// console.log('user-lle', user?.)

			const formData = await request.formData();
			const rawData = {
				content: formData.get('content')
			};
			// console.log('wbv', formData);
			// validate
			const validate = todoSchema.safeParse(rawData);

			if (!validate.success) {
				const fieldErr = validate.error.flatten().fieldErrors?.content;
				return fail(400, { error: fieldErr });
			}

			const todoData = validate.data;

			// @ts-ignore
			const userId = user?.token?.id;
			// console.log('user-id', userId);

			// add to db
			await prismaInstance.todo.create({
				data: {
					content: todoData.content,
					done: false,
					User: {
						connect: {
							id: userId
						}
					}
				}
			});
			// console.log('added');
			return {
				success: true
			};
		} catch (error) {
			return {
				error: `Something went wrong. Failed to add Todo. ${error}`
			};
		}
	},
	// Logout
	logout: ({ cookies }) => {
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

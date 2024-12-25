import bcrypt from 'bcryptjs';
import { fail } from '@sveltejs/kit';
import { prismaInstance } from '$lib';
import type { Actions } from './$types';
import { signUpSchema } from '../../../model/user';

export const actions = {
	// Register
	signup: async ({ request }) => {
		try {
			const formData = await request.formData();
			const rawData = signUpSchema.safeParse(Object.fromEntries(formData));

			if (!rawData.success) {
				const fieldErrors = rawData.error.flatten().fieldErrors;
				const errorField = Object.keys(fieldErrors);
				const { email, name, password } = fieldErrors;
				for (const field of errorField) {
					switch (field) {
						case 'name':
							return fail(400, { name, missing: true });
						case 'email':
							return fail(400, { email, missing: true });
						case 'password':
							return fail(400, { password });
					}
				}
			}

			const data = rawData.data;

			// Hash the Password
			const hashPassword = await bcrypt.hash(String(data?.password), 10);
			const newUser = await prismaInstance.user.create({
				data: {
					name: data?.name as string,
					email: data?.email as string,
					password: hashPassword
				}
			});

			if (!newUser) {
				return fail(400, {
					error: 'Failed to Create New User'
				});
			}

			return {
				success: true
			};
		} catch (error) {
			return {
				error: `Something went wrong. Sign Up Failed. Please try again .${error}`
			};
		}
	}
} satisfies Actions;

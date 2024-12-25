import { fail, redirect } from '@sveltejs/kit';
import { loginSchema } from '../../../model/user.js';
import type { Actions, PageServerLoad } from './$types';
import { prismaInstance } from '$lib';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = ({ cookies }) => {
	const session = cookies.get('svAuth');
	if (session) {
		throw redirect(302, '/');
	}
};

export const actions = {
	// Login
	login: async ({ request, cookies }) => {
		try {
			const formData = await request.formData();
			const rawData = loginSchema.safeParse(Object.fromEntries(formData));
			// console.log('rawData', rawData.data);

			if (!rawData.success) {
				const fieldErrors = rawData.error.flatten().fieldErrors;
				const errorField = Object.keys(fieldErrors);
				const { password, email } = fieldErrors;

				for (const field of errorField) {
					switch (field) {
						case 'email':
							return fail(400, { email, missing: true });
						case 'password':
							return fail(400, { password, missing: true });
					}
					if (fieldErrors.email) {
						console.error('er', fieldErrors?.email?.[0]);
						return fail(400, {
							error: fieldErrors?.email?.[0]
						});
					}
					console.error('pf', fieldErrors?.password?.[0]);
					return fail(400, {
						error: fieldErrors?.password?.[0]
					});
				}
			}

			const data = rawData.data;
			// Validate Email
			const userExist = await prismaInstance.user.findUnique({
				where: {
					email: data?.email
				}
			});

			console.log('userExist', userExist);

			if (!userExist) {
				return fail(400, {
					error: 'User Not Found'
				});
			}

			// Compare the Hash Password
			const isValidPass = await bcrypt.compare(String(data?.password), userExist.password);
			console.log('isValidPass', isValidPass);
			
			if (!isValidPass) {
				return fail(400, {
					error: 'Invalid Credentials'
				});
			}

			// JWT Token
			const payload = {
				id: userExist.id
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET!, {
				expiresIn: '1h'
			});

			// Set Cookies
			cookies.set('svAuth', token, {
				httpOnly: true,
				secure: true,
				maxAge: 60 * 60,
				path: '/'
			});

			return {
				success: true
			};
		} catch (error) {
			return fail(400, {
				error: `Something went wrong. Sign Up Failed. Please try again .${error}`
			});
		}
	}
} satisfies Actions;

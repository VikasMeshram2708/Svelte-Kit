import type { PageServerLoad } from '../$types';
import { loginSchema } from '../../model/user-mode';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '3Ca1JDh0ciILZ4bhHvDAjUYLmruhJQ8vOhXi/VWcd5U=';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('sv-auth');
	console.log('cookies:', cookies);

	if (!token) {
		return {
			status: 401,
			body: { error: 'Unauthorized' }
		};
	}
	return {
		isAuthenticated: true
	};
};

export const actions = {
	// Action to handle login
	default: async ({ request, cookies }) => {
		// Get form data from the login request
		const formData = new URLSearchParams(await request.text());
		const email = formData.get('email');
		const password = formData.get('password');

		const parsedRes = loginSchema.safeParse({ email, password });
		console.log('auth-data', email, password);

		if (!parsedRes.success) {
			return {
				error: parsedRes.error.flatten().formErrors
			};
		}

		const payload = { email: parsedRes.data.email };

		if (!JWT_SECRET) {
			throw new Error('JWT SECRET Not Found');
		}

		const token = jwt.sign(payload, JWT_SECRET);
		console.log('to', token);
		// Set a cookie when the user is authenticated
		cookies.set('sv-auth', token, {
			httpOnly: true,
			maxAge: 60 * 60, // 1 hour
			path: '/',
			secure: true // set to true if using https
		});

		return {
			status: 200,
			body: { message: 'Logged in successfully!' }
		};
	}
};

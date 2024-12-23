import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

export const { handle } = SvelteKitAuth({
	pages: {
		signIn: '/auth',
		newUser: '/auth',
		error: '/error'
	},
	secret: process.env.AUTH_SECRET,
	providers: [GitHub],
	callbacks: {
		async signIn({ user }) {
			// console.log({ user, account, profile });

			const { email } = user;

			const userExist = await db.query.users.findFirst({
				where: eq(users.email, String(email))
			});

			console.log('user-exist', userExist);

			if (!userExist) {
				await db.insert(users).values({
					name: String(user.name),
					email: String(email),
					password: ''
				});
			}

			return true;
		},
		async jwt({ token, user }) {
			const userExist = await db.query.users.findFirst({
				where: eq(users.email, String(user?.email))
			});
			if (user) {
				token.id = userExist?.id;
				token.email = userExist?.email;
			}
			return token;
		},
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
			}
			return session;
		}
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60
	}
});

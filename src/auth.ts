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
		async signIn({ user, account, profile }) {
			console.log({ user, account, profile });

			const { email } = user;

			const userExist = await db.query.users.findFirst({
				where: eq(users.email, String(email))
			});

			if (userExist) {
				if (account?.type === 'oauth') {
					if (!userExist.emailVerified) {
						throw new Error('Verify Your Email');
					}
				}
			}
			await db.insert(users).values({
				name: String(user.name),
				email: String(email),
				password: '',
			});

			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				user.email = token.email;
			}
			return token;
		},
		async session({ token, session }) {
			if (token) {
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

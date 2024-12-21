import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { db } from './db';

export const { handle } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
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

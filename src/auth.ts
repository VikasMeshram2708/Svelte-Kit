import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

export const { handle } = SvelteKitAuth({
	pages: {
		signIn: '/auth',
		newUser: '/auth',
		error: '/error'
	},
	secret: process.env.AUTH_SECRET,
	providers: [GitHub],
	callbacks: {
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

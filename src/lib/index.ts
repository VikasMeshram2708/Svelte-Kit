// place files you want to import through the `$lib` alias in this folder.

import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';

// Prisma Instance
export const prismaInstance = new PrismaClient();

// Verify JWT Token
export const verifyUser = async (tokenValue: string) => {
	try {
		if (!process.env.JWT_SECRET) {
			throw new Error('Jwt Secret Not Found!');
		}
		const token = jwt.verify(tokenValue, process.env.JWT_SECRET!);
		if (!token) {
			return {
				error: 'Authentication Failed.Invalid Token'
			};
		}
		return {
			token
		};
	} catch (error) {
		return {
			error: `Something went wrong. Failed to Verify the Token. ${error}`
		};
	}
};
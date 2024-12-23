import * as z from 'zod';

export const paginationSchema = z.object({
	limit: z
		.number()
		.min(5, { message: 'Limit must be greater than or equal to 1' }) // Ensure limit is a positive number
		.max(10, { message: 'Limit must be less than or equal to 10' }) // Optional: Add a max limit if needed
		.int(), // Ensure it's an integer (optional, but helpful if limits should always be whole numbers)

	skip: z
		.number()
		.min(0, { message: 'Skip must be greater than or equal to 0' }) // Ensure skip is non-negative
		.max(30, { message: 'Skip must be less than or equal to 30' }) // Optional: Add a max limit if needed
		.int() // Ensure it's an integer (optional)
});

export type paginationSchema = z.infer<typeof paginationSchema>;

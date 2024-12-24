const sampleNotes = [
	{
		id: '16e1c58b-d198-495c-8e6e-d8a82c9e17ef',
		title: 'Task 1',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 1',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '5829ac0b-2462-4e80-9a7d-560f3e8d3f8f',
		title: 'Task 2',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 2',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: 'b21a8d15-3e74-4df1-9b8c-7e62203c87ae',
		title: 'Task 3',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 3',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '79b34a5f-bd4b-4a56-b30f-dc53eb03a9dc',
		title: 'Task 4',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 4',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '515c1c3a-b88c-4dc1-9001-2af85ecdc74a',
		title: 'Task 5',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 5',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '9ef43c4c-7395-4a5a-982e-f4cd9f20aee7',
		title: 'Task 6',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 6',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: 'a3368b5d-5f53-4e0f-b2d0-4db64010391d',
		title: 'Task 7',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 7',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: 'ec28cf40-231f-45f1-86a8-40b6ea10e70b',
		title: 'Task 8',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 8',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: 'd39437d8-6b46-4b9f-b6ed-5376e3942c83',
		title: 'Task 9',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 9',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: 'f79b7e58-bb3e-4b49-9b7f-8df1df8e2bdc',
		title: 'Task 10',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 10',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: 'ecf76b12-2b47-4a8c-b7a7-fd0e03b492a6',
		title: 'Task 11',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 11',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '9ed835c2-91eb-4b4f-bfd3-c28c7e1db6e8',
		title: 'Task 12',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 12',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '6ef20f47-233e-456d-a6dc-92e9bead50b8',
		title: 'Task 13',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 13',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: 'ec9cb1d3-8513-44de-924d-2de50a69d356',
		title: 'Task 14',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 14',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '0b1910b8-9f79-4935-91b8-bdc0146c6e4f',
		title: 'Task 15',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 15',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: 'bb9088c9-8c7a-4e2b-a6c4-faad60664d9c',
		title: 'Task 16',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 16',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '273d02eb-c915-4cb2-9f94-06e7b379f478',
		title: 'Task 17',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 17',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '3ad0a5f8-290c-4ff5-95e7-4cda313aa6fa',
		title: 'Task 18',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 18',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '120f3e93-cb43-4420-8da3-1be1bd20bcb6',
		title: 'Task 19',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 19',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	},
	{
		id: '781bbcf8-72a7-4711-a6fa-93c460208abb',
		title: 'Task 20',
		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
		description: 'Description for task 20',
		createdAt: '2024-12-23T08:07:19.850732',
		updatedAt: '2024-12-23T08:07:19.850732'
	}
];

import { db } from '.';
import { notes } from './schema';

// const sampleNotes = [
// 	{
// 		id: '91163a2b-e660-48e4-b403-561772df02a5',
// 		title: 'Task 1',
// 		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
// 		description: 'Description for task 28',
// 		createdAt: '2024-12-23T08:07:19.850732',
// 		updatedAt: '2024-12-23T08:07:19.850732'
// 	},
// 	{
// 		id: 'e641e42d-6e4e-459f-bb31-383b1b535085',
// 		title: 'Task 2',
// 		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
// 		description: 'Description for task 29',
// 		createdAt: '2024-12-23T09:15:42.112732',
// 		updatedAt: '2024-12-23T09:15:42.112732'
// 	},
// 	{
// 		id: '06477e15-c2c7-4b0a-a595-f8df0c70cd8a',
// 		title: 'Task 3',
// 		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
// 		description: 'Description for task 30',
// 		createdAt: '2024-12-23T10:45:23.678123',
// 		updatedAt: '2024-12-23T10:45:23.678123'
// 	},
// 	{
// 		id: '1163f297-d0c4-4b10-b469-bc89c27c0eed',
// 		title: 'Task 4',
// 		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
// 		description: 'Description for task 31',
// 		createdAt: '2024-12-23T11:25:37.091345',
// 		updatedAt: '2024-12-23T11:25:37.091345'
// 	},
// 	{
// 		id: '1399e750-3439-4ac5-bdbc-e609ee644ad3',
// 		title: 'Task 5',
// 		userId: '5fb2c400-29c6-4def-ba06-6101013833cd',
// 		description: 'Description for task 32',
// 		createdAt: '2024-12-23T12:10:49.756439',
// 		updatedAt: '2024-12-23T12:10:49.756439'
// 	}
// ];

async function main() {
	await db.insert(notes).values(sampleNotes);
}

main()
	.then(() => console.log('DB Seeded'))
	.catch((e) => console.error(`Something went worng. Seeding Failed Please try again. ${e}}`));

<script lang="ts">
	import { page } from '$app/stores';
	import TodoForm from '$lib/components/todo-form.svelte';
	import type { ActionData, PageData } from './$types';

	let { form, data }: { form: ActionData; data: PageData } = $props();

	let pageSize = 5;

	let pgState = $derived({
		currentPage:
			($page.url.searchParams.get('skip')
				? Math.floor(Number($page.url.searchParams.get('skip')) / pageSize)
				: 0) + 1,
		totalPages: Math.ceil(data?.metadata.total / pageSize)
	});

	console.log('todos', data?.todos);
</script>

<div class="h-screen w-screen py-10">
	<TodoForm {form} />

	<div class="mx-auto my-10 grid max-w-xl gap-3">
		<div class="flex items-center justify-between gap-3">
			<h1>Showing {data?.todos?.length} of {data?.metadata?.total} Entries</h1>
			<div class="flex gap-3">
				{#each Array(pgState.totalPages) as _, idx}
					<a
						class="btn {idx + 1 === pgState.currentPage
							? 'variant-filled-primary'
							: 'variant-ghost-primary'}"
						href="/?limit={pageSize}&skip={pageSize * idx}"
					>
						{idx + 1}
					</a>
				{/each}
			</div>
		</div>

		{#each data?.todos as todo (todo?.id)}
			<article class="card flex items-center p-4">
				<input class="checkbox" type="checkbox" name="done" />
				<h1 class="card-header px-4 py-2 capitalize">{todo.content}</h1>
			</article>
		{/each}
	</div>
</div>

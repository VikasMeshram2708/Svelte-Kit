<script lang="ts">
	// import type { PageData } from './$types';

	// type Todo = { id: number; content: string; done: boolean };

	// let { data }: { data: PageData } = $props();
	// console.log('data', data?.todos);
</script>

<div class="h-screen w-screen py-10">
	<form
		method="POST"
		action="?/addTodo"
		class="card container mx-auto grid max-w-xl gap-3 rounded p-4 shadow-lg"
	>
		<h1 class="card-header text-center text-xl font-bold">Todo App</h1>
		<label for="todo">
			<input type="text" name="content" class="input px-4 py-2 text-lg" placeholder="Enter Todo" />
		</label>
		<button class="variant-filled-primary btn" type="button"> Add Todo </button>
	</form>

	<!-- <div class="mt-10 grid gap-3">
		{#each data?.todos as todo}
			{@render TodoSnippet(todo)}
		{/each}
	</div> -->
</div>

<!-- {#snippet TodoSnippet(todo: Todo)}
	<dl class="card container list-dl mx-auto max-w-xl">
		<div>
			<input type="checkbox" value={todo?.done} />
			<span class="flex-auto">
				<dt>{todo?.content}</dt>
			</span>
		</div>
	</dl>
{/snippet} -->

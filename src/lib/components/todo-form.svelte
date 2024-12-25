<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/$types';

	let { form }: { form: ActionData } = $props();
	// import { toast } from 'svoast';

	console.log('todo', { form });
</script>

<div class="h-screen w-screen">
	{#if form?.success}
		<p>Success: Todo Added</p>
	{:else if form?.error}
		<p>Failed:</p>
	{/if}
	<article class="card mx-auto max-w-xl shadow-lg">
		<form
			use:enhance={() => {
				return ({ result, update }) => {
					// console.log('res', result?.data?.error[0]);
					if (result.type === 'failure') {
						// @ts-ignore
						let errMsg = result?.data?.error[0];
						return alert(errMsg);
					}
					alert('Todo Added');
					return update();
				};
			}}
			action="?/addTodo"
			method="POST"
			class="card container mx-auto grid max-w-xl gap-3 rounded p-4 shadow-lg"
		>
			<h1 class="card-header text-center text-xl font-bold">Todo App</h1>
			<label for="todo">
				<input
					type="text"
					name="content"
					class="input px-4 py-2 text-lg"
					placeholder="Enter Todo"
				/>
			</label>
			<button class="variant-filled-primary btn" type="submit">Add Todo</button>
		</form>
	</article>
</div>

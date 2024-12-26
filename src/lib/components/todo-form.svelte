<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { ActionData } from '../../routes/$types';

	let { form }: { form: ActionData } = $props();
	let toggleModal = $state(true);
</script>

{#snippet CloseButton()}
	<button onclick={() => (toggleModal = false)} type="button">
		<X />
	</button>
{/snippet}

<div class="">
	{#if toggleModal}
		{#if form?.success}
			<div class="alert variant-filled-primary mx-auto max-w-lg">
				<p class="alert-message">{form?.success}</p>
				{@render CloseButton()}
			</div>
		{:else if form?.error}
			<div class="alert variant-filled-primary mx-auto max-w-lg">
				<p class="alert-message">{form?.error}</p>
				{@render CloseButton()}
			</div>
		{/if}
	{/if}

	<article class="card mx-auto max-w-xl shadow-lg">
		<!-- use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'failure') {
						let errMsg = result?.data?.error[0];
						return alert(errMsg);
					}
					alert('Todo Added');
					await invalidate((url) => url.pathname === '/');
					return update();
				};
			}} -->
		<form
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

<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import NotesTable from '$lib/components/notes-table.svelte';
	import { Check, OctagonX, X } from 'lucide-svelte';
	import { setContext } from 'svelte';

	let { data, form } = $props();

	setContext('notes', data?.notes);

	console.log('d', data?.notes);
	console.log('form', form?.success, form?.error);
	let toggle = $state(false); // Toggle the Notes Form
	let alertBoxToggle = $state(false); // Toggle the Alert Box

	$effect(() => {
		if (form?.success) {
			toggle = false;
			alertBoxToggle = true;
			invalidateAll();
		} else if (form?.error) {
			alertBoxToggle = false;
			toggle = false;
		}
	});
</script>

<div class="relative min-h-screen w-full p-6 sm:p-10">
	{#if alertBoxToggle}
		{#if form?.success}
			{@render AlertMessage({
				type: 'success',
				title: 'Success',
				message: 'Success: Note Added'
			})}
		{/if}
		{#if form?.error}
			{@render AlertMessage({
				type: 'error',
				title: 'Error',
				message: form?.error
			})}
		{/if}
	{/if}
	<div class="container mx-auto mb-6 flex max-w-7xl justify-end">
		<button onclick={() => (toggle = !toggle)} type="button" class="variant-filled-primary btn">
			Add Note
		</button>
	</div>

	{#if toggle}
		{@render AddNoteModal()}
	{/if}
	<NotesTable notes={data?.notes} meta={data?.meta} />
</div>

{#snippet AddNoteModal()}
	<section
		class="absolute inset-0 top-0 z-40 flex h-screen items-center justify-center bg-black/50 py-10"
	>
		<form
			method="POST"
			action="?/createNote"
			use:enhance={() => {
				return ({ update }) => {
					update();
				};
			}}
			class="card w-full max-w-xl rounded-lg bg-white p-6 shadow-lg"
		>
			<div class="mb-4 flex items-center justify-between">
				<h1 class="text-lg font-bold">Add New Note</h1>
				<button
					type="button"
					class="variant-filled-primary btn rounded-full"
					onclick={() => (toggle = false)}
				>
					<X size={20} />
				</button>
			</div>
			<div class="space-y-4">
				<input
					class="focus:ring-primary input w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring"
					placeholder="Type Title"
					type="text"
					name="title"
					id="title"
				/>
				<textarea
					class="focus:ring-primary input w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring"
					placeholder="Type Description"
					name="description"
					id="description"
					rows="4"
				></textarea>
			</div>
			<div class="mt-6">
				<button type="submit" class="variant-filled-primary btn px-6 py-2">Add Note</button>
			</div>
		</form>
	</section>
{/snippet}

{#snippet AlertMessage({ type, message, title }: { type: string; message: string; title: string })}
	<aside
		class={`alert ${type === 'success' ? 'variant-ghost-secondary' : 'variant-filled-primary'} mx-auto w-full max-w-2xl`}
	>
		<!-- Icon -->
		<div>
			{#if type === 'success'}
				<Check />
			{:else}
				<OctagonX />
			{/if}
		</div>
		<!-- Message -->
		<div class="alert-message">
			<h3 class="h3">{title}</h3>
			<p>{message}</p>
		</div>
		<!-- Actions -->
		<div class="alert-actions">
			<button onclick={() => (alertBoxToggle = false)} type="button">
				<X />
			</button>
		</div>
	</aside>{/snippet}
